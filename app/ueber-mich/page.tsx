import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { atelier } from '@/content/atelier';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';
import { SustainabilityCounter } from '@/components/brand/SustainabilityCounter';

export const metadata: Metadata = {
  title: `Über mich — ${atelier.owner}`,
  description: `${atelier.owner}, Bekleidungstechnikerin und Bergsteigerin. ${atelier.yearsExperience} Jahre an der Industriemaschine, seit ${atelier.founded} eigenes Atelier in ${atelier.location.town}.`,
};

const tools = [
  { name: 'Pfaff Doppelsteppstich', use: 'Hauptarbeitspferd für Aussenstoffe und Membranen' },
  { name: 'Juki Overlock', use: 'Saubere Säume, vor allem an Stretch- und Fleece-Material' },
  { name: 'Adler Sattler-Maschine', use: 'Ledergurte, dicke Cordura-Lagen, Rucksack-Konstruktionen' },
  { name: 'Heisspresse 70 × 50 cm', use: 'Nahtbänder, Patches mit Klebevlies' },
  { name: 'Daunen-Fülltrichter', use: 'Daune präzise nachfüllen, ohne Federschnee in der Werkstatt' },
];

export default function UeberMichPage() {
  return (
    <>
      <header className="section-tight container-narrow text-center">
        <p className="text-xs uppercase tracking-widest text-stone">Über mich</p>
        <h1 className="mt-2 font-serif text-4xl text-forest-dark md:text-5xl">
          {atelier.owner}
        </h1>
        <p className="mt-3 text-lg text-stone">
          Atelier {atelier.name} · {atelier.location.town} · seit {atelier.founded}
        </p>
      </header>

      <section className="container-page">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
          <PhotoPlaceholder
            hint="Lena im Atelier, an der Pfaff, Tageslicht von links, ruhig und konzentriert"
            aspect="portrait"
            className="rounded-lg"
          />
          <div className="prose-gipfel">
            {atelier.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* WERKZEUGE */}
      <section className="section bg-cream-warm">
        <div className="container-page">
          <h2 className="font-serif text-3xl text-forest-dark md:text-4xl">Werkzeuge</h2>
          <p className="mt-3 max-w-2xl text-stone">
            Industriemaschinen, gepflegt und meist älter als ich. Sie laufen ruhig,
            präzise — und werden dich überleben.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {tools.map((t) => (
              <div key={t.name} className="card p-5">
                <h3 className="font-serif text-lg text-forest-dark">{t.name}</h3>
                <p className="mt-1 text-sm text-stone">{t.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WERKSTATT */}
      <section className="section container-page">
        <div className="grid gap-8 md:grid-cols-2">
          <PhotoPlaceholder
            hint="Werkstatt-Übersicht: drei Maschinen, Holzboden, Stoffregal mit Nahtbändern und Reissverschlüssen"
            aspect="video"
            className="rounded-lg"
          />
          <PhotoPlaceholder
            hint="Detail einer reparierten Daunenjacke — saubere Naht über dem Riss, Daune sichtbar gefüllt"
            aspect="video"
            className="rounded-lg"
          />
        </div>
      </section>

      {/* ZAHLEN */}
      <section className="section bg-cream-warm">
        <div className="container-page">
          <h2 className="font-serif text-3xl text-forest-dark md:text-4xl">In Zahlen</h2>
          <div className="mt-8">
            <SustainabilityCounter />
          </div>
          <p className="mt-6 text-sm text-stone">
            Stand: aktualisiert nach jeder grösseren Charge. Zahlen sind ehrlich gerundet —
            nicht aufgehübscht.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow flex flex-col items-center gap-4 text-center">
          <p className="text-stone">
            Wenn du was zu reparieren hast — schreib mir, ich antworte selbst.
          </p>
          <Link href="/kontakt" className="btn-terracotta">
            Anfrage stellen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
