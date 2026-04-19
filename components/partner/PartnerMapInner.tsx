'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';
import { useMemo } from 'react';
import type { Partner } from '@/types';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.divIcon({
  className: 'gipfelnaht-marker',
  html: `<div style="width:28px;height:36px;position:relative;">
    <svg viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg" width="28" height="36">
      <path d="M14 0C6.3 0 0 6.3 0 14c0 9.5 14 22 14 22s14-12.5 14-22C28 6.3 21.7 0 14 0z" fill="#1F3A2E"/>
      <circle cx="14" cy="14" r="5" fill="#F5F1EA"/>
    </svg>
  </div>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -30],
});

const nightIcon = L.divIcon({
  className: 'gipfelnaht-marker-night',
  html: `<div style="width:32px;height:40px;position:relative;">
    <svg viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" width="32" height="40">
      <path d="M16 0C7.2 0 0 7.2 0 16c0 10.8 16 24 16 24s16-13.2 16-24C32 7.2 24.8 0 16 0z" fill="#1F3A2E" stroke="#D4B16A" stroke-width="2.5"/>
      <circle cx="16" cy="15" r="5.5" fill="#D4B16A"/>
    </svg>
  </div>`,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -34],
});

interface Props {
  partners: Partner[];
  highlightedSlug?: string | null;
  onMarkerClick?: (slug: string) => void;
}

export function PartnerMapInner({ partners, onMarkerClick }: Props) {
  const center = useMemo<[number, number]>(() => {
    if (partners.length === 0) return [46.7, 8.0];
    const avgLat = partners.reduce((s, p) => s + p.location.coordinates.lat, 0) / partners.length;
    const avgLng = partners.reduce((s, p) => s + p.location.coordinates.lng, 0) / partners.length;
    return [avgLat, avgLng];
  }, [partners]);

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {partners.map((p) => (
        <Marker
          key={p.slug}
          position={[p.location.coordinates.lat, p.location.coordinates.lng]}
          icon={p.services.nightrepair.available ? nightIcon : defaultIcon}
          eventHandlers={{
            click: () => onMarkerClick?.(p.slug),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <div className="font-serif text-base font-semibold text-forest-dark">
                {p.businessName}
              </div>
              <div className="mt-0.5 text-xs text-stone">
                {p.location.town} · {p.capacity.typicalTurnaround}
              </div>
              {p.services.nightrepair.available && (
                <div className="mt-1 text-xs" style={{ color: '#8b6d2e' }}>
                  ● Nightrepair verfügbar
                </div>
              )}
              <Link
                href={`/partner/${p.slug}`}
                className="mt-2 block text-sm font-medium text-forest underline"
              >
                Profil öffnen →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
