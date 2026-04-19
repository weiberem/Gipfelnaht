import type { MetadataRoute } from 'next';
import { getAllPartnerSlugs } from '@/lib/partners';
import { platform } from '@/config/platform';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/partner',
    '/nightrepair',
    '/angebot',
    '/nachhaltigkeit',
    '/so-funktionierts',
    '/partner-werden',
    '/ueber-uns',
    '/faq',
    '/kontakt',
    '/impressum',
    '/datenschutz',
    '/agb',
  ];
  const now = new Date();

  const partnerSlugs = await getAllPartnerSlugs();

  return [
    ...staticRoutes.map((r) => ({
      url: `${platform.siteUrl}${r}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: r === '' ? 1 : 0.7,
    })),
    ...partnerSlugs.map((slug) => ({
      url: `${platform.siteUrl}/partner/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
