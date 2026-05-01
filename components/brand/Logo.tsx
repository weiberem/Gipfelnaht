import { atelier } from '@/content/atelier';
import { cn } from '@/lib/utils';

interface LogoProps {
  location?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tone?: 'default' | 'light';
}

const sizes = {
  sm: { icon: 28, wordmark: 'text-xl', location: 'text-[10px]' },
  md: { icon: 36, wordmark: 'text-2xl', location: 'text-[11px]' },
  lg: { icon: 56, wordmark: 'text-4xl md:text-5xl', location: 'text-xs md:text-sm' },
};

export function Logo({ location, size = 'md', className, tone = 'default' }: LogoProps) {
  const s = sizes[size];
  const color = tone === 'light' ? 'text-cream' : 'text-forest-dark';
  const accent = tone === 'light' ? 'text-cream/75' : 'text-stone';

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Bergzacken */}
        <path
          d="M4 38 L18 14 L26 26 L34 10 L44 38 Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
          fill="none"
          className={color}
        />
        {/* Faden, der durch den Sockel läuft */}
        <path
          d="M8 41 C 16 37, 24 45, 32 41 C 38 38, 42 41, 44 41"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          className={tone === 'light' ? 'text-night' : 'text-terracotta'}
        />
        {/* Nadelöhr */}
        <circle
          cx="44"
          cy="41"
          r="1.6"
          fill="currentColor"
          className={tone === 'light' ? 'text-night' : 'text-terracotta'}
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className={cn('font-serif font-semibold tracking-tight', s.wordmark, color)}>
          {atelier.name}
        </span>
        {location && (
          <span
            className={cn(
              'font-sans italic tracking-widest uppercase mt-1',
              s.location,
              accent
            )}
          >
            {location}
          </span>
        )}
      </span>
    </span>
  );
}
