import type { Specialty, Material, ServiceOption } from '@/types';

/**
 * Zentrale Atelier-Konfiguration.
 *
 * Alles, was sich am Atelier selbst ändert (Adresse, Öffnungszeiten,
 * Preise, Inhaberin/Inhaber, Nightrepair an/aus), wird hier gepflegt —
 * nicht in den Seiten-Komponenten. Eine Änderung hier wird durch das
 * Vercel-Deployment automatisch live geschaltet.
 */

export interface AtelierServices {
  sammelbox: { available: boolean; accessHours?: string; location?: string };
  personalDropoff: { available: boolean; hours?: string };
  pickup: { available: boolean; areas?: string[]; minOrderValue?: number };
  nightrepair: {
    available: boolean;
    acceptanceDeadline?: string;
    pickupFrom?: string;
    surcharge?: number;
  };
}

export interface PaymentMethods {
  twint: boolean;
  card: boolean;
  cash: boolean;
  invoice: boolean;
}

export interface OpeningHours {
  /** Mo–Fr Hauptzeiten, oder leer wenn nur nach Vereinbarung */
  weekdays?: string;
  saturday?: string;
  sunday?: string;
  note?: string;
}

export interface AtelierConfig {
  name: string;
  legalName: string;
  owner: string;
  shortBio: string;
  bio: string[]; // Absätze für /ueber-mich
  yearsExperience: number;
  founded: number;
  location: {
    town: string;
    region: string;
    canton: string;
    postalCode: string;
    street: string;
    address: string; // formatiert
    coordinates: { lat: number; lng: number };
    servedAreas: string[];
    routeUrl: string; // OSM-Routen-Link für "So findest du uns"
  };
  contact: {
    email: string;
    phone: string;
    phoneDisplay: string;
    whatsapp: string;
    whatsappLink: string;
    instagram?: string;
  };
  languages: string[];
  services: AtelierServices;
  payment: PaymentMethods;
  openingHours: OpeningHours;
  capacity: {
    typicalTurnaround: string; // z. B. "24–48 h"
    onHoliday: { from: string; to: string } | null;
  };
  specialties: Specialty[];
  materials: Material[];
  brandExperience: string[];
  /**
   * Was wir NICHT reparieren — Sicherheitsausrüstung gehört zum Hersteller.
   */
  excludedItems: string[];
  sustainability: {
    repairsCompleted: number;
    co2SavedKg: number;
  };
  siteUrl: string;
}

