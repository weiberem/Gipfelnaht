import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'AGB' };

export default function AgbPage() {
  return (
    <section className="section container-narrow">
      <h1 className="font-serif text-4xl text-forest-dark">Allgemeine Geschäftsbedingungen</h1>

      <div className="prose-gipfel mt-8">
        <h2>1. Geltungsbereich</h2>
        <p>
          Diese AGB regeln die Nutzung der Plattform Gipfelnaht durch Kund:innen (Auftraggeber:innen)
          und Näh-Spezialist:innen (Partner).
        </p>

        <h2>2. Rolle der Plattform</h2>
        <p>
          Gipfelnaht ist eine Vermittlungsplattform. Die Plattform vermittelt den Kontakt
          zwischen Kund:innen und Partnern. Der Reparaturvertrag kommt ausschliesslich zwischen
          Kund:in und Partner zustande. Gipfelnaht wird nicht Vertragspartei des Reparaturvertrags
          und haftet nicht für die Reparaturleistung.
        </p>

        <h2>3. Reparatur-Anfragen</h2>
        <p>
          Eine über die Plattform gestellte Anfrage ist unverbindlich. Sie wird an den Partner
          weitergeleitet, der innerhalb 12 Stunden eine Einschätzung zurückmeldet. Der Vertrag
          kommt durch Bestätigung der Offerte zwischen Kund:in und Partner zustande.
        </p>

        <h2>4. Preise und Zahlung</h2>
        <p>
          Preise werden vom jeweiligen Partner festgelegt. Die Zahlung erfolgt direkt beim Partner,
          in der Regel bei Abholung der reparierten Ware (Twint, Karte oder bar, je nach Partner).
        </p>

        <h2>5. Gewährleistung</h2>
        <p>
          Auf Reparaturen gewähren die Partner eine Garantie von mindestens 6 Monaten auf
          die ausgeführte Arbeit. Details auf der jeweiligen Partner-Seite. Garantieansprüche sind
          direkt gegenüber dem Partner geltend zu machen.
        </p>

        <h2>6. Ausgeschlossene Reparaturen</h2>
        <p>
          Sicherheitsrelevante Ausrüstung (u.a. Klettergurte, Seile, Karabiner, Helme,
          Lawinen-Airbags, Paragliding-Kappen) wird über die Plattform nicht vermittelt.
          Für solche Produkte ist der Hersteller bzw. ein zertifizierter Fachbetrieb zuständig.
        </p>

        <h2>7. Datenschutz</h2>
        <p>
          Es gilt unsere <a href="/datenschutz">Datenschutzerklärung</a>.
        </p>

        <h2>8. Änderungen</h2>
        <p>
          Gipfelnaht kann diese AGB ändern. Nutzer:innen werden über wesentliche Änderungen
          informiert.
        </p>

        <h2>9. Anwendbares Recht, Gerichtsstand</h2>
        <p>
          Es gilt Schweizer Recht. Gerichtsstand ist der Sitz der Plattform.
        </p>
      </div>
    </section>
  );
}
