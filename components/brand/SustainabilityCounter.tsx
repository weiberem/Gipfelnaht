import { platform } from '@/config/platform';

interface Props {
  compact?: boolean;
}

export function SustainabilityCounter({ compact = false }: Props) {
  const { repairsCompleted, co2SavedKg, activePartners } = platform.impact;

  const items = [
    { value: repairsCompleted.toLocaleString('de-CH'), label: 'Reparaturen abgeschlossen' },
    { value: `${co2SavedKg.toLocaleString('de-CH')} kg`, label: 'CO₂ eingespart (geschätzt)' },
    { value: activePartners.toString(), label: 'Partner im Netzwerk' },
  ];

  return (
    <dl
      className={
        compact
          ? 'grid grid-cols-3 gap-4 text-center'
          : 'grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10'
      }
    >
      {items.map((it) => (
        <div key={it.label} className={compact ? '' : 'text-center md:text-left'}>
          <dt className="order-2 mt-1 text-sm text-stone">{it.label}</dt>
          <dd className="order-1 font-serif text-3xl md:text-5xl text-forest-dark leading-none">
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
