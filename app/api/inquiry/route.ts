import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPartnerBySlug } from '@/lib/partners';
import { sendInquiry } from '@/lib/inquiries';

const schema = z.object({
  partnerSlug: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(4),
  category: z.string().min(1),
  description: z.string().min(10),
  preferredService: z.enum(['sammelbox', 'personal-dropoff', 'pickup', 'nightrepair']),
  preferredDate: z.string().optional(),
  hasPhotos: z.boolean(),
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

  const partner = await getPartnerBySlug(parsed.data.partnerSlug);
  if (!partner) {
    return NextResponse.json({ error: 'Partner nicht gefunden' }, { status: 404 });
  }

  try {
    await sendInquiry(
      {
        partnerSlug: parsed.data.partnerSlug,
        customer: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
        },
        item: {
          category: parsed.data.category,
          description: parsed.data.description,
        },
        preferredService: parsed.data.preferredService,
        preferredDate: parsed.data.preferredDate,
        hasPhotos: parsed.data.hasPhotos,
        acceptPrivacy: parsed.data.acceptPrivacy,
        createdAt: new Date().toISOString(),
      },
      partner
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/inquiry] send failed', e);
    return NextResponse.json({ error: 'Versand fehlgeschlagen' }, { status: 500 });
  }
}
