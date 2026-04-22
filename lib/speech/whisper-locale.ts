import type { AppLocale } from "@/lib/i18n/locale";

/** ISO 639-1 for OpenAI `language` (optional) — reduces hallucination when set. */
export function appLocaleToWhisperLanguage(locale: AppLocale): string {
  const m: Record<AppLocale, string> = {
    hy: "hy",
    en: "en",
    "en-US": "en",
    ru: "ru",
    de: "de",
    fr: "fr",
    es: "es",
    ar: "ar",
    it: "it",
  };
  return m[locale] ?? "en";
}
