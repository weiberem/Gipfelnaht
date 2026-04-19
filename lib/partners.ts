import { cache } from 'react';
import type { Partner, Specialty, Material, ServiceOption } from '@/types';
import { partnerSchema } from './partner-schema';

import mueller from '@/content/partners/interlaken-mueller.json';
import alpennadel from '@/content/partners/grindelwald-alpennadel.json';
import bergfaden from '@/content/partners/meiringen-bergfaden.json';

const partnerSources: unknown[] = [mueller, alpennadel, bergfaden];

/**
 * Phase 1: liest aus JSON-Dateien im Repo, validiert per Zod.
 * Phase 2: wird gegen Supabase-Queries ausgetauscht — Consumer-API bleibt gleich.
 */
function loadAll(): Partner[] {
  return partnerSources
    .map((src) => {
      const parsed = partnerSchema.safeParse(src);
      if (!parsed.success) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[partners] Validierung fehlgeschlagen:', parsed.error.flatten());
        }
        return null;
      }
      return parsed.data as Partner;
    })
    .filter((p): p is Partner => p !== null);
}

export const getAllPartners = cache(async (): Promise<Partner[]> => {
  return loadAll().filter((p) => p.active);
});

export const getPartnerBySlug = cache(async (slug: string): Promise<Partner | null> => {
  const all = loadAll();
  return all.find((p) => p.slug === slug) ?? null;
});

export const getAllPartnerSlugs = cache(async (): Promise<string[]> => {
  return loadAll().map((p) => p.slug);
});

export interface PartnerFilter {
  query?: string;
  specialties?: Specialty[];
  materials?: Material[];
  services?: ServiceOption[];
  town?: string;
  nightrepairOnly?: boolean;
  turnaroundMaxHours?: number;
  brands?: string[];
}

export async function filterPartners(f: PartnerFilter): Promise<Partner[]> {
  const all = await getAllPartners();
  return all.filter((p) => {
    if (f.query) {
      const q = f.query.toLowerCase();
      const hay = [
        p.businessName,
        p.shortBio,
        p.location.town,
        p.location.postalCode,
        ...p.location.servedAreas,
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.specialties?.length) {
      if (!f.specialties.some((s) => p.specialties.includes(s))) return false;
    }
    if (f.materials?.length) {
      if (!f.materials.some((m) => p.materials.includes(m))) return false;
    }
    if (f.services?.length) {
      const serviceMap: Record<ServiceOption, boolean> = {
        sammelbox: p.services.sammelbox.available,
        'personal-dropoff': p.services.personalDropoff.available,
        pickup: p.services.pickup.available,
        nightrepair: p.services.nightrepair.available,
      };
      if (!f.services.every((s) => serviceMap[s])) return false;
    }
    if (f.nightrepairOnly && !p.services.nightrepair.available) return false;
    if (f.town) {
      const t = f.town.toLowerCase();
      const matches =
        p.location.town.toLowerCase().includes(t) ||
        p.location.servedAreas.some((a) => a.toLowerCase().includes(t)) ||
        p.location.postalCode.startsWith(t);
      if (!matches) return false;
    }
    if (f.brands?.length) {
      if (!f.brands.some((b) => p.brandExperience.some((pb) => pb.toLowerCase().includes(b.toLowerCase()))))
        return false;
    }
    return true;
  });
}

export async function getFeaturedPartners(n = 3): Promise<Partner[]> {
  const all = await getAllPartners();
  return all.slice(0, n);
}

export async function getNightrepairPartners(): Promise<Partner[]> {
  const all = await getAllPartners();
  return all.filter((p) => p.services.nightrepair.available);
}
