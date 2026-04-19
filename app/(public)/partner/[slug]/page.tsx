import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Star,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  Download,
  Box,
  Handshake,
  Truck,
  ArrowRight,
  CalendarX,
} from 'lucide-react';
import { getAllPartnerSlugs, getPartnerBySlug } from '@/lib/partners';
import { localBusinessJsonLd } from '@/lib/seo';
import { specialtyLabels, materialLabels, repairTypeLabels } from '@/lib/taxonomy';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';
import { SpecialtyChip } from '@/components/common/SpecialtyChip';
import { PricingTable } from '@/components/common/PricingTable';
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';
import { Logo } from '@/components/brand/Logo';
import { InquiryModal } from '@/components/partner/InquiryModal';
import { PartnerMap } from '@/components/partner/PartnerMap';
import { Button } from '@/components/ui/Button';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllPartnerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const partner = await getPartnerBySlug(params.slug);
  if (!partner) return {};
  return {
    title: `${partner.businessName} · ${partner.location.town}`,
    description: partner.shortBio,
    openGraph: {
      title: `${partner.businessName} — Gipfelnaht ${partner.location.town}`,
      description: partner.shortBio,
    },
  };
}

export default async function PartnerDetailPage({ params }: Props) {
  const partner = await getPartnerBySlug(params.slug);
  if (!partner) notFound();

  const onHoliday = partner.capacity.onHoliday;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(partner)) }}
      />

      <div className="container-page py-6 md:py-10">
        <Link href="/partner" className="text-sm text-stone hover:text-forest">
          ← Alle Partner
        </Link>
      </div>

      {/* HERO */}
      <section className="container-page">
        <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start">
          <div>
            <div className="overflow-hidden rounded-xl">
              <PhotoPlaceholder
                hint={`Profilfoto ${partner.businessName} — Werkstatt von innen, warmes Licht, Nähmaschine`}
                aspect="portrait"
              />
            </div>
          </div>

          <div>
            <Logo location={partner.location.town} size="md" />
            <h1 className="mt-4 font-serif text-4xl text-forest-dark md:text-5xl leading-tight">
              {partner.businessName}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-stone">
              <MapPin size={14} />
              {partner.location.address}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {partner.ratings && (
                <span className="inline-flex items-center gap-1 rounded-md bg-cream-warm px-3 py-1.5 text-sm">
                  <Star size={14} className="fill-terracotta text-terracotta" />
                  <strong className="font-semibold">{partner.ratings.average.toFixed(1)}</strong>
                  <span className="text-stone">({partner.ratings.count} Bewertungen)</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-md bg-cream-warm px-3 py-1.5 text-sm">
                <Clock size={14} /> {partner.capacity.typicalTurnaround}
              </span>
              {partner.services.nightrepair.available && (
                <NightrepairBadge
                  size="md"
                  surcharge={partner.services.nightrepair.surcharge}
                />
              )}
            </div>

            {onHoliday ? (
              <div className="mt-5 flex items-start gap-3 rounded-md border border-terracotta/40 bg-terracotta/5 p-4 text-sm">
                <CalendarX size={18} className="mt-0.5 text-terracotta shrink-0" />
                <div>
                  <p className="font-medium text-forest-dark">Ferien bis {onHoliday.to}</p>
                  <p className="text-stone">
                    Anfragen werden entgegengenommen — Bearbeitung ab {onHoliday.to}.
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-forest">
                <span className="h-2 w-2 rounded-full bg-forest" />
                Aktuell verfügbar — Antwort innerhalb 12 Stunden
              </p>
            )}

            <p className="mt-6 text-stone leading-relaxed">{partner.shortBio}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <InquiryModal
                partner={partner}
                trigger={
                  <Button variant="terracotta" size="lg">
                    Auftrag anfragen
                  </Button>
                }
              />
              {partner.contact.whatsapp && (
                <a
                  href={`https://wa.me/${partner.contact.whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              )}
              <a
                href={`/api/tag-pdf/${partner.slug}`}
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} /> PDF-Tag
              </a>
            </div>

            <dl className="mt-7 grid gap-3 text-sm">
              <div className="flex items-center gap-2 text-stone">
                <Mail size={14} />
                <a href={`mailto:${partner.contact.email}`} className="hover:text-forest">
                  {partner.contact.email}
                </a>
              </div>
              {partner.contact.phone && (
                <div className="flex items-center gap-2 text-stone">
                  <Phone size={14} />
                  <a href={`tel:${partner.contact.phone}`} className="hover:text-forest">
                    {partner.contact.phone}
                  </a>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* NIGHTREPAIR block */}
      {partner.services.nightrepair.available && (
        <section className="night-gradient mt-16 text-cream">
          <div className="container-page relative py-14 md:py-16">
            <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
              <NightrepairBadge size="md" className="bg-night/20 border-night/60 text-night" />
              <div>
                <h2 className="font-serif text-3xl text-cream md:text-4xl">
                  Nightrepair verfügbar
                </h2>
                <p className="mt-2 text-cream/80">
                  Annahme bis {partner.services.nightrepair.acceptanceDeadline} · Abholung ab {partner.services.nightrepair.pickupFrom} · Aufpreis CHF {partner.services.nightrepair.surcharge}
                </p>
                {partner.services.nightrepair.excludedTypes?.length ? (
                  <p className="mt-2 text-xs text-cream/70">
                    Nicht über Nacht: {partner.services.nightrepair.excludedTypes.map((t) => repairTypeLabels[t]).join(', ')}
                  </p>
                ) : null}
              </div>
              <Link href="/nightrepair" className="text-sm text-night underline">
                Wie Nightrepair funktioniert →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* BIO */}
      <section className="section container-page">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
          <div className="prose-gipfel">
            <h2>Über uns</h2>
            {partner.bio.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl">
            {partner.photos.workshop?.[0] ? (
              <PhotoPlaceholder
                hint={`Werkstatt ${partner.businessName} — authentisches Bild von Arbeitsplatz / Materialien`}
                aspect="portrait"
              />
            ) : null}
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="section-tight container-page">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-forest-dark">Was wir reparieren</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {partner.specialties.map((s) => (
                <SpecialtyChip key={s} value={s} filled />
              ))}
            </div>
            {partner.materials.length > 0 && (
              <>
                <h3 className="mt-8 text-sm uppercase tracking-wider text-stone">Material-Kompetenz</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {partner.materials.map((m) => (
                    <SpecialtyChip key={m} kind="material" value={m} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-forest-dark">Marken-Erfahrung</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-forest">
              {partner.brandExperience.map((b) => (
                <li key={b} className="rounded border border-border bg-white px-3 py-2">
                  {b}
                </li>
              ))}
            </ul>
            {partner.languages.length > 0 && (
              <>
                <h3 className="mt-8 text-sm uppercase tracking-wider text-stone">Sprachen</h3>
                <p className="mt-2 text-forest">{partner.languages.join(' · ')}</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-tight container-page">
        <h2 className="font-serif text-2xl md:text-3xl text-forest-dark">Preise</h2>
        <p className="mt-2 text-sm text-stone">
          Komplexere Reparaturen nach individueller Offerte — Antwort innerhalb 12h.
        </p>
        <div className="mt-6">
          <PricingTable items={partner.pricing} />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-tight container-page">
        <h2 className="font-serif text-2xl md:text-3xl text-forest-dark">Services & Standort</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <ServiceBox
            icon={Box}
            title="Sammelbox"
            enabled={partner.services.sammelbox.available}
            details={
              partner.services.sammelbox.available
                ? [
                    partner.services.sammelbox.address,
                    partner.services.sammelbox.accessHours && `Zugang: ${partner.services.sammelbox.accessHours}`,
                  ]
                : []
            }
          />
          <ServiceBox
            icon={Handshake}
            title="Persönliche Abgabe"
            enabled={partner.services.personalDropoff.available}
            details={[partner.services.personalDropoff.hours]}
          />
          <ServiceBox
            icon={Truck}
            title="Abholservice"
            enabled={partner.services.pickup.available}
            details={
              partner.services.pickup.available
                ? [
                    partner.services.pickup.minOrderValue
                      ? `Ab CHF ${partner.services.pickup.minOrderValue} Auftragswert`
                      : undefined,
                    partner.services.pickup.radius,
                    partner.services.pickup.areas?.join(', '),
                  ]
                : []
            }
          />
          <ServiceBox
            icon={MessageCircle}
            title="Nightrepair"
            enabled={partner.services.nightrepair.available}
            details={
              partner.services.nightrepair.available
                ? [
                    `Annahme bis ${partner.services.nightrepair.acceptanceDeadline}`,
                    `Abholung ab ${partner.services.nightrepair.pickupFrom}`,
                    `Aufpreis CHF ${partner.services.nightrepair.surcharge}`,
                  ]
                : []
            }
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <PartnerMap partners={[partner]} className="h-[360px] w-full" />
        </div>
      </section>

      {/* BEFORE/AFTER */}
      {partner.photos.beforeAfter && partner.photos.beforeAfter.length > 0 && (
        <section className="section-tight container-page">
          <h2 className="font-serif text-2xl md:text-3xl text-forest-dark">Vorher / Nachher</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {partner.photos.beforeAfter.map((ba, i) => (
              <BeforeAfterSlider key={i} {...ba} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section container-page">
        <div className="rounded-xl bg-cream-warm p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl text-forest-dark">
            Bereit für die Reparatur?
          </h2>
          <p className="mt-3 text-stone max-w-lg mx-auto">
            Schick {partner.ownerNames[0]} kurz eine Beschreibung des Schadens — Antwort kommt meist noch am gleichen Tag.
          </p>
          <div className="mt-6">
            <InquiryModal
              partner={partner}
              trigger={
                <Button variant="terracotta" size="lg">
                  Auftrag anfragen <ArrowRight size={16} />
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceBox({
  icon: Icon,
  title,
  enabled,
  details,
}: {
  icon: React.ElementType;
  title: string;
  enabled: boolean;
  details?: (string | false | undefined | null)[];
}) {
  const cleaned = (details ?? []).filter(Boolean) as string[];
  return (
    <div
      className={`rounded-lg border p-5 ${
        enabled ? 'border-border bg-white' : 'border-border/40 bg-cream-warm/40'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={18} className={enabled ? 'text-forest' : 'text-stone'} strokeWidth={1.6} />
        <h3 className={`font-serif text-lg ${enabled ? 'text-forest-dark' : 'text-stone'}`}>
          {title}
        </h3>
        <span className="ml-auto text-xs">
          {enabled ? (
            <span className="rounded-full bg-forest/10 px-2 py-0.5 text-forest">verfügbar</span>
          ) : (
            <span className="rounded-full bg-stone/10 px-2 py-0.5 text-stone">nicht angeboten</span>
          )}
        </span>
      </div>
      {cleaned.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-stone">
          {cleaned.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
