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
    "Անվճար MVP-ից մինչև Premium — Stripe-ի ինտեգրացիան կարելի է միացնել հետագայում։",
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
  premiumPrice: "—",
  premiumDesc: "Շուտով + Stripe",
  premiumBullets: [
    "Անսահմանափակ կամ ավելի շատ AI վերլուծություններ",
    "Խորը հաշվետվություններ (հետագա)",
    "Առաջնահերթ աջակցություն (հետագա)",
  ],
  ctaUpgrade: "Միանալ Premium (placeholder)",
  ctaFree: "Սկսել անվճար",
  badgePlaceholder: "Stripe կմախք",
  toastNotReady:
    "Վճարային համակարգը կարգավորված չէ։ Սերվերում լրացրեք Stripe env-երը (տես .env.example)։",
  deployHint: "Deploy-ի քայլերը՝ docs/DEPLOY.md",
  checkoutSuccess:
    "Շնորհակալություն։ Բաժանորդագրությունը հաստատվում է Stripe-ի միջոցով — էլ. փոստով կստանաք հաստատում։",
  checkoutCanceled: "Վճարումը չեղարկվեց։ Կարող եք կրկին փորձել ցանկացած ժամանակ։",
};

const en: PricingCopy = {
  pageTitle: "Pricing",
  pageSubtitle:
    "From free MVP to Premium—Stripe checkout can be enabled when you are ready.",
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
  premiumPrice: "—",
  premiumDesc: "Coming soon + Stripe",
  premiumBullets: [
    "More / unlimited AI analyses",
    "Deeper reports (future)",
    "Priority support (future)",
  ],
  ctaUpgrade: "Subscribe with Stripe",
  ctaFree: "Continue free",
  badgePlaceholder: "Secure checkout",
  toastNotReady:
    "Payments are not configured. Set Stripe environment variables on the server (see .env.example).",
  deployHint: "Deploy steps: docs/DEPLOY.md",
  checkoutSuccess:
    "Thank you. Your subscription is confirmed via Stripe — check your email for the receipt.",
  checkoutCanceled: "Checkout was canceled. You can try again anytime.",
};

export function getPricingCopy(locale: AppLocale): PricingCopy {
  if (locale === "hy") return hy;
  if (locale === "en" || locale === "en-US") return en;
  return en;
}
