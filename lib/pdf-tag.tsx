import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Circle,
} from '@react-pdf/renderer';
import { atelier } from '@/content/atelier';
import { brand } from '@/config/brand';
import { pricing } from '@/content/pricing';

const C = brand.colors;

const styles = StyleSheet.create({
  page: {
    backgroundColor: C.cream,
    padding: 28,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: C.forestDark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingBottom: 12,
    marginBottom: 16,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  wordmark: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: C.forestDark },
  location: {
    fontSize: 8,
    color: C.stone,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  contactBlock: { textAlign: 'right' },
  contactPrimary: { fontSize: 9, color: C.forestDark, fontFamily: 'Helvetica-Bold' },
  contactSecondary: { fontSize: 8, color: C.stone, marginTop: 2 },
  headline: {
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    color: C.forestDark,
    marginBottom: 4,
  },
  subheadline: { fontSize: 9, color: C.stone, marginBottom: 16 },
  sectionTitle: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: C.stone,
    marginTop: 10,
    marginBottom: 4,
  },
  field: { borderBottomWidth: 0.75, borderBottomColor: C.border, paddingVertical: 7 },
  fieldLabel: { fontSize: 8, color: C.stone, marginBottom: 2 },
  fieldHint: { fontSize: 7, color: C.stone, fontStyle: 'italic' },
  row: { flexDirection: 'row', gap: 10 },
  box: {
    borderWidth: 0.75,
    borderColor: C.border,
    padding: 6,
    borderRadius: 3,
    flex: 1,
    minHeight: 24,
  },
  checkRow: { flexDirection: 'row', gap: 8, marginVertical: 4, flexWrap: 'wrap' },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 4, marginRight: 10 },
  checkBox: { width: 9, height: 9, borderWidth: 1, borderColor: C.forestDark, borderRadius: 1 },
  checkLabel: { fontSize: 8, color: C.forestDark },
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 28,
    right: 28,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footerText: { fontSize: 7, color: C.stone, maxWidth: 320 },
  night: {
    color: C.forestDark,
    backgroundColor: C.night,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
  },
});

function LogoPdf() {
  return (
    <Svg width={30} height={30} viewBox="0 0 48 48">
      <Path
        d="M4 38 L18 14 L26 26 L34 10 L44 38 Z"
        stroke={C.forestDark}
        strokeWidth={2.4}
        fill="none"
      />
      <Path
        d="M8 41 C 16 37, 24 45, 32 41 C 38 38, 42 41, 44 41"
        stroke={C.terracotta}
        strokeWidth={1.6}
        fill="none"
      />
      <Circle cx={44} cy={41} r={1.6} fill={C.terracotta} />
    </Svg>
  );
}

interface Props {
  qrDataUrl: string;
  contactUrl: string;
}

const repairTypes = [
  'Riss / Loch',
  'Reissverschluss-Schieber',
  'Reissverschluss komplett',
  'Naht aufgegangen',
  'Nahtband / Membran',
  'Daune nachfüllen',
  'Gummizug / Kordel',
  'Klett / Druckknopf',
  'Patch / Aufnäher',
  'Anderes',
];

