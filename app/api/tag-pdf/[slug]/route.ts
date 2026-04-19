import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import { getPartnerBySlug } from '@/lib/partners';
import { platform } from '@/config/platform';
import { TagDocument } from '@/lib/pdf-tag';

export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const partner = await getPartnerBySlug(params.slug);
  if (!partner) {
    return NextResponse.json({ error: 'Partner nicht gefunden' }, { status: 404 });
  }

  const profileUrl = `${platform.siteUrl}/partner/${partner.slug}`;
  const qrDataUrl = await QRCode.toDataURL(profileUrl, {
    margin: 0,
    color: { dark: '#1F3A2E', light: '#F5F1EA' },
  });

  const buffer = await renderToBuffer(
    TagDocument({ partner, qrDataUrl, profileUrl })
  );

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="gipfelnaht-tag-${partner.slug}.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
