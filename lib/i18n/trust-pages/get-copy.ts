import type { AppLocale } from "../locale";
import type { TrustPageCopy, TrustPageId, PublisherEducationCopy } from "./types";
import { cookiesEn } from "./en/cookies";
import {
  analyzeEducationEn,
  homePublisherEn,
  pricingEducationEn,
} from "./en/publisher";
import { trustPagesEn } from "./locales/en";
import { trustPagesHy } from "./locales/hy";
import { trustPagesRu } from "./locales/ru";
import { trustPagesDe } from "./locales/de";
import { trustPagesFr } from "./locales/fr";
import { trustPagesEs } from "./locales/es";
import { trustPagesIt } from "./locales/it";
import { trustPagesAr } from "./locales/ar";

const LOCALE_PAGES: Partial<
  Record<AppLocale, Partial<Record<TrustPageId, TrustPageCopy>>>
> = {
  "en-US": trustPagesEn,
  en: trustPagesEn,
  hy: trustPagesHy,
  ru: trustPagesRu,
  de: trustPagesDe,
  fr: trustPagesFr,
  es: trustPagesEs,
  it: trustPagesIt,
  ar: trustPagesAr,
};

export function getTrustPageCopy(
  id: TrustPageId,
  locale: AppLocale,
): TrustPageCopy {
  const localized = LOCALE_PAGES[locale]?.[id];
  if (localized) return localized;
  const fallback = trustPagesEn[id];
  if (fallback) return fallback;
  return cookiesEn;
}

export function getTermsCopy(locale: AppLocale) {
  return getTrustPageCopy("terms", locale);
}

export function getDisclaimerCopy(locale: AppLocale) {
  return getTrustPageCopy("disclaimer", locale);
}

export function getAboutCopy(locale: AppLocale) {
  return getTrustPageCopy("about", locale);
}

export function getContactCopy(locale: AppLocale) {
  return getTrustPageCopy("contact", locale);
}

export function getFaqCopy(locale: AppLocale) {
  return getTrustPageCopy("faq", locale);
}

export function getEditorialTeamCopy(locale: AppLocale) {
  return getTrustPageCopy("editorial-team", locale);
}

export function getEditorialStandardsCopy(locale: AppLocale) {
  return getTrustPageCopy("editorial-standards", locale);
}

export function getCookiesCopy(locale: AppLocale) {
  return getTrustPageCopy("cookies", locale);
}

export function getContentPolicyCopy(locale: AppLocale) {
  return getTrustPageCopy("content-policy", locale);
}

export function getPrivacyCopy(locale: AppLocale) {
  return getTrustPageCopy("privacy", locale);
}

const PUBLISHER_EN = trustPagesEn.publisher;
const PUBLISHER_HY = trustPagesHy.publisher;
const PUBLISHER_RU = trustPagesRu.publisher;
const PUBLISHER_DE = trustPagesDe.publisher;
const PUBLISHER_FR = trustPagesFr.publisher;
const PUBLISHER_ES = trustPagesEs.publisher;
const PUBLISHER_IT = trustPagesIt.publisher;
const PUBLISHER_AR = trustPagesAr.publisher;

function publisherFor(
  locale: AppLocale,
  kind: keyof NonNullable<typeof PUBLISHER_HY>,
): PublisherEducationCopy {
  const table: Partial<
    Record<AppLocale, typeof PUBLISHER_HY | undefined>
  > = {
    "en-US": PUBLISHER_EN,
    en: PUBLISHER_EN,
    hy: PUBLISHER_HY,
    ru: PUBLISHER_RU,
    de: PUBLISHER_DE,
    fr: PUBLISHER_FR,
    es: PUBLISHER_ES,
    it: PUBLISHER_IT,
    ar: PUBLISHER_AR,
  };
  const row = table[locale]?.[kind];
  if (row) return row;
  if (kind === "analyze") return analyzeEducationEn;
  if (kind === "pricing") return pricingEducationEn;
  return homePublisherEn;
}

export function getAnalyzeEducationCopy(locale: AppLocale) {
  return publisherFor(locale, "analyze");
}

export function getPricingEducationCopy(locale: AppLocale) {
  return publisherFor(locale, "pricing");
}

export function getHomePublisherCopy(locale: AppLocale) {
  return publisherFor(locale, "home");
}
