import type { PricingItem } from '@/types';

/**
 * Transparente Preisliste. CHF, Richtpreise.
 * Komplexere Reparaturen gehen über individuelle Offerte —
 * Antwort innerhalb 12 Stunden.
 */
export const pricing: PricingItem[] = [
  {
    type: 'riss',
    label: 'Kleiner Riss (bis 5 cm)',
    priceFrom: 25,
    priceTo: 40,
    note: 'Inkl. unauffälliger Naht, ohne Flicken',
  },
  {
    type: 'riss-mit-flicken',
    label: 'Riss mit aufgeklebtem Flicken',
    priceFrom: 30,
    priceTo: 55,
    note: 'Heisspress-Flicken in passender Farbe',
  },
  {
    type: 'reissverschluss-schieber',
    label: 'Reissverschluss-Schieber tauschen',
    priceFrom: 30,
    priceTo: 45,
    note: 'YKK-Standardschieber, andere auf Anfrage',
  },
  {
    type: 'reissverschluss-komplett',
    label: 'Reissverschluss komplett ersetzen',
    priceFrom: 75,
    priceTo: 140,
    note: 'Material je nach Länge / Hersteller',
  },
  {
    type: 'naht',
    label: 'Aufgegangene Naht (pro Stelle)',
    priceFrom: 15,
    priceTo: 30,
  },
  {
    type: 'nahtabdichtung',
    label: 'Nahtbänder erneuern (pro Meter)',
    priceFrom: 20,
    priceTo: 30,
    note: 'Heisspressen, geeignet für Gore-Tex / eVent / Pertex',
  },
  {
    type: 'gurt',
    label: 'Rucksack-Gurt ersetzen',
    priceFrom: 35,
    priceTo: 70,
  },
  {
    type: 'gummizug',
    label: 'Gummizug am Saum / Bund',
    priceFrom: 18,
    priceTo: 30,
  },
  {
    type: 'kordelstopper',
    label: 'Kordelstopper / Kordel',
    priceFrom: 8,
    priceTo: 14,
  },
  {
    type: 'klett',
    label: 'Klettverschluss erneuern',
    priceFrom: 18,
    priceTo: 35,
  },
  {
    type: 'druckknopf',
    label: 'Druckknopf setzen',
    priceFrom: 8,
    priceTo: 14,
  },
  {
    type: 'schnalle',
    label: 'Schnalle / Steckverschluss',
    priceFrom: 12,
    priceTo: 28,
  },
  {
    type: 'patch',
    label: 'Patch / Aufnäher applizieren',
    priceFrom: 12,
    priceTo: 22,
  },
  {
    type: 'daunen-neueinfuellen',
    label: 'Daunen neu einfüllen (pro Kammer)',
    priceFrom: 35,
    priceTo: 80,
    note: 'Inkl. ethisch zertifizierter Daune',
  },
  {
    type: 'kuerzen-verlaengern',
    label: 'Hose / Ärmel kürzen',
    priceFrom: 25,
    priceTo: 45,
  },
  {
    type: 'groessenaenderung',
    label: 'Grössenänderung Jacke / Hose',
    priceFrom: 60,
    priceTo: 180,
    note: 'Nach individueller Offerte',
  },
];

/** Kategorisiert nach grobem Bereich für die /preise-Seite. */
export const pricingGroups: { label: string; items: PricingItem[] }[] = [
  {
    label: 'Risse, Nähte, Membran',
    items: pricing.filter((p) =>
      ['riss', 'riss-mit-flicken', 'naht', 'nahtabdichtung', 'patch'].includes(p.type)
    ),
  },
  {
    label: 'Reissverschlüsse',
    items: pricing.filter((p) => p.type.startsWith('reissverschluss')),
  },
  {
    label: 'Gurte, Schnallen, Kleinteile',
    items: pricing.filter((p) =>
      ['gurt', 'gummizug', 'kordelstopper', 'klett', 'druckknopf', 'schnalle'].includes(p.type)
    ),
  },
  {
    label: 'Daune & Anpassungen',
    items: pricing.filter((p) =>
      ['daunen-neueinfuellen', 'kuerzen-verlaengern', 'groessenaenderung'].includes(p.type)
    ),
  },
];
