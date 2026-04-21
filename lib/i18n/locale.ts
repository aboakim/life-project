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
  flag: string;
}[] = [
  { value: "en-US", label: "English (US)", flag: "🇺🇸" },
  { value: "hy", label: "Հայերեն", flag: "🇦🇲" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "ar", label: "العربية", flag: "🇸🇦" },
  { value: "it", label: "Italiano", flag: "🇮🇹" },
];
