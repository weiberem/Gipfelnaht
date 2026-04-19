import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendPartnerApplication } from '@/lib/inquiries';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(2),
  experience: z.string().min(20),
  motivation: z.string().min(20),
  portfolioUrl: z.string().url().optional().or(z.literal('').transform(() => undefined)),
  acceptPrivacy: z.literal(true),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiges JSON' }, { status: 400 });
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validierungsfehler', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  try {
    await sendPartnerApplication({ ...parsed.data, createdAt: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/partner-application] send failed', e);
    return NextResponse.json({ error: 'Versand fehlgeschlagen' }, { status: 500 });
  }
}
