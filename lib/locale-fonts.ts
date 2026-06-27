import type { AppLocale } from "@/lib/i18n/locale";

type FontVars = {
  display: string;
  geist: string;
  mono: string;
  arm: string;
  noto: string;
  ar: string;
};

/** Load locale-specific Noto subsets only when needed (smaller initial CSS). */
export function localeFontVariableClasses(
  locale: AppLocale,
  fonts: FontVars,
): string {
  const base = `${fonts.display} ${fonts.geist} ${fonts.mono}`;
  if (locale === "hy") return `${base} ${fonts.arm}`;
  if (locale === "ar") return `${base} ${fonts.ar}`;
  if (
    locale === "ru" ||
    locale === "de" ||
    locale === "fr" ||
    locale === "es" ||
    locale === "it"
  ) {
    return `${base} ${fonts.noto}`;
  }
  return base;
}
