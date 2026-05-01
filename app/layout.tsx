import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { atelier } from '@/content/atelier';
import { brand } from '@/config/brand';
import { localBusinessJsonLd } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
});

const description = `${atelier.name} — Näh-Atelier für Bergsport-Reparaturen in ${atelier.location.town}. Daunenjacken, Hardshells, Rucksäcke, Zelte. Standard ${atelier.capacity.typicalTurnaround}, lokal in ${atelier.location.region}.`;

export const metadata: Metadata = {
  metadataBase: new URL(atelier.siteUrl),
  title: {
    default: `${atelier.name} — Bergsport-Reparaturen in ${atelier.location.town}`,
    template: `%s · ${atelier.name}`,
  },
  description,
  keywords: [
    `Jacke reparieren ${atelier.location.town}`,
    `Daunenjacke flicken ${atelier.location.region}`,
    `Outdoor Reparatur ${atelier.location.town}`,
    'Hardshell Reparatur',
    'Reissverschluss tauschen',
    'Bergsport Werkstatt',
    ...(atelier.services.nightrepair.available
      ? [`Nightrepair ${atelier.location.town}`, 'Express Reparatur Outdoor']
      : []),
  ],
  authors: [{ name: atelier.owner }],
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    siteName: atelier.name,
    title: `${atelier.name} — Bergsport-Reparaturen in ${atelier.location.town}`,
    description,
    url: atelier.siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: atelier.name,
    description,
  },
  alternates: {
    canonical: atelier.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="de-CH" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        {plausibleDomain && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-forest focus:px-3 focus:py-2 focus:text-cream focus:rounded"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
