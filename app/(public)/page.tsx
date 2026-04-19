import Link from 'next/link';
import { ArrowRight, Clock, Wallet, Wrench, Trees, Moon, CheckCircle2 } from 'lucide-react';
import { getFeaturedPartners, getAllPartners } from '@/lib/partners';
import { PartnerCard } from '@/components/partner/PartnerCard';
import { QuickSearch } from '@/components/home/QuickSearch';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';
import { SustainabilityCounter } from '@/components/brand/SustainabilityCounter';

export default async function HomePage() {
  const [featured, all] = await Promise.all([getFeaturedPartners(3), getAllPartners()]);

  return (
    <>
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden text-cream">
        <div className="absolute inset-0 opacity-20">
          <PhotoPlaceholder
            hint="Hero-Bild: Werkstatt-Atmosphäre, warmes Licht, Näharbeit an Outdoor-Jacke"
            aspect="free"
            className="h-full w-full rounded-none"
            compact
          />
        </div>
        <div className="container-page relative py-20 md:py-28 lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Handwerk aus den Schweizer Alpen
          </span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] md:text-6xl lg:text-7xl max-w-4xl">
            Deine Ausrüstung.
            <br />
            <span className="text-night">Heute gebracht, morgen getragen.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/85">
            Finde Näh-Spezialist:innen in deiner Alpenregion, die deine Bergausrüstung
            schnell und fachgerecht reparieren. Lokal. Nachhaltig. Persönlich.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/partner" className="btn-terracotta text-base">
              Spezialist:in finden <ArrowRight size={16} />
            </Link>
            <Link
              href="/nightrepair"
              className="btn-ghost bg-white/10 text-cream border-white/30 hover:bg-white/20"
            >
              <Moon size={16} className="text-night" fill="currentColor" />
              Was ist Nightrepair?
            </Link>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-cream/60">
            24–48h Standard · Nightrepair über Nacht · 3 Partner im Netzwerk
          </p>
        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="bg-cream">
        <div className="container-page -mt-10 md:-mt-14 relative z-10">
          <QuickSearch />
        </div>
      </section>

      {/* NIGHTREPAIR TEASER */}
      <section className="night-gradient mt-20 md:mt-28 text-cream">
        <div className="container-page relative grid items-center gap-10 py-16 md:grid-cols-[auto_1fr_auto] md:py-20">
          <Moon size={72} strokeWidth={1.3} className="text-night" fill="currentColor" />
          <div>
            <NightrepairBadge size="md" className="bg-night/20 border-night/60 text-night" />
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-cream">
              Bis 18:30 bringen. Ab 07:00 wieder abholen.
            </h2>
            <p className="mt-3 max-w-xl text-cream/80">
              Für alle, die morgen wieder auf den Berg wollen. Unsere Nightrepair-Partner
              arbeiten über Nacht — für einfache bis mittlere Reparaturen. Aufpreis je nach
              Partner CHF 20–30.
            </p>
          </div>
          <Link
            href="/nightrepair"
            className="btn-terracotta whitespace-nowrap"
          >
            Mehr erfahren <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-forest-dark">
            In drei Schritten zur Reparatur.
          </h2>
          <p className="mt-3 text-stone">
            Kein App-Download, kein Login. Nur Kontakt zu Menschen, die ihr Handwerk verstehen.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              num: '01',
              icon: Wrench,
              title: 'Partner wählen & anfragen',
              text: 'Filtere nach Spezialisierung, Ort und Service. Anfrage direkt an die Werkstatt.',
            },
            {
              num: '02',
              icon: Clock,
              title: 'Einwerfen oder abholen lassen',
              text: 'Sammelbox 24/7, persönliche Abgabe, Abholservice oder Nightrepair über Nacht.',
            },
            {
              num: '03',
              icon: CheckCircle2,
              title: 'Repariert in 24–48h zurück',
              text: 'Fachmännische Reparatur mit Original-Materialien. Rechnung direkt beim Partner.',
            },
          ].map(({ num, icon: Icon, title, text }) => (
            <li key={num} className="card p-7">
              <div className="flex items-start justify-between">
                <Icon size={28} className="text-forest" strokeWidth={1.5} />
                <span className="font-serif text-sm text-stone">{num}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl text-forest-dark">{title}</h3>
              <p className="mt-2 text-sm text-stone leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link href="/so-funktionierts" className="text-sm text-lake underline underline-offset-4">
            So funktioniert's im Detail →
          </Link>
        </div>
      </section>

      {/* WHY GIPFELNAHT */}
      <section className="section-tight bg-cream-warm">
        <div className="container-page">
          <h2 className="font-serif text-3xl md:text-4xl text-forest-dark text-center">
            Warum Gipfelnaht?
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Clock, title: 'Lokal & schnell', text: 'Keine Versandwege ins Ausland. Reparatur im Tal.' },
              { icon: Wallet, title: 'Transparente Preise', text: 'Klar kommuniziert, keine Überraschungen.' },
              { icon: Wrench, title: 'Handwerkliche Qualität', text: 'Jeder Partner ist auf Outdoor-Ausrüstung spezialisiert.' },
              { icon: Trees, title: 'Nachhaltig regional', text: 'Reparatur spart CO₂. Ressourcen auch.' },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-lg bg-white p-6">
                <Icon size={22} className="text-terracotta" strokeWidth={1.6} />
                <h3 className="mt-3 font-serif text-lg text-forest-dark">{title}</h3>
                <p className="mt-1.5 text-sm text-stone">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="section container-page">
        <div className="rounded-xl bg-cream-warm p-8 md:p-14">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-terracotta">
                <Trees size={14} /> Nachhaltigkeit
              </span>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl text-forest-dark leading-tight">
                Deine Jacke hat noch viele Gipfel vor sich.
              </h2>
              <p className="mt-4 text-stone leading-relaxed">
                Eine gute Daunenjacke hält 10 bis 15 Jahre — wenn sie gepflegt und repariert wird.
                Jede Reparatur spart Ressourcen, CO₂ und Geld. Unsere Partner nähen statt wegzuwerfen.
              </p>
              <Link
                href="/nachhaltigkeit"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest underline underline-offset-4"
              >
                Unser Nachhaltigkeits-Versprechen <ArrowRight size={14} />
              </Link>
            </div>
            <SustainabilityCounter />
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section className="section-tight container-page">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-forest-dark">Unser Netzwerk</h2>
            <p className="mt-2 text-stone">
              Jeder Partner ist sein eigenes Atelier — mit Profil, Spezialgebiet und Geschichte.
            </p>
          </div>
          <Link href="/partner" className="hidden md:inline-flex text-sm text-lake underline">
            Alle {all.length} Partner →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PartnerCard key={p.slug} partner={p} />
          ))}
        </div>
        <div className="mt-6 text-center md:hidden">
          <Link href="/partner" className="text-sm text-lake underline">
            Alle {all.length} Partner ansehen
          </Link>
        </div>
      </section>

      {/* BECOME PARTNER */}
      <section className="section container-page">
        <div className="rounded-xl border border-border bg-cream-warm p-8 md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest-dark">
                Du nähst leidenschaftlich gern?
              </h2>
              <p className="mt-3 text-stone max-w-xl">
                Werde Teil des Gipfelnaht-Netzwerks. Eigenes Profil, lokale Kundschaft, einheitliche Tools — ohne Umsatzbeteiligung.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link href="/partner-werden" className="btn-primary">
                Partner werden <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
