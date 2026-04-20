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
  filterPhysician: string;
  filterCoach: string;
  filterImmigration: string;
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
    "Հոգեբաններ, իրավաբաններ, ֆինանսիստներ, բժիշկներ, կոուչներ, միգրացիայի մասնագետներ — աշխարհի ցանկացած վայրից։ Գրանցվեք որպես մասնագետ կամ գտեք մասնագետ և ուղարկեք կապի հարցում։",
  navExperts: "Մասնագետներ",
  navRegister: "Գրանցվել",
  navHome: "Վերլուծություն",
  homePromoLink:
    "Մասնագետների համաշխարհային ցանց — հոգեբան, իրավաբան, ֆինանսիստ, բժիշկ, կոուչ, միգրացիա",
  filterAll: "Բոլորը",
  filterPsych: "Հոգեբան",
  filterLaw: "Իրավաբան",
  filterFinance: "Ֆինանսիստ",
  filterPhysician: "Բժիշկ",
  filterCoach: "Կոուչ",
  filterImmigration: "Միգրացիա",
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
    "Հարցումը ուղարկվեց։ Մասնագետը կտեսնի այն իր պրոֆիլի վահանակում և անձամբ կկապվի ձեզ հետ։",
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
    "Մասնագետների ծառայությունները տրամադրվում են նրանց կողմից՝ անկախ։ Կայքը միացնում է ձեզ մասնագետի հետ, սակայն խորհրդատվության պայմանները, վճարները և պատասխանատվությունը կարգավորվում են ուղղակիորեն ձեր և մասնագետի միջև։",
  expertsLoadFailed:
    "Ցանկը ժամանակավորապես հասանելի չէ։ Խնդրում ենք թարմացնել էջը մի փոքր ուշ։",
  filtersSectionLabel: "Զտում և որոնում",
  loadingLabel: "Բեռնում…",
  emptyCta: "Գրանցվել որպես առաջին մասնագետ",
  contactCancel: "Փակել",
};

const en: ExpertsCopy = {
  pageEyebrow: "Directory",
  pageTitle: "Global expert network",
  pageSubtitle:
    "Psychologists, lawyers, financial advisors, physicians, coaches, immigration specialists—from anywhere. Register as an expert or find one and send a contact request.",
  navExperts: "Experts",
  navRegister: "Join as expert",
  navHome: "Analyzer",
  homePromoLink:
    "Global expert network — psychology, law, finance, medicine, coaching, immigration",
  filterAll: "All",
  filterPsych: "Psychologist",
  filterLaw: "Lawyer",
  filterFinance: "Financial",
  filterPhysician: "Physician",
  filterCoach: "Coach",
  filterImmigration: "Immigration",
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
    "Your request has been sent. The expert will see it in their dashboard and reach out to you directly.",
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
    "Professional services are provided independently by each expert. Life Decision Engine connects you with qualified professionals, but the terms, fees, and advice are agreed directly between you and the expert.",
  expertsLoadFailed:
    "The directory is temporarily unavailable. Please refresh the page in a moment.",
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

export type ExpertRoleKey =
  | "PSYCHOLOGIST"
  | "LAWYER"
  | "FINANCIAL"
  | "PHYSICIAN"
  | "COACH"
  | "IMMIGRATION";

export function roleLabel(
  locale: AppLocale,
  role: ExpertRoleKey
): string {
  const c = getExpertsCopy(locale);
  switch (role) {
    case "PSYCHOLOGIST":
      return c.filterPsych;
    case "LAWYER":
      return c.filterLaw;
    case "FINANCIAL":
      return c.filterFinance;
    case "PHYSICIAN":
      return c.filterPhysician;
    case "COACH":
      return c.filterCoach;
    case "IMMIGRATION":
      return c.filterImmigration;
    default: {
      const _x: never = role;
      return _x;
    }
  }
}
