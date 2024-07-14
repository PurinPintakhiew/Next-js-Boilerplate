import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  logo: 'https://ptcdn.info/mobile/logo-mobile-pantip-white.png',
  name: 'Pantip',
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix,
};
