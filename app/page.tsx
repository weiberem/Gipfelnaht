import Link from 'next/link';
import {
  Clock,
  MapPin,
  Leaf,
  ArrowRight,
  Moon,
  Wrench,
  Sparkles,
  Mountain,
} from 'lucide-react';
import { atelier } from '@/content/atelier';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';
import { SustainabilityCounter } from '@/components/brand/SustainabilityCounter';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';

const categories = [
  {
    slug: 'jacken',
    title: 'Jacken',
    desc: 'Daune, Hardshell, Soft­shell, Isolation. Risse, Reissverschlüsse, Nahtbänder.',
    href: '/angebot#jacken',
  },
  {
    slug: 'hosen',
    title: 'Hosen',
    desc: 'Skihose, Kletterhose, Wanderhose. Knie­verstärkung, Bund, Saum.',
    href: '/angebot#hosen',
  },
  {
    slug: 'rucksaecke',
    title: 'Rucksäcke',
    desc: 'Tragegurte, Schnallen, Reissverschlüsse. Cordura, Dyneema.',
    href: '/angebot#ausruestung',
  },
  {
    slug: 'zelte',
    title: 'Zelte & Schlafsäcke',
    desc: 'Stangen­halterungen, Mesh, durchgescheuerte Stellen, Daunenfüllung.',
    href: '/angebot#ausruestung',
  },
];

