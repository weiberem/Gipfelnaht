import type { MetadataRoute } from 'next';
import { atelier } from '@/content/atelier';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1, freq: 'weekly' as const },
    { path: '/angebot', priority: 0.9, freq: 'monthly' as const },
    { path: '/preise', priority: 0.9, freq: 'monthly' as const },
    { path: '/so-funktionierts', priority: 0.8, freq: 'monthly' as const },
    { path: '/ueber-mich', priority: 0.7, freq: 'monthly' as const },
    { path: '/kontakt', priority: 0.9, freq: 'monthly' as const },
    { path: '/impressum', priority: 0.2, freq: 'yearly' as const },
    { path: '/datenschutz', priority: 0.2, freq: 'yearly' as const },
    { path: '/agb', priority: 0.2, freq: 'yearly' as const },
  ];
  const now = new Date();

  return routes.map((r) => ({
    url: `${atelier.siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
