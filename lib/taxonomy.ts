import type { Specialty, Material, RepairType, ServiceOption } from '@/types';

export const specialtyLabels: Record<Specialty, string> = {
  daunenjacke: 'Daunenjacke',
  hardshell: 'Hardshell',
  softshell: 'Softshell',
  fleece: 'Fleece',
  isolation: 'Isolationsjacke',
  regenbekleidung: 'Regenbekleidung',
  skijacke: 'Skijacke',
  alpinjacke: 'Alpinjacke',
  hose: 'Hose',
  skihose: 'Skihose',
  kletterhose: 'Kletterhose',
  rucksack: 'Rucksack',
  zelt: 'Zelt',
  schlafsack: 'Schlafsack',
  paragliding: 'Paragliding-Ausrüstung',
  leder: 'Leder',
  vintage: 'Vintage / Klassik',
  tierausruestung: 'Tierausrüstung',
};

export const specialtyGroups: { label: string; items: Specialty[] }[] = [
  {
    label: 'Jacken',
    items: ['daunenjacke', 'hardshell', 'softshell', 'fleece', 'isolation', 'skijacke', 'alpinjacke', 'regenbekleidung'],
  },
  { label: 'Hosen', items: ['hose', 'skihose', 'kletterhose'] },
  { label: 'Ausrüstung', items: ['rucksack', 'zelt', 'schlafsack'] },
  { label: 'Spezialbereiche', items: ['paragliding', 'leder', 'vintage', 'tierausruestung'] },
];

export const materialLabels: Record<Material, string> = {
  'gore-tex': 'Gore-Tex',
  event: 'eVent',
  pertex: 'Pertex',
  dermizax: 'Dermizax',
  daune: 'Daune',
  primaloft: 'PrimaLoft',
  fleece: 'Fleece',
  dyneema: 'Dyneema',
  cordura: 'Cordura',
  stretch: 'Stretch-Material',
  'softshell-material': 'Softshell-Material',
  leder: 'Leder',
  nahtband: 'Nahtband',
  'paragliding-stoff': 'Paragliding-Stoff',
};

export const repairTypeLabels: Record<RepairType, string> = {
  riss: 'Riss',
  'riss-mit-flicken': 'Riss mit Flicken',
  'reissverschluss-komplett': 'Reissverschluss komplett',
  'reissverschluss-schieber': 'Reissverschluss-Schieber',
  naht: 'Naht',
  gurt: 'Gurt',
  gummizug: 'Gummizug',
  kordelstopper: 'Kordelstopper',
  klett: 'Klett',
  druckknopf: 'Druckknopf',
  schnalle: 'Schnalle',
  patch: 'Patch',
  nahtabdichtung: 'Nahtabdichtung',
  'daunen-neueinfuellen': 'Daunen neu einfüllen',
  'kuerzen-verlaengern': 'Kürzen / Verlängern',
  'groessenaenderung': 'Grössenänderung',
};

export const serviceLabels: Record<ServiceOption, string> = {
  sammelbox: 'Sammelbox-Einwurf',
  'personal-dropoff': 'Persönliche Abgabe',
  pickup: 'Abholservice',
  nightrepair: 'Nightrepair',
};
