import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, PenLine, Box, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "So funktioniert's",
  description: 'In vier Schritten zur fachgerechten Reparatur deiner Bergsport-Ausrüstung.',
};

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Partner wählen',
    text: 'Filtere auf /partner nach Spezialisierung, Material, Service oder Ort. Nightrepair? Einfach anhaken. Bewertungen und echte Profile statt anonyme Angebote.',
  },
  {
    num: '02',
    icon: PenLine,
    title: 'Anfrage stellen',
    text: 'Direkt auf der Profilseite des Partners. Kurze Beschreibung reicht. Wer Fotos hat, schickt sie per WhatsApp oder Mail nach.',
  },
  {
    num: '03',
    icon: Box,
    title: 'Übergabe',
    text: 'Sammelbox 24/7, persönliche Abgabe oder Abholservice. Mit dem ausgedruckten PDF-Tag geht es noch einfacher — Name, Schaden, Wunsch-Service sind bereits ausgefüllt.',
  },
  {
    num: '04',
    icon: Check,
    title: 'Repariert zurück',
    text: 'Standard in 24–48h, Nightrepair über Nacht. Bezahlung direkt beim Partner. Ein Stoff-Anhänger am Stück erinnert an die Geschichte.',
  },
];

const extras = [
  {
    title: 'Offerte vorab?',
    text: 'Bei komplexeren Reparaturen schickt der Partner innerhalb 12 Stunden eine Einschätzung — oft mit Fixpreis.',
  },
  {
    title: 'Garantie',
    text: 'Jeder Partner gibt auf seine Arbeit mindestens 6 Monate Garantie. Klare Handschrift.',
  },
  {
    title: 'Versand',
    text: 'Wenn du nicht in der Alpenregion wohnst: Frag den Partner — viele nehmen auch Versand an, wenn es Sinn macht.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="section container-page">
        <p className="text-xs uppercase tracking-[0.2em] text-stone">Ablauf</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl text-forest-dark leading-[1.1] max-w-3xl">
          Von der Anfrage zur reparierten Jacke.
        </h1>
        <p className="mt-5 max-w-xl text-stone text-lg">
          Kein App-Download, kein Account nötig. Vier Schritte, einmal per Formular, dann direkt zwischen dir und dem Partner.
        </p>
      </section>

      <section className="section-tight container-page">
        <ol className="grid gap-6 md:grid-cols-2">
          {steps.map(({ num, icon: Icon, title, text }) => (
            <li key={num} className="card p-7">
              <div className="flex items-start justify-between">
                <Icon size={28} className="text-terracotta" strokeWidth={1.4} />
                <span className="font-serif text-sm text-stone">{num}</span>
              </div>
              <h2 className="mt-4 font-serif text-2xl text-forest-dark">{title}</h2>
              <p className="mt-2 text-sm text-stone leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section bg-cream-warm">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {extras.map((e) => (
            <div key={e.title} className="rounded-lg bg-white p-6">
              <h3 className="font-serif text-lg text-forest-dark">{e.title}</h3>
              <p className="mt-1 text-sm text-stone">{e.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-page text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-forest-dark">Bereit?</h2>
        <p className="mt-3 text-stone">Dann such dir deinen Partner aus.</p>
        <Link href="/partner" className="btn-terracotta mt-6 inline-flex">
          Partner finden <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
