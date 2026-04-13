import type { AppLocale } from "@/lib/i18n/locale";
import { isAppLocale } from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";

/** Same key as localStorage — synced for server components (e.g. /admin). */
export const LDE_LOCALE_COOKIE_NAME = "lde-locale";

const MAX_AGE_SEC = 60 * 60 * 24 * 400;

export function syncLocaleCookieClient(locale: AppLocale): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LDE_LOCALE_COOKIE_NAME}=${encodeURIComponent(
    locale
  )}; path=/; max-age=${MAX_AGE_SEC}; SameSite=Lax`;
}

export function localeFromCookieValue(
  value: string | undefined
): AppLocale {
  if (!value) return DEFAULT_LOCALE;
  try {
    const decoded = decodeURIComponent(value);
    return isAppLocale(decoded) ? decoded : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}
