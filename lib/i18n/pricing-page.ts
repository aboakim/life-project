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
  /** Large line beside the price — share / free month hook */
  premiumShareHeadline: string;
  /** Below the price row — how many people to refer */
  premiumReferralDetail: string;
  /** Next to Subscribe; toggles social share panel */
  ctaShare: string;
  premiumShareIntro: string;
  /** Short line prepended when sharing (tweet, WhatsApp, email body) */
  premiumShareBlurb: string;
  copySiteLink: string;
  siteLinkCopied: string;
  shareNative: string;
  shareFacebook: string;
  shareX: string;
  shareLinkedIn: string;
  shareWhatsApp: string;
  shareTelegram: string;
  shareReddit: string;
  shareInstagram: string;
  shareEmailSubject: string;
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
  premiumShareHeadline: "Կիսվեք — 1 ամիս Premium անվճար",
  premiumReferralDetail:
    "Անվճար ամիս ստանալու համար պետք է ձեր հղումով կայք այցելեն նվազագույն 20 հոգի (ընկերներ, ծանոթներ)։ Նրանք պետք է բացեն հենց ձեր ուղարկած հղումը։",
  ctaShare: "Կիսվել",
  premiumShareIntro:
    "Կիսվեք հղումով ցանկացած կայքից և բոլոր սոցցանցերում՝ Facebook, Instagram, X, LinkedIn, Telegram, WhatsApp, Reddit, Threads և այլն։",
  premiumShareBlurb:
    "Կայացրո՛ր լավ կյանքի որոշումներ րոպեների մեջ։ Համեմատի՛ր տարբերակները, տե՛ս արդյունքները, հստա՛ր որոշի՛ր. կառուցված վերլուծություն, ոչ պատահական chat։",
  copySiteLink: "Պատճենել կայքի հղումը",
  siteLinkCopied: "Հղումը պատճենվեց։",
  shareNative: "Կիսվել…",
  shareFacebook: "Facebook",
  shareX: "X",
  shareLinkedIn: "LinkedIn",
  shareWhatsApp: "WhatsApp",
  shareTelegram: "Telegram",
  shareReddit: "Reddit",
  shareInstagram: "Ինստագրամ",
  shareEmailSubject:
    "Կյանքի որոշումների AI — կայացրո՛ր լավ որոշումներ րոպեների մեջ",
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
  premiumShareHeadline: "Share — 1 month of Premium free",
  premiumReferralDetail:
    "To earn the free month, at least 20 people must visit the site through your link (friends, colleagues, etc.). They need to open the exact URL you send them.",
  ctaShare: "Share",
  premiumShareIntro:
    "Share your link from any page on the site across socials: Facebook, Instagram, X, LinkedIn, Telegram, WhatsApp, Reddit, Threads, and more.",
  premiumShareBlurb:
    "Stop overthinking. Decide in seconds. Get instant clarity on any decision using AI-powered scenarios—not random chat.",
  copySiteLink: "Copy site link",
  siteLinkCopied: "Link copied.",
  shareNative: "Share…",
  shareFacebook: "Facebook",
  shareX: "X",
  shareLinkedIn: "LinkedIn",
  shareWhatsApp: "WhatsApp",
  shareTelegram: "Telegram",
  shareReddit: "Reddit",
  shareInstagram: "Instagram",
  shareEmailSubject:
    "Life Decision Engine — Stop overthinking. Decide in seconds.",
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
