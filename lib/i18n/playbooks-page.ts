import type { AppLocale } from "./locale";

export type PlaybooksCard = {
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

export type PlaybooksPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: PlaybooksCard[];
};

const en: PlaybooksPageCopy = {
  eyebrow: "Playbooks",
  title: "Topic playbooks — blog + next steps",
  subtitle:
    "Curated reading paths for the decisions people ask about most. Pair with the analyzer and printable checklists.",
  cards: [
    {
      title: "Relocation & moving abroad",
      body:
        "Use the checklist, then read the longer relocation framework. Filter experts by immigration when you need a human.",
      links: [
        { href: "/blog/relocation-decision-checklist", label: "Relocation checklist (blog)" },
        { href: "/checklists", label: "Printable checklists" },
        { href: "/blog/tag/relocation", label: "All posts tagged relocation" },
      ],
    },
    {
      title: "Career & job offers",
      body:
        "Evaluate offers without panic: compare compensation, energy, and plan B. Then browse coaches or financial pros if needed.",
      links: [
        { href: "/blog/how-to-evaluate-a-job-offer", label: "How to evaluate a job offer" },
        { href: "/blog/career-change-without-panic", label: "Career change without panic" },
        { href: "/blog/tag/career", label: "Career posts" },
      ],
    },
    {
      title: "Relationships & big conversations",
      body:
        "Structured frameworks beat rumination. Use the relationship checklist when you’re ready to write things down.",
      links: [
        { href: "/blog/should-you-stay-or-go-relationship-framework", label: "Stay or go framework" },
        { href: "/blog/tag/relationships", label: "Relationships posts" },
      ],
    },
  ],
};

const hy: PlaybooksPageCopy = {
  eyebrow: "Playbook-ներ",
  title: "Թեմատիկ ուղիներ — բլոգ + հաջորդ քայլեր",
  subtitle:
    "Կարդալու ընտրանի հասարակ որոշումների համար։ Համատեղիր վերլուծիչը և տպելի չեկլիստները։",
  cards: [
    {
      title: "Տեղափոխություն",
      body:
        "Նախ չեկլիստը, հետո երկար հոդվածը։ Պետք լինի՝ ֆիլտրիր immigration փորձագետներ։",
      links: [
        { href: "/blog/relocation-decision-checklist", label: "Տեղափոխության հոդված" },
        { href: "/checklists", label: "Տպելի չեկլիստներ" },
        { href: "/blog/tag/relocation", label: "Relocation թեգ" },
      ],
    },
    {
      title: "Կարիերա / աշխատանք",
      body:
        "Համեմատիր վճարումը, էներգիան և plan B։ Ապա հիմնվիր coach/finance փորձագետների վրա։",
      links: [
        { href: "/blog/how-to-evaluate-a-job-offer", label: "Աշխատանքային առաջարկ" },
        { href: "/blog/career-change-without-panic", label: "Կարիերայի փոփոխություն" },
        { href: "/blog/tag/career", label: "Career թեգ" },
      ],
    },
    {
      title: "Հարաբերություններ",
      body:
        "Կառուցված շրջանակներ՝ ավելի քան մտքում պտտվելը։ Օգտագործիր relationship չեկլիստը։",
      links: [
        { href: "/blog/should-you-stay-or-go-relationship-framework", label: "Մնալ / գնալ" },
        { href: "/blog/tag/relationships", label: "Relationships թեգ" },
      ],
    },
  ],
};

const table: Record<AppLocale, PlaybooksPageCopy> = {
  "en-US": en,
  en,
  hy,
  ru: en,
  de: en,
  fr: en,
  es: en,
  it: en,
  ar: en,
};

export function getPlaybooksPage(locale: AppLocale): PlaybooksPageCopy {
  return table[locale] ?? en;
}
