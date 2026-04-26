import type { AppLocale } from "./locale";

export type MonetizationCard = {
  tag: string;
  title: string;
  body: string;
};

export type MonetizationCopy = {
  navLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  disclaimer: string;
  cards: MonetizationCard[];
  ctaRegister: string;
  ctaPricing: string;
  pricingTeaserTitle: string;
  pricingTeaserBody: string;
  pricingTeaserCta: string;
};

const hy: MonetizationCopy = {
  navLabel: "Եկամուտ",
  pageTitle: "Ինչպես աշխատել գումար այս հարթակից",
  pageSubtitle:
    "Վճարային Stripe-ից բացի կամ նրա հետ միասին՝ կարելի է կառուցել կայուն եկամուտ՝ մասնագետների ցանցով, B2B-ով և գործընկերություններով։",
  disclaimer:
    "Սա բիզնես ուղղությունների ամփոփում է, ոչ թե իրավաբանական կամ հարկային խորհուրդ։ Պայմանները և հարկերը կախված են երկրից և պայմանագրից։",
  cards: [
    {
      tag: "Մասնագետներ",
      title: "Լիդեր և միջնորդավճար",
      body: "Հաճախորդը կապ է հաստատում մասնագետի հետ․ վճարումը կարող է լինել ուղղակի (invoice, բանկ)՝ ձեր միջնորդավճարը՝ պայմանագրով։ Հարթակը բերում է հոսք, դուք՝ թափանցիկ կանոններ։",
    },
    {
      tag: "B2B",
      title: "Թիմեր և կազմակերպություններ",
      body: "HR, coaching, տեղափոխություն․ white-label կամ թիմային փաթեթներ՝ ամսական պայմանագրով, հաճախ առանց կայքում քարտի (invoice)։",
    },
    {
      tag: "Կրթություն",
      title: "Դասընթացներ և վեբինարներ",
      body: "Ձեր բովանդակությունը կարող եք վաճառել Gumroad, Teachable կամ նման հարթակներով․ այս կայքը մնում է թրաֆիկի և բրենդի աղբյուր։",
    },
    {
      tag: "Գործընկերներ",
      title: "Թափանցիկ affiliate",
      body: "Փոխադարձման, ապահովագրության կամ ուսման հղումներ՝ միայն բաց disclosure-ով, որ վստահությունը չտուժվի։",
    },
    {
      tag: "Համայնք",
      title: "Աջակցություն և դոնորություն",
      body: "Patreon, Ko-fi կամ նման գործիքներ՝ պարզ միացում, եթե լսարանը պատրաստ է աջակցել առաքելությանը։",
    },
  ],
  ctaRegister: "Գրանցվել որպես մասնագետ",
  ctaPricing: "Դիտել գները",
  pricingTeaserTitle: "Առանց միայն բանկային քարտի կայքում",
  pricingTeaserBody:
    "Premium-ը (Stripe) մեկ ուղի է։ Մնացած մոդելները հաճախ աշխատում են invoice, պայմանագիր և ուղղակի վճարումներով։",
  pricingTeaserCta: "Բոլոր մոդելները",
};

const en: MonetizationCopy = {
  navLabel: "Revenue",
  pageTitle: "How this platform can earn revenue",
  pageSubtitle:
    "Beyond—or alongside—Stripe subscriptions: sustainable income through the expert network, B2B packages, and partnerships.",
  disclaimer:
    "This is a business overview, not legal or tax advice. Terms and taxes depend on your country and contracts.",
  cards: [
    {
      tag: "Experts",
      title: "Leads & referral fees",
      body: "Clients connect with professionals; payment can be off-platform (bank, invoice, PayPal) while you charge a transparent finder's or commission fee by contract.",
    },
    {
      tag: "B2B",
      title: "Teams & organizations",
      body: "HR, coaching, relocation: team packs or white-label access on monthly contracts—often invoiced without card-on-file on your site.",
    },
    {
      tag: "Education",
      title: "Courses & webinars",
      body: "Sell programs via Gumroad, Teachable, or similar; this site drives traffic and trust while checkout lives elsewhere.",
    },
    {
      tag: "Partners",
      title: "Transparent affiliates",
      body: "Relocation, insurance, learning links—only with clear disclosure so the product stays trustworthy.",
    },
    {
      tag: "Community",
      title: "Support & donations",
      body: "Patreon, Ko-fi, or similar—simple if your audience backs the mission.",
    },
  ],
  ctaRegister: "Join as expert",
  ctaPricing: "View pricing",
  pricingTeaserTitle: "Not only card payments on-site",
  pricingTeaserBody:
    "Premium (Stripe) is one path. Other models often use invoices, contracts, and direct settlement.",
  pricingTeaserCta: "See all revenue models",
};

const navLabelByLocale: Partial<Record<AppLocale, string>> = {
  ru: "Доход",
  de: "Einnahmen",
  fr: "Revenus",
  es: "Ingresos",
  ar: "الإيرادات",
  it: "Ricavi",
};

export function getMonetizeCopy(locale: AppLocale): MonetizationCopy {
  if (locale === "hy") return hy;
  const nav = navLabelByLocale[locale];
  if (nav) return { ...en, navLabel: nav };
  return en;
}
