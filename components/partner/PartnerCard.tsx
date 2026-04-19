import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';
import type { Partner } from '@/types';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';
import { SpecialtyChip } from '@/components/common/SpecialtyChip';
import { ServiceIcon } from '@/components/common/ServiceIcon';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';

interface Props {
  partner: Partner;
  compareToggle?: {
    checked: boolean;
    onToggle: (slug: string) => void;
    disabled?: boolean;
  };
}

export function PartnerCard({ partner, compareToggle }: Props) {
  const visibleSpecs = partner.specialties.slice(0, 4);
  const remaining = partner.specialties.length - visibleSpecs.length;

  return (
    <article className="card flex flex-col overflow-hidden transition-shadow hover:shadow-hover">
      <Link href={`/partner/${partner.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <PhotoPlaceholder
            hint={`Profilfoto ${partner.businessName} — Werkstatt oder Porträt`}
            aspect="free"
            className="h-full w-full"
          />
          {partner.services.nightrepair.available && (
            <div className="absolute right-3 top-3">
              <NightrepairBadge
                surcharge={partner.services.nightrepair.surcharge}
                size="sm"
              />
            </div>
          )}
          {compareToggle && (
            <label
              className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-xs shadow-card cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                compareToggle.onToggle(partner.slug);
              }}
            >
              <input
                type="checkbox"
                className="accent-forest"
                checked={compareToggle.checked}
                readOnly
              />
              Vergleichen
            </label>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/partner/${partner.slug}`}>
              <h3 className="font-serif text-xl text-forest-dark leading-tight hover:text-terracotta">
                {partner.businessName}
              </h3>
            </Link>
            <p className="mt-1 flex items-center gap-1 text-xs text-stone">
              <MapPin size={12} />
              {partner.location.town} · {partner.location.region}
            </p>
          </div>
          {partner.ratings && (
            <div className="flex shrink-0 items-center gap-1 rounded-md bg-cream-warm px-2 py-1">
              <Star size={12} className="fill-terracotta text-terracotta" />
              <span className="text-sm font-medium text-forest-dark">
                {partner.ratings.average.toFixed(1)}
              </span>
              <span className="text-xs text-stone">({partner.ratings.count})</span>
            </div>
          )}
        </div>

        <p className="mt-3 text-sm text-stone line-clamp-2">{partner.shortBio}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleSpecs.map((s) => (
            <SpecialtyChip key={s} value={s} />
          ))}
          {remaining > 0 && <span className="chip text-stone">+{remaining} weitere</span>}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-stone">
          <ServiceIcon service="sammelbox" enabled={partner.services.sammelbox.available} />
          <ServiceIcon
            service="personal-dropoff"
            enabled={partner.services.personalDropoff.available}
          />
          <ServiceIcon service="pickup" enabled={partner.services.pickup.available} />
          <ServiceIcon service="nightrepair" enabled={partner.services.nightrepair.available} />
          <span className="ml-auto flex items-center gap-1 text-xs">
            <Clock size={12} />
            {partner.capacity.typicalTurnaround}
          </span>
        </div>

        <Link
          href={`/partner/${partner.slug}`}
          className="mt-4 inline-flex items-center justify-center rounded-md border border-forest py-2 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
        >
          Profil ansehen
        </Link>
      </div>
    </article>
  );
}
