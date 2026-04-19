import type { MetadataRoute } from 'next';
import { platform } from '@/config/platform';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/mein-atelier', '/kunde', '/login', '/register'],
      },
    ],
    sitemap: `${platform.siteUrl}/sitemap.xml`,
  };
}
