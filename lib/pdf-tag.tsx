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
import type { Partner } from '@/types';
import { brand } from '@/config/brand';
import { platform } from '@/config/platform';

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
  location: { fontSize: 8, color: C.stone, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
  partnerBlock: { textAlign: 'right' },
  partnerName: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.forestDark },
  partnerAddr: { fontSize: 8, color: C.stone, marginTop: 2 },
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
  night: { color: C.forestDark, backgroundColor: C.night, padding: 2, borderRadius: 2 },
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
  partner: Partner;
  qrDataUrl: string;
  profileUrl: string;
}

export function TagDocument({ partner, qrDataUrl, profileUrl }: Props) {
  const repairTypes = ['Riss', 'Reissverschluss-Schieber', 'Naht', 'Gummizug', 'Klett', 'Patch'];

  return (
    <Document title={`Gipfelnaht Tag — ${partner.businessName}`}>
      {/* VORDERSEITE */}
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LogoPdf />
            <View>
              <Text style={styles.wordmark}>Gipfelnaht</Text>
              <Text style={styles.location}>{partner.location.town}</Text>
            </View>
          </View>
          <View style={styles.partnerBlock}>
            <Text style={styles.partnerName}>{partner.businessName}</Text>
            <Text style={styles.partnerAddr}>{partner.location.address}</Text>
            {partner.contact.phone && (
              <Text style={styles.partnerAddr}>{partner.contact.phone}</Text>
            )}
          </View>
        </View>

        <Text style={styles.headline}>Reparatur-Auftrag</Text>
        <Text style={styles.subheadline}>
          Ausfüllen und mit der Ausrüstung in die Sammelbox oder persönlich abgeben.
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
        <View style={[styles.box, { minHeight: 48 }]}>
          <Text style={styles.fieldHint}>Beschreibung (Ort am Stück, Grösse des Schadens):</Text>
        </View>
        <Text style={[styles.fieldHint, { marginTop: 4 }]}>
          Falls Fotos hilfreich sind: per WhatsApp an {partner.contact.whatsapp ?? partner.contact.phone ?? partner.contact.email}
        </Text>

        <Text style={styles.sectionTitle}>Gewünschter Service</Text>
        <View style={styles.checkRow}>
          <View style={styles.checkItem}>
            <View style={styles.checkBox} />
            <Text style={styles.checkLabel}>Standard (24–48h)</Text>
          </View>
          {partner.services.nightrepair.available && (
            <View style={styles.checkItem}>
              <View style={styles.checkBox} />
              <Text style={[styles.checkLabel, styles.night]}>
                Nightrepair (+CHF {partner.services.nightrepair.surcharge})
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
            <Text style={styles.fieldLabel}>Gewünschter Abholtermin</Text>
          </View>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Besondere Hinweise</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Von der Werkstatt auszufüllen</Text>
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
            {platform.legalName} — {profileUrl}
            {'\n'}Fragen: {platform.contact.email}
          </Text>
          <Image src={qrDataUrl} style={{ width: 50, height: 50 }} />
        </View>
      </Page>

      {/* RÜCKSEITE */}
      <Page size="A5" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LogoPdf />
            <Text style={styles.wordmark}>Gipfelnaht</Text>
          </View>
          <Text style={styles.partnerAddr}>Rückseite</Text>
        </View>

        <Text style={styles.headline}>Zum Ablauf</Text>
        <Text style={{ fontSize: 9, marginBottom: 10, color: C.stone }}>
          1. Du füllst die Vorderseite aus und gibst sie mit der Ausrüstung ab.{'\n'}
          2. Der Partner meldet sich innerhalb von 12 Stunden mit Einschätzung + Offerte.{'\n'}
          3. Reparatur wird durchgeführt. Standard 24–48h.
          {partner.services.nightrepair.available ? ' Nightrepair: Annahme bis ' + partner.services.nightrepair.acceptanceDeadline + ', Abholung ab ' + partner.services.nightrepair.pickupFrom + '.' : ''}
          {'\n'}4. Du zahlst bei Abholung direkt beim Partner (Twint, Karte, bar — nach Partner).
        </Text>

        <Text style={styles.sectionTitle}>Wichtige Hinweise</Text>
        <Text style={{ fontSize: 9, marginBottom: 6 }}>
          Gipfelnaht ist Vermittler. Der Reparaturvertrag kommt direkt zwischen dir und
          {' '}{partner.businessName} zustande. Auf die Arbeit gewährt der Partner mindestens 6 Monate Garantie.
          Details: {platform.siteUrl}/agb.
        </Text>

        <Text style={styles.sectionTitle}>Preisrahmen (orientierend)</Text>
        {partner.pricing.slice(0, 5).map((p, i) => (
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

        <Text style={styles.sectionTitle}>Unser Nachhaltigkeits-Versprechen</Text>
        <Text style={{ fontSize: 9 }}>
          Diese Reparatur spart im Schnitt rund 25 kg CO₂ gegenüber einem Neukauf. Stoffreste werden
          wiederverwendet. Transparent und ohne Greenwashing.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {partner.businessName} — {partner.location.address}
            {'\n'}{partner.contact.email}
            {partner.contact.phone ? ' · ' + partner.contact.phone : ''}
          </Text>
          <Image src={qrDataUrl} style={{ width: 50, height: 50 }} />
        </View>
      </Page>
    </Document>
  );
}
