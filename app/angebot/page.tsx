import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, Wrench } from 'lucide-react';
import { atelier } from '@/content/atelier';
import { specialtyGroups, specialtyLabels, materialLabels, materialDescriptions } from '@/lib/taxonomy';
import { SpecialtyChip } from '@/components/common/SpecialtyChip';
import { pricing } from '@/content/pricing';
import { formatPriceRange } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Angebot — Was wir reparieren',
  description: `Welche Bergsport- und Outdoor-Stücke ${atelier.name} in ${atelier.location.town} repariert: Daunenjacken, Hardshells, Rucksäcke, Zelte. Plus Liste der Materialien und der Stücke, die nicht repariert werden (Sicherheitsausrüstung).`,
};

const categoryCards = [
  {
    id: 'jacken',
    title: 'Jacken',
    intro: 'Daune, Hardshell, Soft­shell, Isolation, Skijacke, Alpinjacke.',
    typical: [
      'Riss in der Aussenbahn flicken',
      'Reissverschluss-Schieber tauschen',
      'Reissverschluss komplett ersetzen',
      'Nahtbänder erneuern (Heisspresse)',
      'Daune neu einfüllen',
      'Klett, Druckknöpfe, Kordelstopper',
    ],
    priceHint: 'CHF 25 – 140',
  },
  {
    id: 'hosen',
    title: 'Hosen',
    intro: 'Skihose, Kletterhose, Wanderhose, Trekking­hose.',
    typical: [
      'Knieverstärkung mit Cordura-Patch',
      'Saum / Bund kürzen',
      'Reissverschluss am Hosenstall',
      'Gummizug am Bund',
      'Schritt-Risse, Sitzfläche',
    ],
    priceHint: 'CHF 18 – 80',
  },
  {
    id: 'ausruestung',
    title: 'Rucksäcke, Zelte, Schlafsäcke',
    intro: 'Cordura, Dyneema, Mesh, Daune. Industrie-Maschinen für die ganz dicken Lagen.',
    typical: [
      'Tragegurt ersetzen oder neu vernähen',
      'Schnallen, Steckverschlüsse, Klett',
      'Risse in Rucksack-Aussenbahn',
      'Mesh-Eingänge bei Zelten',
      'Stangenführungen, Apsiden­nähte',
      'Schlafsack: Daune nachfüllen, Reissverschluss',
    ],
    priceHint: 'CHF 30 – 180',
  },
  {
    id: 'spezielles',
    title: 'Anpassungen & Spezielles',
    intro: 'Wenn ein Stück fast passt, aber eben nicht ganz.',
    typical: [
      'Ärmel / Hose kürzen',
      'Jacke schmaler nähen',
      'Patches und Aufnäher applizieren',
      'Gestickte Vereinslogos integrieren',
    ],
    priceHint: 'CHF 25 – 180',
  },
];

