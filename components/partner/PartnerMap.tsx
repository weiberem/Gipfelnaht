'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import type { Partner } from '@/types';

const MapInner = dynamic(() => import('./PartnerMapInner').then((m) => m.PartnerMapInner), {
  ssr: false,
  loading: () => (
    <div className="photo-placeholder h-full w-full rounded-lg">
      <span className="relative text-sm text-stone">Karte wird geladen …</span>
    </div>
  ),
});

interface Props {
  partners: Partner[];
  highlightedSlug?: string | null;
  onMarkerClick?: (slug: string) => void;
  className?: string;
}

export function PartnerMap(props: Props) {
  const safePartners = useMemo(() => props.partners, [props.partners]);
  return (
    <div className={props.className ?? 'h-[560px] w-full overflow-hidden rounded-lg border border-border'}>
      <MapInner {...props} partners={safePartners} />
    </div>
  );
}
