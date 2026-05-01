import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { atelier } from '@/content/atelier';

const columns = [
  {
    title: 'Atelier',
    links: [
      { href: '/angebot', label: 'Was wir reparieren' },
      { href: '/preise', label: 'Preise' },
      { href: '/so-funktionierts', label: "So funktioniert's" },
      { href: '/ueber-mich', label: 'Über mich' },
    ],
  },
  {
    title: 'Kontakt',
    links: [
      { href: '/kontakt', label: 'Anfrage stellen' },
      { href: '/api/tag-pdf', label: 'Reparatur-Tag (PDF)' },
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
          <Logo size="sm" location={atelier.location.town} />
          <p className="mt-4 max-w-sm text-sm text-stone leading-relaxed">
            {atelier.shortBio}
          </p>
          <div className="mt-5 space-y-2 text-sm text-stone">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>
                {atelier.location.address}
                <br />
                {atelier.location.postalCode} {atelier.location.town},{' '}
                {atelier.location.canton}
              </span>
            </div>
            <a
              href={`tel:${atelier.contact.phone}`}
              className="flex items-center gap-2 hover:text-forest"
            >
              <Phone size={14} />
              {atelier.contact.phoneDisplay}
            </a>
            <a
              href={`mailto:${atelier.contact.email}`}
              className="flex items-center gap-2 hover:text-forest"
            >
              <Mail size={14} />
              {atelier.contact.email}
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
            © {year} {atelier.legalName}. Handwerk aus den Alpen.
          </p>
          <div className="flex items-center gap-4 text-stone">
            {atelier.contact.instagram && (
              <a
                href={atelier.contact.instagram}
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
