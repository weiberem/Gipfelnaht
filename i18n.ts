import { getRequestConfig } from 'next-intl/server';

export const locales = ['de', 'en'] as const;
export const defaultLocale = 'de';
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const locale = defaultLocale;
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
