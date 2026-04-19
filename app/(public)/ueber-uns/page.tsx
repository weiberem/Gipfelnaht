import type { Metadata } from 'next';
import { platform } from '@/config/platform';
import { PhotoPlaceholder } from '@/components/common/PhotoPlaceholder';

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Gipfelnaht vernetzt lokale Näh-Spezialist:innen in den Schweizer Alpen.',
};

export default function UeberUnsPage() {
  return (
    <>
      <section className="section container-page">
        <p className="text-xs uppercase tracking-[0.2em] text-terracotta">Über uns</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl text-forest-dark leading-[1.1] max-w-3xl">
          Handwerk in die Berge zurückbringen.
        </h1>
      </section>

      <section className="container-page section-tight grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div className="prose-gipfel max-w-none">
          <h2>Die Idee</h2>
          <p>
            Gipfelnaht ist 2026 in Interlaken entstanden — aus einer einfachen Beobachtung:
            Bergsportler:innen kaufen zunehmend bewusst, pflegen ihre Ausrüstung, wollen sie
            so lange wie möglich nutzen. Gleichzeitig verschwinden die kleinen Näh-Ateliers,
            und wer eine Gore-Tex-Jacke reparieren lassen will, schickt sie im schlimmsten Fall
            wochenlang nach Deutschland.
          </p>
          <p>
            Wir fanden: das muss anders gehen. Also haben wir angefangen, Näh-Spezialist:innen
            in der Schweiz zu suchen — Menschen, die technische Stoffe kennen, die Daune nachfüllen können,
            die Zelte abdichten. Viele gab es, die meisten hatten keine Webseite, kein Marketing, keine Zeit dafür.
          </p>
          <p>
            Gipfelnaht gibt diesen Menschen eine Bühne. Wir übernehmen Marketing, Technik, Standards.
            Sie machen, was sie am besten können: nähen.
          </p>

          <h2>Die Marke</h2>
          <p>
            Gipfelnaht ist die Dachmarke. Jeder Partner ist ein eigenständiges Einzelunternehmen
            und tritt unter der Dachmarke auf — mit eigenem Profil, eigenem Ort, eigener Handschrift.
            Das Netzwerk wächst langsam und bewusst. Wir nehmen nur Partner auf, bei denen wir
            eine Nähprobe gesehen und verstanden haben.
          </p>

          <h2>Wer dahintersteht</h2>
          <p>
            Gipfelnaht wird als Einzelunternehmen geführt. Operative Leitung und Partnerbetreuung
            liegen bei {platform.owner.name} in {platform.owner.town}. Die Plattform selbst ist
            in der Schweiz gehostet (Vercel, EU-Region), transaktionale Mails laufen über Resend,
            Analytics über Plausible — ohne Cookies, ohne Fingerprinting.
          </p>
        </div>

        <div>
          <PhotoPlaceholder
            hint="Aufnahme einer Werkstatt-Szene: Partner beim Arbeiten an Daunenjacke, warmes Licht, Alpenmotiv an Wand"
            aspect="portrait"
          />
          <aside className="mt-6 rounded-lg bg-cream-warm p-6 text-sm text-forest">
            <h3 className="font-serif text-lg text-forest-dark">Kontakt</h3>
            <p className="mt-2">{platform.legalName}</p>
            <p>{platform.owner.address}</p>
            <p>
              {platform.owner.postalCode} {platform.owner.town}
            </p>
            <p className="mt-2">
              <a href={`mailto:${platform.contact.email}`} className="underline">
                {platform.contact.email}
              </a>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
