'use client';

import { Search, Sparkles, X } from 'lucide-react';
import type { Specialty, ServiceOption } from '@/types';
import { specialtyGroups, specialtyLabels, serviceLabels } from '@/lib/taxonomy';
import { cn } from '@/lib/utils';

export interface FilterState {
  query: string;
  town: string;
  specialties: Specialty[];
  services: ServiceOption[];
  nightrepairOnly: boolean;
}

export const emptyFilter: FilterState = {
  query: '',
  town: '',
  specialties: [],
  services: [],
  nightrepairOnly: false,
};

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  resultCount: number;
}

export function PartnerFilterPanel({ value, onChange, onReset, resultCount }: Props) {
  const toggleSpecialty = (s: Specialty) => {
    onChange({
      ...value,
      specialties: value.specialties.includes(s)
        ? value.specialties.filter((x) => x !== s)
        : [...value.specialties, s],
    });
  };

  const toggleService = (s: ServiceOption) => {
    onChange({
      ...value,
      services: value.services.includes(s)
        ? value.services.filter((x) => x !== s)
        : [...value.services, s],
    });
  };

  const activeCount =
    value.specialties.length +
    value.services.length +
    (value.nightrepairOnly ? 1 : 0) +
    (value.query ? 1 : 0) +
    (value.town ? 1 : 0);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-forest-dark">Filter</h2>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs text-stone hover:text-forest"
            >
              <X size={12} /> Zurücksetzen ({activeCount})
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-stone">{resultCount} Partner</p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium uppercase tracking-wider text-stone">
          Suche
        </label>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone"
          />
          <input
            type="text"
            placeholder="Name, Ort"
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            className="w-full rounded-md border border-border bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-stone/60 focus:border-lake focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium uppercase tracking-wider text-stone">
          Ort / PLZ
        </label>
        <input
          type="text"
          placeholder="z.B. Interlaken, 3800"
          value={value.town}
          onChange={(e) => onChange({ ...value, town: e.target.value })}
          className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm placeholder:text-stone/60 focus:border-lake focus:outline-none"
        />
      </div>

      <div className="rounded-lg border border-night/50 bg-[color-mix(in_srgb,_var(--color-night)_10%,_white)] p-3">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={value.nightrepairOnly}
            onChange={(e) => onChange({ ...value, nightrepairOnly: e.target.checked })}
            className="mt-0.5 h-4 w-4 accent-forest"
          />
          <span className="flex-1">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-forest-dark">
              <Sparkles size={14} className="text-night" />
              Nur Nightrepair
            </span>
            <span className="mt-0.5 block text-xs text-stone">
              Bis 18:30 bringen, ab 07:00 abholen.
            </span>
          </span>
        </label>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-medium uppercase tracking-wider text-stone">
          Services
        </label>
        {(['sammelbox', 'personal-dropoff', 'pickup'] as ServiceOption[]).map((s) => (
          <label key={s} className="flex cursor-pointer items-center gap-2 text-sm text-forest">
            <input
              type="checkbox"
              checked={value.services.includes(s)}
              onChange={() => toggleService(s)}
              className="h-4 w-4 accent-forest"
            />
            {serviceLabels[s]}
          </label>
        ))}
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-medium uppercase tracking-wider text-stone">
          Spezialisierungen
        </label>
        {specialtyGroups.map((group) => (
          <div key={group.label}>
            <h4 className="text-xs font-medium text-forest-dark">{group.label}</h4>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {group.items.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSpecialty(s)}
                  className={cn(
                    'rounded-md border px-2.5 py-1 text-xs transition-colors',
                    value.specialties.includes(s)
                      ? 'border-forest bg-forest text-cream'
                      : 'border-border bg-white text-forest hover:bg-cream-warm'
                  )}
                >
                  {specialtyLabels[s]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
