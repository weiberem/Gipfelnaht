export const platform = {
  legalName: 'Gipfelnaht — Einzelunternehmen',
  owner: {
    name: 'Remy Betreiber', // TODO: Echten Namen des Plattform-Betreibers eintragen
    address: 'Musterstrasse 1',
    postalCode: '3800',
    town: 'Interlaken',
    canton: 'BE',
    country: 'Schweiz',
  },
  contact: {
    email: process.env.EMAIL_PLATFORM ?? 'hallo@gipfelnaht.ch',
    phone: '+41 33 000 00 00', // TODO: Echte Support-Nummer eintragen
    whatsapp: '+41 79 000 00 00',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gipfelnaht.ch',
  social: {
    instagram: 'https://instagram.com/gipfelnaht',
    facebook: null,
    linkedin: null,
  },
  // Platzhalter für Nachhaltigkeits-Counter. Phase 2: aus DB aggregiert.
  impact: {
    repairsCompleted: 347,
    co2SavedKg: 8675,
    activePartners: 3,
  },
  // Partner-Onboarding-Kosten (anzeigt auf /partner-werden)
  partnerPricing: {
    onboardingFee: 490,
    monthlyFee: 49,
    contractMonths: 12,
    noticeMonths: 3,
    currency: 'CHF',
  },
} as const;

export type Platform = typeof platform;
