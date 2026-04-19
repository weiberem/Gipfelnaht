'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/partner', label: 'Partner finden' },
  { href: '/nightrepair', label: 'Nightrepair' },
  { href: '/angebot', label: 'Was reparieren wir?' },
  { href: '/nachhaltigkeit', label: 'Nachhaltigkeit' },
  { href: '/so-funktionierts', label: "So funktioniert's" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="Gipfelnaht Startseite">
          <Logo size="sm" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
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
          <LanguageSwitcher />
          <Link href="/partner" className="hidden lg:inline-flex btn-primary py-2.5 px-4 text-sm">
            Jetzt Partner finden
          </Link>
          <button
            type="button"
            aria-label="Menu"
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
        <nav className="container-page flex flex-col gap-1 py-4">
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
            href="/partner-werden"
            className="mt-2 rounded px-3 py-2.5 text-sm text-stone hover:bg-cream-warm"
            onClick={() => setOpen(false)}
          >
            Partner werden
          </Link>
          <Link
            href="/partner"
            className="btn-primary mt-2 w-full justify-center"
            onClick={() => setOpen(false)}
          >
            Jetzt Partner finden
          </Link>
        </nav>
      </div>
    </header>
  );
}
