/**
 * Feature-Flags. In Phase 1 sind alle Phase-2-Features deaktiviert.
 * Wechseln auf true aktiviert zugehörige Routen/Komponenten.
 */
export const features = {
  ENABLE_AUTH: false,
  ENABLE_PAYMENTS: false,
  ENABLE_RATINGS: false,
  ENABLE_PARTNER_DASHBOARD: false,
  ENABLE_ADMIN_DASHBOARD: false,
  SHOW_PHOTO_PLACEHOLDER_OVERLAYS: process.env.NODE_ENV !== 'production',
} as const;

export type Features = typeof features;
