import type { PricingItem } from '@/types';
import { formatPriceRange } from '@/lib/utils';

interface Props {
  items: PricingItem[];
  compact?: boolean;
}

export function PricingTable({ items, compact = false }: Props) {
  if (items.length === 0) {
    return <p className="text-sm text-stone">Keine Preisangaben verfügbar.</p>;
  }
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-cream-warm text-left text-xs uppercase tracking-wider text-stone">
          <tr>
            <th className="px-4 py-2.5 font-medium">Leistung</th>
            <th className="px-4 py-2.5 text-right font-medium">Preis</th>
            {!compact && <th className="hidden px-4 py-2.5 font-medium md:table-cell">Hinweis</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {items.map((item, i) => (
            <tr key={i}>
              <td className="px-4 py-3 font-medium text-forest">{item.label}</td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-forest-dark">
                {formatPriceRange(item.priceFrom, item.priceTo)}
              </td>
              {!compact && (
                <td className="hidden px-4 py-3 text-xs text-stone md:table-cell">
                  {item.note ?? '—'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
