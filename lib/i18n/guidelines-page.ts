import type { AppLocale } from "./locale";

export type GuidelinesPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
};

const en: GuidelinesPageCopy = {
  eyebrow: "Community",
  title: "Community guidelines",
  subtitle:
    "Short rules so the Q&A board stays useful. This is peer exchange, not therapy or legal counsel.",
  sections: [
    {
      heading: "Plain text only",
      body:
        "Posts are stored as plain text. No HTML, scripts, or pasted code. Don’t share secrets in public threads.",
    },
    {
      heading: "Light moderation",
      body:
        "We may remove spam, scams, harassment, or unsafe content. Repeat abuse can lead to removal without notice.",
    },
    {
      heading: "Not professional advice",
      body:
        "Answers are from peers, not vetted professionals. For medical, legal, financial, or crisis situations, contact a qualified person in your jurisdiction.",
    },
    {
      heading: "Privacy & topics",
      body:
        "Optional topic tags help others find similar questions. The “helpful” button is rate-limited to reduce manipulation.",
    },
  ],
};

const hy: GuidelinesPageCopy = {
  eyebrow: "Համայնք",
  title: "Համայնքի կանոններ",
  subtitle:
    "Կարճ կանոններ, որ հարցումների տախտակը մնա օգտակար։ Սա հասարակական փոխանակում է, ոչ թե թերապիա կամ իրավունք։",
  sections: [
    {
      heading: "Միայն պարզ տեքստ",
      body:
        "Հաղորդագրությունները պահվում են որպես պարզ տեքստ։ Առանց HTML, սկրիպտների, կոդի։ Չգրել գաղտնիքներ հրապարակային թեմայում։",
    },
    {
      heading: "Թեթև մոդերացիա",
      body:
        "Կարող ենք ջնջել սպամ, խարդախություն, ոտնքնքում, վտանգավոր բովանդակություն։ Կրկնվող խախտումները կարող են հանվել առանց նախազգուշացման։",
    },
    {
      heading: "Ոչ մասնագիտական խորհուրդ",
      body:
        "Պատասխանները հավասար են, ոչ թե ստուգված մասնագետների։ Բժշկական, իրավական, ֆինանսական կամ ճգնաժամային դեպքում դիմեք տեղի մասնագետների։",
    },
    {
      heading: "Գաղտնիություն և թեմաներ",
      body:
        "Ընտրովի թեմատիկ թեգերն օգնում են գտնել նման հարցեր։ «Օգտակար» կոճակը սահմանափակված է, որպեսզի չխաղարկվի։",
    },
  ],
};

const table: Record<AppLocale, GuidelinesPageCopy> = {
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

export function getGuidelinesPage(locale: AppLocale): GuidelinesPageCopy {
  return table[locale] ?? en;
}
