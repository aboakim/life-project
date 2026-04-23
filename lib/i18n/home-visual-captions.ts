import type { AppLocale } from "./locale";

type Triple = readonly [string, string, string];

/**
 * One scannable line per image — same meaning as the long copy in `getUi()`.
 * Full text remains in `sr-only` next to each card.
 */
const atEn: Triple = [
  "3 scenarios, 4 lenses, timeline & score—structure, not random chat.",
  "You write → run the analyzer → read the report. Experts optional.",
  "Not therapy or legal advice. In an emergency, contact a real professional.",
];

const atHy: Triple = [
  "3 սցենար, 4 հարթակ, ժամանակացույց, միավոր․ հստակ հոսք, ոչ chat։",
  "Գրում ես → Վերլուծել → հաշվետվություն. Մասնագետը՝ ցանկությամբ։",
  "Թերապիա, իրավունք, բժշկական խորհուրդ չէ. ճգնաժամում դիմիր մասնագետի։",
];

const trustEn: Triple = [
  "Best / worst / likely—compare side by side.",
  "No public feed. Your text stays in your session.",
  "Psychology, legal, finance directory—many languages.",
];

const trustHy: Triple = [
  "Լավագույն / վատ / հավանական․ կողք կողքի համեմատելու համար։",
  "Հրապարակային ժապավեն չէ. Ձեր տեքստը մնում է սեանսի մեջ։",
  "Հոգեբանական, իրավական, ֆինանսական ցանց, բազմալեզու միջերես։",
];

const howEn: Triple = [
  "Your decision + context: numbers, fears, values, deadlines.",
  "6 months to 5 years: finance, mind, risk, upside.",
  "Use the score as a compass; add a pro if you need one.",
];

const howHy: Triple = [
  "Ձեր հարցը + կոնտեքստ՝ թվեր, վախեր, արժեքներ, ժամկետներ։",
  "6 ամիսից մինչև 5 տարու ֆինանս, մտքի, ռիսկ, շանս։",
  "Միավորը որպես կողմնացույց, մասնագետին՝ եթե պետք է։",
];

const table: Partial<Record<AppLocale, { at: Triple; trust: Triple; how: Triple }>> =
  {
    en: { at: atEn, trust: trustEn, how: howEn },
    "en-US": { at: atEn, trust: trustEn, how: howEn },
    hy: { at: atHy, trust: trustHy, how: howHy },
  };

function triplet(
  locale: AppLocale,
  key: "at" | "trust" | "how"
): Triple {
  const base = { at: atEn, trust: trustEn, how: howEn };
  const row = table[locale];
  if (row) return row[key];
  return base[key];
}

export function getAtAGlanceShortLines(locale: AppLocale): Triple {
  return triplet(locale, "at");
}

export function getTrustShortLines(locale: AppLocale): Triple {
  return triplet(locale, "trust");
}

export function getHowShortLines(locale: AppLocale): Triple {
  return triplet(locale, "how");
}
