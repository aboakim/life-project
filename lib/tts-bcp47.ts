import type { AppLocale } from "@/lib/i18n/locale";

/** BCP-47 for Web Speech (SpeechRecognition + SpeechSynthesis) */
export function appLocaleToSpeechBcp47(locale: AppLocale): string {
  const m: Record<AppLocale, string> = {
    hy: "hy-AM",
    en: "en-GB",
    "en-US": "en-US",
    ru: "ru-RU",
    de: "de-DE",
    fr: "fr-FR",
    es: "es-ES",
    ar: "ar-SA",
    it: "it-IT",
  };
  return m[locale] ?? "en-US";
}
