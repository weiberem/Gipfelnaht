import { z } from 'zod';

const specialtyEnum = z.enum([
  'daunenjacke', 'hardshell', 'softshell', 'fleece', 'isolation',
  'regenbekleidung', 'skijacke', 'alpinjacke', 'hose', 'skihose',
  'kletterhose', 'rucksack', 'zelt', 'schlafsack', 'paragliding',
  'leder', 'vintage', 'tierausruestung',
]);

const materialEnum = z.enum([
  'gore-tex', 'event', 'pertex', 'dermizax', 'daune', 'primaloft',
  'fleece', 'dyneema', 'cordura', 'stretch', 'softshell-material',
  'leder', 'nahtband', 'paragliding-stoff',
]);

const repairTypeEnum = z.enum([
  'riss', 'riss-mit-flicken', 'reissverschluss-komplett',
  'reissverschluss-schieber', 'naht', 'gurt', 'gummizug',
  'kordelstopper', 'klett', 'druckknopf', 'schnalle', 'patch',
  'nahtabdichtung', 'daunen-neueinfuellen', 'kuerzen-verlaengern',
  'groessenaenderung',
]);

export const partnerSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug: nur Kleinbuchstaben, Ziffern, Bindestriche'),
  active: z.boolean(),
  joinedDate: z.string(),
  businessName: z.string().min(2),
  ownerNames: z.array(z.string()).min(1),
  bio: z.string().min(50),
  shortBio: z.string().min(10).max(160),
  location: z.object({
    town: z.string(),
    region: z.string(),
    canton: z.string().length(2),
    postalCode: z.string(),
    address: z.string(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }),
    servedAreas: z.array(z.string()),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
  }),
  specialties: z.array(specialtyEnum).min(1),
  materials: z.array(materialEnum),
  brandExperience: z.array(z.string()),
  languages: z.array(z.string()),
  services: z.object({
    sammelbox: z.object({
      available: z.boolean(),
      address: z.string().optional(),
      accessHours: z.string().optional(),
    }),
    personalDropoff: z.object({
      available: z.boolean(),
      hours: z.string().optional(),
    }),
    pickup: z.object({
      available: z.boolean(),
      minOrderValue: z.number().optional(),
      radius: z.string().optional(),
      areas: z.array(z.string()).optional(),
    }),
    nightrepair: z.object({
      available: z.boolean(),
      acceptanceDeadline: z.string().optional(),
      pickupFrom: z.string().optional(),
      surcharge: z.number().optional(),
      excludedTypes: z.array(repairTypeEnum).optional(),
    }),
  }),
  pricing: z.array(
    z.object({
      type: repairTypeEnum,
      label: z.string(),
      priceFrom: z.number(),
      priceTo: z.number().optional(),
      note: z.string().optional(),
    })
  ),
  capacity: z.object({
    typicalTurnaround: z.string(),
    workingHours: z.string(),
    onHoliday: z.object({ from: z.string(), to: z.string() }).optional(),
  }),
  photos: z.object({
    profile: z.string(),
    workshop: z.array(z.string()).optional(),
    beforeAfter: z
      .array(
        z.object({
          before: z.string(),
          after: z.string(),
          description: z.string(),
        })
      )
      .optional(),
  }),
  ratings: z
    .object({
      average: z.number().min(0).max(5),
      count: z.number().int().nonnegative(),
      source: z.enum(['google', 'internal']),
    })
    .optional(),
  sustainability: z
    .object({
      repairsCompleted: z.number().int().nonnegative(),
      co2Saved: z.number().nonnegative(),
    })
    .optional(),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
