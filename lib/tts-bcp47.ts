import type { AppLocale } from "@/lib/i18n/locale";

/** BCP-47 for Web Speech (SpeechSynthesis, general default per locale) */
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

/**
 * SpeechRecognition: many engines are picky. Armenian often fails with `hy-AM`
 * on desktop; a plain `hy` language tag can match the engine’s catalog better.
 * Whisper/server uses ISO codes separately — this is browser-only.
 */
export function appLocaleToWebSttBcp47(locale: AppLocale): string {
  if (locale === "hy") {
    return "hy";
  }
  return appLocaleToSpeechBcp47(locale);
}

/**
 * Try these BCP-47 tags when matching `speechSynthesis` voices.
 */
export function speechBcp47CandidatesForTts(locale: AppLocale): string[] {
  const p = appLocaleToSpeechBcp47(locale);
  if (p.toLowerCase().startsWith("hy")) {
    return ["hy-AM", "hy-ET", "hy"].filter((x, i, a) => a.indexOf(x) === i);
  }
  return [p];
}

/** Last resort: English voices so we can TTS with translation when locale voice is missing. */
export const TTS_EN_VOICE_BCP: readonly string[] = ["en-US", "en-GB", "en"];
