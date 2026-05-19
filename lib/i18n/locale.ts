export const APP_LOCALES = [
  "en-US",
  "hy",
  "en",
  "ru",
  "de",
  "fr",
  "es",
  "ar",
  "it",
] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export function isAppLocale(x: unknown): x is AppLocale {
  return (
    typeof x === "string" &&
    (APP_LOCALES as readonly string[]).includes(x as AppLocale)
  );
}

export function isEnglishAppLocale(locale: AppLocale): boolean {
  return locale === "en" || locale === "en-US";
}

/** Fallback when locale is missing/invalid: matches `DEFAULT_LOCALE` (international default). */
export function parseLocale(x: unknown): AppLocale {
  return isAppLocale(x) ? x : "en-US";
}

export function isRtlLocale(locale: AppLocale): boolean {
  return locale === "ar";
}

/** Human-readable name for the LLM system prompt */
export function llmLanguageLabel(locale: AppLocale): string {
  const map: Record<AppLocale, string> = {
    hy: "Armenian",
    en: "English (UK)",
    "en-US": "American English",
    ru: "Russian",
    de: "German",
    fr: "French",
    es: "Spanish",
    ar: "Arabic",
    it: "Italian",
  };
  return map[locale];
}

export const LOCALE_OPTIONS: {
  value: AppLocale;
  label: string;
  /** Emoji fallback where img flags are not used */
  flag: string;
  /** ISO 3166-1 alpha-2 for flagcdn.com (works in native selects on Windows) */
  flagCode: string;
}[] = [
  { value: "en-US", label: "English (US)", flag: "🇺🇸", flagCode: "us" },
  { value: "hy", label: "Հայերեն", flag: "🇦🇲", flagCode: "am" },
  { value: "ru", label: "Русский", flag: "🇷🇺", flagCode: "ru" },
  { value: "de", label: "Deutsch", flag: "🇩🇪", flagCode: "de" },
  { value: "fr", label: "Français", flag: "🇫🇷", flagCode: "fr" },
  { value: "es", label: "Español", flag: "🇪🇸", flagCode: "es" },
  { value: "ar", label: "العربية", flag: "🇸🇦", flagCode: "sa" },
  { value: "it", label: "Italiano", flag: "🇮🇹", flagCode: "it" },
];

export function localeFlagSrc(flagCode: string, width = 40): string {
  return `https://flagcdn.com/w${width}/${flagCode}.png`;
}