export default function HomePage() {
  const nightrepair = atelier.services.nightrepair;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0">
          <PhotoPlaceholder
            hint="Werkstatt-Atmosphäre, Industriemaschine mit Gore-Tex-Naht im Halbschatten, warme Lampe"
            aspect="free"
            className="absolute inset-0 mix-blend-multiply opacity-60"
          />
        </div>
        <div className="container-page relative z-10 py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cream backdrop-blur">
              <Mountain size={14} />
              Näh-Atelier · {atelier.location.town}, {atelier.location.region}
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] text-cream md:text-6xl lg:text-7xl">
              Deine Ausrüstung.
              <br />
              <span className="text-night">Heute gebracht, morgen getragen.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/85 md:text-xl">
              {atelier.name} repariert Bergsport- und Outdoor-Bekleidung in {atelier.location.town}.
              Standard-Turnaround {atelier.capacity.typicalTurnaround}, alles aus einer Hand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn-terracotta">
                Anfrage stellen
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/angebot"
                className="btn-base border border-cream/40 bg-cream/5 text-cream hover:bg-cream/15"
              >
                Was wir reparieren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST-ZEILE */}
      <section className="border-y border-border bg-cream-warm">
        <div className="container-page flex flex-wrap items-center justify-between gap-x-10 gap-y-3 py-5 text-xs uppercase tracking-widest text-stone">
          <span>{atelier.yearsExperience}+ Jahre Industriemaschine</span>
          <span>Gore-Tex · Daune · Cordura · Dyneema</span>
          <span>Lokal in {atelier.location.region}</span>
          <span>{atelier.capacity.typicalTurnaround} Standard-Turnaround</span>
        </div>
      </section>

      {/* DREI VERSPRECHEN */}
      <section className="section container-page">
        <div className="grid gap-8 md:grid-cols-3">
          <Pillar
            icon={<Clock size={24} />}
            title="Geschwindigkeit"
            text={`Standard-Reparatur in ${atelier.capacity.typicalTurnaround}. Komplexe Stücke nach individueller Offerte — Antwort innerhalb 12 Stunden.`}
          />
          <Pillar
            icon={<MapPin size={24} />}
            title="Nähe"
            text={`Werkstatt in ${atelier.location.town}. Kein Versand ins Ausland, keine Wartezeit beim Hersteller. Du kennst die Person, die genäht hat.`}
          />
          <Pillar
            icon={<Leaf size={24} />}
            title="Nachhaltigkeit"
            text="Reparieren statt wegwerfen. Eine Daunenjacken-Reparatur spart rund 25 kg CO₂ gegenüber einem Neukauf."
          />
        </div>
      </section>

      {/* NIGHTREPAIR — nur wenn aktiv */}
      {nightrepair.available && (
        <section className="night-gradient relative overflow-hidden">
          <div className="container-page relative z-10 py-16 md:py-20">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:items-center">
              <div className="text-cream">
                <NightrepairBadge size="md" surcharge={nightrepair.surcharge} />
                <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-cream md:text-5xl">
                  Bis {nightrepair.acceptanceDeadline} bringen.
                  <br />
                  <span className="text-night">
                    Ab {nightrepair.pickupFrom} wieder abholen.
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-cream/80">
                  Tour morgen früh? Sammelbox-Einwurf bis {nightrepair.acceptanceDeadline}{' '}
                  Uhr, Reparatur über Nacht, Abholung ab {nightrepair.pickupFrom} Uhr.
                  Aufpreis CHF&nbsp;{nightrepair.surcharge}. Verfügbar je nach Auslastung —
                  am besten kurz anrufen.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/so-funktionierts#nightrepair" className="btn-terracotta">
                    Wie's funktioniert
                  </Link>
                  <a
                    href={`tel:${atelier.contact.phone}`}
                    className="btn-base border border-night/60 bg-transparent text-night hover:bg-night/10"
                  >
                    {atelier.contact.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="hidden md:flex justify-end">
                <Moon size={140} className="text-night opacity-30" strokeWidth={1} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WAS WIR REPARIEREN */}
      <section className="section container-page">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-stone">Angebot</p>
          <h2 className="mt-2 font-serif text-3xl text-forest-dark md:text-4xl">
            Was wir reparieren
          </h2>
          <p className="mt-3 text-stone">
            Vier grobe Bereiche, die das meiste abdecken. Wenn dein Stück hier nicht
            auftaucht, frag einfach — viel ist möglich, und ich sage dir ehrlich, wenn nicht.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              className="card group flex flex-col gap-3 p-5 transition-shadow hover:shadow-hover"
            >
              <Wrench className="text-terracotta" size={22} />
              <h3 className="font-serif text-xl text-forest-dark">{c.title}</h3>
              <p className="text-sm text-stone">{c.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm text-lake group-hover:underline">
                Details <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/angebot" className="text-sm text-lake hover:underline">
            Alle Reparatur-Arten und Material-Kompetenz →
          </Link>
        </div>
      </section>

      {/* ÜBER MICH KURZ */}
      <section className="section bg-cream-warm">
        <div className="container-page grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <PhotoPlaceholder
            hint="Lena an der Pfaff-Industriemaschine, konzentriert, warm beleuchtet"
            aspect="portrait"
            className="rounded-lg"
          />
          <div>
            <p className="text-xs uppercase tracking-widest text-stone">Über mich</p>
            <h2 className="mt-2 font-serif text-3xl text-forest-dark md:text-4xl">
              {atelier.owner}
            </h2>
            <p className="mt-4 text-lg text-forest leading-relaxed">
              Bekleidungstechnikerin, Bergsteigerin, seit {atelier.yearsExperience} Jahren
              an der Industriemaschine. Im Atelier in {atelier.location.town} repariere ich
              das, was du draussen brauchst — direkt, ehrlich, ohne Marketing-Sprech.
            </p>
            <Link href="/ueber-mich" className="mt-6 inline-flex items-center gap-1 text-lake hover:underline">
              Mehr über mich <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* NACHHALTIGKEIT */}
      <section className="section container-page">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone">Nachhaltigkeit</p>
            <h2 className="mt-2 font-serif text-3xl text-forest-dark md:text-4xl">
              Reparieren statt wegwerfen.
            </h2>
            <p className="mt-4 text-stone leading-relaxed">
              Eine reparierte Daunenjacke spart rund 25&nbsp;kg CO₂ gegenüber einem Neukauf —
              das ist ungefähr ein Hin- und Rückweg von Bern nach Brig im Auto. Bei Hardshells
              sind es noch mehr, weil die Membran extrem energieintensiv produziert wird.
            </p>
            <p className="mt-3 text-stone leading-relaxed">
              Stoffreste werden gesammelt und zu Flicken weiterverarbeitet, alte Reissverschlüsse
              gehen ins Ersatzteillager. Das ist kein Greenwashing-Versprechen, das ist einfach
              die Logik des Handwerks.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-stone">
              <Sparkles size={14} className="text-terracotta" />
              Kein Cookie-Banner. Keine Tracker.
            </div>
          </div>
          <div className="card-warm flex items-center p-8">
            <SustainabilityCounter />
          </div>
        </div>
      </section>

      {/* CTA-BLOCK */}
      <section className="section">
        <div className="container-narrow rounded-lg bg-forest p-8 text-center md:p-14">
          <h2 className="font-serif text-3xl text-cream md:text-5xl">Bereit?</h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/85">
            Schreib mir kurz, was kaputt ist — Antwort innerhalb 12 Stunden mit einer
            Einschätzung und Preisrahmen.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/kontakt" className="btn-terracotta">
              Anfrage stellen
            </Link>
            <a
              href={`tel:${atelier.contact.phone}`}
              className="btn-base border border-cream/40 bg-cream/5 text-cream hover:bg-cream/15"
            >
              {atelier.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div>
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-cream-warm text-forest">
        {icon}
      </div>
      <h3 className="mt-4 font-serif text-2xl text-forest-dark">{title}</h3>
      <p className="mt-2 text-stone leading-relaxed">{text}</p>
    </div>
  );
}
