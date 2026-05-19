import { isRtlLocale, type AppLocale } from "@/lib/i18n/locale";
import { syncLocaleCookieClient } from "@/lib/locale-cookie";

/** Fired when the user changes language (e.g. GlobalNav) so client pages can re-read `lde-locale`. */
export const LOCALE_CHANGE_EVENT = "lde-locale-change";

const LOCALE_STORAGE_KEY = "lde-locale";

export function dispatchLocaleChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
}

/** Persist locale in storage, cookie, and `document.documentElement` (lang/dir). */
export function applyClientLocaleChange(locale: AppLocale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  syncLocaleCookieClient(locale);
  document.documentElement.lang = locale;
  document.documentElement.setAttribute(
    "dir",
    isRtlLocale(locale) ? "rtl" : "ltr"
  );
  dispatchLocaleChanged();
}
