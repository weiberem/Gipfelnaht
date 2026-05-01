/**
 * Feature-Flags. Werden u. a. genutzt, um die FOTO-BENÖTIGT-Overlays
 * im Dev-Mode anzuzeigen und in Production zu unterdrücken.
 */
export const features = {
  SHOW_PHOTO_PLACEHOLDER_OVERLAYS: process.env.NODE_ENV !== 'production',
} as const;

export type Features = typeof features;