export const atelier: AtelierConfig = {
  name: 'Gipfelnaht',
  legalName: 'Gipfelnaht — Lena Wegmann',
  owner: 'Lena Wegmann',
  shortBio:
    'Näh-Atelier für Bergsport-Reparaturen in Interlaken — Daune, Hardshell, Rucksäcke, Zelte. Für Grindelwald, Lauterbrunnen und das ganze Berner Oberland.',
  bio: [
    'Ich bin Lena, gelernte Bekleidungstechnikerin, Bergsteigerin und seit fünfzehn Jahren mit der Industrienähmaschine vertraut. Nach Stationen in einer Outdoor-Manufaktur im Tessin und drei Jahren als Schneiderin bei einem Bergführerbüro in Grindelwald habe ich 2022 in Interlaken das Atelier Gipfelnaht eröffnet — dort, wo die Wege ins Lauterbrunnental und zur Eiger-Nordwand zusammenkommen.',
    'Meine erste Reparatur war eine durchgescheuerte Daunenjacke aus den Achtzigern, die mein Vater von einer Eiger-Nordwand-Tour mitgebracht hatte. Sie hängt heute wieder im Schrank — nicht im Müll. Diese eine Jacke hat mehr über mein Handwerk gesagt als jeder Kurs.',
    'In der Werkstatt arbeite ich mit drei Industriemaschinen (Pfaff Doppelsteppstich, Juki Overlock, Adler Sattler-Maschine), einer Heisspresse für Nahtbänder und einer Daunenfüllung-Apparatur. Die meisten meiner Werkzeuge sind älter als ich. Sie funktionieren immer noch — und genau das ist die Idee.',
    'Was mich an Outdoor-Stoffen begeistert: dass eine Hardshell mit der richtigen Naht ein zweites Leben bekommt. Dass Daune sich neu auffüllen lässt. Dass eine Cordura-Rucksackbahn nach drei Klettersaisons besser aussieht, als wenn sie nach der ersten weggeworfen worden wäre.',
    'Ich rede mit dir Klartext — was sich lohnt zu reparieren und was nicht. Wenn ein Stück besser zum Hersteller geht, sage ich es dir. Wenn es eine günstigere Lösung gibt als die, die du dir vorgestellt hast, auch.',
  ],
  yearsExperience: 15,
  founded: 2022,
  location: {
    town: 'Interlaken',
    region: 'Berner Oberland',
    canton: 'BE',
    postalCode: '3800',
    street: 'Höheweg 50',
    address: 'Höheweg 50, 3800 Interlaken',
    coordinates: { lat: 46.6863, lng: 7.8632 },
    servedAreas: [
      'Interlaken',
      'Grindelwald',
      'Lauterbrunnen',
      'Wengen',
      'Mürren',
      'Wilderswil',
      'Bönigen',
      'Meiringen',
    ],
    routeUrl:
      'https://www.openstreetmap.org/?mlat=46.6863&mlon=7.8632#map=16/46.6863/7.8632',
  },
  contact: {
    email: 'hallo@gipfelnaht.ch',
    phone: '+41338224567',
    phoneDisplay: '+41 33 822 45 67',
    whatsapp: '+41791234567',
    whatsappLink: 'https://wa.me/41791234567',
    instagram: 'https://instagram.com/gipfelnaht',
  },
  languages: ['Deutsch', 'Schweizerdeutsch', 'English'],
  services: {
    sammelbox: {
      available: true,
      accessHours: '24/7',
      location: 'Holzbox links neben dem Eingang Dorfstrasse 88',
    },
    personalDropoff: {
      available: true,
      hours: 'Di–Fr 14:00–18:30, Sa 09:00–13:00',
    },
    pickup: {
      available: false,
    },
    nightrepair: {
      available: true,
      acceptanceDeadline: '18:30',
      pickupFrom: '07:00',
      surcharge: 25,
    },
  },
  payment: {
    twint: true,
    card: true,
    cash: true,
    invoice: false,
  },
  openingHours: {
    weekdays: 'Di–Fr 14:00–18:30',
    saturday: 'Sa 09:00–13:00',
    sunday: 'geschlossen',
    note: 'Mo Werkstattag — keine Annahme, dafür Sammelbox 24/7. Persönliche Termine ausserhalb der Zeiten gern auf Anfrage.',
  },
  capacity: {
    typicalTurnaround: '24–48 h',
    onHoliday: null,
  },
  specialties: [
    'daunenjacke',
    'hardshell',
    'softshell',
    'fleece',
    'isolation',
    'regenbekleidung',
    'skijacke',
    'alpinjacke',
    'hose',
    'skihose',
    'kletterhose',
    'rucksack',
    'zelt',
    'schlafsack',
  ],
  materials: [
    'gore-tex',
    'event',
    'pertex',
    'dermizax',
    'daune',
    'primaloft',
    'fleece',
    'dyneema',
    'cordura',
    'stretch',
    'softshell-material',
    'nahtband',
  ],
  brandExperience: [
    'Mammut',
    "Arc'teryx",
    'Patagonia',
    'Ortovox',
    'Black Diamond',
    'Schöffel',
    'Norrøna',
    'Fjällräven',
    'Houdini',
    'Salewa',
    'Haglöfs',
    'The North Face',
  ],
  excludedItems: [
    'Klettergurte',
    'Kletterseile, Reepschnüre, Bandschlingen',
    'Karabiner und andere Metall-Sicherungsgeräte',
    'Helme (Kletter-, Ski-, Velohelme)',
    'Lawinen-Airbags und Auslösemechanismen',
    'Paragliding-Kappen und Tragegurte',
    'Steigeisen und Eispickel',
  ],
  sustainability: {
    // Manuell pflegen. Realistisch, nicht aufgeblasen.
    repairsCompleted: 612,
    co2SavedKg: 14800,
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gipfelnaht.ch',
};

/**
 * Helper: liefert nur die ServiceOptions, die das Atelier anbietet.
 * Wird von Formular und PDF benutzt, damit nicht-angebotene Optionen
 * gar nicht erst auftauchen.
 */
export function availableServices(): ServiceOption[] {
  const out: ServiceOption[] = [];
  if (atelier.services.sammelbox.available) out.push('sammelbox');
  if (atelier.services.personalDropoff.available) out.push('personal-dropoff');
  if (atelier.services.pickup.available) out.push('pickup');
  if (atelier.services.nightrepair.available) out.push('nightrepair');
  return out;
}
