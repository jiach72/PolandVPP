import { defineRouting } from 'next-intl/routing';

// i18n 核心配置
// 支持语言：波兰语(默认)、英语、中文

export const locales = ['pl', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pl';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// 语言显示名称和国旗
export const localeConfig: Record<Locale, { name: string; nativeName: string; flag: string }> = {
  pl: {
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
  zh: {
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
  },
};

// 日期时间格式配置（波兰时区）
export const dateTimeConfig = {
  timeZone: 'Europe/Warsaw', // CET/CEST
  dateFormats: {
    short: { year: 'numeric', month: '2-digit', day: '2-digit' } as const,
    medium: { year: 'numeric', month: 'short', day: 'numeric' } as const,
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' } as const,
  },
  timeFormats: {
    short: { hour: '2-digit', minute: '2-digit' } as const,
    medium: { hour: '2-digit', minute: '2-digit', second: '2-digit' } as const,
  },
  // currency removed here, passed separately if needed or just use number format
};

// 货币配置（波兰兹罗提）
export const currencyConfig = {
  currency: 'PLN',
  currencyDisplay: 'symbol' as const,
};

// 翻译命名空间
export const namespaces = [
  'common',
  'dashboard',
  'assets',
  'market',
  'dispatch',
  'settlement',
] as const;

export type Namespace = (typeof namespaces)[number];
