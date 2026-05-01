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

export type ProductCategory =
  | 'daunenjacke'
  | 'hardshell'
  | 'hose'
  | 'rucksack'
  | 'zelt'
  | 'schlafsack'
  | 'anderes';

export interface Inquiry {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  product: ProductCategory;
  description: string;
  preferredService: ServiceOption;
  preferredDate?: string;
  acceptPrivacy: boolean;
  createdAt: string;
}
