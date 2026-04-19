import { Box, Handshake, Truck, Moon } from 'lucide-react';
import type { ServiceOption } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  service: ServiceOption;
  enabled: boolean;
  showLabel?: boolean;
  size?: number;
  className?: string;
}

const config: Record<ServiceOption, { icon: typeof Box; label: string }> = {
  sammelbox: { icon: Box, label: 'Sammelbox' },
  'personal-dropoff': { icon: Handshake, label: 'Abgabe' },
  pickup: { icon: Truck, label: 'Abholung' },
  nightrepair: { icon: Moon, label: 'Nightrepair' },
};

export function ServiceIcon({ service, enabled, showLabel = false, size = 16, className }: Props) {
  const { icon: Icon, label } = config[service];
  const isNight = service === 'nightrepair';

  return (
    <span
      title={enabled ? `${label}: verfügbar` : `${label}: nicht verfügbar`}
      className={cn(
        'inline-flex items-center gap-1.5 text-xs',
        enabled
          ? isNight
            ? 'text-forest-dark'
            : 'text-forest'
          : 'text-stone/40 line-through',
        className
      )}
    >
      <Icon
        size={size}
        strokeWidth={enabled ? 2 : 1.5}
        className={cn(isNight && enabled && 'text-night', isNight && enabled && 'fill-night/30')}
      />
      {showLabel && <span>{label}</span>}
    </span>
  );
}
