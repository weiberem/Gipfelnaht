import type { Metadata } from 'next';
import { Leaf, Recycle, MapPin, Scissors } from 'lucide-react';
import { SustainabilityCounter } from '@/components/brand/SustainabilityCounter';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';

export const metadata: Metadata = {
  title: 'Nachhaltigkeit — Deine Jacke hat noch viele Gipfel vor sich',
  description:
    'Reparieren statt wegwerfen. Eine Daunenjacke-Reparatur spart ca. 25 kg CO₂. Unser Nachhaltigkeits-Versprechen bei Gipfelnaht.',
};

export default function NachhaltigkeitPage() {
  return (
    <>
      <section className="section container-page">
        <p className="text-xs uppercase tracking-[0.2em] text-terracotta">Nachhaltigkeit</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl text-forest-dark leading-[1.1] max-w-3xl">
          Deine Jacke hat noch viele Gipfel vor sich.
        </h1>
      </section>

      <section className="section-tight container-page">
        <div className="prose-gipfel max-w-none md:columns-2 md:gap-12">
          <p>
            Eine gute Daunenjacke hält 10 bis 15 Jahre. Ein Bergrucksack oft ein Leben lang.
            Ein Zelt lässt sich oft schon mit drei Gramm Nahtband retten.
            Trotzdem landen jedes Jahr Millionen funktionierender Ausrüstungsstücke im Müll,
            nur weil eine Naht aufgegangen ist oder der Reissverschluss hakt.
          </p>
          <p>
            Wir glauben: Das macht niemandem Spass.
            Nicht den Bergsportler:innen, die ihre Lieblingsjacke kennen.
            Nicht der Umwelt, die jede neue Jacke bezahlt — mit Wasser, Energie, CO₂.
            Und nicht dem Handwerk, das langsam verschwindet, weil niemand mehr repariert.
          </p>
          <p>
            Gipfelnaht setzt dagegen. Wir vernetzen lokale Näh-Spezialist:innen mit Menschen,
            die reparieren lassen wollen. Schnell. Fachmännisch. In der Alpenregion.
          </p>
        </div>
      </section>

      {/* COUNTER */}
      <section className="section-tight bg-cream-warm">
        <div className="container-page">
          <h2 className="font-serif text-2xl text-forest-dark text-center">Unser Impact bisher</h2>
          <div className="mt-8">
            <SustainabilityCounter />
          </div>
          <p className="mt-8 text-center text-xs text-stone">
            CO₂-Werte basieren auf branchenüblichen Abschätzungen: rund 25 kg CO₂ pro gerettete Jacke.
            Ab Phase 2 berechnen wir pro Reparatur individuell.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl md:text-4xl text-forest-dark">Was wir konkret tun</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { icon: Scissors, title: 'Reparatur vor Neukauf', text: 'Jede Anfrage schauen wir ehrlich an. Wenn eine Reparatur keinen Sinn macht, sagen wir das.' },
            { icon: Recycle, title: 'Zero-Waste-Werkstatt', text: 'Stoffreste werden zu Patches, Futter, Gurten. Bis hin zu Schlüsselanhängern als Geschenk zur Reparatur.' },
            { icon: MapPin, title: 'Lokal, kurze Wege', text: 'Alle Partner sind im Schweizer Alpenraum. Kein Versand ins Ausland, keine wochenlangen Wartezeiten.' },
            { icon: Leaf, title: 'Transparenz statt Greenwashing', text: 'Wir versprechen nichts, was wir nicht messen können. Keine Siegel ohne Substanz.' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="card flex gap-5 p-6">
              <Icon size={28} className="text-terracotta shrink-0" strokeWidth={1.4} />
              <div>
                <h3 className="font-serif text-xl text-forest-dark">{title}</h3>
                <p className="mt-1.5 text-sm text-stone">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* REPAIR TAG */}
      <section className="section-tight container-page">
        <div className="grid gap-10 rounded-xl bg-cream-warm p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-serif text-3xl text-forest-dark">Der Reparatur-Anhänger</h2>
            <p className="mt-3 text-stone">
              Jede Reparatur bekommt einen kleinen Stoffanhänger mit Auftragsnummer und Datum.
              Ein sichtbares Zeichen für die Geschichte deiner Ausrüstung — und für die Kultur
              des Reparierens, die wir zurück in die Berge bringen wollen.
            </p>
            <p className="mt-3 text-stone">
              Die Anhänger werden von einem Partner-Atelier in Meiringen aus Stoffresten gefertigt.
              Kreislauf im Kleinen.
            </p>
          </div>
          <div>
            <PhotoPlaceholder
              hint="Stoffanhänger am Reissverschluss einer Jacke, mit Auftragsnummer in Handschrift"
              aspect="square"
            />
          </div>
        </div>
      </section>

      {/* PARTNER COMMITMENT */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl text-forest-dark">Was unsere Partner versprechen</h2>
        <ul className="mt-6 space-y-3 text-sm">
          {[
            'Reparatur vor Neukauf, wenn möglich — ehrliche Einschätzung, auch wenn sie gegen die eigene Rechnung spricht.',
            'Möglichst umweltfreundliche Materialien: lösungsmittelfreie Kleber, zertifizierte Garne.',
            'Stoffreste werden wiederverwendet oder recycelt, nicht in den Müll.',
            'Kurze Lieferketten: Materialbezug so lokal wie möglich.',
            'Transparente Preise. Keine versteckten Zuschläge.',
          ].map((x, i) => (
            <li key={i} className="flex items-start gap-3 rounded-md border border-border bg-white p-4 text-forest">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-xs text-cream">
                {i + 1}
              </span>
              {x}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
