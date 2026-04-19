import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  label?: string;
  surcharge?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function NightrepairBadge({ label = 'Nightrepair', surcharge, size = 'sm', className }: Props) {
  return (
    <span
      className={cn(
        'nightrepair-badge',
        size === 'md' && 'px-3 py-1.5 text-sm normal-case tracking-normal',
        className
      )}
    >
      <Moon
        size={size === 'md' ? 16 : 13}
        className="text-night"
        strokeWidth={2.2}
        fill="currentColor"
      />
      <span>{label}</span>
      {typeof surcharge === 'number' && (
        <span className="font-normal opacity-80">+CHF {surcharge}</span>
      )}
    </span>
  );
}
