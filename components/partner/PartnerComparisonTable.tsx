'use client';

import Link from 'next/link';
import { Check, Minus } from 'lucide-react';
import type { Partner } from '@/types';
import { specialtyLabels } from '@/lib/taxonomy';
import { formatPriceRange } from '@/lib/utils';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';

interface Props {
  partners: Partner[];
}

export function PartnerComparisonTable({ partners }: Props) {
  if (partners.length === 0) {
    return <p className="text-sm text-stone">Keine Partner zum Vergleich ausgewählt.</p>;
  }

  const rows: { label: string; render: (p: Partner) => React.ReactNode }[] = [
    { label: 'Ort', render: (p) => `${p.location.town}, ${p.location.canton}` },
    {
      label: 'Turnaround',
      render: (p) => p.capacity.typicalTurnaround,
    },
    {
      label: 'Nightrepair',
      render: (p) =>
        p.services.nightrepair.available ? (
          <NightrepairBadge surcharge={p.services.nightrepair.surcharge} />
        ) : (
          <span className="inline-flex items-center gap-1 text-stone">
            <Minus size={14} /> nicht verfügbar
          </span>
        ),
    },
    {
      label: 'Sammelbox',
      render: (p) => (p.services.sammelbox.available ? <Check size={16} className="text-forest" /> : <Minus size={14} className="text-stone" />),
    },
    {
      label: 'Abholung',
      render: (p) =>
        p.services.pickup.available
          ? `Ab CHF ${p.services.pickup.minOrderValue ?? 0} · ${p.services.pickup.radius ?? ''}`
          : '—',
    },
    {
      label: 'Sprachen',
      render: (p) => p.languages.join(', '),
    },
    {
      label: 'Spezialisierungen',
      render: (p) => (
        <ul className="space-y-0.5 text-xs">
          {p.specialties.slice(0, 5).map((s) => (
            <li key={s}>{specialtyLabels[s]}</li>
          ))}
          {p.specialties.length > 5 && <li className="text-stone">+ {p.specialties.length - 5} weitere</li>}
        </ul>
      ),
    },
    {
      label: 'Marken-Erfahrung',
      render: (p) => p.brandExperience.slice(0, 4).join(', ') + (p.brandExperience.length > 4 ? ' …' : ''),
    },
    {
      label: 'Beispielpreis: Reissverschluss-Schieber',
      render: (p) => {
        const item = p.pricing.find((x) => x.type === 'reissverschluss-schieber');
        return item ? formatPriceRange(item.priceFrom, item.priceTo) : '—';
      },
    },
    {
      label: 'Beispielpreis: Naht',
      render: (p) => {
        const item = p.pricing.find((x) => x.type === 'naht');
        return item ? formatPriceRange(item.priceFrom, item.priceTo) : '—';
      },
    },
    {
      label: 'Bewertung',
      render: (p) =>
        p.ratings ? `${p.ratings.average.toFixed(1)} ★ (${p.ratings.count})` : '—',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="px-3 py-3 text-left font-medium text-stone" />
            {partners.map((p) => (
              <th
                key={p.slug}
                className="px-3 py-3 text-left align-top"
                style={{ width: `${80 / partners.length}%` }}
              >
                <div className="font-serif text-base text-forest-dark">{p.businessName}</div>
                <div className="text-xs text-stone">{p.location.town}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-border/60">
              <th className="w-40 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone">
                {r.label}
              </th>
              {partners.map((p) => (
                <td key={p.slug} className="px-3 py-3 align-top text-forest">
                  {r.render(p)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th />
            {partners.map((p) => (
              <td key={p.slug} className="px-3 pt-4">
                <Link
                  href={`/partner/${p.slug}`}
                  className="btn-primary block text-center text-sm"
                >
                  Anfrage an {p.businessName.split(' ')[0]}
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
