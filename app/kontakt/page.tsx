import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Mail, Phone, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';
import { atelier } from '@/content/atelier';
import { InquiryForm } from '@/components/contact/InquiryForm';

const AtelierMap = dynamic(
  () => import('@/components/contact/AtelierMap').then((m) => m.AtelierMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] w-full rounded-lg border border-border bg-cream-warm" />
    ),
  }
);

export const metadata: Metadata = {
  title: 'Kontakt — Anfrage stellen',
  description: `Anfrage an ${atelier.name}, ${atelier.location.address}. Antwort innerhalb 12 Stunden. Telefon ${atelier.contact.phoneDisplay}.`,
};

export default function KontaktPage() {
  return (
    <>
      <header className="section-tight container-narrow text-center">
        <p className="text-xs uppercase tracking-widest text-stone">Kontakt</p>
        <h1 className="mt-2 font-serif text-4xl text-forest-dark md:text-5xl">
          Schreib mir kurz.
        </h1>
        <p className="mt-4 text-lg text-stone">
          Antwort innerhalb 12 Stunden — meist deutlich schneller. Du redest direkt mit mir,
          nicht mit einem Callcenter.
        </p>
      </header>

      <section className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* Form */}
          <div className="card p-6 md:p-8">
            <h2 className="font-serif text-2xl text-forest-dark">Anfrageformular</h2>
            <p className="mt-1 text-sm text-stone">
              Pflichtfelder sind so markiert. Den Rest fülle ich gern im Gespräch nach.
            </p>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>

          {/* Sidebar mit Adresse + Karte */}
          <aside className="space-y-5">
            <div className="card p-6">
              <h2 className="font-serif text-xl text-forest-dark">Werkstatt</h2>
              <ul className="mt-4 space-y-3 text-sm text-forest">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-terracotta" />
                  <span>
                    {atelier.location.street}
                    <br />
                    {atelier.location.postalCode} {atelier.location.town}, {atelier.location.canton}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 shrink-0 text-terracotta" />
                  <a href={`tel:${atelier.contact.phone}`} className="hover:underline">
                    {atelier.contact.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle size={16} className="mt-0.5 shrink-0 text-terracotta" />
                  <a
                    href={atelier.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    WhatsApp · {atelier.contact.whatsapp}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={16} className="mt-0.5 shrink-0 text-terracotta" />
                  <a href={`mailto:${atelier.contact.email}`} className="hover:underline">
                    {atelier.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Navigation size={16} className="mt-0.5 shrink-0 text-terracotta" />
                  <a
                    href={atelier.location.routeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Route auf OpenStreetMap
                  </a>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <h2 className="font-serif text-xl text-forest-dark inline-flex items-center gap-2">
                <Clock size={18} className="text-terracotta" />
                Öffnungszeiten
              </h2>
              <dl className="mt-4 space-y-1.5 text-sm">
                {atelier.openingHours.weekdays && (
                  <Row label="Werktags" value={atelier.openingHours.weekdays} />
                )}
                {atelier.openingHours.saturday && (
                  <Row label="Samstag" value={atelier.openingHours.saturday} />
                )}
                {atelier.openingHours.sunday && (
                  <Row label="Sonntag" value={atelier.openingHours.sunday} />
                )}
              </dl>
              {atelier.openingHours.note && (
                <p className="mt-3 text-xs text-stone">{atelier.openingHours.note}</p>
              )}
              {atelier.services.sammelbox.available && (
                <p className="mt-3 text-xs text-stone">
                  Sammelbox: {atelier.services.sammelbox.accessHours} —{' '}
                  {atelier.services.sammelbox.location}
                </p>
              )}
            </div>

            <AtelierMap />
          </aside>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-stone">{label}</dt>
      <dd className="text-forest">{value}</dd>
    </div>
  );
}
