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
  body: "Name the fork and trade-offs in one place—then scenarios, lenses, a timeline, and a score. No feed, no hot takes: a report you can reread later.",
  cta: "Open the analyzer",
  ctaHref: "/analyze",
  imageAlt:
    "Bright modern workspace with desk, chairs, and warm lighting from the window",
};

const enB: ThematicBandCopy = {
  eyebrow: "Human layer",
  title: "Software first. Real experts when you want backup.",
  body: "When you are ready: psychologists, legal, finance. The tool does not replace them—it helps you arrive with clearer questions.",
  cta: "Browse experts",
  ctaHref: "/experts",
  imageAlt: "Diverse team collaborating with laptops around a long table",
};

const hyA: ThematicBandCopy = {
  eyebrow: "Պարզություն, ոչ աղմուկ",
  title: "Խոշոր որոշումը «լուսանկար չէ»՝ փաստաթուղթ է։",
  body: "Մեկ հարթակում՝ տարաձայնությունը, սահմանները, սցենարներ, ժամանակացույց, միավոր։ Ոչ feed, ոչ աղմուկ․ հաշվետվություն, որ կարելի է կրկին կարդալ։",
  cta: "Բացել վերլուծիչ",
  ctaHref: "/analyze",
  imageAlt: "Ժամանակակից աշխատատարածք՝ սեղան, նստարաններ, լուսամուտի բացվող լույս",
};

const hyB: ThematicBandCopy = {
  eyebrow: "Մարդկային շերտ",
  title: "Նախ software, հետո աջակցություն մասնագետից, երբ կամենաս։",
  body: "Երբ պատրաստ ես․ հոգեբաններ, իրավունք, ֆինանս։ Գործիքը չի փոխարինում նրանց, բայց ավելի հստակ հարցեր ես բերում։",
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
