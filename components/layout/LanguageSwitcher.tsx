'use client';

import { Globe } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
];

/**
 * Phase 1: UI-Element, aktuell rein dekorativ. Die aktive Locale wird in Phase 1
 * durch den i18n-Default (de) geliefert. Wechsel wird in Phase 2 an next-intl
 * Middleware + URL-Präfix-Strategie gekoppelt.
 */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Sprache wählen"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-stone hover:bg-cream-warm"
      >
        <Globe size={16} />
        <span>DE</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 min-w-[100px] rounded-md border border-border bg-white py-1 shadow-card"
        >
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block w-full px-3 py-1.5 text-left text-sm text-forest hover:bg-cream-warm disabled:text-stone"
              disabled={l.code !== 'de'}
              title={l.code !== 'de' ? 'Übersetzungen folgen' : undefined}
            >
              {l.label}
              {l.code !== 'de' && <span className="ml-1 text-[10px] text-stone">bald</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
