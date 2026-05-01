import type { Metadata } from 'next';
import { atelier } from '@/content/atelier';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: `Datenschutzerklärung für ${atelier.name} — wie wir mit deinen Anfragedaten umgehen.`,
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  const hasPlausible = !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <article className="section container-narrow prose-gipfel">
      <h1 className="font-serif text-4xl text-forest-dark">Datenschutz</h1>

      <p>
        Diese Webseite wird mit Sorgfalt für deinen Schutz betrieben. Wir verzichten auf
        Tracking-Cookies, Werbe-Pixel und Personenprofile. Diese Erklärung beschreibt,
        welche Daten wir verarbeiten, wenn du uns kontaktierst.
      </p>

      <h2>Verantwortliche Stelle</h2>
      <p>
        {atelier.legalName}, {atelier.location.address}, {atelier.location.postalCode}{' '}
        {atelier.location.town}.<br />
        Kontakt: {atelier.contact.email}, {atelier.contact.phoneDisplay}.
      </p>

      <h2>Wenn du uns eine Anfrage schickst</h2>
      <p>
        Wenn du das Formular auf <a href="/kontakt">/kontakt</a> ausfüllst, übermittelst du
        uns: Name, E-Mail, Telefon, Produkt, Schadenbeschreibung, Service-Wunsch und
        optional einen Wunschtermin. Wir nutzen diese Angaben ausschliesslich, um deine
        Anfrage zu beantworten und die Reparatur abzuwickeln.
      </p>
      <p>
        Versand der Mails: <a href="https://resend.com" target="_blank" rel="noopener noreferrer">Resend</a>.
        Speicherung: nur in unserem Mail-Postfach beim Provider. Wir bewahren Anfragen
        bis zu 24 Monate auf, danach werden sie automatisch archiviert oder gelöscht. Auf
        Wunsch löschen wir früher — schreib uns einfach.
      </p>

      <h2>Webseite & Hosting</h2>
      <p>
        Die Seite wird bei <strong>Vercel Inc.</strong> (USA / EU) gehostet. Beim Aufruf
        werden technisch notwendige Daten (IP-Adresse, User-Agent, Zeitstempel) im
        Server-Log erfasst und nach kurzer Zeit gelöscht. Diese Daten dienen ausschliesslich
        der Sicherheit und dem stabilen Betrieb der Seite.
      </p>

      {hasPlausible && (
        <>
          <h2>Reichweitenmessung mit Plausible</h2>
          <p>
            Wir nutzen <a href="https://plausible.io" target="_blank" rel="noopener noreferrer">Plausible Analytics</a> —
            ein cookie-freies, datensparsames Werkzeug, das in der EU gehostet wird. Es werden
            keine persönlichen Daten erhoben, keine Cookies gesetzt, kein Cross-Site-Tracking
            betrieben. Aus diesem Grund verzichten wir bewusst auf einen Cookie-Banner.
          </p>
        </>
      )}

      <h2>Karte (OpenStreetMap)</h2>
      <p>
        Die Karte auf der Kontakt-Seite lädt Tiles von <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>.
        Beim Anzeigen der Karte werden technische Daten (IP) an OpenStreetMap übertragen —
        mehr Infos unter <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">OSMF Privacy Policy</a>.
      </p>

      <h2>Deine Rechte</h2>
      <ul>
        <li>Auskunft, welche Daten wir zu dir gespeichert haben</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>Löschung, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht</li>
        <li>Einschränkung der Verarbeitung</li>
        <li>Beschwerde beim Eidgenössischen Datenschutzbeauftragten (EDÖB)</li>
      </ul>
      <p>
        Schreib uns einfach an <a href={`mailto:${atelier.contact.email}`}>{atelier.contact.email}</a>{' '}
        — kein Formular, kein Login.
      </p>

      <h2>Aktualisierungen</h2>
      <p>
        Diese Erklärung kann angepasst werden, wenn sich Werkzeuge oder rechtliche
        Rahmenbedingungen ändern. Stand:{' '}
        {new Date().toLocaleDateString('de-CH', { year: 'numeric', month: 'long' })}.
      </p>
    </article>
  );
}
