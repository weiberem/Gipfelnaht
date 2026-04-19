'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, Map as MapIcon, List, Scale } from 'lucide-react';
import type { Partner } from '@/types';
import { PartnerCard } from './PartnerCard';
import { PartnerMap } from './PartnerMap';
import {
  PartnerFilterPanel,
  emptyFilter,
  type FilterState,
} from './PartnerFilterPanel';
import { PartnerComparisonTable } from './PartnerComparisonTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';

interface Props {
  partners: Partner[];
  initialNightrepairOnly?: boolean;
}

function filterPartners(all: Partner[], f: FilterState): Partner[] {
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
    if (f.town) {
      const t = f.town.toLowerCase();
      const matches =
        p.location.town.toLowerCase().includes(t) ||
        p.location.servedAreas.some((a) => a.toLowerCase().includes(t)) ||
        p.location.postalCode.startsWith(t);
      if (!matches) return false;
    }
    if (f.specialties.length && !f.specialties.some((s) => p.specialties.includes(s))) return false;
    if (f.services.length) {
      const enabled = {
        sammelbox: p.services.sammelbox.available,
        'personal-dropoff': p.services.personalDropoff.available,
        pickup: p.services.pickup.available,
        nightrepair: p.services.nightrepair.available,
      };
      if (!f.services.every((s) => enabled[s])) return false;
    }
    if (f.nightrepairOnly && !p.services.nightrepair.available) return false;
    return true;
  });
}

export function PartnerExplorer({ partners, initialNightrepairOnly = false }: Props) {
  const [filter, setFilter] = useState<FilterState>({
    ...emptyFilter,
    nightrepairOnly: initialNightrepairOnly,
  });
  const [compare, setCompare] = useState<string[]>([]);
  const [tab, setTab] = useState<'list' | 'map'>('list');
  const [highlight, setHighlight] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const results = useMemo(() => filterPartners(partners, filter), [partners, filter]);

  const toggleCompare = (slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  };

  const comparePartners = partners.filter((p) => compare.includes(p.slug));

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-forest-dark md:text-5xl">Partner finden</h1>
          <p className="mt-2 max-w-xl text-stone">
            {partners.length} Näh-Spezialist:innen in den Schweizer Alpen. Filtere nach Spezialisierung, Service oder Ort.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="btn-ghost lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filter
          </button>
          <div className="inline-flex rounded-md border border-border bg-white p-0.5 md:hidden">
            {(
              [
                { k: 'list', icon: List, label: 'Liste' },
                { k: 'map', icon: MapIcon, label: 'Karte' },
              ] as const
            ).map(({ k, icon: Icon, label }) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs',
                  tab === k ? 'bg-forest text-cream' : 'text-forest'
                )}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr_420px]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <PartnerFilterPanel
              value={filter}
              onChange={setFilter}
              onReset={() => setFilter(emptyFilter)}
              resultCount={results.length}
            />
          </div>
        </aside>

        <section className={cn('space-y-5', tab === 'map' && 'hidden md:block')}>
          {results.length === 0 ? (
            <div className="card-warm p-8 text-center">
              <p className="text-sm text-stone">Keine Partner gefunden. Versuche andere Filter.</p>
              <button
                type="button"
                onClick={() => setFilter(emptyFilter)}
                className="mt-3 text-sm text-forest underline"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            results.map((p) => (
              <div
                key={p.slug}
                onMouseEnter={() => setHighlight(p.slug)}
                onMouseLeave={() => setHighlight(null)}
              >
                <PartnerCard
                  partner={p}
                  compareToggle={{
                    checked: compare.includes(p.slug),
                    onToggle: toggleCompare,
                    disabled: !compare.includes(p.slug) && compare.length >= 3,
                  }}
                />
              </div>
            ))
          )}
        </section>

        <aside className={cn('lg:sticky lg:top-24 lg:self-start', tab === 'list' && 'hidden md:block')}>
          <PartnerMap
            partners={results}
            highlightedSlug={highlight}
            onMarkerClick={(slug) => setHighlight(slug)}
            className="h-[480px] md:h-[640px] w-full overflow-hidden rounded-lg border border-border"
          />
        </aside>
      </div>

      {/* Mobile filter drawer */}
      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter</DialogTitle>
          </DialogHeader>
          <PartnerFilterPanel
            value={filter}
            onChange={setFilter}
            onReset={() => setFilter(emptyFilter)}
            resultCount={results.length}
          />
          <button
            type="button"
            className="btn-primary mt-4 w-full"
            onClick={() => setMobileFiltersOpen(false)}
          >
            {results.length} Partner anzeigen
          </button>
        </DialogContent>
      </Dialog>

      {/* Sticky comparison bar */}
      {compare.length > 0 && (
        <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
          <Dialog>
            <div className="flex items-center gap-4 rounded-full border border-border bg-white px-4 py-2.5 shadow-hover">
              <Scale size={16} className="text-forest" />
              <span className="text-sm font-medium text-forest-dark">
                {compare.length} Partner ausgewählt
              </span>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="rounded-full bg-forest px-4 py-1.5 text-xs font-medium text-cream"
                  disabled={compare.length < 2}
                >
                  Vergleichen
                </button>
              </DialogTrigger>
              <button
                type="button"
                className="text-xs text-stone hover:text-forest"
                onClick={() => setCompare([])}
              >
                zurücksetzen
              </button>
            </div>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Partner-Vergleich</DialogTitle>
              </DialogHeader>
              <PartnerComparisonTable partners={comparePartners} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
