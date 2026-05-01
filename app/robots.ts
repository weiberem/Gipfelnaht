import type { MetadataRoute } from 'next';
import { atelier } from '@/content/atelier';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${atelier.siteUrl}/sitemap.xml`,
  };
}
