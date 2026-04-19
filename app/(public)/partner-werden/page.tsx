import type { Metadata } from 'next';
import { Check, MessageCircle, Scissors, Play, Mail } from 'lucide-react';
import { platform } from '@/config/platform';
import { PartnerApplicationForm } from './PartnerApplicationForm';

export const metadata: Metadata = {
  title: 'Partner werden',
  description:
    'Werde Teil des Gipfelnaht-Netzwerks. Eigenes Profil, lokale Kund:innen, einheitliche Tools — ohne Umsatzbeteiligung.',
};

const benefits = [
  'Eigenes Profil auf einer Plattform, die Vertrauen hat',
  'Kund:innen aus deiner Region — ohne eigenes Marketing',
  'Einheitliche Tools: PDF-Tags, Sammelbox-Design, WhatsApp-Vorlagen',
  'Starter-Kit: Etiketten, Briefvorlagen, Preislisten-Templates',
  'Zentrales Marketing (Google, Instagram) durch Gipfelnaht',
  'Ein Netzwerk, das sich gegenseitig unterstützt — Austausch, Weiterbildung',
  'Flexible Zeit: du bestimmst Kapazität und Arbeitsrhythmus',
];

const expect = [
  'Solide bis sehr gute Nähkenntnisse',
  'Erfahrung mit technischen Stoffen (Gore-Tex, Daune etc.) hilfreich',
  'Eigener Arbeitsplatz mit passender Nähmaschine',
  'Zuverlässigkeit — Rückmeldung innerhalb 12 Stunden',
  'Freude am Austausch im Netzwerk',
];

const process = [
  { icon: Mail, title: 'Kontakt', text: 'Du schickst das Formular ab — wir melden uns innerhalb 3 Tagen.' },
  { icon: MessageCircle, title: 'Erstgespräch', text: 'Wir lernen uns kennen — per Video-Call oder vor Ort.' },
  { icon: Scissors, title: 'Nähprobe', text: 'Wir geben dir eine Demo-Aufgabe. Zeit, Sorgfalt, Materialverständnis.' },
  { icon: Play, title: 'Live-Start', text: 'Profil wird aufgeschaltet, Starter-Kit liegt bereit. Meist 3–8 Wochen nach Erstkontakt.' },
];

const faq = [
  {
    q: 'Muss ich hauptberuflich nähen?',
    a: 'Nein. Viele unserer Partner nähen neben dem Hauptberuf, abends und am Wochenende. Wichtig ist die Zuverlässigkeit gegenüber Kund:innen.',
  },
  {
    q: 'Wer haftet bei Problemen?',
    a: 'Der Reparaturvertrag kommt direkt zwischen Kund:in und Partner zustande. Jeder Partner haftet für seine Arbeit. Gipfelnaht vermittelt.',
  },
  {
    q: 'Was kostet eine Starter-Maschine?',
    a: 'Für Outdoor-Reparaturen reicht oft eine gute Haushaltsmaschine (ab CHF 500). Für Zelte/Rucksäcke braucht es eine Industriemaschine (CHF 2000+). Wir beraten gerne.',
  },
  {
    q: 'Könnt ihr meinen Standort überhaupt brauchen?',
    a: 'Wir suchen aktiv in allen Schweizer Alpenregionen. Melde dich — wir sagen ehrlich, ob wir in deiner Region bereits abgedeckt sind.',
  },
];

export default function PartnerWerdenPage() {
  const { onboardingFee, monthlyFee, contractMonths, noticeMonths, currency } = platform.partnerPricing;

  return (
    <>
      <section className="section container-page">
        <p className="text-xs uppercase tracking-[0.2em] text-terracotta">Für Näh-Spezialist:innen</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl text-forest-dark leading-[1.1] max-w-3xl">
          Du nähst leidenschaftlich gern? Werde Teil von Gipfelnaht.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-stone">
          Wir bauen ein Netzwerk aus lokalen Näh-Spezialist:innen in den Schweizer Alpen. Wenn du solide Nähkenntnisse
          hast und Lust, technische Outdoor-Ausrüstung zu reparieren — sprich mit uns.
        </p>
      </section>

      <section className="section-tight container-page grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-forest-dark">Was du bekommst</h2>
          <ul className="mt-4 space-y-2 text-sm text-forest">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-forest shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-forest-dark">Was wir erwarten</h2>
          <ul className="mt-4 space-y-2 text-sm text-forest">
            {expect.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 text-terracotta shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="section bg-cream-warm">
        <div className="container-page">
          <h2 className="font-serif text-3xl text-forest-dark">Transparent: was das Ganze kostet.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6">
              <p className="text-xs uppercase tracking-wider text-stone">Einmaliges Onboarding</p>
              <p className="mt-1 font-serif text-3xl text-forest-dark">
                {currency} {onboardingFee}
              </p>
              <p className="mt-2 text-sm text-stone">Inkl. Profil-Aufbau, Fotos, Starter-Kit.</p>
            </div>
            <div className="rounded-lg bg-white p-6">
              <p className="text-xs uppercase tracking-wider text-stone">Monatliche Plattformgebühr</p>
              <p className="mt-1 font-serif text-3xl text-forest-dark">
                {currency} {monthlyFee}
              </p>
              <p className="mt-2 text-sm text-stone">
                Fixgebühr. <strong>Keine</strong> Umsatzbeteiligung, keine Provision.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6">
              <p className="text-xs uppercase tracking-wider text-stone">Vertrag</p>
              <p className="mt-1 font-serif text-3xl text-forest-dark">
                {contractMonths} Monate
              </p>
              <p className="mt-2 text-sm text-stone">
                Kündigungsfrist {noticeMonths} Monate. Faire Gegenseitigkeit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl text-forest-dark">So wird's gemacht</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {process.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="card p-5">
              <span className="font-serif text-xs text-stone">0{i + 1}</span>
              <Icon size={24} className="mt-3 text-terracotta" strokeWidth={1.4} />
              <h3 className="mt-3 font-serif text-lg text-forest-dark">{title}</h3>
              <p className="mt-1 text-sm text-stone">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FORM */}
      <section className="section container-page">
        <div className="rounded-xl border border-border bg-white p-8 md:p-12">
          <h2 className="font-serif text-3xl text-forest-dark">Dein Interesse anmelden</h2>
          <p className="mt-2 text-stone">
            Schick uns ein paar Zeilen über dich — wir melden uns innerhalb 3 Tagen.
          </p>
          <div className="mt-8">
            <PartnerApplicationForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container-page">
        <h2 className="font-serif text-3xl text-forest-dark">Fragen, die oft kommen</h2>
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
