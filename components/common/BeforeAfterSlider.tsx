'use client';

import { useRef, useState } from 'react';
import { PhotoPlaceholder } from './PhotoPlaceholder';

interface Props {
  before: string;
  after: string;
  description: string;
}

/**
 * Einfacher Vorher/Nachher-Schieber (horizontal).
 * In Phase 1 werden statische Platzhalter gezeigt.
 */
export function BeforeAfterSlider({ before, after, description }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const rel = ((clientX - box.left) / box.width) * 100;
    setPos(Math.min(100, Math.max(0, rel)));
  };

  return (
    <figure>
      <div
        ref={ref}
        className="relative aspect-video overflow-hidden rounded-lg border border-border select-none"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        <PhotoPlaceholder hint={`Nachher: ${description}`} aspect="free" className="absolute inset-0 h-full w-full" compact />
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <PhotoPlaceholder hint={`Vorher: ${description}`} aspect="free" className="h-full w-full" compact />
        </div>
        <div
          className="absolute top-0 h-full w-0.5 bg-cream"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-md px-2.5 py-1 text-[10px] font-medium text-forest">
            ◀ ▶
          </div>
        </div>
        <label className="sr-only">
          Vorher/Nachher
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
          />
        </label>
      </div>
      <figcaption className="mt-2 text-sm text-stone">{description}</figcaption>
    </figure>
  );
}