export default function AngebotPage() {
  return (
    <>
      <header className="section-tight container-narrow text-center">
        <p className="text-xs uppercase tracking-widest text-stone">Angebot</p>
        <h1 className="mt-2 font-serif text-4xl text-forest-dark md:text-5xl">
          Was wir reparieren
        </h1>
        <p className="mt-4 text-lg text-stone">
          Klar gegliedert nach Bereichen. Wenn du unsicher bist, ob dein Stück dabei ist —
          schreib mir, ich sag dir ehrlich, ob es sich lohnt.
        </p>
      </header>

      <section className="container-page">
        <div className="grid gap-6 md:grid-cols-2">
          {categoryCards.map((cat) => (
            <article id={cat.id} key={cat.id} className="card p-6 scroll-mt-24">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl text-forest-dark">{cat.title}</h2>
                  <p className="mt-1 text-sm text-stone">{cat.intro}</p>
                </div>
                <Wrench className="text-terracotta shrink-0" size={20} />
              </div>
              <ul className="mt-5 space-y-2 text-sm text-forest">
                {cat.typical.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                <span className="text-stone">Preisrahmen</span>
                <span className="font-medium text-forest-dark">{cat.priceHint}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-stone">
          Alle Preise auf <Link href="/preise" className="text-lake hover:underline">/preise</Link>{' '}
          übersichtlich aufgelistet. Komplexe Reparaturen: individuelle Offerte.
        </p>
      </section>

      {/* SPEZIALITÄTEN */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl text-forest-dark md:text-4xl">Spezialitäten</h2>
        <p className="mt-3 max-w-2xl text-stone">
          Was im Atelier täglich auf dem Tisch liegt:
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {specialtyGroups
            .map((g) => ({
              ...g,
              items: g.items.filter((s) => atelier.specialties.includes(s)),
            }))
            .filter((g) => g.items.length > 0)
            .map((group) => (
              <div key={group.label}>
                <h3 className="font-serif text-lg text-forest-dark">{group.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <SpecialtyChip key={s} value={s} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* MATERIAL-KOMPETENZ */}
      <section className="section bg-cream-warm">
        <div className="container-page">
          <h2 className="font-serif text-3xl text-forest-dark md:text-4xl">Material-Kompetenz</h2>
          <p className="mt-3 max-w-2xl text-stone">
            Mit diesen Stoffen und Membranen arbeite ich regelmässig. Bei den Membranen
            entscheidet die richtige Reparatur darüber, ob das Stück wieder dicht wird —
            keine Garantie ohne sachgemässe Heisspressung.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {atelier.materials.map((m) => (
              <div key={m} className="card p-5">
                <h3 className="font-serif text-lg text-forest-dark">{materialLabels[m]}</h3>
                {materialDescriptions[m] && (
                  <p className="mt-1 text-sm text-stone">{materialDescriptions[m]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h3 className="font-serif text-xl text-forest-dark">Marken, mit denen ich oft arbeite</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {atelier.brandExperience.map((b) => (
                <span key={b} className="chip">{b}</span>
              ))}
              <span className="chip text-stone">… und viele andere.</span>
            </div>
          </div>
        </div>
      </section>

      {/* WAS NICHT */}
      <section className="section container-page">
        <div className="rounded-lg border border-terracotta/30 bg-terracotta/5 p-6 md:p-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-terracotta shrink-0 mt-1" size={22} />
            <div>
              <h2 className="font-serif text-2xl text-forest-dark md:text-3xl">
                Was wir <span className="text-terracotta">nicht</span> reparieren
              </h2>
              <p className="mt-3 text-forest leading-relaxed">
                Sicherheitsausrüstung gehört zu den Hersteller-Prüflaboren — das ist
                gesetzlich so geregelt (PSA-Verordnung, EN-Normen) und auch eine Frage
                der Verantwortung. An folgenden Stücken arbeiten wir nicht:
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-forest md:grid-cols-2">
                {atelier.excludedItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-stone">
                Die Empfehlung: Schick es direkt zum Hersteller — die meisten haben einen
                gut funktionierenden Reparaturservice für genau diese Produkte. Bei Fragen
                helfe ich gern beim Kontakt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HÄUFIGE REPARATUREN */}
      <section className="section-tight container-page">
        <h2 className="font-serif text-2xl text-forest-dark md:text-3xl">Die häufigsten Reparaturen</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.slice(0, 6).map((p) => (
            <li key={p.type} className="rounded-md border border-border bg-white p-4">
              <p className="font-medium text-forest">{p.label}</p>
              <p className="mt-1 text-sm text-stone">
                {formatPriceRange(p.priceFrom, p.priceTo)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="container-narrow flex flex-col items-center gap-4 text-center">
          <p className="text-stone">Stück im Schrank? Kurze Anfrage genügt.</p>
          <Link href="/kontakt" className="btn-terracotta">
            Anfrage stellen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
