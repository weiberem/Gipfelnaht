export type Specialty =
  | 'daunenjacke'
  | 'hardshell'
  | 'softshell'
  | 'fleece'
  | 'isolation'
  | 'regenbekleidung'
  | 'skijacke'
  | 'alpinjacke'
  | 'hose'
  | 'skihose'
  | 'kletterhose'
  | 'rucksack'
  | 'zelt'
  | 'schlafsack'
  | 'paragliding'
  | 'leder'
  | 'vintage'
  | 'tierausruestung';

export type Material =
  | 'gore-tex'
  | 'event'
  | 'pertex'
  | 'dermizax'
  | 'daune'
  | 'primaloft'
  | 'fleece'
  | 'dyneema'
  | 'cordura'
  | 'stretch'
  | 'softshell-material'
  | 'leder'
  | 'nahtband'
  | 'paragliding-stoff';

export type RepairType =
  | 'riss'
  | 'riss-mit-flicken'
  | 'reissverschluss-komplett'
  | 'reissverschluss-schieber'
  | 'naht'
  | 'gurt'
  | 'gummizug'
  | 'kordelstopper'
  | 'klett'
  | 'druckknopf'
  | 'schnalle'
  | 'patch'
  | 'nahtabdichtung'
  | 'daunen-neueinfuellen'
  | 'kuerzen-verlaengern'
  | 'groessenaenderung';

export type ServiceOption =
  | 'sammelbox'
  | 'personal-dropoff'
  | 'pickup'
  | 'nightrepair';

export interface PricingItem {
  type: RepairType;
  label: string;
  priceFrom: number;
  priceTo?: number;
  note?: string;
}

export interface PartnerLocation {
  town: string;
  region: string;
  canton: string;
  postalCode: string;
  address: string;
  coordinates: { lat: number; lng: number };
  servedAreas: string[];
}

export interface PartnerContact {
  email: string;
  phone?: string;
  whatsapp?: string;
}

export interface PartnerServices {
  sammelbox: {
    available: boolean;
    address?: string;
    accessHours?: string;
  };
  personalDropoff: {
    available: boolean;
    hours?: string;
  };
  pickup: {
    available: boolean;
    minOrderValue?: number;
    radius?: string;
    areas?: string[];
  };
  nightrepair: {
    available: boolean;
    acceptanceDeadline?: string;
    pickupFrom?: string;
    surcharge?: number;
    excludedTypes?: RepairType[];
  };
}

export interface PartnerCapacity {
  typicalTurnaround: string;
  workingHours: string;
  onHoliday?: { from: string; to: string };
}

export interface PartnerPhotos {
  profile: string;
  workshop?: string[];
  beforeAfter?: { before: string; after: string; description: string }[];
}

export interface PartnerRatings {
  average: number;
  count: number;
  source: 'google' | 'internal';
}

export interface PartnerSustainability {
  repairsCompleted: number;
  co2Saved: number;
}

export interface Partner {
  slug: string;
  active: boolean;
  joinedDate: string;
  businessName: string;
  ownerNames: string[];
  bio: string;
  shortBio: string;
  location: PartnerLocation;
  contact: PartnerContact;
  specialties: Specialty[];
  materials: Material[];
  brandExperience: string[];
  languages: string[];
  services: PartnerServices;
  pricing: PricingItem[];
  capacity: PartnerCapacity;
  photos: PartnerPhotos;
  ratings?: PartnerRatings;
  sustainability?: PartnerSustainability;
}
