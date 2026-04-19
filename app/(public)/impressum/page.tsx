import type { Metadata } from 'next';
import { platform } from '@/config/platform';

export const metadata: Metadata = {
  title: 'Impressum',
};

export default function ImpressumPage() {
  return (
    <section className="section container-narrow">
      <h1 className="font-serif text-4xl text-forest-dark">Impressum</h1>
      <div className="prose-gipfel mt-8">
        <h2>Plattformbetreiber</h2>
        <p>
          {platform.legalName}
          <br />
          {platform.owner.name}
          <br />
          {platform.owner.address}
          <br />
          {platform.owner.postalCode} {platform.owner.town}
          <br />
          {platform.owner.country}
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail:{' '}
          <a href={`mailto:${platform.contact.email}`}>{platform.contact.email}</a>
          <br />
          Telefon: {platform.contact.phone}
        </p>

        <h2>Rechtsform</h2>
        <p>
          Einzelunternehmen im Handelsregister des Kantons {platform.owner.canton}.
          {' '}
          <em>TODO: UID / Handelsregister-Eintrag ergänzen.</em>
        </p>

        <h2>Rolle von Gipfelnaht</h2>
        <p>
          Gipfelnaht ist eine Vermittlungsplattform. Der Reparaturvertrag kommt direkt zwischen
          Kund:in und Partner zustande. Gipfelnaht vermittelt den Kontakt, haftet aber nicht
          für die Reparaturleistung selbst. Details siehe <a href="/agb">AGB</a>.
        </p>

        <h2>Haftungsausschluss</h2>
        <p>
          Die Angaben auf dieser Website werden mit grösstmöglicher Sorgfalt gepflegt. Trotzdem
          übernimmt Gipfelnaht keine Gewähr für Aktualität, Vollständigkeit oder Richtigkeit.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Inhalte und Gestaltung dieser Website sind urheberrechtlich geschützt. Eine Verwendung
          ohne Einwilligung ist nicht zulässig.
        </p>
      </div>
    </section>
  );
}
