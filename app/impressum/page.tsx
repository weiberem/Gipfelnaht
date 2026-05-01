import type { Metadata } from 'next';
import { atelier } from '@/content/atelier';

export const metadata: Metadata = {
  title: 'Impressum',
  description: `Impressum von ${atelier.legalName}, ${atelier.location.address}.`,
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <article className="section container-narrow prose-gipfel">
      <h1 className="font-serif text-4xl text-forest-dark">Impressum</h1>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        {atelier.legalName}
        <br />
        {atelier.owner}
        <br />
        {atelier.location.address}
        <br />
        {atelier.location.postalCode} {atelier.location.town}
        <br />
        Schweiz
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {atelier.contact.phoneDisplay}
        <br />
        E-Mail: {atelier.contact.email}
      </p>

      <h2>Rechtsform</h2>
      <p>
        Einzelunternehmen nach schweizerischem Recht. Eingetragen im Handelsregister
        des Kantons {atelier.location.canton}. UID: <em>CHE-XXX.XXX.XXX</em>
        {' '}<small>(TODO: echte UID-Nummer eintragen)</small>.
      </p>

      <h2>Mehrwertsteuer</h2>
      <p>
        MwSt-Nummer: <em>CHE-XXX.XXX.XXX MWST</em>{' '}
        <small>(TODO: ergänzen, falls steuerpflichtig)</small>.
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Webseite werden mit Sorgfalt gepflegt. Trotzdem können wir keine
        Gewähr für Aktualität, Richtigkeit oder Vollständigkeit übernehmen. Für Schäden
        materieller oder immaterieller Art, die durch die Nutzung der Webseite entstehen,
        übernehmen wir keine Haftung — soweit kein nachweislich vorsätzliches oder
        grobfahrlässiges Verschulden vorliegt.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Texte, Fotos, Logo und Layout sind urheberrechtlich geschützt. Eine Verwendung
        ausserhalb der Webseite — auch auszugsweise — bedarf der schriftlichen Zustimmung
        von {atelier.owner}.
      </p>

      <h2>Externe Links</h2>
      <p>
        Für Inhalte auf externen Seiten, die wir verlinken, sind ausschliesslich deren
        Betreiber verantwortlich.
      </p>

      <p className="text-sm text-stone">
        Stand: {new Date().toLocaleDateString('de-CH', { year: 'numeric', month: 'long' })}
      </p>
    </article>
  );
}
