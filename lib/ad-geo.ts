/**
 * Ad/geo helpers — GDPR regions require opt-in; elsewhere ads may load
 * unless the user explicitly rejected cookies.
 */

export const GEO_COOKIE = "lde-geo";

/** ISO-3166 alpha-2 where GDPR / UK GDPR / similar consent is expected. */
const GDPR_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
  "UK",
  "IS",
  "LI",
  "NO",
  "CH", // often treated like GDPR for ad consent UX
]);

export function normalizeCountryCode(raw: string | null | undefined): string {
  return (raw ?? "").trim().toUpperCase().slice(0, 2);
}

export function isGdprCountry(country: string | null | undefined): boolean {
  const c = normalizeCountryCode(country);
  if (!c) return true; // unknown → safer opt-in
  return GDPR_COUNTRIES.has(c);
}

/** Inline for <head> — reads lde-geo cookie set by middleware. */
export const CONSENT_DEFAULT_BOOTSTRAP_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )lde-geo=([^;]*)/);var c=m?decodeURIComponent(m[1]).toUpperCase().slice(0,2):"";var g={AT:1,BE:1,BG:1,HR:1,CY:1,CZ:1,DK:1,EE:1,FI:1,FR:1,DE:1,GR:1,HU:1,IE:1,IT:1,LV:1,LT:1,LU:1,MT:1,NL:1,PL:1,PT:1,RO:1,SK:1,SI:1,ES:1,SE:1,GB:1,UK:1,IS:1,LI:1,NO:1,CH:1};var need=!c||!!g[c];window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;var v=need?"denied":"granted";gtag("consent","default",{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v,wait_for_update:500});}catch(e){}})();`;
