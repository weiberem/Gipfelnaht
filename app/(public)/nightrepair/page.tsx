import type { Metadata } from 'next';
import Link from 'next/link';
import { Moon, Sunrise, Sunset, ArrowRight, Check, X } from 'lucide-react';
import { getNightrepairPartners } from '@/lib/partners';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';

export const metadata: Metadata = {
  title: 'Nightrepair — bis morgen wieder auf dem Berg',
  description:
    'Bis 18:30 bringen, ab 07:00 wieder abholen. Premium-Reparatur über Nacht bei ausgewählten Gipfelnaht-Partnern.',
};

const canDo = [
  'Kleine bis mittlere Risse',
  'Reissverschluss-Schieber ersetzen',
  'Nähte nachnähen',
  'Gummizüge, Kordelstopper, Klett',
  'Patches auf Aussenstoff',
  'Kleine Änderungen (Bund, Saum)',
];

const cantDo = [
  'Komplette Reissverschluss-Wechsel (dauert länger)',
  'Ganze Nahtabdichtungen',
  'Daunen-Neueinfüllen',
  'Grössenänderungen',
  'Sicherheitsrelevante Ausrüstung (reparieren wir grundsätzlich nicht)',
];

const faq = [
  {
    q: 'Was kostet Nightrepair?',
    a: 'Die normale Reparatur plus einen Partner-Aufpreis von CHF 20 bis 30. Der Aufpreis steht pro Partner auf der Profilseite.',
  },
  {
    q: 'Wie bringe ich meine Ausrüstung hin?',
    a: 'Entweder persönlich bis 18:30, oder du wirfst sie in die Sammelbox (24/7 zugänglich, bei vielen Partnern). Zettel mit Name & Schaden nicht vergessen — oder vorab ein PDF-Tag ausfüllen.',
  },
  {
    q: 'Woher weiss ich, ob meine Reparatur nightrepair-geeignet ist?',
    a: 'Wenn du unsicher bist, schick dem Partner vorab ein Foto per WhatsApp oder Mail. Wir sagen ehrlich, ob es über Nacht geht oder nicht.',
  },
  {
    q: 'Wie bezahle ich?',
    a: 'Bei Abholung, direkt beim Partner (Twint, Karte oder bar — je nach Partner). Gipfelnaht-Plattform wickelt keine Zahlungen ab (in Phase 1).',
  },
  {
    q: 'Was, wenn die Reparatur doch nicht rechtzeitig fertig ist?',
    a: 'Der Partner meldet sich spätestens am nächsten Morgen um 07:00. In dem Fall: kein Aufpreis, und du entscheidest, ob wir normal weitermachen oder du sie mitnimmst.',
  },
];

export default async function NightrepairPage() {
  const partners = await getNightrepairPartners();

  return (
    <>
      <section className="night-gradient relative overflow-hidden text-cream">
        <div className="absolute inset-0 opacity-15">
          <PhotoPlaceholder
            hint="Nightrepair-Hero: Nachthimmel über Alpengipfeln, warmes Werkstattfenster leuchtet"
            aspect="free"
            className="h-full w-full rounded-none"
            compact
          />
        </div>
        <div className="container-page relative py-20 md:py-28">
          <NightrepairBadge
            size="md"
            className="bg-night/20 border-night/60 text-night"
          />
          <h1 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.1] max-w-3xl">
            Nightrepair — bis morgen wieder auf dem Berg.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-cream/85">
            Einfache bis mittlere Reparaturen über Nacht. Für alle, die morgen keine Zeit verlieren wollen.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl md:text-4xl text-forest-dark text-center">
          So funktioniert Nightrepair.
        </h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
          {[
            { icon: Sunset, time: 'bis 18:30', title: 'Einwerfen oder abgeben', text: 'Sammelbox oder persönlich bei der Werkstatt. Zettel mit Kontakt dazu.' },
            { icon: Moon, time: '19:00 – 06:30', title: 'Wir arbeiten', text: 'Einfache bis mittlere Reparaturen — fachgerecht, mit Original-Materialien.' },
            { icon: Sunrise, time: 'ab 07:00', title: 'Du holst ab', text: 'Repariert, geprüft, bereit für den nächsten Gipfel.' },
          ].map(({ icon: Icon, time, title, text }) => (
            <div key={time} className="card p-7">
              <Icon size={32} className="text-terracotta" strokeWidth={1.4} />
              <span className="mt-4 block text-xs uppercase tracking-widest text-stone">{time}</span>
              <h3 className="mt-1 font-serif text-xl text-forest-dark">{title}</h3>
              <p className="mt-2 text-sm text-stone">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT GOES */}
      <section className="section-tight container-page">
        <h2 className="font-serif text-3xl text-forest-dark text-center">
          Was geht, was nicht.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-forest/30 bg-white p-6">
            <h3 className="font-serif text-xl text-forest-dark">Perfekt für Nightrepair</h3>
            <ul className="mt-4 space-y-2 text-sm text-forest">
              {canDo.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 text-forest shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-cream-warm p-6">
            <h3 className="font-serif text-xl text-forest-dark">Braucht mehr Zeit</h3>
            <ul className="mt-4 space-y-2 text-sm text-stone">
              {cantDo.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <X size={16} className="mt-0.5 text-terracotta shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl text-forest-dark">Nightrepair-Partner</h2>
        <p className="mt-2 text-stone">
          Nicht alle Partner bieten Nightrepair. Diese schon.
        </p>
        <div className="mt-8 grid gap-4">
          {partners.map((p) => (
            <Link
              key={p.slug}
              href={`/partner/${p.slug}`}
              className="flex items-center gap-5 rounded-lg border border-border bg-white p-4 transition-shadow hover:shadow-card"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                <PhotoPlaceholder hint={`Profilfoto ${p.businessName}`} aspect="square" compact />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg text-forest-dark">{p.businessName}</h3>
                <p className="text-xs text-stone">{p.location.town}</p>
              </div>
              <div className="hidden text-sm text-stone md:block">
                Annahme bis {p.services.nightrepair.acceptanceDeadline} · ab {p.services.nightrepair.pickupFrom}
              </div>
              <div className="rounded-md bg-cream-warm px-3 py-1 text-sm font-medium text-forest-dark">
                +CHF {p.services.nightrepair.surcharge}
              </div>
              <ArrowRight size={16} className="text-forest" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl text-forest-dark">Häufige Fragen</h2>
        <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-white">
          {faq.map((f) => (
            <details key={f.q} className="group p-5 open:bg-cream-warm/40">
              <summary className="cursor-pointer list-none text-base font-medium text-forest-dark">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-stone">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
