import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendInquiry } from '@/lib/inquiries';
import { availableServices } from '@/content/atelier';
import type { ServiceOption } from '@/types';

const productKeys = [
  'daunenjacke',
  'hardshell',
  'hose',
  'rucksack',
  'zelt',
  'schlafsack',
  'anderes',
] as const;

const allServiceKeys = ['sammelbox', 'personal-dropoff', 'pickup', 'nightrepair'] as const;

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(4),
  product: z.enum(productKeys),
  description: z.string().min(10).max(2000),
  preferredService: z.enum(allServiceKeys),
  preferredDate: z.string().optional(),
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

  // Service-Wahl gegen die tatsächlich angebotenen Services prüfen.
  const allowed = new Set<ServiceOption>(availableServices());
  if (!allowed.has(parsed.data.preferredService)) {
    return NextResponse.json(
      { error: 'Diesen Service bieten wir aktuell nicht an.' },
      { status: 422 }
    );
  }

  try {
    await sendInquiry({
      customer: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
      },
      product: parsed.data.product,
      description: parsed.data.description,
      preferredService: parsed.data.preferredService,
      preferredDate: parsed.data.preferredDate,
      acceptPrivacy: parsed.data.acceptPrivacy,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/inquiry] Versand fehlgeschlagen', e);
    return NextResponse.json({ error: 'Versand fehlgeschlagen' }, { status: 500 });
  }
}
