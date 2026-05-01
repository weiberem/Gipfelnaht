# Gipfelnaht

> Webseite für ein Näh-Atelier — Bergsport-Reparaturen in Interlaken.
> **Deine Ausrüstung. Heute gebracht, morgen getragen.**

Single-Site für ein einzelnes Atelier (kein Marktplatz, keine Partnerliste).
Daunenjacken, Hardshells, Rucksäcke, Zelte werden lokal in Interlaken
repariert — für das ganze Berner Oberland (Grindelwald, Lauterbrunnen,
Wengen, Mürren). Standard-Turnaround 24–48 h. Optional Nightrepair
(Annahme bis 18:30, Abholung ab 07:00, +CHF 25).

---

## Inhalt

1. [Tech-Stack](#tech-stack)
2. [Setup lokal](#setup-lokal)
3. [Projektstruktur](#projektstruktur)
4. [Inhalte ändern (Content-as-Code)](#inhalte-ändern-content-as-code)
5. [Nightrepair an- oder ausschalten](#nightrepair-an--oder-ausschalten)
6. [Bilder & Fotos](#bilder--fotos)
7. [API-Routen](#api-routen)
8. [Deployment auf Vercel](#deployment-auf-vercel)
9. [Umgebungsvariablen](#umgebungsvariablen)
10. [SEO-Checkliste](#seo-checkliste)
11. [TODOs](#todos)

---

## Tech-Stack

| Ebene          | Technologie                                       |
|----------------|---------------------------------------------------|
| Framework      | Next.js 14 (App Router) + TypeScript strict       |
| Styling        | Tailwind CSS, eigene minimale Komponenten         |
| Formular       | React Hook Form + Zod                             |
| Mailversand    | Resend (transaktional)                            |
| Karte          | Leaflet + OpenStreetMap (kein Google)             |
| PDF            | @react-pdf/renderer + qrcode                      |
| Analytics      | Plausible (optional, cookie-frei)                 |
| Hosting        | Vercel                                            |

Bewusst **nicht** dabei: Datenbank, Login, Backoffice, Online-Bezahlung.
Alle Atelier-Daten leben als TypeScript-Konstanten im Repo. Eine Änderung
am Inhalt ist immer ein Pull Request, kein Datenbank-Update.

---

## Setup lokal

```bash
# Node 20+
npm install
cp .env.example .env.local        # Resend-Key eintragen, optional
npm run dev                       # http://localhost:3000
```

Nützliche Skripte:

```bash
npm run typecheck                 # tsc --noEmit
npm run lint                      # next lint
npm run build && npm start        # Production-Smoke-Test
```

Das Anfrage-Formular funktioniert auch ohne `RESEND_API_KEY` — es loggt
die Anfrage dann nur ins Server-Terminal, statt eine Mail zu schicken.

---

## Projektstruktur

```
app/
  layout.tsx              Root-Layout, Fonts, JSON-LD, Header, Footer
  page.tsx                Startseite
  angebot/                Was wir reparieren
  preise/                 Transparente Preisliste
  so-funktionierts/       Ablauf in 4 Schritten + Nightrepair
  ueber-mich/             Lena, Werkstatt, Werkzeuge
  kontakt/                Anfrageformular + Karte + Adresse
  impressum/, datenschutz/, agb/
  api/
    inquiry/route.ts      POST: Anfrage per Resend
    tag-pdf/route.ts      GET:  A5-Reparatur-Tag (PDF)
  sitemap.ts, robots.ts, not-found.tsx, globals.css

components/
  brand/                  Logo, NightrepairBadge, SustainabilityCounter
  layout/                 Header, Footer
  contact/                InquiryForm (RHF + Zod), AtelierMap (Leaflet)
  common/                 PhotoPlaceholder, PricingTable, SpecialtyChip
  ui/                     Button, Input, Label, Textarea

content/
  atelier.ts              👈 Atelier-Daten (Adresse, Services, Bio …)
  pricing.ts              👈 Preisliste

config/
  brand.ts                Farben, Fonts, Logo-Pfad
  platform.ts             Re-Export von atelier (Legacy-Alias)
  features.ts             Dev-Flags (Foto-Overlay)

lib/
  inquiries.ts            Resend-Wrapper
  pdf-tag.tsx             @react-pdf-Dokument
  taxonomy.ts             Labels für Specialties, Materialien, Services
  seo.ts                  LocalBusiness-JSON-LD
  utils.ts                cn(), formatCHF, formatPriceRange

types/                    Specialty, Material, ServiceOption, Inquiry
```

---

## Inhalte ändern (Content-as-Code)

**Alles, was am Atelier individuell ist**, findet sich in zwei Dateien:

### `content/atelier.ts`

Eine grosse Konstante mit Sub-Objekten:

| Feld                                           | Was                                          |
|------------------------------------------------|----------------------------------------------|
| `name`, `legalName`, `owner`                   | Atelier-Name, Inhaberin, Rechtsform           |
| `shortBio`, `bio`                              | Kurz-Slogan + Absätze für /ueber-mich        |
| `location.*`                                   | Adresse, PLZ, Koordinaten, bediente Orte     |
| `contact.*`                                    | E-Mail, Telefon, WhatsApp, Instagram         |
| `languages`                                    | Sprachen, in denen du beraten kannst         |
| `services.sammelbox.available` etc.            | Welche Übergabe-Optionen aktiv sind          |
| `services.nightrepair.available`               | Nightrepair an/aus (siehe unten)             |
| `payment.{twint, card, cash, invoice}`         | Zahlmittel — werden auf /preise und in AGB   |
|                                                | automatisch ausgegeben                       |
| `openingHours.{weekdays, saturday, sunday}`    | Öffnungszeiten als Klartext                  |
| `capacity.typicalTurnaround`                   | "24–48 h" — wird überall referenziert        |
| `capacity.onHoliday`                           | `null` oder `{ from, to }` für Ferienbanner  |
| `specialties`                                  | Liste der Spezialitäten (Typ `Specialty[]`)  |
| `materials`                                    | Liste Materialien (Typ `Material[]`)         |
| `brandExperience`                              | Marken, mit denen du oft arbeitest           |
| `excludedItems`                                | Was wir **nicht** reparieren (Sicherheit)    |
| `sustainability.repairsCompleted` / `co2SavedKg` | Stats für /ueber-mich (manuell pflegen)    |

Tipp: TypeScript zwingt dich, zulässige Werte für `specialties` etc. zu
verwenden — wenn du dich vertippst, scheitert `npm run build`.

### `content/pricing.ts`

Liste von `PricingItem` mit `type`, `label`, `priceFrom`, `priceTo?`, `note?`.
Reihenfolge ist die Reihenfolge in der Tabelle. Gruppiert in `pricingGroups`
nach grobem Bereich (Risse / Reissverschlüsse / Gurte / Daune & Anpassungen).

### Deployment einer Inhaltsänderung

```
content/atelier.ts ändern  →  git push  →  Vercel baut neu (~30s)  →  live
```

Kein CMS, kein Login, keine Datenbank, kein Risiko, dass jemand falsche
Preise online stellt.

---

## Nightrepair an- oder ausschalten

In `content/atelier.ts`:

```ts
services: {
  nightrepair: {
    available: false,  // ← auf false setzen
    // restliche Felder können bleiben
  },
}
```

Das schaltet automatisch:

- den Nightrepair-Block auf der Startseite aus
- die Nightrepair-Sektion auf /so-funktionierts aus
- die Nightrepair-Option im Anfrage-Formular aus
- den Nightrepair-Aufpreis-Block auf /preise aus
- die Nightrepair-Erwähnung im PDF aus
- den Nightrepair-Absatz in den AGB aus

Es bleibt **nichts** im UI, was dann nicht mehr stimmen würde.

---

## Bilder & Fotos

Aktuell laufen alle Atelier-Fotos auf `<PhotoPlaceholder hint="…" />`. Im
Dev-Mode siehst du den Foto-Hinweis als kleines Schild auf jedem Platzhalter
("FOTO BENÖTIGT: …"); in Production wird der Hint nur als Alt-Text genutzt.

Für die Live-Version brauchst du:

| Slot                                  | Was                                                         |
|---------------------------------------|-------------------------------------------------------------|
| Hero (`/`)                            | Werkstatt-Atmosphäre, Industriemaschine, warme Lampe        |
| "Über mich kurz" (`/`) und `/ueber-mich` | Lena an der Pfaff, Tageslicht von links                  |
| `/ueber-mich` Werkstatt-Doppelbild    | Übersicht + Detail einer reparierten Daunenjacke            |
| `/public/images/og-default.jpg`       | OG-Image für Social Sharing (1200×630)                      |

Foto-Stil: Tageslicht oder warmes Lampenlicht, ruhige Farben (Holz, Stoff,
Metall), keine Stockfotos. Lieber zwei ehrliche Fotos als zehn glatte.

---

## API-Routen

### `POST /api/inquiry`

Body (Zod-validiert):

```ts
{
  name: string;
  email: string;            // valide E-Mail
  phone: string;
  product: 'daunenjacke' | 'hardshell' | 'hose' | 'rucksack' | 'zelt' | 'schlafsack' | 'anderes';
  description: string;      // ≥ 10 Zeichen
  preferredService: 'sammelbox' | 'personal-dropoff' | 'pickup' | 'nightrepair';
  preferredDate?: string;   // ISO-Datum
  acceptPrivacy: true;
}
```

Verschickt zwei Mails über Resend:

1. **An das Atelier** (Reply-To = Kunde) — eingehende Anfrage
2. **An den Kunden** — Bestätigung mit Hinweis "Antwort innerhalb 12 Stunden"

Wenn `RESEND_API_KEY` nicht gesetzt ist, wird die Anfrage nur geloggt — die
UI zeigt trotzdem ein Erfolgs-Feedback an (für lokales Testen).

### `GET /api/tag-pdf`

Erzeugt ein A5-PDF (Vorder- und Rückseite) zum Ausdrucken.
Vorderseite: Felder zum Ausfüllen + Reparatur-Checkboxen + Service-Auswahl.
Rückseite: Ablauf, Garantie, Preisrahmen (Top 6), QR-Code zur Kontakt-Seite,
Nachhaltigkeits-Hinweis. Kann verlinkt oder im Atelier auf Vorrat gedruckt
werden (z. B. für die Sammelbox).

---

## Deployment auf Vercel

1. Repo bei GitHub einrichten, Branch `main`.
2. In Vercel "Import Project", als Framework Next.js erkennen lassen.
3. Umgebungsvariablen aus `.env.example` setzen (siehe nächster Abschnitt).
4. Deploy. Domain `gipfelnaht.ch` über Vercel-DNS oder einen externen
   DNS-Anbieter (CNAME auf `cname.vercel-dns.com`) auflösen.
5. Resend: Domain (`gipfelnaht.ch`) verifizieren — Vercel zeigt die
   nötigen DKIM/SPF-Einträge an.

Build: `npm run build` (Vercel default).
Region: Frankfurt (`fra1`) — kürzeste Latenz für Schweizer Besucher:innen.

---

## Umgebungsvariablen

| Variable                       | Pflicht? | Was                                                  |
|--------------------------------|----------|------------------------------------------------------|
| `RESEND_API_KEY`               | empfohlen | Sonst keine Mails — nur Logging.                    |
| `EMAIL_FROM`                   | empfohlen | Verifizierte Absender-Adresse in Resend.            |
| `EMAIL_PLATFORM`               | empfohlen | Postfach, das Anfragen erhält.                      |
| `NEXT_PUBLIC_SITE_URL`         | ja        | Für Sitemap, OG-Tags, QR-Code im PDF.                |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | nein      | Wenn gesetzt, lädt das Plausible-Skript automatisch. |

`.env.example` zeigt alle Variablen mit kurzen Erklärungen.

---

## SEO-Checkliste

Vor dem Go-Live:

- [ ] **Google Business Profile** anlegen und mit derselben Adresse pflegen
      wie in `content/atelier.ts`. Foto, Öffnungszeiten und Webseite hinzufügen.
- [ ] **OG-Image** unter `public/images/og-default.jpg` ablegen (1200×630).
- [ ] **Domain bei Resend verifizieren** (DKIM, SPF, DMARC), sonst landen
      Bestätigungsmails im Spam.
- [ ] **Plausible** einrichten (optional) und Domain in `.env` eintragen —
      dann wird der Reichweiten-Hinweis im Datenschutz automatisch ein-
      geblendet.
- [ ] **JSON-LD prüfen**: `https://search.google.com/test/rich-results` mit
      der produktiven URL. Sollte ein gültiges `LocalBusiness`-Schema melden.
- [ ] **Lighthouse**: 95+ in allen vier Kategorien — fast vom Start weg
      gegeben dank statischer Seiten und cookie-freier Analytics.
- [ ] **sitemap.xml** und **robots.txt** sind automatisch unter
      `/sitemap.xml` und `/robots.txt` erreichbar.
- [ ] **lokale Keywords**: "Jacke reparieren Interlaken",
      "Daunenjacke flicken Berner Oberland", "Outdoor Reparatur Interlaken
      Grindelwald Lauterbrunnen". Sind in den Meta-Tags und Page-Headlines
      verteilt.

---

## TODOs

Pragmatische Annahmen, die für den Produktivbetrieb noch entschieden werden
müssen — sie tauchen im Code als Kommentar `TODO:` auf:

- **UID/MwSt-Nummer** im Impressum: aktuell Platzhalter (`CHE-XXX.XXX.XXX`).
- **Echte Telefonnummer und WhatsApp-Nummer** in `content/atelier.ts`
  setzen (aktuell Platzhalter).
- **Echte Geokoordinaten** prüfen (`lat`, `lng`). Aktuell: Interlaken-Zentrum (Höheweg).
- **Eröffnungsdatum / `founded`** und `yearsExperience` an die echte Bio
  anpassen.
- **OG-Image** muss noch erstellt werden (siehe SEO-Checkliste).
- **Foto-Slots** durch echte Aufnahmen ersetzen — Hinweise findest du in
  jedem `<PhotoPlaceholder hint="…" />`.

Wenn etwas davon in deine Kontroll-Schleife wandert, ersetze einfach den
Wert in `content/atelier.ts` und entferne den TODO-Kommentar.
