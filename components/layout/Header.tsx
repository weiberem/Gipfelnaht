'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { atelier } from '@/content/atelier';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/angebot', label: 'Angebot' },
  { href: '/preise', label: 'Preise' },
  { href: '/so-funktionierts', label: "So funktioniert's" },
  { href: '/ueber-mich', label: 'Über mich' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label={`${atelier.name} Startseite`}>
          <Logo size="sm" location={atelier.location.town} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm text-forest transition-colors hover:bg-cream-warm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/kontakt"
            className="hidden lg:inline-flex btn-primary py-2.5 px-4 text-sm"
          >
            Anfrage stellen
          </Link>
          <button
            type="button"
            aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden rounded p-2 text-forest hover:bg-cream-warm"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden border-t border-border transition-[max-height]',
          open ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile Navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2.5 text-forest hover:bg-cream-warm"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="btn-primary mt-2 w-full justify-center"
            onClick={() => setOpen(false)}
          >
            Anfrage stellen
          </Link>
        </nav>
      </div>
    </header>
  );
}
