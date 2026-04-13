import type { AppLocale } from "./locale";

export type ExpertsCopy = {
  pageEyebrow: string;
  pageTitle: string;
  pageSubtitle: string;
  filtersSectionLabel: string;
  loadingLabel: string;
  emptyCta: string;
  contactCancel: string;
  navExperts: string;
  navRegister: string;
  navHome: string;
  homePromoLink: string;
  filterAll: string;
  filterPsych: string;
  filterLaw: string;
  filterFinance: string;
  searchPlaceholder: string;
  empty: string;
  cardLanguages: string;
  cardCountry: string;
  contactCta: string;
  contactTitle: string;
  yourName: string;
  yourEmail: string;
  yourMessage: string;
  sendRequest: string;
  sending: string;
  contactSuccess: string;
  contactError: string;
  registerTitle: string;
  registerSubtitle: string;
  regName: string;
  regRole: string;
  regCountry: string;
  regCity: string;
  regLanguages: string;
  regBio: string;
  regEmail: string;
  regWebsite: string;
  regSubmit: string;
  regSuccess: string;
  regError: string;
  disclaimerExperts: string;
  expertsLoadFailed: string;
};

const hy: ExpertsCopy = {
  pageEyebrow: "Ցանց",
  pageTitle: "Մասնագետների համաշխարհային ցանց",
  pageSubtitle:
    "Հոգեբաններ, իրավաբաններ, ֆինանսիստներ — աշխարհի ցանկացած վայրից։ Գրանցվեք որպես մասնագետ կամ գտեք մասնագետ և ուղարկեք կապի հարցում։",
  navExperts: "Մասնագետներ",
  navRegister: "Գրանցվել",
  navHome: "Վերլուծություն",
  homePromoLink: "Մասնագետների համաշխարհային ցանց — հոգեբան, իրավաբան, ֆինանսիստ",
  filterAll: "Բոլորը",
  filterPsych: "Հոգեբան",
  filterLaw: "Իրավաբան",
  filterFinance: "Ֆինանսիստ",
  searchPlaceholder: "Երկիր, քաղաք, անուն…",
  empty: "Դեռ մասնագետներ չկան։ Դուք կարող եք առաջինը գրանցվել։",
  cardLanguages: "Լեզուներ",
  cardCountry: "Երկիր",
  contactCta: "Կապվել",
  contactTitle: "Կապի հարցում",
  yourName: "Ձեր անունը",
  yourEmail: "Էլ. փոստ",
  yourMessage: "Հաղորդագրություն",
  sendRequest: "Ուղարկել",
  sending: "Ուղարկում…",
  contactSuccess:
    "Հարցումը պահվեց։ Մասնագետը կկարողանա տեսնել այն իր վահանակում (MVP)։ Էլ. փոստով ավտոմատ ուղարկումը կարող է միացվել հետագայում։",
  contactError: "Չհաջողվեց ուղարկել։ Փորձեք նորից։",
  registerTitle: "Գրանցվել որպես մասնագետ",
  registerSubtitle:
    "Լրացրեք դաշտերը։ Ձեր պրոֆիլը կերևա համաշխարհային ցանցում (ցույց է տրվում բոլոր այցելուներին)։",
  regName: "Անուն / կարգավիճակ",
  regRole: "Մասնագիտություն",
  regCountry: "Երկիր",
  regCity: "Քաղաք (ընտրովի)",
  regLanguages: "Լեզուներ (օր. hy, en, ru)",
  regBio: "Կարճ ներկայացում",
  regEmail: "Գործնական էլ. փոստ (կապի համար)",
  regWebsite: "Կայք / LinkedIn (ընտրովի)",
  regSubmit: "Ուղարկել գրանցումը",
  regSuccess: "Գրանցումը պահվեց։ Ձեր պրոֆիլը հասանելի է ցանցում։",
  regError: "Սխալ։ Ստուգեք դաշտերը։",
  disclaimerExperts:
    "Մասնագետների ծառայությունները կարգավորվում են նրանց և ձեր միջև։ Հարթակը MVP է՝ կապի հարցումները պահվում են տվյալների բազայում, ավտոմատ էլ. փոստը կարող է միացվել հետո։",
  expertsLoadFailed:
    "Ցանկը չբեռնվեց։ Տեղային մշակման համար ստուգեք .env-ում DATABASE_URL-ը և մեկ անգամ գործարկեք՝ npx prisma db push",
  filtersSectionLabel: "Զտում և որոնում",
  loadingLabel: "Բեռնում…",
  emptyCta: "Գրանցվել որպես առաջին մասնագետ",
  contactCancel: "Փակել",
};

const en: ExpertsCopy = {
  pageEyebrow: "Directory",
  pageTitle: "Global expert network",
  pageSubtitle:
    "Psychologists, lawyers, financial professionals—from anywhere. Register as an expert or find one and send a contact request.",
  navExperts: "Experts",
  navRegister: "Join as expert",
  navHome: "Analyzer",
  homePromoLink: "Global expert network — psychology, law, finance",
  filterAll: "All",
  filterPsych: "Psychologist",
  filterLaw: "Lawyer",
  filterFinance: "Financial",
  searchPlaceholder: "Country, city, name…",
  empty: "No experts yet—you can be the first to register.",
  cardLanguages: "Languages",
  cardCountry: "Country",
  contactCta: "Connect",
  contactTitle: "Contact request",
  yourName: "Your name",
  yourEmail: "Email",
  yourMessage: "Message",
  sendRequest: "Send",
  sending: "Sending…",
  contactSuccess:
    "Request saved. The expert can see it in their dashboard (MVP). Email notifications can be added later.",
  contactError: "Could not send. Try again.",
  registerTitle: "Register as a professional",
  registerSubtitle:
    "Fill in the fields. Your profile appears in the global directory (visible to visitors).",
  regName: "Name / title",
  regRole: "Profession",
  regCountry: "Country",
  regCity: "City (optional)",
  regLanguages: "Languages (e.g. en, hy, de)",
  regBio: "Short bio",
  regEmail: "Professional email (for contact)",
  regWebsite: "Website / LinkedIn (optional)",
  regSubmit: "Submit registration",
  regSuccess: "Saved. Your profile is now listed.",
  regError: "Error. Check required fields.",
  disclaimerExperts:
    "Services are between you and the professional. This MVP stores contact requests in the database; automated email can be added later.",
  expertsLoadFailed:
    "Could not load the directory. For local dev: set DATABASE_URL in .env and run: npx prisma db push",
  filtersSectionLabel: "Filter & search",
  loadingLabel: "Loading directory…",
  emptyCta: "Be the first expert to register",
  contactCancel: "Close",
};

const fallback = en;

export function getExpertsCopy(locale: AppLocale): ExpertsCopy {
  if (locale === "hy") return hy;
  if (locale === "en" || locale === "en-US") return en;
  return fallback;
}

export type ExpertRoleKey = "PSYCHOLOGIST" | "LAWYER" | "FINANCIAL";

export function roleLabel(
  locale: AppLocale,
  role: ExpertRoleKey
): string {
  const c = getExpertsCopy(locale);
  if (role === "PSYCHOLOGIST") return c.filterPsych;
  if (role === "LAWYER") return c.filterLaw;
  return c.filterFinance;
}
