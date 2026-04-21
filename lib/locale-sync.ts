/** Fired when the user changes language (e.g. GlobalNav) so client pages can re-read `lde-locale`. */
export const LOCALE_CHANGE_EVENT = "lde-locale-change";

export function dispatchLocaleChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
}
