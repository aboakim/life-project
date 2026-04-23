import type { AppLocale } from "./locale";

type Triple = readonly [string, string, string];

/**
 * One scannable line per image — same meaning as the long copy in `getUi()`.
 * Full text remains in `sr-only` next to each card.
 */
const atEn: Triple = [
  "Enter your decision, optional context, then run the structured analyzer.",
  "Compare best / worst / likely with trade-offs side by side.",
  "A score and a timeline—not therapy or legal advice. Pros are optional.",
];

const atHy: Triple = [
  "Գրիր հարցը, ավելացրու կոնտեքստ, հետո միացրու վերլուծիչը։",
  "Համեմատի՛ր լավագույն/վատ/հավանական՝ փոխարժեքներով։",
  "Միավոր և ժամկետ․ ոչ թերապիա կամ իրավական խորհուրդ. մասնագետ՝ ցանկությամբ։",
];

const trustEn: Triple = [
  "Structured logic and clear trade-offs—not random opinions.",
  "Session-private analysis. No public feed of your story.",
  "Expert directory in many languages—only when you want a human.",
];

const trustHy: Triple = [
  "Կարգավորված մտածողություն, ոչ կարծիքներ, հստակ փոխարժեքներ։",
  "Գաղտնի վերլուծություն սեանսում, հրապարակային ժապավեն չէ։",
  "Բազմալեզու ցանց, երբ ուզում ես մասնագետի։",
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
