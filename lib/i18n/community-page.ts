import type { AppLocale } from "./locale";

export type CommunityCopy = {
  navLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  securityNote: string;
  askTitle: string;
  yourName: string;
  yourEmail: string;
  optional: string;
  questionTitle: string;
  questionBody: string;
  submitQuestion: string;
  posting: string;
  questionsTitle: string;
  empty: string;
  answersLabel: string;
  replyTitle: string;
  submitReply: string;
  postingReply: string;
  cancel: string;
  openReply: string;
  errorGeneric: string;
  validationTitle: string;
  validationBody: string;
  validationName: string;
  validationEmail: string;
  rateLimited: string;
  /** DB unreachable — list empty but page usable */
  dbUnavailable: string;
  /** DB unreachable — posting disabled */
  dbUnavailablePost: string;
};

const en: CommunityCopy = {
  navLabel: "Community Q&A",
  pageTitle: "Community questions & answers",
  pageSubtitle:
    "Ask in plain language. No accounts required — we use light rate limits and store text only (no rich HTML) to reduce abuse. This is not therapy or legal advice.",
  securityNote:
    "Security: we do not run user-submitted code. Keep personal data out of public posts when possible. For emergencies, contact local professionals.",
  askTitle: "Ask a question",
  yourName: "Display name",
  yourEmail: "Email",
  optional: "optional",
  questionTitle: "Title",
  questionBody: "Details",
  submitQuestion: "Post question",
  posting: "Posting…",
  questionsTitle: "Recent questions",
  empty: "No questions yet — be the first.",
  answersLabel: "replies",
  replyTitle: "Your reply",
  submitReply: "Post reply",
  postingReply: "Posting…",
  cancel: "Cancel",
  openReply: "Reply",
  errorGeneric: "Something went wrong. Try again later.",
  validationTitle: "Title must be 3–200 characters.",
  validationBody: "Details must be 10–5000 characters.",
  validationName: "Name must be 1–80 characters.",
  validationEmail: "Please enter a valid email or leave it empty.",
  rateLimited: "Too many posts from this connection. Try again later.",
  dbUnavailable:
    "Community list is temporarily unavailable (database not connected). Other pages still work — the site owner should add DATABASE_URL (e.g. Neon Postgres) on the host.",
  dbUnavailablePost:
    "Cannot post right now — the database is not connected. Please try again after the site is configured.",
};

const hy: CommunityCopy = {
  navLabel: "Հարց ու պատասխան",
  pageTitle: "Հանրային հարցեր և պատասխաններ",
  pageSubtitle:
    "Գրեք պարզ լեզվով։ Հաշիվ պարտադիր չէ․ կիրառում ենք թեթև սահմանափակումներ և պահում ենք միայն տեքստ (առանց HTML)՝ злоупотреблениеը նվազեցնելու համար։ Սա թերապիա կամ իրավաբանական խորհուրդ չէ։",
  securityNote:
    "Անվտանգություն․ օգտվողների կոդ չենք աշխատացնում։ Կարող եք չգրել անձնական տվյալներ հրապարակային հարցում։ Ճգնաժամում դիմեք տեղի մասնագետների։",
  askTitle: "Ձեր հարցը",
  yourName: "Անուն (երևում է բոլորին)",
  yourEmail: "Էլ․ փոստ",
  optional: "ընտրովի",
  questionTitle: "Վերնագիր",
  questionBody: "Մանրամասներ",
  submitQuestion: "Հրապարակել հարցը",
  posting: "Ուղարկում…",
  questionsTitle: "Վերջին հարցերը",
  empty: "Դեռ հարցեր չկան․ լինել առաջինը։",
  answersLabel: "պատասխան",
  replyTitle: "Ձեր պատասխանը",
  submitReply: "Ուղարկել պատասխանը",
  postingReply: "Ուղարկում…",
  cancel: "Փակել",
  openReply: "Պատասխանել",
  errorGeneric: "Ինչ որ բան սխալ գնաց։ Փորձեք ավելի ուշ։",
  validationTitle: "Վերնագիրը 3–200 նիշ պետք է լինի։",
  validationBody: "Տեքստը 10–5000 նիշ։",
  validationName: "Անունը 1–80 նիշ։",
  validationEmail: "Գրիր ճիշտ էլ․ փոստ կամ թողնիր դատարկ։",
  rateLimited: "Չափից շատ հաղորդագրություն այս կապից։ Փորձեք ավելի ուշ։",
  dbUnavailable:
    "Հանրային հարցերի ցուցակը ժամանակավորապես անհասանելի է (տվյալների բազան կապված չէ)։ Մնացած էջերը աշխատում են — host-ում պետք է կարգավորել DATABASE_URL (օր. Neon PostgreSQL)։",
  dbUnavailablePost:
    "Այս պահին հնարավոր չէ հրապարակել — տվյալների բազան կապված չէ։ Փորձեք կարգավորումից հետո։",
};

const table: Record<AppLocale, CommunityCopy> = {
  "en-US": en,
  en,
  hy,
  ru: en,
  de: en,
  fr: en,
  es: en,
  ar: en,
  it: en,
} satisfies Record<AppLocale, CommunityCopy>;

export function getCommunityCopy(locale: AppLocale): CommunityCopy {
  return table[locale] ?? en;
}
