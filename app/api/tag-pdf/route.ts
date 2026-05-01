import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import { atelier } from '@/content/atelier';
import { TagDocument } from '@/lib/pdf-tag';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const contactUrl = `${atelier.siteUrl}/kontakt`;
  const qrDataUrl = await QRCode.toDataURL(contactUrl, {
    margin: 0,
    color: { dark: '#1F3A2E', light: '#F5F1EA' },
  });

  const buffer = await renderToBuffer(TagDocument({ qrDataUrl, contactUrl }));

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${atelier.name.toLowerCase()}-reparatur-tag.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
