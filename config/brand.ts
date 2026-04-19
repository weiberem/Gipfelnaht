export const brand = {
  name: 'Gipfelnaht',
  tagline: 'Deine Ausrüstung. Heute gebracht, morgen getragen.',
  domain: 'gipfelnaht.ch',
  colors: {
    cream: '#F5F1EA',
    creamWarm: '#EDE6D8',
    forest: '#1F3A2E',
    forestDark: '#0D1F1A',
    terracotta: '#B8694A',
    lake: '#2E5F7A',
    night: '#D4B16A',
    stone: '#6B6B6B',
    border: '#D8D2C4',
  },
  fonts: {
    serif: 'Fraunces',
    sans: 'Inter',
  },
  logo: {
    path: '/images/logo.svg',
    alt: 'Gipfelnaht — Reparaturen für Bergsport-Ausrüstung',
  },
} as const;

export type Brand = typeof brand;
