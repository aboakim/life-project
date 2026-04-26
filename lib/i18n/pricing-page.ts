import type { AppLocale } from "./locale";

export type PricingCopy = {
  pageTitle: string;
  pageSubtitle: string;
  navPricing: string;
  freeTitle: string;
  freePrice: string;
  freeDesc: string;
  freeBullets: [string, string, string];
  premiumTitle: string;
  premiumPrice: string;
  premiumDesc: string;
  premiumBullets: [string, string, string];
  ctaUpgrade: string;
  ctaFree: string;
  badgePlaceholder: string;
  toastNotReady: string;
  deployHint: string;
  checkoutSuccess: string;
  checkoutCanceled: string;
};

const hy: PricingCopy = {
  pageTitle: "Վճարային պլաններ",
  pageSubtitle:
    "Ընտրեք ձեզ համար հարմար փաթեթը՝ անվճար Free-ից մինչև Premium։ Վճարումները մշակվում են Stripe-ի միջոցով՝ քարտի տվյալները երբեք չեն անցնում մեր սերվերներով։",
  navPricing: "Գներ",
  freeTitle: "Free",
  freePrice: "0",
  freeDesc: "Սկսելու համար",
  freeBullets: [
    "Վերլուծություններ (demo / կամ API-ով)",
    "Մասնագետների ցանցում դիտում",
    "Գաղտնիության հիմնական շերտ",
  ],
  premiumTitle: "Premium",
  premiumPrice: "$4.99",
  premiumDesc: "ամսական",
  premiumBullets: [
    "Անսահմանափակ կամ ավելի շատ AI վերլուծություններ",
    "Խորը հաշվետվություններ (հետագա)",
    "Առաջնահերթ աջակցություն (հետագա)",
  ],
  ctaUpgrade: "Միանալ Premium",
  ctaFree: "Սկսել անվճար",
  badgePlaceholder: "Ապահով վճարում",
  toastNotReady:
    "Վճարումները հիմա հասանելի չեն։ Խնդրում ենք փորձել մի փոքր ուշ։",
  deployHint: "Վճարումները մշակվում են Stripe-ի միջոցով — քարտի տվյալները երբեք չեն անցնում մեր սերվերներով։",
  checkoutSuccess:
    "Շնորհակալություն։ Բաժանորդագրությունը հաստատվում է Stripe-ի միջոցով — էլ. փոստով կստանաք հաստատում։",
  checkoutCanceled: "Վճարումը չեղարկվեց։ Կարող եք կրկին փորձել ցանկացած ժամանակ։",
};

const en: PricingCopy = {
  pageTitle: "Pricing",
  pageSubtitle:
    "Pick the plan that fits. Payments are processed by Stripe — card details never touch our servers, and you can cancel anytime from your receipt email.",
  navPricing: "Pricing",
  freeTitle: "Free",
  freePrice: "0",
  freeDesc: "Get started",
  freeBullets: [
    "Analyses (demo and/or with API key)",
    "Browse the expert network",
    "Core privacy messaging",
  ],
  premiumTitle: "Premium",
  premiumPrice: "$4.99",
  premiumDesc: "per month",
  premiumBullets: [
    "More / unlimited AI analyses",
    "Deeper reports (future)",
    "Priority support (future)",
  ],
  ctaUpgrade: "Subscribe with Stripe",
  ctaFree: "Continue free",
  badgePlaceholder: "Secure checkout",
  toastNotReady:
    "Payments are not available right now. Please try again later.",
  deployHint: "Payments are processed by Stripe — card details never touch our servers.",
  checkoutSuccess:
    "Thank you. Your subscription is confirmed via Stripe — check your email for the receipt.",
  checkoutCanceled: "Checkout was canceled. You can try again anytime.",
};

const navPricingByLocale: Partial<Record<AppLocale, string>> = {
  ru: "Цены",
  de: "Preise",
  fr: "Tarifs",
  es: "Precios",
  ar: "الأسعار",
  it: "Prezzi",
};

export function getPricingCopy(locale: AppLocale): PricingCopy {
  if (locale === "hy") return hy;
  if (locale === "en" || locale === "en-US") return en;
  const nav = navPricingByLocale[locale];
  if (nav) return { ...en, navPricing: nav };
  return en;
}
