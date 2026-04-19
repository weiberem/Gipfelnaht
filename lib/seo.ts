import type { Partner } from '@/types';
import { platform } from '@/config/platform';
import { brand } from '@/config/brand';

export function localBusinessJsonLd(partner: Partner) {
  const url = `${platform.siteUrl}/partner/${partner.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name: `${brand.name} ${partner.location.town} — ${partner.businessName}`,
    alternateName: partner.businessName,
    description: partner.shortBio,
    url,
    email: partner.contact.email,
    telephone: partner.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: partner.location.address.split(',')[0],
      postalCode: partner.location.postalCode,
      addressLocality: partner.location.town,
      addressRegion: partner.location.canton,
      addressCountry: 'CH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: partner.location.coordinates.lat,
      longitude: partner.location.coordinates.lng,
    },
    priceRange: 'CHF',
    areaServed: partner.location.servedAreas,
    ...(partner.ratings
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: partner.ratings.average,
            reviewCount: partner.ratings.count,
          },
        }
      : {}),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: platform.siteUrl,
    logo: `${platform.siteUrl}/images/logo.svg`,
    sameAs: Object.values(platform.social).filter(Boolean),
  };
}
