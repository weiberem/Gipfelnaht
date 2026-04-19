import Link from 'next/link';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { platform } from '@/config/platform';

const columns = [
  {
    title: 'Plattform',
    links: [
      { href: '/partner', label: 'Partner finden' },
      { href: '/nightrepair', label: 'Nightrepair' },
      { href: '/angebot', label: 'Was reparieren wir?' },
      { href: '/nachhaltigkeit', label: 'Nachhaltigkeit' },
      { href: '/so-funktionierts', label: "So funktioniert's" },
    ],
  },
  {
    title: 'Für Partner',
    links: [
      { href: '/partner-werden', label: 'Partner werden' },
      { href: '/ueber-uns', label: 'Über uns' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { href: '/impressum', label: 'Impressum' },
      { href: '/datenschutz', label: 'Datenschutz' },
      { href: '/agb', label: 'AGB' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border bg-cream-warm">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo size="sm" />
          <p className="mt-4 max-w-sm text-sm text-stone leading-relaxed">
            Gipfelnaht vernetzt lokale Näh-Spezialist:innen in den Schweizer Alpen
            mit Bergsportler:innen, die ihre Ausrüstung reparieren statt ersetzen wollen.
          </p>
          <div className="mt-5 space-y-2 text-sm text-stone">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{platform.owner.town}, {platform.owner.canton}</span>
            </div>
            <a
              href={`mailto:${platform.contact.email}`}
              className="flex items-center gap-2 hover:text-forest"
            >
              <Mail size={14} />
              {platform.contact.email}
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-serif text-base font-semibold text-forest-dark">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-stone hover:text-forest">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-stone">
            © {year} {platform.legalName}. Handwerk aus den Alpen.
          </p>
          <div className="flex items-center gap-4 text-stone">
            {platform.social.instagram && (
              <a
                href={platform.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-forest"
              >
                <Instagram size={18} />
              </a>
            )}
            <Link href="/kontakt" className="text-xs hover:text-forest">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
