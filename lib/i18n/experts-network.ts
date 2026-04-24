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
  registerIntro: string;
  registerPoints: [string, string, string];
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
    "Մարդիկ նախ կիրառում են կառուցված վերլուծողը, հետո արդեն ավելի պարզ հարցով են ձեզանից փնտրում աջակցություն (տեղափոխություն, աշխատանք, իրավական/ֆինանսական հարցեր)։ Որպես մասնագետ երե՛ւացեք ցուցակում, ստացե՛ք կապի հարցումներ. պայմաններն՝ միշտ ձեզանով ու կլիենտով։",
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
  registerIntro:
    "Երևա՛ցեք նրանց, ովքեր արդեն ձևակերպել են հարցը (ոչ թե պատահական chat)․ հարցումը գալիս է ձեր էլ. փոստ, պատասխանն ու պայմանները Դուք եք սահմանում։",
  registerPoints: [
    "Ցուցակում հայտնվելը (այս տարբերակում) ազատ է․ մասնագիտություն, երկիր, լեզուներ, bio — երևում են /experts-ում։",
    "Կապի հարցում․ այցելուներն ուղարկում են հաղորդագրություն, Դուք արդյունքում կապվում եք նրանց հետ, վճարն ու սահմանները՝ ուղիղ ձեզանից։",
    "Մնում եք անկախ․ ձեր սակագինը, արձագանքի ժամկետը, մասնագիտական կանոնները․ կայքը միայն կապի կամուրջ է, ոչ ձեր ծառայության կատարող։",
  ],
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
    "Visitors use the structured analyzer for big life forks, then look for a real professional. Get listed to receive contact requests; fees, scope, and advice are between you and each client. Independent experts worldwide welcome.",
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
  registerIntro:
    "Get in front of people who already framed a serious decision (not random chat). You receive contact requests by email; you decide how to respond, what to charge, and what is in scope.",
  registerPoints: [
    "Global directory listing (this build): your role, country, languages, and bio are visible in /experts search.",
    "Inbound leads: visitors send a contact request; we do not take a cut on the base listing in this version.",
    "You stay independent: you set your own fees, response time, and professional boundaries; the site connects—does not provide your services for you.",
  ],
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
    default:
      /* DB / API may contain a role not yet mapped here */
      return typeof role === "string" && role ? role : c.filterPsych;
  }
}
