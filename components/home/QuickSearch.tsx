'use client';

import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { specialtyGroups, specialtyLabels } from '@/lib/taxonomy';
import type { Specialty } from '@/types';

export function QuickSearch() {
  const router = useRouter();
  const [town, setTown] = useState('');
  const [specialty, setSpecialty] = useState<Specialty | ''>('');
  const [night, setNight] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (town) params.set('town', town);
    if (specialty) params.set('specialty', specialty);
    if (night) params.set('nightrepair', '1');
    router.push(`/partner${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-xl border border-border bg-white p-4 shadow-card md:grid-cols-[1.2fr_1.4fr_auto_auto] md:items-center"
    >
      <label className="relative">
        <span className="sr-only">Ort oder PLZ</span>
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
        <input
          type="text"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          placeholder="Ort oder PLZ (z.B. Interlaken)"
          className="w-full rounded-md border border-border bg-cream/60 py-3 pl-9 pr-3 text-sm focus:bg-white focus:outline-none"
        />
      </label>

      <label>
        <span className="sr-only">Was reparieren?</span>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value as Specialty | '')}
          className="w-full rounded-md border border-border bg-cream/60 px-3 py-3 text-sm focus:bg-white focus:outline-none"
        >
          <option value="">Was möchtest du reparieren?</option>
          {specialtyGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.items.map((s) => (
                <option key={s} value={s}>
                  {specialtyLabels[s]}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 rounded-md border border-border bg-cream/60 px-3 py-3 text-sm">
        <input
          type="checkbox"
          checked={night}
          onChange={(e) => setNight(e.target.checked)}
          className="accent-forest"
        />
        <Sparkles size={14} className="text-night" />
        <span>Nur Nightrepair</span>
      </label>

      <button type="submit" className="btn-terracotta md:h-[50px]">
        Jetzt finden
      </button>
    </form>
  );
}
