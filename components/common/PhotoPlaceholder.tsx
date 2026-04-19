import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { features } from '@/config/features';

interface Props {
  hint: string;
  aspect?: 'square' | 'video' | 'portrait' | 'banner' | 'free';
  className?: string;
  compact?: boolean;
}

const aspects = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[4/5]',
  banner: 'aspect-[21/9]',
  free: '',
};

/**
 * Platzhalter für noch nicht gelieferte Partner-Fotos.
 * Im Dev-Mode wird der Foto-Hint sichtbar eingeblendet, in Production dezenter.
 */
export function PhotoPlaceholder({ hint, aspect = 'video', className, compact }: Props) {
  const showOverlay = features.SHOW_PHOTO_PLACEHOLDER_OVERLAYS;
  return (
    <div
      role="img"
      aria-label={hint}
      className={cn('photo-placeholder rounded-lg', aspects[aspect], className)}
    >
      {!compact && (
        <ImageIcon
          className="relative z-10 text-forest-dark/25"
          size={36}
          strokeWidth={1.2}
        />
      )}
      {showOverlay && (
        <span className="photo-placeholder-note">
          FOTO BENÖTIGT: {hint}
        </span>
      )}
    </div>
  );
}
