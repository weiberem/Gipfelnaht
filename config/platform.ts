/**
 * Re-export der Atelier-Daten als "platform"-Konstante.
 *
 * Historisch hiess die Konfiguration "platform". Seit der Umstellung
 * auf das Einzel-Atelier ist die Quelle der Wahrheit /content/atelier.ts —
 * dieser Re-export bleibt nur, damit Imports nicht überall geändert werden
 * müssen.
 */
import { atelier } from '@/content/atelier';

export const platform = {
  legalName: atelier.legalName,
  siteUrl: atelier.siteUrl,
  contact: atelier.contact,
  social: {
    instagram: atelier.contact.instagram ?? null,
  },
} as const;

export type Platform = typeof platform;
