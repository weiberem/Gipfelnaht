import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx,json}',
  ],
  theme: {
    extend: {
      colors: {
        cream: 'var(--color-cream)',
        'cream-warm': 'var(--color-cream-warm)',
        forest: 'var(--color-forest)',
        'forest-dark': 'var(--color-forest-dark)',
        terracotta: 'var(--color-terracotta)',
        lake: 'var(--color-lake)',
        night: 'var(--color-night)',
        stone: 'var(--color-stone)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 31, 26, 0.04), 0 2px 8px rgba(13, 31, 26, 0.06)',
        hover: '0 2px 4px rgba(13, 31, 26, 0.06), 0 8px 24px rgba(13, 31, 26, 0.08)',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
