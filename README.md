# Gipfelnaht

> Plattform für Näh-Reparaturen von Bergsport-Ausrüstung in den Schweizer Alpen.
> **Heute bringen. Morgen tragen.**

Lokale Näh-Spezialist:innen reparieren Daunenjacken, Hardshells, Zelte & Co. — schnell, fachgerecht, nachhaltig. Kund:innen finden Partner über die Plattform, vergleichen Spezialisierungen und geben Reparaturen direkt beim Atelier in Auftrag.

---

## Inhalt

1. [Tech-Stack](#tech-stack)
2. [Setup lokal](#setup-lokal)
3. [Projektstruktur](#projektstruktur)
4. [Partner pflegen (Content-as-Code)](#partner-pflegen-content-as-code)
5. [Design-System](#design-system)
6. [Preise, Texte, Farben ändern](#preise-texte-farben-ändern)
7. [API-Routen](#api-routen)
8. [Deployment auf Vercel](#deployment-auf-vercel)
9. [Architektur-Übersicht](#architektur-übersicht)
10. [Phase-2-Roadmap](#phase-2-roadmap)
11. [TODOs / offene Entscheidungen](#todos--offene-entscheidungen)

---

## Tech-Stack

| Ebene            | Technologie                                              |
|------------------|----------------------------------------------------------|
| Framework        | Next.js 14 (App Router) + TypeScript strict             |
| Styling          | Tailwind CSS + CSS-Variablen, selektiv Radix-UI-Primitives |
| Forms            | React Hook Form + Zod                                    |
| i18n             | next-intl (DE primär, EN sekundär, FR/IT als Gerüst)     |
| E-Mail           | Resend (Inquiry an Partner + CC Plattform + Kunden-Bestätigung) |
| Karten           | Leaflet + OpenStreetMap (DSG-freundlich, keine Google-Dependency) |
| PDF              | @react-pdf/renderer (dynamische Reparatur-Tags pro Partner) |
| Analytics        | Plausible / Umami (cookie-frei — deshalb kein Cookie-Banner) |
| Deployment       | Vercel                                                   |

---

## Setup lokal

### Voraussetzungen
- Node.js 20+
- npm 10+

### Schritte

```bash
# Repo klonen
git clone <repo-url> gipfelnaht
cd gipfelnaht

# Dependencies installieren
npm install

# Umgebungsvariablen setzen
cp .env.example .env.local
# und RESEND_API_KEY etc. eintragen (für Entwicklung nicht zwingend —
# ohne Schlüssel loggt die Inquiry einfach in die Konsole)

# Dev-Server starten
npm run dev
```

Browser öffnen: <http://localhost:3000>

### Nützliche Skripte

```bash
npm run dev        # Next dev server
npm run build      # Production build
npm run start      # Start production build
npm run typecheck  # Nur TypeScript (tsc --noEmit)
npm run lint       # ESLint
```

---

## Projektstruktur

```
app/
  layout.tsx                    # Root-Layout (Fonts, i18n-Provider, JSON-LD)
  (public)/                     # Öffentliche Routen
    layout.tsx                    # Public Header + Footer
    page.tsx                      # Startseite /
    partner/                      # /partner und /partner/[slug]
    nightrepair/                  # /nightrepair Landingpage
    angebot/                      # /angebot — was wird repariert
    nachhaltigkeit/               # /nachhaltigkeit
    so-funktionierts/
    partner-werden/               # Bewerbungsformular
    ueber-uns/ / faq/ / kontakt/
    impressum/ / datenschutz/ / agb/
  (auth)/                       # Phase-2-Platzhalter (login, register)
  (dashboard)/                  # Phase-2-Platzhalter (admin, kunde, mein-atelier)
  api/                          # API-Routen
    inquiry/route.ts
    partner-application/route.ts
    tag-pdf/[slug]/route.ts
  sitemap.ts / robots.ts / not-found.tsx

components/
  brand/                        # Logo, NightrepairBadge, SustainabilityCounter
  layout/                       # Header, Footer, LanguageSwitcher
  ui/                           # Button, Input, Textarea, Label, Dialog
  common/                       # PhotoPlaceholder, SpecialtyChip, ServiceIcon,
                                # PricingTable, BeforeAfterSlider, Phase2Placeholder
  home/                         # QuickSearch (Startseite)
  partner/                      # PartnerCard, Map, FilterPanel, ComparisonTable,
                                # InquiryModal, PartnerExplorer

content/
  partners/                     # Eine JSON-Datei pro Partner (Source of Truth Phase 1)
  pages/faq.json

lib/
  partners.ts                   # Partner-Service (wird in Phase 2 gegen Supabase getauscht)
  partner-schema.ts             # Zod-Validation für Partner-Dateien
  inquiries.ts                  # Mail-Versand via Resend
  pdf-tag.tsx                   # @react-pdf/renderer Dokument
  taxonomy.ts                   # Specialty/Material/RepairType Labels
  seo.ts                        # JSON-LD Builders
  utils.ts                      # cn(), formatCHF()

config/
  brand.ts                      # Markenfarben, Fonts, Logo-Pfad, Tagline
  platform.ts                   # Betreiber-Daten, Impact-Counter, Partner-Preismodell
  features.ts                   # Feature-Flags (ENABLE_AUTH etc.)

types/                          # Partner, Inquiry, Enums
messages/                       # de.json, en.json (vollständig), fr.json, it.json (Gerüst)
i18n.ts                         # next-intl Konfiguration
```

---

## Partner pflegen (Content-as-Code)

Ein neuer Partner wird als JSON-Datei unter `content/partners/<slug>.json` angelegt und in `lib/partners.ts` im Import-Block ergänzt.

### Neuen Partner hinzufügen

1. Datei anlegen: `content/partners/dein-slug.json`.
2. Struktur folgt dem TypeScript-Type `Partner` in `types/partner.ts`. Zod-Schema in `lib/partner-schema.ts` validiert zur Runtime — falsche Felder loggen in Dev eine Fehlermeldung und der Partner wird nicht angezeigt.
3. Import in `lib/partners.ts` ergänzen:
   ```ts
   import deinPartner from '@/content/partners/dein-slug.json';
   const partnerSources: unknown[] = [mueller, alpennadel, bergfaden, deinPartner];
   ```
4. `npm run dev` — der neue Partner erscheint auf `/partner` und unter `/partner/dein-slug`.
5. Sitemap, Filter und Karte nehmen den Partner automatisch auf.

### Partner deaktivieren

`"active": false` in der JSON setzen — der Partner verschwindet aus der öffentlichen Liste, Profil-URL bleibt aber routbar (praktisch während Ferien).

### Fotos

Alle Foto-Pfade zeigen auf `/public/images/placeholders/*`. Ersetze sie durch echte Fotos. Solange nur Platzhalter vorhanden sind, zeigt die `PhotoPlaceholder`-Komponente einen klaren Hinweis ("FOTO BENÖTIGT: …") — in Production dezenter (siehe `config/features.ts`).

### Preise

Preise sind Teil der Partner-JSON unter `pricing`. Der Partner pflegt sie selbst (via Change-Request bei dir). In Phase 2 wandert das in ein Partner-Dashboard.

---

## Design-System

### Farben (als CSS-Variablen in `app/globals.css`)

| Variable              | Hex      | Einsatz                                    |
|-----------------------|----------|--------------------------------------------|
| `--color-cream`       | `#F5F1EA`| Basis-Hintergrund                          |
| `--color-cream-warm`  | `#EDE6D8`| Card-Hintergrund, sanfte Sektionen         |
| `--color-forest`      | `#1F3A2E`| Primär, Text, Buttons                      |
| `--color-forest-dark` | `#0D1F1A`| Headlines, Hover-States                    |
| `--color-terracotta`  | `#B8694A`| CTA-Akzent                                 |
| `--color-lake`        | `#2E5F7A`| Sekundär-Akzent, Links                     |
| `--color-night`       | `#D4B16A`| **Nur** für Nightrepair-Elemente           |
| `--color-stone`       | `#6B6B6B`| Sekundärtext                               |
| `--color-border`      | `#D8D2C4`| Ränder                                     |

### Typografie

- **Fraunces** (via `next/font/google`) — Headlines, Logo
- **Inter** (via `next/font/google`) — Body

### Komponenten-Konventionen

- Abgerundete Ecken: `6–10 px` (solid, nicht "weich")
- Dezente Schatten: `shadow-card`, `shadow-hover`
- Icons ausschliesslich **Lucide**
- `NightrepairBadge` ist die einzige Komponente, die `--color-night` verwendet — konsequent nur für Nightrepair

---

## Preise, Texte, Farben ändern

| Was                           | Wo                                                                 |
|-------------------------------|--------------------------------------------------------------------|
| Markenname, Tagline, Farben   | `config/brand.ts` + `app/globals.css`                              |
| Betreiber-Kontakt, Impressum  | `config/platform.ts`                                               |
| Impact-Counter (Phase 1)      | `config/platform.ts` → `impact.*`                                  |
| Partner-Onboarding-Preise     | `config/platform.ts` → `partnerPricing`                            |
| Partner-Daten / Preise        | `content/partners/<slug>.json`                                     |
| FAQ-Einträge                  | `content/pages/faq.json`                                           |
| Texte (DE/EN)                 | `messages/de.json`, `messages/en.json`                             |
| Feature-Flags                 | `config/features.ts`                                               |

---

## API-Routen

### `POST /api/inquiry`

Versendet eine Reparatur-Anfrage. Body validiert via Zod. Verschickt zwei Mails:

1. An den Partner (mit Kund:in als Reply-To, Plattform im CC)
2. An die Kund:in als Bestätigung

Ohne `RESEND_API_KEY` in der Umgebung wird der Versand nur geloggt — praktisch in der Entwicklung.

### `POST /api/partner-application`

Versendet eine Partner-Bewerbung an `EMAIL_PLATFORM`.

### `GET /api/tag-pdf/[slug]`

Generiert zur Laufzeit ein A5-PDF-Tag (Vorderseite mit Ausfüll-Feldern, Rückseite mit AGB-Kurzfassung, Preisrahmen, QR-Code zum Partner-Profil). Output: `application/pdf` inline.

### `GET /sitemap.xml`

Automatisch aus `app/sitemap.ts` — umfasst alle statischen Seiten + alle aktiven Partner.

### `GET /robots.txt`

Automatisch aus `app/robots.ts`.

---

## Deployment auf Vercel

1. Vercel-Projekt erstellen, Repo verbinden.
2. Environment-Variablen setzen (aus `.env.example` übernehmen):
   - `RESEND_API_KEY`
   - `EMAIL_FROM` — verifizierte Absenderadresse
   - `EMAIL_PLATFORM` — CC-Adresse für Monitoring
   - `NEXT_PUBLIC_SITE_URL` — z.B. `https://gipfelnaht.ch`
   - (optional) `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
3. Build-Kommando: `next build` (Default).
4. Deploy. Custom-Domain mit CH-Ländercode als Weiche einrichten.
5. `EMAIL_FROM`-Domain im Resend-Dashboard über SPF/DKIM verifizieren.

---

## Architektur-Übersicht

### Service-Pattern (wichtig für Phase 2)

Sämtliche Partner-Daten fliessen durch `lib/partners.ts`:

- `getAllPartners()` — alle aktiven Partner
- `getPartnerBySlug(slug)` — einzelner Partner
- `getAllPartnerSlugs()` — für `generateStaticParams`
- `filterPartners(filter)` — Server-Side-Filter
- `getFeaturedPartners(n)` — für Startseite
- `getNightrepairPartners()` — für Nightrepair-Landingpage

In Phase 1 lesen diese Funktionen aus JSON-Dateien. In Phase 2 werden nur die Implementierungen gegen Supabase-Queries getauscht — **alle Consumer bleiben unverändert**.

Analog `lib/inquiries.ts`:
- Phase 1: Resend-Versand
- Phase 2: zusätzlich Supabase-Insert (Aufträge-Tabelle) + Resend

### Route-Groups

- `app/(public)/*` — öffentliche Seiten, Header+Footer aus `Header.tsx`/`Footer.tsx`
- `app/(auth)/*` — Placeholder für Login/Register in Phase 2
- `app/(dashboard)/*` — Placeholder für Admin/Partner/Kunde in Phase 2

Phase-2-Routen sind bewusst angelegt, damit die Navigationsstruktur nicht später umgebaut werden muss.

### i18n

- `next-intl` geladen via `next.config.mjs`-Plugin
- Messages in `messages/*.json`
- Default-Locale: **de**
- Sprachumschalter aktuell dekorativ (alle Locales zeigen DE). Bei Aktivierung müssen Middleware + URL-Präfixe eingerichtet werden.

---

## Phase-2-Roadmap

Was kommt, wenn Logins/Payments aktiviert werden:

1. **Auth**: Supabase Auth, drei Rollen (`admin`, `partner`, `customer`)
2. **Datenbank**: Supabase Postgres. Migration von JSON → DB:
   - `partners`-Tabelle mit dem existierenden Partner-Schema
   - `inquiries`-Tabelle (wird befüllt, sobald `lib/inquiries.ts` auf DB schreibt)
   - `orders`, `offers`, `reviews`, `partner_applications`
3. **Zahlungen**: Stripe Connect mit Twint-Payment-Method. Commission-Splits zwischen Plattform und Partner. Webhooks unter `app/api/stripe/webhook/route.ts`.
4. **Dashboards** (Routen bereits angelegt):
   - `/mein-atelier` → Partner-Dashboard: Aufträge, Kapazität, Bewertungen, Abrechnung
   - `/kunde` → Auftragshistorie, gespeicherte Werkstätten, Rechnungen
   - `/admin` → Plattform-Backoffice, Partner-Verwaltung, Reports
5. **Bewertungen**: öffentlich sichtbar, Supabase-Tabelle mit Moderation
6. **Feature-Flags** in `config/features.ts` auf `true` setzen und abhängige Features scharf schalten.

---

## TODOs / offene Entscheidungen

Bewusst im Code markiert, Zentrale-Übersicht hier:

- [ ] `config/platform.ts` — Echte Betreiber-Daten (Name, Adresse, UID) ergänzen
- [ ] Instagram-Account und weitere Social-Links in `config/platform.ts`
- [ ] Echte Partner-Fotos — Platzhalter unter `/public/images/placeholders/` ersetzen
- [ ] Impressum: UID / Handelsregister-Eintrag
- [ ] OG-Image: aktuell keins hinterlegt. Empfohlen: via `@vercel/og` dynamisch pro Partner generieren.
- [ ] FR/IT-Übersetzungen vervollständigen in `messages/fr.json` und `messages/it.json`
- [ ] LanguageSwitcher auf Routing umstellen, sobald EN eine eigene URL bekommt
- [ ] Plausible-Script einbinden, sobald Domain gesetzt ist (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
- [ ] Gegebenenfalls Photo-Upload im Inquiry-Formular (aktuell Checkbox "Fotos folgen per WhatsApp")

---

## Lizenz

Proprietär — alle Rechte bei Gipfelnaht. Kein Reuse ohne Einwilligung.
