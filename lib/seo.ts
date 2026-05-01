import { atelier } from '@/content/atelier';

/**
 * LocalBusiness-Schema fürs Root-Layout.
 * Für lokales SEO entscheidend: Adresse, Geo, openingHours, priceRange.
 */
export function localBusinessJsonLd() {
  const url = atelier.siteUrl;

  const opening: string[] = [];
  if (atelier.openingHours.weekdays) {
    // "Di–Fr 14:00–18:30" → "Tu-Fr 14:00-18:30"
    opening.push('Tu-Fr 14:00-18:30');
  }
  if (atelier.openingHours.saturday) {
    opening.push('Sa 09:00-13:00');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name: atelier.name,
    alternateName: atelier.legalName,
    description: atelier.shortBio,
    url,
    email: atelier.contact.email,
    telephone: atelier.contact.phone,
    image: `${url}/images/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: atelier.location.street,
      postalCode: atelier.location.postalCode,
      addressLocality: atelier.location.town,
      addressRegion: atelier.location.canton,
      addressCountry: 'CH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: atelier.location.coordinates.lat,
      longitude: atelier.location.coordinates.lng,
    },
    openingHours: opening,
    priceRange: 'CHF',
    areaServed: atelier.location.servedAreas.map((name) => ({
      '@type': 'City',
      name,
    })),
    knowsAbout: ['Outdoor-Reparatur', 'Daunenjacke', 'Hardshell', 'Rucksack', 'Zelt'],
    sameAs: [atelier.contact.instagram].filter(Boolean),
  };
}

/** Hilfsfunktion: Title-Builder, der Atelier-Namen an den Seitentitel hängt. */
export function pageTitle(title: string): string {
  return `${title} · ${atelier.name}`;
}
