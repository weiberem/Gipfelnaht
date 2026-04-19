import type { Specialty, Material } from '@/types';
import { specialtyLabels, materialLabels } from '@/lib/taxonomy';
import { cn } from '@/lib/utils';

interface Props {
  kind?: 'specialty' | 'material' | 'text';
  value: Specialty | Material | string;
  filled?: boolean;
  className?: string;
}

export function SpecialtyChip({ kind = 'specialty', value, filled, className }: Props) {
  const label =
    kind === 'specialty'
      ? specialtyLabels[value as Specialty] ?? value
      : kind === 'material'
        ? materialLabels[value as Material] ?? value
        : value;

  return <span className={cn(filled ? 'chip-filled' : 'chip', className)}>{label}</span>;
}
