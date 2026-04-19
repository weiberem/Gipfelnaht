import type { Metadata } from 'next';
import { platform } from '@/config/platform';

export const metadata: Metadata = {
  title: 'Datenschutz',
};

export default function DatenschutzPage() {
  return (
    <section className="section container-narrow">
      <h1 className="font-serif text-4xl text-forest-dark">Datenschutzerklärung</h1>
      <p className="mt-3 text-sm text-stone">
        Stand: {new Date().toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' })}
      </p>

      <div className="prose-gipfel mt-8">
        <h2>Verantwortliche Stelle</h2>
        <p>
          {platform.legalName}, {platform.owner.address}, {platform.owner.postalCode}{' '}
          {platform.owner.town}. Kontakt:{' '}
          <a href={`mailto:${platform.contact.email}`}>{platform.contact.email}</a>.
        </p>

        <h2>Welche Daten wir verarbeiten</h2>
        <h3>Reparatur-Anfragen</h3>
        <p>
          Wenn du über das Anfrageformular eine Reparatur anfragst, verarbeiten wir Name,
          E-Mail, Telefon, Produktbeschreibung und gewünschten Service. Diese Daten werden
          ausschliesslich an den ausgewählten Partner sowie zur Qualitätssicherung an
          Gipfelnaht weitergeleitet.
        </p>

        <h3>Partner-Bewerbungen</h3>
        <p>
          Bewerbungsdaten werden ausschliesslich für die Prüfung und — im Falle einer Zusammenarbeit —
          für die Onboarding-Kommunikation verwendet. Ablehnungen führen zur Löschung spätestens
          nach 6 Monaten.
        </p>

        <h3>Analytics</h3>
        <p>
          Wir setzen Plausible / Umami Analytics ein. Diese Dienste arbeiten cookie-frei und
          erheben keine personenbezogenen Daten (keine IP-Speicherung, kein Fingerprinting).
        </p>

        <h2>Hosting und Drittdienste</h2>
        <ul>
          <li>Hosting: Vercel Inc. (Web-Infrastruktur, EU-Region wo möglich)</li>
          <li>Transaktionale E-Mails: Resend</li>
          <li>Karten: OpenStreetMap</li>
        </ul>

        <h2>Deine Rechte</h2>
        <p>
          Nach Schweizer Datenschutzgesetz (revDSG) hast du Anspruch auf Auskunft,
          Berichtigung, Löschung und Datenübertragbarkeit. Kontaktiere uns dazu über{' '}
          <a href={`mailto:${platform.contact.email}`}>{platform.contact.email}</a>.
        </p>

        <h2>Aufbewahrungsdauer</h2>
        <p>
          Anfragedaten werden 24 Monate aufbewahrt, sofern du keine frühere Löschung verlangst.
          Gesetzliche Aufbewahrungspflichten bleiben unberührt.
        </p>
      </div>
    </section>
  );
}
