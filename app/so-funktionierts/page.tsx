import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Send,
  Box,
  Handshake,
  Wrench,
  CreditCard,
  Moon,
  ArrowRight,
  Download,
} from 'lucide-react';
import { atelier, availableServices } from '@/content/atelier';
import { serviceShortLabels } from '@/lib/taxonomy';

export const metadata: Metadata = {
  title: "So funktioniert's — Anfrage, Übergabe, Reparatur, Abholung",
  description: `Vier Schritte: Anfrage stellen, Stück abgeben oder Sammelbox, ${atelier.capacity.typicalTurnaround} Reparatur, Abholung. Klar erklärt, mit Optionen für Nightrepair.`,
};

export default function SoFunktioniertsPage() {
  const np = atelier.services.nightrepair;
  const services = availableServices();

  const dropoffOptions = [
    atelier.services.sammelbox.available && {
      icon: <Box size={20} />,
      title: 'Sammelbox',
      desc: `${atelier.services.sammelbox.location ?? 'Sammelbox neben dem Eingang'}. Zugänglich ${atelier.services.sammelbox.accessHours ?? '24/7'}.`,
    },
    atelier.services.personalDropoff.available && {
      icon: <Handshake size={20} />,
      title: 'Persönlich abgeben',
      desc: `Während der Öffnungszeiten: ${atelier.services.personalDropoff.hours ?? 'siehe Öffnungszeiten'}.`,
    },
    atelier.services.pickup.available && {
      icon: <ArrowRight size={20} />,
      title: 'Abholservice',
      desc: 'Auf Anfrage in der Region — kurz anrufen oder schreiben.',
    },
  ].filter(Boolean) as { icon: React.ReactNode; title: string; desc: string }[];

  const paymentLabels = [
    atelier.payment.twint && 'Twint',
    atelier.payment.card && 'Karte',
    atelier.payment.cash && 'Bar',
    atelier.payment.invoice && 'Rechnung',
  ].filter(Boolean) as string[];

  return (
    <>
      <header className="section-tight container-narrow text-center">
        <p className="text-xs uppercase tracking-widest text-stone">So funktioniert's</p>
        <h1 className="mt-2 font-serif text-4xl text-forest-dark md:text-5xl">
          In vier Schritten zur reparierten Ausrüstung.
        </h1>
        <p className="mt-4 text-lg text-stone">
          Kein App-Download, kein Login. Eine kurze Nachricht reicht.
        </p>
      </header>

      <section className="container-page">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Step
            n={1}
            icon={<Send size={22} />}
            title="Anfrage stellen"
            text="Kurze Beschreibung, idealerweise ein Foto. Antwort innerhalb 12 Stunden mit Einschätzung und Preisrahmen."
          />
          <Step
            n={2}
            icon={<Box size={22} />}
            title="Übergabe"
            text="Sammelbox, persönliche Abgabe oder — falls aktiv — Nightrepair-Einwurf. Du wählst, was am besten passt."
          />
          <Step
            n={3}
            icon={<Wrench size={22} />}
            title="Reparatur"
            text={`Standard ${atelier.capacity.typicalTurnaround}. Komplexe Stücke nach Absprache. Du bekommst Bescheid, sobald es fertig ist.`}
          />
          <Step
            n={4}
            icon={<CreditCard size={22} />}
            title="Abholung"
            text={`Bezahlung bei Abholung — ${paymentLabels.join(', ')}. Auf jede Reparatur 6 Monate Garantie.`}
          />
        </ol>
      </section>

      {/* ÜBERGABE-OPTIONEN */}
      <section className="section container-page" id="uebergabe">
        <h2 className="font-serif text-3xl text-forest-dark md:text-4xl">Übergabe — drei Optionen</h2>
        <p className="mt-3 max-w-2xl text-stone">
          Du musst nicht zu Bürozeiten kommen. Wer im Tal arbeitet oder am Berg ist, nutzt
          die Sammelbox. Wer mich persönlich kennenlernen will, kommt vorbei.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dropoffOptions.map((opt) => (
            <div key={opt.title} className="card p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-cream-warm text-forest">
                {opt.icon}
              </div>
              <h3 className="mt-4 font-serif text-xl text-forest-dark">{opt.title}</h3>
              <p className="mt-2 text-sm text-stone leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NIGHTREPAIR */}
      {np.available && (
        <section className="night-gradient" id="nightrepair">
          <div className="container-page py-16 md:py-20">
            <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
              <div className="hidden md:flex justify-center">
                <Moon size={140} className="text-night opacity-30" strokeWidth={1} />
              </div>
              <div className="text-cream">
                <p className="text-xs uppercase tracking-widest text-night">Premium</p>
                <h2 className="mt-2 font-serif text-3xl text-cream md:text-4xl">
                  Nightrepair — wenn's morgen schon passen muss
                </h2>
                <ul className="mt-5 space-y-2 text-cream/85">
                  <li>
                    Annahme bis <strong className="text-night">{np.acceptanceDeadline} Uhr</strong>{' '}
                    (Sammelbox oder persönlich, ein kurzer Anruf hilft mir bei der Planung)
                  </li>
                  <li>
                    Reparatur über Nacht — typische Stücke: Reissverschluss-Schieber,
                    kleine Risse, Knöpfe, Nahtbänder
                  </li>
                  <li>
                    Abholbereit ab <strong className="text-night">{np.pickupFrom} Uhr</strong> am
                    nächsten Morgen — auf Wunsch in der Box
                  </li>
                  <li>
                    Aufpreis pauschal <strong className="text-night">CHF&nbsp;{np.surcharge}</strong>
                  </li>
                </ul>
                <p className="mt-5 text-sm text-cream/65">
                  Nightrepair ist nicht für jede Reparatur möglich (z. B. Heisspressen brauchen
                  Aushärtezeit). Im Zweifel kurz fragen — ich sage dir ehrlich, ob's klappt.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`tel:${atelier.contact.phone}`} className="btn-terracotta">
                    {atelier.contact.phoneDisplay}
                  </a>
                  <Link
                    href="/kontakt"
                    className="btn-base border border-night/60 bg-transparent text-night hover:bg-night/10"
                  >
                    Schriftlich anfragen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PDF-TAG */}
      <section className="section bg-cream-warm">
        <div className="container-narrow text-center">
          <Download className="mx-auto text-terracotta" size={28} />
          <h2 className="mt-4 font-serif text-3xl text-forest-dark">
            Druckbarer Reparatur-Tag
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-stone">
            Ein A5-Formular zum Ausdrucken — Vorderseite zum Ausfüllen, Rückseite mit Ablauf,
            Preisrahmen und QR-Code. Praktisch für die Sammelbox.
          </p>
          <a
            href="/api/tag-pdf"
            className="btn-primary mt-6"
            target="_blank"
            rel="noopener"
          >
            PDF öffnen / herunterladen
          </a>
        </div>
      </section>

      {/* GARANTIE */}
      <section className="section-tight container-narrow">
        <div className="rounded-lg border border-border bg-white p-6 md:p-8">
          <h3 className="font-serif text-2xl text-forest-dark">Garantie</h3>
          <p className="mt-2 text-stone leading-relaxed">
            Auf jede Reparatur gewähre ich sechs Monate Garantie auf die Naht oder den
            Materialeinsatz. Wenn etwas an der reparierten Stelle wieder aufgeht, korrigiere
            ich es kostenlos. Verschleiss an einer anderen Stelle ist nicht abgedeckt — und
            das wäre auch unfair.
          </p>
          <p className="mt-3 text-stone leading-relaxed">
            Details: <Link href="/agb" className="text-lake hover:underline">AGB</Link>.
          </p>
        </div>
      </section>

      {/* SERVICE-MATRIX */}
      <section className="section-tight container-page">
        <h2 className="font-serif text-2xl text-forest-dark">Welche Services biete ich an?</h2>
        <ul className="mt-4 grid gap-2 text-sm text-stone sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s} className="rounded-md border border-border bg-white px-3 py-2 text-forest">
              ✓ {serviceShortLabels[s]}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Step({
  n,
  icon,
  title,
  text,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <li className="card p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-forest text-cream text-sm font-semibold">
          {n}
        </span>
        <div className="text-terracotta">{icon}</div>
      </div>
      <h3 className="mt-4 font-serif text-xl text-forest-dark">{title}</h3>
      <p className="mt-2 text-sm text-stone leading-relaxed">{text}</p>
    </li>
  );
}
