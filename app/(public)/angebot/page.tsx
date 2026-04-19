import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';
import { specialtyLabels, materialLabels } from '@/lib/taxonomy';
import type { Specialty } from '@/types';

export const metadata: Metadata = {
  title: 'Was reparieren wir?',
  description:
    'Alle Bergsport- und Outdoor-Reparaturen auf einen Blick: Daunenjacken, Hardshells, Zelte, Rucksäcke — plus Materialkompetenz und klare Abgrenzung zu sicherheitsrelevanter Ausrüstung.',
};

const categories: {
  slug: string;
  title: string;
  specs: Specialty[];
  hint: string;
  repairs: string[];
  priceFrom: string;
}[] = [
  {
    slug: 'jacken',
    title: 'Jacken',
    specs: ['daunenjacke', 'hardshell', 'softshell', 'fleece', 'isolation', 'skijacke', 'alpinjacke'],
    hint: 'Verschiedene Outdoor-Jacken auf Werkstatttisch, daneben Näh-Werkzeug',
    repairs: ['Risse (mit und ohne Flicken)', 'Reissverschluss komplett oder Schieber', 'Nahtabdichtung', 'Gummizüge, Klett, Kordeln', 'Daunen nachfüllen'],
    priceFrom: 'ab CHF 25',
  },
  {
    slug: 'hosen',
    title: 'Hosen',
    specs: ['hose', 'skihose', 'kletterhose'],
    hint: 'Detailaufnahme: Knie einer Kletterhose mit Flicken',
    repairs: ['Knie-Flicken', 'Reissverschluss', 'Bund / Saum ändern', 'Gamaschen, Kantenschutz'],
    priceFrom: 'ab CHF 20',
  },
  {
    slug: 'ruecksaecke-taschen',
    title: 'Rucksäcke',
    specs: ['rucksack'],
    hint: 'Alter Trekking-Rucksack mit aufgerissenem Hüftgurt',
    repairs: ['Schnallen & Gurte ersetzen', 'Reissverschlüsse', 'Naht-Verstärkung', 'Boden-Reparatur'],
    priceFrom: 'ab CHF 25',
  },
  {
    slug: 'zelte',
    title: 'Zelte',
    specs: ['zelt'],
    hint: 'Expeditionszelt-Detail, Reparaturstelle am Boden',
    repairs: ['Zeltboden-Flicken', 'Nahtabdichtung', 'Gestängefäden', 'Reissverschlüsse am Eingang'],
    priceFrom: 'ab CHF 40',
  },
  {
    slug: 'schlafsaecke',
    title: 'Schlafsäcke',
    specs: ['schlafsack'],
    hint: 'Daunenschlafsack aufgelegt, Blick auf Reissverschluss',
    repairs: ['Daunen nachfüllen', 'Innenfutter flicken', 'Reissverschluss'],
    priceFrom: 'ab CHF 45',
  },
  {
    slug: 'spezielles',
    title: 'Spezielles',
    specs: ['paragliding', 'leder', 'vintage', 'tierausruestung'],
    hint: 'Handwerkliches Detail: Ledernaht, Vintage-Jacke',
    repairs: ['Paragliding-Gurte & -Stoffe (nicht sicherheitsrelevant)', 'Lederreparatur', 'Vintage-Jacken', 'Hundegeschirre, Pferdedecken'],
    priceFrom: 'individuell',
  },
];

const materialsInfo = [
  { key: 'gore-tex', text: 'Gore-Tex braucht spezielle Nähte und Nahtband — nicht jede Werkstatt kann das. Unsere schon.' },
  { key: 'daune', text: 'Daune will sortenrein nachgefüllt werden. Mischungen verlieren Loft.' },
  { key: 'dyneema', text: 'Dyneema ist extrem leicht, extrem empfindlich gegen falsche Nadeln — Kompetenz entscheidend.' },
  { key: 'cordura', text: 'Cordura verträgt viel — braucht aber kräftige Industriemaschinen.' },
  { key: 'leder', text: 'Leder ist eigene Welt: Spezialnadeln, Garn, Farbanpassung.' },
] as const;

export default function AngebotPage() {
  return (
    <>
      <section className="container-page section">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">Angebot</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl text-forest-dark leading-[1.1] max-w-3xl">
          Wir reparieren Bergsport- und Outdoor-Ausrüstung.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-stone leading-relaxed">
          Von der zerrissenen Daunenjacke bis zum alten Expeditionszelt — unsere Partner kennen die Stoffe,
          die Konstruktion und die Ansprüche, die Bergsport an Ausrüstung stellt.
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="container-page section-tight">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/partner?specialty=${cat.specs[0]}`}
              className="group card overflow-hidden transition-shadow hover:shadow-hover"
            >
              <div className="aspect-[16/10]">
                <PhotoPlaceholder hint={cat.hint} aspect="free" className="h-full w-full" />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl text-forest-dark group-hover:text-terracotta">
                  {cat.title}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-stone">{cat.priceFrom}</p>
                <ul className="mt-4 space-y-1 text-sm text-stone">
                  {cat.repairs.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cat.specs.map((s) => (
                    <span key={s} className="chip text-[10px]">
                      {specialtyLabels[s]}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-forest">
                  Partner für {cat.title.toLowerCase()} finden <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MATERIAL */}
      <section className="section bg-cream-warm">
        <div className="container-page">
          <h2 className="font-serif text-3xl md:text-4xl text-forest-dark">Material-Kompetenz</h2>
          <p className="mt-3 max-w-2xl text-stone">
            Nicht jede Schneiderei kann jeden Outdoor-Stoff. Unsere Partner haben sich auf die wichtigen spezialisiert:
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {materialsInfo.map((m) => (
              <li key={m.key} className="rounded-lg bg-white p-5">
                <h3 className="font-serif text-lg text-forest-dark">{materialLabels[m.key]}</h3>
                <p className="mt-1 text-sm text-stone">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NOT REPAIRED */}
      <section className="section container-page">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start rounded-xl border border-terracotta/40 bg-terracotta/5 p-8 md:p-10">
          <ShieldAlert size={32} className="text-terracotta shrink-0" strokeWidth={1.5} />
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-forest-dark">Was wir NICHT reparieren</h2>
            <p className="mt-3 text-stone">
              Sicherheit geht vor Vertrauen. Diese Ausrüstung gehört zum Hersteller oder zu zertifizierten Fachbetrieben:
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-forest md:grid-cols-2">
              {[
                'Klettergurte und Klettersteig-Sets',
                'Seile und Reepschnüre',
                'Karabiner, Sicherungsgeräte',
                'Helme (Klettern, Ski, Rad)',
                'Lawinen-Airbags und Auslösesysteme',
                'Paragliding-Kappen, Leinen und Gurtzeug',
              ].map((x) => (
                <li key={x} className="rounded border border-terracotta/30 bg-white px-3 py-2">
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-stone">
              Der Grund: diese Produkte müssen regelmässig geprüft und zertifiziert werden. Wir arbeiten lieber mit dem Hersteller zusammen, als Kompromisse bei der Sicherheit zu machen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
