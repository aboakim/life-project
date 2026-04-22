import type { AppLocale } from "./locale";

export type ThematicBandCopy = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
  imageAlt: string;
};

const enA: ThematicBandCopy = {
  eyebrow: "Clarity, not noise",
  title: "A big decision is a document, not a mood.",
  body: "The analyzer is one place to name the fork, your constraints, and the trade-offs—then get scenarios, lenses, a timeline, and a score. No social feed, no hot takes. Just a report you can reread in a calmer week.",
  cta: "Open the analyzer",
  ctaHref: "/analyze",
  imageAlt:
    "Bright modern workspace with desk, chairs, and warm lighting from the window",
};

const enB: ThematicBandCopy = {
  eyebrow: "Human layer",
  title: "Software first. Real experts when you want backup.",
  body: "When you are ready, browse a directory of psychologists, legal and financial professionals. The tool does not replace them—it helps you walk in with better questions, scenarios already mapped.",
  cta: "Browse experts",
  ctaHref: "/experts",
  imageAlt: "Diverse team collaborating with laptops around a long table",
};

const hyA: ThematicBandCopy = {
  eyebrow: "Պարզություն, ոչ աղմուկ",
  title: "Խոշոր որոշումը «լուսանկար չէ»՝ փաստաթուղթ է։",
  body: "Վերլուծիչը մեկ հարթակ է՝ անվանելու տարաձայնությունը, սահմանները, փոխարժեքները, հետո ստանալու սցենարներ, «линзы», ժամանակացույց միավոր։ Ոչ feed, ոչ աղմուկ։ Պարզ հաշվետվություն, որ կարող ես մեկ շաբաթից նորից կարդալ։",
  cta: "Բացել վերլուծիչ",
  ctaHref: "/analyze",
  imageAlt: "Ժամանակակից աշխատատարածք՝ սեղան, նստարաններ, լուսամուտի բացվող լույս",
};

const hyB: ThematicBandCopy = {
  eyebrow: "Մարդկային շերտ",
  title: "Նախ software, հետո աջակցություն մասնագետից, երբ կամենաս։",
  body: "Երբ պատրաստ ես՝ դիտարկիր հոգեբանների, իրավական և ֆինանսական մասնագետների ցանցը։ Գործիքը չի փոխարինում նրանց․ ավելի հստակ հարցերով ու սցենարներով ես «մտնում» խոսակցությանը։",
  cta: "Դիտարկել մասնագետներ",
  ctaHref: "/experts",
  imageAlt: "Թիմի համագործակցություն՝ նոութբուքներ, երկար սեղան, համատեղ աշխատանք",
};

const table: Partial<Record<AppLocale, { a: ThematicBandCopy; b: ThematicBandCopy }>> = {
  hy: { a: hyA, b: hyB },
};

export function getHomeThematicBands(
  locale: AppLocale
): { a: ThematicBandCopy; b: ThematicBandCopy } {
  return table[locale] ?? { a: enA, b: enB };
}
