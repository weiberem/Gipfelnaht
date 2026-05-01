'use client';

import { useEffect, useRef } from 'react';
import { atelier } from '@/content/atelier';

/**
 * Schlanke Leaflet-Karte ohne react-leaflet, um Bundle-Größe und SSR-
 * Probleme zu vermeiden. Lädt Leaflet dynamisch im Client.
 */
export function AtelierMap() {
  const ref = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current || !ref.current) return;
    initialised.current = true;

    let cleanup: (() => void) | undefined;

    (async () => {
      const L = (await import('leaflet')).default;
      // Leaflet CSS erst dann laden, wenn die Karte tatsächlich gebraucht wird.
      if (!document.querySelector('link[data-leaflet]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        link.dataset.leaflet = 'true';
        document.head.appendChild(link);
      }

      const { lat, lng } = atelier.location.coordinates;

      const map = L.map(ref.current!, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      }).setView([lat, lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      }).addTo(map);

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:28px;height:28px;border-radius:50% 50% 50% 0;
          background:#B8694A;border:3px solid #F5F1EA;
          box-shadow:0 2px 6px rgba(13,31,26,0.25);
          transform:rotate(-45deg);
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(
          `<strong>${atelier.name}</strong><br>${atelier.location.address}`
        );

      cleanup = () => map.remove();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={ref}
      className="h-[320px] w-full overflow-hidden rounded-lg border border-border bg-cream-warm"
      role="img"
      aria-label={`Karte: ${atelier.location.address}`}
    />
  );
}
