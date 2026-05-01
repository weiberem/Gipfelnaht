import type { Metadata } from 'next';
import { atelier } from '@/content/atelier';

export const metadata: Metadata = {
  title: 'AGB',
  description: `Allgemeine Geschäftsbedingungen für Reparaturaufträge bei ${atelier.name}.`,
  robots: { index: false, follow: true },
};

export default function AgbPage() {
  return (
    <article className="section container-narrow prose-gipfel">
      <h1 className="font-serif text-4xl text-forest-dark">Allgemeine Geschäftsbedingungen</h1>
      <p className="text-sm text-stone">
        Stand: {new Date().toLocaleDateString('de-CH', { year: 'numeric', month: 'long' })}.
        Anbieter: {atelier.legalName}, {atelier.location.address},{' '}
        {atelier.location.postalCode} {atelier.location.town}.
      </p>

      <h2>1. Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Reparaturaufträge zwischen {atelier.legalName} (nachfolgend
        „Atelier&quot;) und Kund:innen, die einen Reparaturauftrag erteilen — sei es per
        Webseite, E-Mail, Telefon, persönlich oder über die Sammelbox. Abweichende
        Vereinbarungen müssen schriftlich bestätigt werden.
      </p>

      <h2>2. Vertragsschluss</h2>
      <p>
        Anfragen über das Formular sind unverbindlich. Ein Reparaturvertrag kommt zustande,
        wenn das Atelier die Annahme bestätigt (per E-Mail, WhatsApp oder persönlich) und
        ein Preisrahmen mitgeteilt wurde, der von der Kundin / dem Kunden akzeptiert wird.
      </p>

      <h2>3. Was wir nicht reparieren</h2>
      <p>
        Sicherheitsausrüstung im Sinne der PSA-Verordnung (Klettergurte, Seile, Karabiner,
        Helme, Lawinen-Airbags, Paragliding-Kappen) und vergleichbare zertifizierungspflichtige
        Produkte werden vom Atelier nicht repariert — die Reparatur darf ausschliesslich durch
        den Hersteller oder eine vom Hersteller autorisierte Stelle erfolgen. Wir nehmen
        solche Stücke auch nicht in Aufbewahrung.
      </p>

      <h2>4. Preise</h2>
      <p>
        Die auf <a href="/preise">/preise</a> aufgeführten Preise sind Richtwerte (CHF, inkl.
        MwSt). Verbindlich wird der Preis erst mit Auftragsbestätigung. Stellt sich während
        der Reparatur ein höherer Aufwand heraus, holen wir vor dem Weiterarbeiten dein
        Einverständnis ein.
      </p>

      <h2>5. Bearbeitungszeit</h2>
      <p>
        Standard-Turnaround: {atelier.capacity.typicalTurnaround} ab vollständiger Annahme. Bei
        komplexen Stücken oder Spitzenzeiten kann es länger dauern — wir geben in der
        Auftragsbestätigung einen verbindlichen Termin an.{' '}
        {atelier.services.nightrepair.available && (
          <>
            Nightrepair: Annahme bis {atelier.services.nightrepair.acceptanceDeadline} Uhr,
            Abholung ab {atelier.services.nightrepair.pickupFrom} Uhr; Aufpreis CHF&nbsp;
            {atelier.services.nightrepair.surcharge}; Verfügbarkeit nach Tagesplan.
          </>
        )}
      </p>

      <h2>6. Bezahlung</h2>
      <p>
        Bezahlung bei Abholung. Akzeptiert werden:{' '}
        {[
          atelier.payment.twint && 'Twint',
          atelier.payment.card && 'Karte (Visa, Mastercard, Maestro)',
          atelier.payment.cash && 'Bar',
          atelier.payment.invoice && 'Rechnung auf Anfrage',
        ]
          .filter(Boolean)
          .join(', ')}
        .
      </p>

      <h2>7. Garantie</h2>
      <p>
        Auf jede Reparatur gewährt das Atelier sechs (6) Monate Garantie auf die durchgeführte
        Naht oder den Material­einsatz. Geht eine reparierte Stelle innerhalb dieser Frist
        wieder auf, bessern wir kostenlos nach. Verschleiss an einer anderen Stelle des
        Stücks ist nicht erfasst. Reklamationen melde uns innerhalb 30 Tagen nach Feststellung.
      </p>

      <h2>8. Haftung</h2>
      <p>
        Das Atelier haftet bei vorsätzlichem oder grobfahrlässigem Verhalten für direkte
        Schäden, die der Kundin / dem Kunden aus der Ausführung des Auftrages entstehen.
        Eine darüber hinausgehende Haftung — insbesondere für entgangenen Gewinn,
        Folgeschäden, ideelle Schäden oder Schäden an Drittobjekten — ist im Rahmen des
        gesetzlich Zulässigen ausgeschlossen.
      </p>
      <p>
        Stücke, die länger als sechs Monate nach Auftragsbeendigung nicht abgeholt werden,
        können vom Atelier nach vorheriger schriftlicher Mahnung verwertet werden.
      </p>

      <h2>9. Datenschutz</h2>
      <p>
        Die Verarbeitung personenbezogener Daten richtet sich nach der{' '}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <h2>10. Anwendbares Recht und Gerichtsstand</h2>
      <p>
        Es gilt schweizerisches Recht. Gerichtsstand ist {atelier.location.town} (Kanton{' '}
        {atelier.location.canton}), soweit zwingende gesetzliche Bestimmungen keinen
        anderen Gerichtsstand vorsehen.
      </p>
    </article>
  );
}
