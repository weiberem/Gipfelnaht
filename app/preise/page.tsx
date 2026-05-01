import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { atelier } from '@/content/atelier';
import { pricingGroups } from '@/content/pricing';
import { PricingTable } from '@/components/common/PricingTable';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';

export const metadata: Metadata = {
  title: 'Preise — Transparent und nachvollziehbar',
  description: `Preisliste für Reparaturen bei ${atelier.name} in ${atelier.location.town}: Risse, Reissverschlüsse, Nahtbänder, Daunen, Anpassungen. Richtpreise in CHF.`,
};

export default function PreisePage() {
  const nightrepair = atelier.services.nightrepair;
  return (
    <>
      <header className="section-tight container-narrow text-center">
        <p className="text-xs uppercase tracking-widest text-stone">Preise</p>
        <h1 className="mt-2 font-serif text-4xl text-forest-dark md:text-5xl">
          Transparent, in CHF, ohne Überraschungen.
        </h1>
        <p className="mt-4 text-lg text-stone">
          Richtpreise für die häufigsten Reparaturen. Was hier nicht aufgelistet ist —
          frag mich kurz, ich gebe dir innerhalb 12 Stunden eine Einschätzung.
        </p>
      </header>

      <section className="container-page">
        <div className="space-y-10">
          {pricingGroups.map((group) => (
            <div key={group.label}>
              <h2 className="mb-3 font-serif text-2xl text-forest-dark">{group.label}</h2>
              <PricingTable items={group.items} />
            </div>
          ))}
        </div>
      </section>

      <section className="section container-page">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="font-serif text-xl text-forest-dark">Komplexe Reparaturen</h3>
            <p className="mt-2 text-sm text-stone">
              Mehrere Schäden, Vintage-Stücke, Eigenkreationen oder Spezialnähte: Schick mir
              ein paar Fotos per WhatsApp oder E-Mail, ich melde mich innerhalb 12 Stunden mit
              einer individuellen Offerte zurück. Bei Annahme rechne ich nur den
              Material-Aufpreis verbindlich, der Arbeitsaufwand ist eine ehrliche
              Schätzung — falls's mehr Zeit braucht, sage ich Bescheid, bevor ich anfange.
            </p>
          </div>

          {nightrepair.available && (
            <div className="card-warm p-6">
              <NightrepairBadge size="md" surcharge={nightrepair.surcharge} />
              <h3 className="mt-3 font-serif text-xl text-forest-dark">Nightrepair-Aufpreis</h3>
              <p className="mt-2 text-sm text-forest">
                Pauschal CHF&nbsp;{nightrepair.surcharge} oben drauf. Annahme bis{' '}
                {nightrepair.acceptanceDeadline} Uhr, Abholung ab {nightrepair.pickupFrom} Uhr.
                Verfügbar je nach Tagesplan — kurzes Telefonat schadet nicht.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-tight container-narrow">
        <div className="rounded-lg border border-lake/25 bg-lake/5 p-5 text-sm text-forest">
          <p className="flex items-start gap-2">
            <Info size={16} className="text-lake shrink-0 mt-0.5" />
            <span>
              <strong>Bezahlung bei Abholung.</strong>{' '}
              {atelier.payment.twint && 'Twint, '}
              {atelier.payment.card && 'Karte (Visa, Mastercard, Maestro), '}
              {atelier.payment.cash && 'Bar, '}
              {atelier.payment.invoice && 'Rechnung auf Anfrage. '}
              <br />
              Mehrwertsteuer ist im Preis enthalten (7.7 % MwSt).
            </span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow flex flex-col items-center gap-4 text-center">
          <p className="text-stone">Bereit, dein Stück zu retten?</p>
          <Link href="/kontakt" className="btn-terracotta">
            Anfrage stellen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
