import type { AppLocale } from "./locale";

export type DecisionBriefCopy = {
  cardTitle: string;
  cardSubtitle: string;
  expand: string;
  collapse: string;
  l1: string;
  l2: string;
  l3: string;
  ph1: string;
  ph2: string;
  ph3: string;
  apply: string;
  sparkTitle: string;
  sparks: readonly [string, string, string, string];
};

const en: DecisionBriefCopy = {
  cardTitle: "60-second decision brief",
  cardSubtitle:
    "Three short prompts — we fill the three analyzer fields so the AI sees structure, not a blank page.",
  expand: "Open",
  collapse: "Hide",
  l1: "Your question in one sentence",
  l2: "What would “success” look like?",
  l3: "Red lines, fears, or deadlines",
  ph1: 'e.g. “Should I relocate for this role?”',
  ph2: "e.g. stable income + family time preserved",
  ph3: "e.g. won’t move before school year ends",
  apply: "Fill analyzer fields",
  sparkTitle: "Try an example",
  sparks: [
    "Should I accept a remote job abroad in 2026?",
    "Leave a stable job to join a friend’s startup?",
    "End a long relationship vs. couples therapy first?",
    "Buy a home now vs. rent another year?",
  ],
};

const hy: DecisionBriefCopy = {
  cardTitle: "60 վայրկյանային որոշման brief",
  cardSubtitle:
    "Երեք կարճ դաշտ — ավտոմատ լցնում ենք վերլուծիչի երեք դաշտերը, որ AI-ն տեսնի կառուցվածք, ոչ թե դատարկ էջ։",
  expand: "Բացել",
  collapse: "Թաքցնել",
  l1: "Քո հարցը մեկ նախադասությամբ",
  l2: "Ինչ կլինի «լավ» արդյունքը",
  l3: "Կարմիր գծեր, վախեր կամ ժամկետներ",
  ph1: "Օրինակ՝ «Արժե՞ տեղափոխվել այս աշխատանքի համար»",
  ph2: "Օրինակ՝ կայուն եկամուտ + ընտանիքի ժամանակ",
  ph3: "Օրինակ՝ չեմ տեղափոխվի մինչ դպրոցական տարին ավարտվի",
  apply: "Լցնել վերլուծիչը",
  sparkTitle: "Փորձել օրինակ",
  sparks: [
    "Արժե՞ 2026-ին ընդունել հեռավար աշխատանք արտերկրում։",
    "Թողնե՞լ կայուն աշխատանքը՝ startup-ի համար։",
    "Ավարտե՞լ երկար հարաբերությունը, թե նախ զույգային թերապիա։",
    "Տուն գնե՞լ հիմա, թե ևս մեկ տարի վարձով մնալ։",
  ],
};

const table: Record<AppLocale, DecisionBriefCopy> = {
  "en-US": en,
  en,
  hy,
  ru: en,
  de: en,
  fr: en,
  es: en,
  ar: en,
  it: en,
};

export function getDecisionBriefCopy(locale: AppLocale): DecisionBriefCopy {
  return table[locale] ?? en;
}