export function TagDocument({ qrDataUrl, contactUrl }: Props) {
  const np = atelier.services.nightrepair;
  const paymentMethods = [
    atelier.payment.twint && 'Twint',
    atelier.payment.card && 'Karte',
    atelier.payment.cash && 'bar',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Document title={`${atelier.name} — Reparatur-Tag`}>
      {/* VORDERSEITE */}
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LogoPdf />
            <View>
              <Text style={styles.wordmark}>{atelier.name}</Text>
              <Text style={styles.location}>{atelier.location.town}</Text>
            </View>
          </View>
          <View style={styles.contactBlock}>
            <Text style={styles.contactPrimary}>{atelier.location.address}</Text>
            <Text style={styles.contactSecondary}>
              {atelier.location.postalCode} {atelier.location.town}
            </Text>
            <Text style={styles.contactSecondary}>{atelier.contact.phoneDisplay}</Text>
            <Text style={styles.contactSecondary}>{atelier.contact.email}</Text>
          </View>
        </View>

        <Text style={styles.headline}>Reparatur-Auftrag</Text>
        <Text style={styles.subheadline}>
          Ausfüllen und mit der Ausrüstung in die Sammelbox oder persönlich abgeben.
          Antwort innerhalb 12 Stunden.
        </Text>

        <Text style={styles.sectionTitle}>Deine Kontaktdaten</Text>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Name</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Telefon / WhatsApp</Text>
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>E-Mail</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Art der Reparatur</Text>
        <View style={styles.checkRow}>
          {repairTypes.map((r) => (
            <View key={r} style={styles.checkItem}>
              <View style={styles.checkBox} />
              <Text style={styles.checkLabel}>{r}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.box, { minHeight: 50, marginTop: 4 }]}>
          <Text style={styles.fieldHint}>
            Beschreibung (Stelle am Stück, Grösse des Schadens, Material wenn bekannt):
          </Text>
        </View>
        <Text style={[styles.fieldHint, { marginTop: 4 }]}>
          Fotos sind hilfreich — schick sie per WhatsApp an {atelier.contact.whatsapp}.
        </Text>

        <Text style={styles.sectionTitle}>Gewünschter Service</Text>
        <View style={styles.checkRow}>
          <View style={styles.checkItem}>
            <View style={styles.checkBox} />
            <Text style={styles.checkLabel}>
              Standard ({atelier.capacity.typicalTurnaround})
            </Text>
          </View>
          {np.available && (
            <View style={styles.checkItem}>
              <View style={styles.checkBox} />
              <Text style={[styles.checkLabel, styles.night]}>
                Nightrepair (+CHF {np.surcharge})
              </Text>
            </View>
          )}
          <View style={styles.checkItem}>
            <View style={styles.checkBox} />
            <Text style={styles.checkLabel}>Express (nach Absprache)</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Wunsch-Termin (Abholung)</Text>
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Besondere Hinweise</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Vom Atelier auszufüllen</Text>
        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Auftragsnummer</Text>
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Eingang am</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {atelier.legalName} — {contactUrl}
            {'\n'}{atelier.contact.email} · {atelier.contact.phoneDisplay}
          </Text>
          <Image src={qrDataUrl} style={{ width: 50, height: 50 }} />
        </View>
      </Page>

      {/* RÜCKSEITE */}
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LogoPdf />
            <Text style={styles.wordmark}>{atelier.name}</Text>
          </View>
          <Text style={styles.contactSecondary}>Rückseite — bitte aufbewahren</Text>
        </View>

        <Text style={styles.headline}>Ablauf</Text>
        <Text style={{ fontSize: 9, marginBottom: 10, color: C.stone }}>
          1. Tag ausfüllen, mit der Ausrüstung in die Sammelbox oder persönlich abgeben.{'\n'}
          2. Antwort innerhalb 12 Stunden mit Einschätzung und Preisrahmen.{'\n'}
          3. Reparatur — Standard {atelier.capacity.typicalTurnaround}.
          {np.available
            ? ` Nightrepair: Annahme bis ${np.acceptanceDeadline}, Abholung ab ${np.pickupFrom}.`
            : ''}
          {'\n'}4. Abholung und Bezahlung im Atelier ({paymentMethods}).
        </Text>

        <Text style={styles.sectionTitle}>Garantie</Text>
        <Text style={{ fontSize: 9, marginBottom: 6 }}>
          6 Monate Garantie auf jede Naht und jeden Material­einsatz. Sicherheits­ausrüstung
          (Klettergurte, Seile, Helme, Lawinen-Airbags, Paragliding-Kappen) wird grundsätzlich
          nicht repariert — bitte direkt zum Hersteller.
        </Text>

        <Text style={styles.sectionTitle}>Preisrahmen (orientierend)</Text>
        {pricing.slice(0, 6).map((p, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 3,
              borderBottomWidth: 0.5,
              borderBottomColor: C.border,
            }}
          >
            <Text style={{ fontSize: 8, color: C.forestDark }}>{p.label}</Text>
            <Text style={{ fontSize: 8, color: C.forestDark }}>
              CHF {p.priceFrom}
              {p.priceTo ? ` – ${p.priceTo}` : ''}
            </Text>
          </View>
        ))}
        <Text style={[styles.fieldHint, { marginTop: 6 }]}>
          Komplexere Reparaturen nach individueller Offerte. Vollständige Liste:{' '}
          {atelier.siteUrl}/preise
        </Text>

        <Text style={styles.sectionTitle}>Nachhaltigkeits-Versprechen</Text>
        <Text style={{ fontSize: 9 }}>
          Eine reparierte Daunenjacke spart rund 25 kg CO₂ gegenüber einem Neukauf. Stoffreste
          gehen ins Patch-Lager, alte Reissverschlüsse ins Ersatzteil-Regal. Reparieren statt
          wegwerfen — ohne Greenwashing.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {atelier.location.address}, {atelier.location.postalCode} {atelier.location.town}
            {'\n'}{atelier.contact.email} · {atelier.contact.phoneDisplay}
          </Text>
          <Image src={qrDataUrl} style={{ width: 50, height: 50 }} />
        </View>
      </Page>
    </Document>
  );
}
