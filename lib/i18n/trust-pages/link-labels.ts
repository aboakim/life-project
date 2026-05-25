import type { AppLocale } from "../locale";
import type { TrustLinkKey } from "./types";
import { TRUST_LINK_LABELS_EN } from "./links";
import { getTrustNav } from "../trust-nav";

/** Per-locale labels for `{placeholder}` links in trust pages. */
export function getTrustLinkLabels(locale: AppLocale): Record<TrustLinkKey, string> {
  const tn = getTrustNav(locale);
  const base = { ...TRUST_LINK_LABELS_EN };

  if (locale === "hy") {
    return {
      ...base,
      privacy: tn.navPrivacy,
      cookies: tn.navCookies,
      contentPolicy: tn.navContentPolicy,
      terms: tn.navTerms,
      disclaimer: tn.navDisclaimer,
      contact: tn.navContact,
      about: tn.navAbout,
      blog: "բլոգ",
      experts: "մասնագետների ցանկ",
      expertsRegister: "գրանցում մասնագետների համար",
      analyze: "վերլուծիչ",
      pricing: "գնացուցակ",
      faq: tn.navFaq,
      editorialTeam: tn.navEditorialTeam,
      editorialStandards: tn.navEditorialStandards,
      howWeUseAi: "Ինչպես ենք օգտագործում AI",
      monetize: "ինչպես ենք վաստակում",
      community: "համայնք",
      communityGuidelines: "համայնքի կանոններ",
      home: "գլխավոր",
    };
  }

  if (locale === "ru") {
    return {
      ...base,
      privacy: tn.navPrivacy,
      cookies: tn.navCookies,
      contentPolicy: tn.navContentPolicy,
      terms: tn.navTerms,
      disclaimer: tn.navDisclaimer,
      contact: tn.navContact,
      about: tn.navAbout,
      blog: "блог",
      experts: "каталог экспертов",
      expertsRegister: "регистрация эксперта",
      analyze: "анализатор",
      pricing: "тарифы",
      faq: tn.navFaq,
      editorialTeam: tn.navEditorialTeam,
      editorialStandards: tn.navEditorialStandards,
      howWeUseAi: "Как мы используем ИИ",
      monetize: "как мы зарабатываем",
      community: "сообщество",
      communityGuidelines: "правила сообщества",
      home: "главная",
    };
  }

  if (locale === "de") {
    return {
      ...base,
      privacy: tn.navPrivacy,
      cookies: tn.navCookies,
      contentPolicy: tn.navContentPolicy,
      terms: tn.navTerms,
      disclaimer: tn.navDisclaimer,
      contact: tn.navContact,
      about: tn.navAbout,
      faq: tn.navFaq,
      editorialTeam: tn.navEditorialTeam,
      editorialStandards: tn.navEditorialStandards,
    };
  }

  if (locale === "fr") {
    return {
      ...base,
      privacy: tn.navPrivacy,
      cookies: tn.navCookies,
      contentPolicy: tn.navContentPolicy,
      terms: tn.navTerms,
      disclaimer: tn.navDisclaimer,
      contact: tn.navContact,
      about: tn.navAbout,
      faq: tn.navFaq,
      editorialTeam: tn.navEditorialTeam,
      editorialStandards: tn.navEditorialStandards,
    };
  }

  if (locale === "es") {
    return {
      ...base,
      privacy: tn.navPrivacy,
      cookies: tn.navCookies,
      contentPolicy: tn.navContentPolicy,
      terms: tn.navTerms,
      disclaimer: tn.navDisclaimer,
      contact: tn.navContact,
      about: tn.navAbout,
      faq: tn.navFaq,
      editorialTeam: tn.navEditorialTeam,
      editorialStandards: tn.navEditorialStandards,
    };
  }

  if (locale === "it") {
    return {
      ...base,
      privacy: tn.navPrivacy,
      cookies: tn.navCookies,
      contentPolicy: tn.navContentPolicy,
      terms: tn.navTerms,
      disclaimer: tn.navDisclaimer,
      contact: tn.navContact,
      about: tn.navAbout,
      faq: tn.navFaq,
      editorialTeam: tn.navEditorialTeam,
      editorialStandards: tn.navEditorialStandards,
    };
  }

  if (locale === "ar") {
    return {
      ...base,
      privacy: tn.navPrivacy,
      cookies: tn.navCookies,
      contentPolicy: tn.navContentPolicy,
      terms: tn.navTerms,
      disclaimer: tn.navDisclaimer,
      contact: tn.navContact,
      about: tn.navAbout,
      faq: tn.navFaq,
      editorialTeam: tn.navEditorialTeam,
      editorialStandards: tn.navEditorialStandards,
    };
  }

  return base;
}
