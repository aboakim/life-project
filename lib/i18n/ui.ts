import type { AppLocale } from "./locale";
import {
  trustHowAr,
  trustHowDe,
  trustHowEs,
  trustHowFr,
  trustHowIt,
  trustHowRu,
} from "./trust-how-locales";

export type UIStrings = {
  brand: string;
  heroLine1: string;
  heroAccent: string;
  subtitle: string;
  disclaimerTitle: string;
  disclaimerBody: string;
  decision: string;
  decisionPh: string;
  context: string;
  contextPh: string;
  constraints: string;
  constraintsPh: string;
  analyze: string;
  analyzing: string;
  sectionSummary: string;
  sectionDimensions: string;
  sectionScenarios: string;
  sectionTimeline: string;
  sectionScore: string;
  sectionTwin: string;
  dimFinances: string;
  dimPsychology: string;
  dimRisks: string;
  dimOpportunities: string;
  scenBest: string;
  scenWorst: string;
  scenLikely: string;
  timeM6: string;
  timeY2: string;
  timeY5: string;
  badgeLive: string;
  badgeDemo: string;
  badgeFallback: string;
  scoreSublabel: string;
  footerPremium: string;
  networkError: string;
  features: [string, string, string];
  accessLocal: string;
  langLabel: string;
  apiHintDemo: string;
  /** Shown when live AI fails — must not include server/API technical details */
  apiAnalysisServiceNotice: string;
  securityTitle: string;
  securityIntro: string;
  securityPoints: [string, string, string];
  /** Short stats line under hero */
  heroRibbon: string;
  trustSectionTitle: string;
  trustCards: ReadonlyArray<{
    emoji: string;
    title: string;
    body: string;
  }>;
  howSectionTitle: string;
  howSteps: ReadonlyArray<{ title: string; body: string }>;
  /** Sticky section jump links (home page) */
  sectionNavOverview: string;
  /** Home: problem → solution strip with images (after Overview) */
  sectionNavFixes: string;
  sectionNavProduct: string;
  sectionNavTrust: string;
  sectionNavHow: string;
  sectionNavAnalyzer: string;
  sectionNavLanguage: string;
  sectionNavPrivacy: string;
  /** Main nav overflow — “More” menu trigger */
  navMore: string;
  productSectionTitle: string;
  productSectionSubtitle: string;
  bentoCards: ReadonlyArray<{ pill: string; title: string; body: string }>;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  previewCardTitle: string;
  previewRows: ReadonlyArray<{
    label: string;
    value: string;
    section: "workspace" | "product" | "language";
  }>;
  workspaceTitle: string;
  /** Hero image carousel — same length as `HERO_SLIDE_IMAGE_URLS` */
  heroSlides: ReadonlyArray<{ alt: string; caption: string }>;
  productStripEyebrow: string;
  productStripAria: string;
  productStripAlts: readonly [string, string, string, string, string, string];
  /** Short “what is this?” strip below hero */
  atAGlanceEyebrow: string;
  atAGlanceTitle: string;
  atAGlanceCards: ReadonlyArray<{ title: string; body: string }>;
  /** Compact trust badges (home, under hero) */
  trustMicroPoints: readonly [string, string, string];
  /** Home “try a demo” mini-block */
  homeDemoEyebrow: string;
  homeDemoTitle: string;
  homeDemoExample1: string;
  homeDemoExample2: string;
  homeDemoCta: string;
  /** Shown with the progress bar while analysis is running */
  analyzingProgressLine: string;
  /** Dedicated /analyze page */
  analyzePageTitle: string;
  analyzePageSubtitle: string;
  analyzeBackHome: string;
  /** Shown above the form — where to type */
  workspaceFillHint: string;
  /** Shown as first thing in the results block */
  resultsYouAreHere: string;
  /** Home only — points users to the full-screen /analyze experience */
  homeAnalyzerPromoLine: string;
  homeAnalyzerPromoCta: string;
  sectionProfessional: string;
  sectionDirectoryExperts: string;
  expertOpenInDirectory: string;
  expertNoDirectoryMatch: string;
  /** Web Speech: dictate into fields */
  voiceDictate: string;
  voiceListening: string;
  voiceStop: string;
  voiceNotSupported: string;
  voiceInputHint: string;
  readAloud: string;
  readAloudStop: string;
  /** Server-side record button (Whisper) — public copy must not mention providers or keys */
  voiceWhisperStart: string;
  voiceWhisperStop: string;
  voiceWhisperWorking: string;
  voiceWhisperError: string;
  voiceWhisperNeedMic: string;
  /** Shown for locale hy instead of a useless in-browser STT button */
  voiceSttArmenianUseCloud: string;
};

/** English trust/how blocks — reused as fallback for locales without custom copy */
const trustHowEn: Pick<
  UIStrings,
  | "heroRibbon"
  | "trustSectionTitle"
  | "trustCards"
  | "howSectionTitle"
  | "howSteps"
  | "sectionNavOverview"
  | "sectionNavFixes"
  | "sectionNavProduct"
  | "sectionNavTrust"
  | "sectionNavHow"
  | "sectionNavAnalyzer"
  | "sectionNavLanguage"
  | "sectionNavPrivacy"
  | "productSectionTitle"
  | "productSectionSubtitle"
  | "bentoCards"
  | "heroCtaPrimary"
  | "heroCtaSecondary"
  | "previewCardTitle"
  | "previewRows"
  | "workspaceTitle"
  | "heroSlides"
  | "productStripEyebrow"
  | "productStripAria"
  | "productStripAlts"
  | "atAGlanceEyebrow"
  | "atAGlanceTitle"
  | "atAGlanceCards"
  | "trustMicroPoints"
  | "homeDemoEyebrow"
  | "homeDemoTitle"
  | "homeDemoExample1"
  | "homeDemoExample2"
  | "homeDemoCta"
  | "analyzingProgressLine"
> = {
  heroRibbon:
    "Free structured analyzer · Global expert directory · Private by design",
  sectionNavOverview: "Overview",
  sectionNavFixes: "What it fixes",
  atAGlanceEyebrow: "Start here",
  atAGlanceTitle: "Three quick steps",
  atAGlanceCards: [
    {
      title: "Enter your decision",
      body: "One clear question—add context and values if you want.",
    },
    {
      title: "Compare scenarios",
      body: "Best, worst, and likely paths with trade-offs side by side.",
    },
    {
      title: "Get a clear outcome",
      body: "Score, timeline, four lenses—talk to a pro only if you want one.",
    },
  ],
  trustMicroPoints: [
    "No data stored as a public post",
    "Private analysis in your session",
    "Optional expert help when you want a human",
  ],
  homeDemoEyebrow: "Try an example",
  homeDemoTitle: "See a structured report in one click",
  homeDemoExample1: "Should I move abroad?",
  homeDemoExample2: "Quit job or stay?",
  homeDemoCta: "Try demo",
  analyzingProgressLine: "Analyzing your decision…",
  trustSectionTitle: "Why people use this framework",
  trustCards: [
    {
      emoji: "🧭",
      title: "Structured logic, not opinions",
      body: "Clear trade-offs between paths—scenarios and lenses, not vibes or generic chat.",
    },
    {
      emoji: "🔐",
      title: "Clear trade-offs, not guesses",
      body: "Best, worst, and likely paths with evidence—your text stays in your session.",
    },
    {
      emoji: "🌍",
      title: "Humans when you need them",
      body: "Multilingual UI plus a growing directory of psychologists, lawyers, and financial pros.",
    },
  ],
  howSectionTitle: "How it works",
  howSteps: [
    {
      title: "Describe",
      body: "Write the decision and optional context—numbers, fears, values, deadlines.",
    },
    {
      title: "Analyze",
      body: "The engine maps finances, psychology, risks, and upside across 6 months → 5 years.",
    },
    {
      title: "Decide",
      body: "Use the score and rationale as a compass—then talk to a professional if you need one.",
    },
  ],
  sectionNavProduct: "Product",
  sectionNavTrust: "Trust",
  sectionNavHow: "How it works",
  sectionNavAnalyzer: "Analyzer",
  sectionNavLanguage: "Language",
  sectionNavPrivacy: "Privacy",
  productSectionTitle: "Everything in one structured flow",
  productSectionSubtitle:
    "A calm workspace for major choices—scenarios, lenses, timelines, and a score. Modeled after how leading product teams review decisions.",
  bentoCards: [
    {
      pill: "Scenarios",
      title: "Best · worst · likely",
      body: "Three explicit paths so you are not guessing in the dark.",
    },
    {
      pill: "Lenses",
      title: "Finance · mind · risk · upside",
      body: "Four angles that mirror how coaches and advisors think.",
    },
    {
      pill: "Timeline",
      title: "6 months → 5 years",
      body: "Short- and long-term consequences in one glance.",
    },
    {
      pill: "Score",
      title: "Alignment & feasibility",
      body: "A percentage with rationale—not a magic answer.",
    },
  ],
  heroCtaPrimary: "Start free analysis",
  heroCtaSecondary: "Browse experts",
  previewCardTitle: "Workspace preview",
  previewRows: [
    { label: "Output", value: "Structured report", section: "workspace" },
    { label: "Paths modeled", value: "3 scenarios", section: "product" },
    { label: "Interface", value: "9 languages", section: "language" },
  ],
  workspaceTitle: "Your analysis workspace",
  heroSlides: [
    {
      alt: "Mountain ridge above clouds at sunrise",
      caption: "See farther—map scenarios before you commit.",
    },
    {
      alt: "Architectural blueprints and planning drawings on a desk",
      caption: "Big moves deserve a structured lens, not guesswork.",
    },
    {
      alt: "Team collaborating at a table",
      caption: "Humans in the loop when you want expertise, not noise.",
    },
    {
      alt: "Bright modern workspace with desk and seating",
      caption: "One calm workspace for career, move, and life forks.",
    },
    {
      alt: "Analytics charts and metrics on a laptop screen",
      caption: "A score and timeline—clarity without pretending to be fate.",
    },
    {
      alt: "Forest path with tall trees and soft sunlight",
      caption:
        "Name the paths, not the panic—big forks are easier when choices are visible.",
    },
    {
      alt: "Laptop and coffee on a wooden desk—time to think before you choose",
      caption: "Write it down, sleep on it. Clarity often comes on the second look.",
    },
  ],
  productStripEyebrow: "Moments",
  productStripAria: "Illustrative scenes for the product flow",
  productStripAlts: [
    "Open road toward distant mountains",
    "Team learning and collaboration at a shared desk",
    "Team planning together in an office",
    "Workshop with people around a table",
    "Busy city avenue with a pedestrian crossing",
    "Bright home living room with large windows and sofa",
  ],
};

const trustHowHy: Pick<
  UIStrings,
  | "heroRibbon"
  | "trustSectionTitle"
  | "trustCards"
  | "howSectionTitle"
  | "howSteps"
  | "sectionNavOverview"
  | "sectionNavFixes"
  | "sectionNavProduct"
  | "sectionNavTrust"
  | "sectionNavHow"
  | "sectionNavAnalyzer"
  | "sectionNavLanguage"
  | "sectionNavPrivacy"
  | "productSectionTitle"
  | "productSectionSubtitle"
  | "bentoCards"
  | "heroCtaPrimary"
  | "heroCtaSecondary"
  | "previewCardTitle"
  | "previewRows"
  | "workspaceTitle"
  | "heroSlides"
  | "productStripEyebrow"
  | "productStripAria"
  | "productStripAlts"
  | "atAGlanceEyebrow"
  | "atAGlanceTitle"
  | "atAGlanceCards"
  | "trustMicroPoints"
  | "homeDemoEyebrow"
  | "homeDemoTitle"
  | "homeDemoExample1"
  | "homeDemoExample2"
  | "homeDemoCta"
  | "analyzingProgressLine"
> = {
  heroRibbon:
    "Անվճար կառուցված վերլուծիչ · Մասնագետների ցանց · Գաղտնիության առաջնահերթություն",
  sectionNavOverview: "Ընդհանուր",
  sectionNavFixes: "Ինչ է լուծում",
  atAGlanceEyebrow: "Սկսիր այստեղից",
  atAGlanceTitle: "Երեք հստակ քայլ",
  atAGlanceCards: [
    {
      title: "Մուտքագրիր հարցդ",
      body: "Մեկ հստակ հարց, կամաց ավելացրու կոնտեքստ և արժեքներ։",
    },
    {
      title: "Համեմատիր սցենարները",
      body: "Լավագույն, վատ և հավանական ուղիներ՝ փոխարժեքներով կողք կողքի։",
    },
    {
      title: "Ստացիր հստակ ելք",
      body: "Միավոր, ժամանակացույց, չորս հարթակ․ մասնագետ՝ միայն եթե ուզում ես։",
    },
  ],
  trustMicroPoints: [
    "Տեքստը որպես հրապարակային գրառում չի պահվում",
    "Գաղտնի վերլուծություն՝ քո սեանսի մեջ",
    "Մասնագետ՝ ցանկությամբ, ոչ պարտադիր",
  ],
  homeDemoEyebrow: "Փորձիր օրինակ",
  homeDemoTitle: "Ինչպես է աշխատում մեկ կտարվածով",
  homeDemoExample1: "Տեղափոխվե՞լ արտերկիր",
  homeDemoExample2: "Թողնե՞լ աշխատանքը, թե՞ մնալ",
  homeDemoCta: "Բացել ցուցադրում",
  analyzingProgressLine: "Վերլուծում ենք ձեր որոշումը․․․",
  trustSectionTitle: "Ինչու են ընտրում այս գործիքը",
  trustCards: [
    {
      emoji: "🧭",
      title: "Կարգավորված մտածողություն, ոչ կարծիքներ",
      body: "Հստակ փոխարժեքներ ուղիների միջեւ, ոչ թե ընդհանուր խորհուրդ։",
    },
    {
      emoji: "🔐",
      title: "Պարզ ռիսկ-փոխարժեք, ոչ կռահում",
      body: "Լավագույն, վատ և հավանական սցենարներ, չորս հարթակ, ժամկետներ․ ձեր տեքստը մնում է սեանսում։",
    },
    {
      emoji: "🌍",
      title: "Մարդիկ, երբ պետք է",
      body: "Բազմալեզու միջերես և մասնագետների ցանց՝ հոգեբաններ, իրավաբաններ, ֆինանսիստներ։",
    },
  ],
  howSectionTitle: "Ինչպես է աշխատում",
  howSteps: [
    {
      title: "1 · Նկարագրել",
      body: "Գրեք որոշումը և կոնտեքստը՝ թվեր, վախեր, արժեքներ, ժամկետներ։",
    },
    {
      title: "2 · Վերլուծել",
      body: "Շարժիչը քարտեզագրում է ֆինանսները, հոգեբանությունը, ռիսկերը և շանսերը՝ 6 ամիսից մինչև 5 տարի։",
    },
    {
      title: "3 · Որոշել",
      body: "Օգտագործեք միավորը որպես կողմնացույց․ անհրաժեշտության դեպքում դիմեք մասնագետի։",
    },
  ],
  sectionNavProduct: "Արտադրանք",
  sectionNavTrust: "Վստահություն",
  sectionNavHow: "Ինչպես է աշխատում",
  sectionNavAnalyzer: "Վերլուծիչ",
  sectionNavLanguage: "Լեզու",
  sectionNavPrivacy: "Գաղտնիություն",
  productSectionTitle: "Բոլորը մեկ կառուցված հոսքում",
  productSectionSubtitle:
    "Հանգիստ աշխատատարածք մեծ որոշումների համար՝ սցենարներ, հարթակներ, ժամանակացույց և միավոր։ Նման է այն գործիքներին, որոնցով արդյունաբերությունում են վերլուծում որոշումները։",
  bentoCards: [
    {
      pill: "Սցենարներ",
      title: "Լավագույն · վատ · հավանական",
      body: "Երեք հստակ ուղի՝ առանց կռահումների։",
    },
    {
      pill: "Հարթակներ",
      title: "Ֆինանս · միտք · ռիսկ · շանս",
      body: "Չորս անկյուն, ինչպես մասնագետների մոտ։",
    },
    {
      pill: "Ժամանակացույց",
      title: "6 ամիս → 5 տարի",
      body: "Կարճ և երկարաժամկետ հետևանքներ մեկ հայացքով։",
    },
    {
      pill: "Միավոր",
      title: "Համապատասխանություն",
      body: "Տոկոս բացատրությամբ՝ ոչ թե «կախարդական պատասխան»։",
    },
  ],
  heroCtaPrimary: "Սկսել անվճար վերլուծություն",
  heroCtaSecondary: "Մասնագետներ",
  previewCardTitle: "Աշխատատարածքի նախադիտում",
  previewRows: [
    { label: "Ելք", value: "Կառուցված հաշվետվություն", section: "workspace" },
    { label: "Սցենարներ", value: "3 ուղի", section: "product" },
    { label: "Ինտերֆեյս", value: "9 լեզու", section: "language" },
  ],
  workspaceTitle: "Ձեր վերլուծության աշխատատարածք",
  heroSlides: [
    {
      alt: "Լեռնային շղթա ամպերի վերևում՝ արևածագ",
      caption: "Տեսնել ավելի հեռու՝ մոդելավորիր սցենարները մինչ կփոխես կյանքը։",
    },
    {
      alt: "Ճարտարապետական գծագիրներ և չափագրություններ սեղանի վրա",
      caption: "Մեծ քայլերը պահանջում են կառուցված հայացք, ոչ թե կռահում։",
    },
    {
      alt: "Թիմը համագործակցում է սեղանի շուրջ",
      caption: "Մարդիկ շղթայում, երբ ուզում ես փորձ, ոչ թե աղմուկ։",
    },
    {
      alt: "Լուսավոր ժամանակակից աշխատասենյակ՝ սեղան և նստատեղեր",
      caption: "Մեկ հանգիստ աշխատատարածք՝ կարիերա, տեղափոխություն, կյանքի ընտրություններ։",
    },
    {
      alt: "Վերլուծական գծապատկերներ և ցուցանիշներ լապտոպի էկրանին",
      caption: "Միավոր և ժամանակացույց՝ պարզություն առանց կախարդական պատասխանի։",
    },
    {
      alt: "Անտառային ճանապարհ՝ բարձր ծառեր, փափուկ լույս",
      caption:
        "Անվանի ուղիները, ոչ թե միայն վախը՝ մեծ տարաձայնություններն ավելի կառավարելի են դառնում։",
    },
    {
      alt: "Լապտոպ և սուրճ փայտե սեղանի վրա, հանգիստ աշխատանքային պահ",
      caption:
        "Գրիր, մի քանի ժամ կամ օր հետո նորից կարդա — պարզությունը հաճախ երկրորդ հայացքով է գալիս։",
    },
  ],
  productStripEyebrow: "Պահեր",
  productStripAria: "Նկարագրական տեսարաններ արտադրանքի հոսքի համար",
  productStripAlts: [
    "Բաց ճանապարհ դեպի հեռու լեռներ",
    "Թիմային ուսուցում ու համագործակցություն ընդհանուր սեղանի շուրջ",
    "Թիմը պլանավորում է գրասենյակում",
    "Վարպետաց դաս՝ մարդիկ սեղանի շուրջ",
    "Խիտ քաղաքի պողոտ՝ հետիոտնային անցում",
    "Լուսավոր ներս՝ սեղանամաց, սոֆա, մեծ լուսամուտներ",
  ],
};

const uiHy: Partial<UIStrings> = {
  brand: "Կյանքի որոշումների AI",
  heroLine1: "Կայացրո՛ր լավ կյանքի որոշումներ",
  heroAccent: "րոպեների մեջ",
  subtitle:
    "Համեմատի՛ր տարբերակները, տե՛ս արդյունքները, հստա՛ր որոշի՛ր. կառուցված վերլուծություն, ոչ պատահական chat։",
  disclaimerTitle: "Պարտադիր հիշեցում",
  disclaimerBody:
    "Այս գործիքը աջակցություն է, ոչ թե վերջնական իշխանություն։ Ճգնաժամային իրավիճակներում դիմեք մասնագետի։ Սա բժշկական, իրավական կամ թերապևտիկ խորհուրդ չէ։",
  decision: "Ձեր հարցը / որոշումը",
  decisionPh:
    "Օրինակ՝ «Արժե՞ տեղափոխվել Գերմանիա», «Արժե՞ թողնել աշխատանքը»…",
  context: "Կոնտեքստ (ընտրովի)",
  contextPh: "Թվեր, ժամկետ, ընտանիք, առողջություն…",
  constraints: "Արժեքներ և սահմանափակումներ (ընտրովի)",
  constraintsPh: "Ինչն է չբացարձակել, ինչից եք վախենում…",
  analyze: "Վերլուծել",
  analyzing: "Վերլուծում…",
  sectionSummary: "Ամփոփում",
  sectionDimensions: "Չորս հարթակ",
  sectionScenarios: "Սցենարներ",
  sectionTimeline: "Ապագայի սիմուլյացիա",
  sectionScore: "Որոշման միավոր",
  sectionTwin: "Թվային երկվորյակ (տեսակետ)",
  dimFinances: "Ֆինանսներ",
  dimPsychology: "Հոգեբանություն",
  dimRisks: "Ռիսկեր",
  dimOpportunities: "Շանսեր",
  scenBest: "Լավագույն",
  scenWorst: "Վատագույն",
  scenLikely: "Ամենահավանական",
  timeM6: "6 ամիս հետո",
  timeY2: "2 տարի հետո",
  timeY5: "5 տարի հետո",
  badgeLive: "AI վերլուծություն",
  badgeDemo: "Ցուցադրական ռեժիմ",
  badgeFallback: "Կրկնակի ռեժիմ",
  scoreSublabel: "համապատասխանություն / իրականացվողություն",
  footerPremium:
    "Միջուկային վերլուծությունն անվճար է։ Premium փաթեթը (Stripe-ի միջոցով) բացում է լրացուցիչ խորություն, իսկ հետագայում՝ իրական coach/հոգեբանի շերտ։",
  networkError: "Ցանցի սխալ",
  features: ["Սցենարներ", "Ռիսկեր և ֆինանսներ", "Որոշման միավոր %"],
  accessLocal:
    "Տեղային հասցե՝ http://localhost:3000 — գործարկեք `npm run dev` ձեր համակարգչում։",
  langLabel: "Լեզու",
  navMore: "Ավելին",
  apiHintDemo:
    "Ցուցադրական վերլուծություն։ Ավելի խորը AI վերլուծությունը միանում է շուտով։",
  apiAnalysisServiceNotice:
    "Վերլուծման ծառայությանը հիմա չհաջողվեցինք միանալ։ Ստորև՝ ցուցադրական հաշվետվություն՝ փորձեք մի քիչ հետո։",
  securityTitle: "Անվտանգ և գաղտնի հարթակ",
  securityIntro:
    "Այս հարթակը նախագծված է գաղտնիության և անվտանգության սկզբունքներով․ ձեր խնդիրը, հարցը կամ պատմությունը ուրիշ այցելուներին չի երևում, և այն չի հրապարակվում որպես բոլորին տեսանելի գրառում։",
  securityPoints: [
    "Չկա հրապարակային ժապավեն, քվեարկություն կամ «ուրիշների պատմություններ»․ ձեր տեքստը մնում է ձեր սեանսի շրջանակում։",
    "Այս տարբերակում տեքստը չի պահվում բազայում որպես հրապարակային post, որպեսզի երրորդ անձինք կարդան այն։",
    "Եթե միացված է AI վերլուծությունը, տեքստը փոխանցվում է միայն պատասխան պատրաստելու նպատակով (ըստ մատակարարի պայմանների)։",
  ],
  analyzePageTitle: "Վերլուծության հարթակ",
  analyzePageSubtitle:
    "Գրիր հարցը ստորև, հետո սեղմիր «Վերլուծել»․ կառուցված հաշվետվությունը կերևա բանաձևի հենց տակ, երբ պատրաստ լինի։",
  analyzeBackHome: "Գլխավոր էջ",
  workspaceFillHint:
    "Նախ՝ գրեք ձեր հարցը առաջին դաշտում, հետո սեղմեք «Վերլուծել»․ հաշվետվությունը հայտնվում է բանաձևի անմիջապես ներքևում։",
  resultsYouAreHere: "Ձեր հաշվետվությունը պատրաստ է",
  homeAnalyzerPromoLine:
    "Ցանկանա՞ք էջ, որտեղ միայն վերլուծիչն է, առանց երկար սքրոլի․",
  homeAnalyzerPromoCta: "Բացել /analyze",
  sectionProfessional: "Ում կարող եք դիմել (մասնագիտական ուղեցույց)",
  sectionDirectoryExperts: "Մեր ցանցում գրանցված մասնագետներ այս ուղղությամբ",
  expertOpenInDirectory: "Բացել ցանկում",
  expertNoDirectoryMatch:
    "Այս պահին ցանկում չկա այս կատեգորիայով գրանցված մասնագետ․ դիտեք ընդհանուր ցանկը։",
  voiceDictate: "Խոսել",
  voiceListening: "Լսում եմ…",
  voiceStop: "Կանգ",
  voiceNotSupported:
    "Բրաուզերով խոսում→տեքստը հայերենում հաճախ չի աշխատում․ երևում է «(cloud) գրառում» կոճակը — այն ավելի հավանական է աշխատի, կամ մուտքը գրե՛ք։ Փորձեք Chrome/Edge։",
  voiceInputHint:
    "Ընտրված միջերեսի լեզուն = վերլուծության, ձայնի և «Լսել»-ի համար. պահե՛ք նույնը, ինչ խոսում եք։ Եթե «Լսել»-ը ձեր լեզվով ձայն չունի, կարող է տարբեր լեզվով կամ թարգմանված կարդալ (կախված սարքից)։",
  readAloud: "Լսել հաշվետվությունը",
  readAloudStop: "Կանգնեցնել",
  voiceWhisperStart: "Գրանցում (cloud)",
  voiceWhisperStop: "Կանգ և ուղարկել",
  voiceWhisperWorking: "Գրառում…",
  voiceWhisperError: "Գրառումը չհաջողվեց. փորձեք բրաուզերի կոճակը.",
  voiceWhisperNeedMic: "Թույլտվեք միքրոֆոնը։",
  voiceSttArmenianUseCloud:
    "Բրաուզերում հայերեն խոսում→տեքստը սովորաբար չի աշխատում․ երևում է «(cloud) գրառում» — այն ավելի հավանական է աշխատի, կամ մուտքը գրե՛ք։",
};

const uiEn: Partial<UIStrings> = {
  brand: "Life Decision Engine",
  heroLine1: "Make better life decisions",
  heroAccent: "in minutes",
  subtitle:
    "Compare options, see outcomes, decide clearly. Structured analysis—not random chat.",
  disclaimerTitle: "Important",
  disclaimerBody:
    "This is a support tool—not final authority. In a crisis, contact a professional. Not medical, legal, or therapeutic advice.",
  decision: "Your decision / question",
  decisionPh: 'e.g. “Should I move to Germany?”, “Should I quit my job?”…',
  context: "Context (optional)",
  contextPh: "Numbers, timeline, family, health…",
  constraints: "Values & constraints (optional)",
  constraintsPh: "Lines you won’t cross, what you fear losing…",
  analyze: "Run analysis",
  analyzing: "Analyzing…",
  sectionSummary: "Summary",
  sectionDimensions: "Four lenses",
  sectionScenarios: "Scenarios",
  sectionTimeline: "Future simulation",
  sectionScore: "Decision score",
  sectionTwin: "Digital twin (perspective)",
  dimFinances: "Finances",
  dimPsychology: "Psychology",
  dimRisks: "Risks",
  dimOpportunities: "Upside",
  scenBest: "Best case",
  scenWorst: "Worst case",
  scenLikely: "Most likely",
  timeM6: "6 months later",
  timeY2: "2 years later",
  timeY5: "5 years later",
  badgeLive: "AI analysis",
  badgeDemo: "Demo mode",
  badgeFallback: "Fallback mode",
  scoreSublabel: "alignment / feasibility",
  footerPremium:
    "The core analyzer is free. Premium (via Stripe) unlocks extra depth, and future releases will add a human-coach tier.",
  networkError: "Network error",
  features: ["Psychology", "Finance", "Structured AI"],
  accessLocal:
    "Local URL: http://localhost:3000 — run `npm run dev` on your machine.",
  langLabel: "Language",
  navMore: "More",
  apiHintDemo:
    "Structured demo analysis. Deeper AI analysis is coming back online shortly.",
  apiAnalysisServiceNotice:
    "We couldn’t reach the analysis service just now. Below is a demo report — please try again in a few minutes.",
  securityTitle: "A safe, private platform",
  securityIntro:
    "This platform is designed to be private and secure: your question and story are not visible to other visitors, and nothing is published as a public post for everyone to see.",
  securityPoints: [
    "There is no public feed, voting wall, or “other people’s stories” area—your text stays within your session flow.",
    "This build does not store your text in a database as public posts that strangers could read.",
    "If AI analysis is on, your text is sent to the provider only to generate your answer (under their terms).",
  ],
  analyzePageTitle: "Decision analyzer",
  analyzePageSubtitle:
    "Write your question below, then run the analysis. Your structured report appears right under the form when it’s ready.",
  analyzeBackHome: "Back to home",
  workspaceFillHint:
    "Type your main question in the first box, then run analysis. The report appears directly below the form.",
  resultsYouAreHere: "Your report is ready",
  homeAnalyzerPromoLine:
    "Want a page with only the analyzer and no long scroll?",
  homeAnalyzerPromoCta: "Open the analyzer",
  sectionProfessional: "Who to involve (professional guidance)",
  sectionDirectoryExperts: "Registered experts in our directory for this area",
  expertOpenInDirectory: "Open in directory",
  expertNoDirectoryMatch:
    "No listed expert in this category yet — browse the full directory.",
  voiceDictate: "Dictate",
  voiceListening: "Listening…",
  voiceStop: "Stop",
  voiceNotSupported:
    "In-browser voice typing isn’t available here. If you see a cloud (record) option, try that, or type. Best in Chrome or Edge for supported languages.",
  voiceInputHint:
    "Your selected page language applies to the analysis, voice features, and read-aloud — keep it aligned with the language you speak. If read-aloud doesn’t offer a voice in your language, your device may fall back to another language (best effort).",
  readAloud: "Listen to report",
  readAloudStop: "Stop playback",
  voiceWhisperStart: "Record (cloud)",
  voiceWhisperStop: "Stop & send",
  voiceWhisperWorking: "Transcribing…",
  voiceWhisperError: "Transcription failed — try the browser button.",
  voiceWhisperNeedMic: "Allow microphone access.",
  voiceSttArmenianUseCloud:
    "In-browser voice typing usually doesn’t work for Armenian. If you see cloud (record), use that, or type.",
};

/** American English — UI copy tuned for US spelling/idiom where it differs */
const uiEnUs: Partial<UIStrings> = {
  ...uiEn,
  decisionPh:
    'e.g. "Should I move to Germany?", "Should I quit my job?"…',
  accessLocal:
    "Local URL: http://localhost:3000 — run `npm run dev`, then open it in your browser.",
  footerPremium:
    "The core analyzer is free. Premium (via Stripe) unlocks extra depth, with a human-coach tier planned for future releases.",
};

const uiRu: Partial<UIStrings> = {
  brand: "Life Decision Engine",
  heroLine1: "Движок",
  heroAccent: "решений жизни",
  subtitle:
    "Сценарии, горизонты и оценка решения в одной структуре — не просто чат.",
  disclaimerTitle: "Важно",
  disclaimerBody:
    "Это вспомогательный инструмент, а не окончательный авторитет. В кризисе обратитесь к специалисту. Не медицинский, юридический и не терапевтический совет.",
  decision: "Ваш вопрос / решение",
  decisionPh:
    "Например: «Стоит ли переезжать в Германию?», «Уволиться с работы?»…",
  context: "Контекст (необязательно)",
  contextPh: "Цифры, сроки, семья, здоровье…",
  constraints: "Ценности и ограничения (необязательно)",
  constraintsPh: "Красные линии, чего боитесь лишиться…",
  analyze: "Анализировать",
  analyzing: "Анализ…",
  sectionSummary: "Резюме",
  sectionDimensions: "Четыре оси",
  sectionScenarios: "Сценарии",
  sectionTimeline: "Модель будущего",
  sectionScore: "Оценка решения",
  sectionTwin: "Цифровой двойник (взгляд)",
  dimFinances: "Финансы",
  dimPsychology: "Психология",
  dimRisks: "Риски",
  dimOpportunities: "Возможности",
  scenBest: "Лучший случай",
  scenWorst: "Худший случай",
  scenLikely: "Наиболее вероятно",
  timeM6: "Через 6 месяцев",
  timeY2: "Через 2 года",
  timeY5: "Через 5 лет",
  badgeLive: "AI-анализ",
  badgeDemo: "Демо-режим",
  badgeFallback: "Резервный режим",
  scoreSublabel: "соответствие / реализуемость",
  footerPremium:
    "В будущем Premium может добавить живых коучей — сейчас только ПО.",
  networkError: "Ошибка сети",
  features: ["Психология", "Финансы", "Структура AI"],
  accessLocal:
    "Локально: http://localhost:3000 — запустите `npm run dev` на компьютере.",
  langLabel: "Язык",
  navMore: "Ещё",
  apiHintDemo:
    "Структурированный демо-анализ. Глубокий AI-анализ скоро снова будет доступен.",
  apiAnalysisServiceNotice:
    "Сервис анализа сейчас недоступен. Ниже — демонстрационный отчёт. Попробуйте позже.",
  securityTitle: "Безопасная и приватная платформа",
  securityIntro:
    "Платформа создана с упором на конфиденциальность и безопасность: ваш вопрос и история не видны другим посетителям и не публикуются как открытая запись для всех.",
  securityPoints: [
    "Нет публичной ленты, голосований и раздела «чужие истории» — текст остаётся в рамках вашего сеанса.",
    "В этой версии текст не хранится в базе как публичные посты, которые могли бы читать посторонние.",
    "Если включён AI-анализ, текст передаётся поставщику только для генерации ответа (на условиях сервиса).",
  ],
  analyzePageTitle: "Анализатор решений",
  analyzePageSubtitle:
    "Напишите вопрос ниже и запустите анализ. Структурированный отчёт появится сразу под формой, когда будет готов.",
  analyzeBackHome: "На главную",
  workspaceFillHint:
    "Сначала введите вопрос в первом поле, затем запустите анализ. Отчёт появится сразу под формой.",
  resultsYouAreHere: "Ваш отчёт готов",
  homeAnalyzerPromoLine:
    "Нужна страница только с анализатором, без длинной прокрутки?",
  homeAnalyzerPromoCta: "Открыть анализатор",
  sectionProfessional: "С кем проконсультироваться (о профессии)",
  sectionDirectoryExperts: "Зарегистрированные эксперты в этой сфере",
  expertOpenInDirectory: "Открыть в каталоге",
  expertNoDirectoryMatch:
    "Пока нет эксперта в этой категории — смотрите весь список.",
  voiceDictate: "Диктовка",
  voiceListening: "Слушаю…",
  voiceStop: "Стоп",
  voiceNotSupported:
    "Голос в браузере может не поддерживать этот язык. Если видна кнопка «cloud (запись)», попробуйте её, иначе ввод с клавиатуры. Chrome/Edge — лучше.",
  voiceInputHint:
    "Язык интерфейса задаёт и отчёт, и голос. Если для «Прослушать» нет голоса на вашем языке, устройство может выбрать другой язык (по возможности).",
  readAloud: "Прослушать отчёт",
  readAloudStop: "Остановить",
  voiceWhisperStart: "Запись (cloud)",
  voiceWhisperStop: "Стоп и отправить",
  voiceWhisperWorking: "Расшифровка…",
  voiceWhisperError: "Не удалось — попробуйте кнопку браузера.",
  voiceWhisperNeedMic: "Разрешите доступ к микрофону.",
  voiceSttArmenianUseCloud:
    "Встроенный голосовой ввод для армянского в браузере на ПК часто не работает. Если видна «cloud (запись)», попробуйте её, или печатайте.",
};

const uiDe: Partial<UIStrings> = {
  brand: "Life Decision Engine",
  heroLine1: "Life",
  heroAccent: "Decision Engine",
  subtitle:
    "Szenarien, Zeitverläufe und ein Score—strukturiert, kein generischer Chat.",
  disclaimerTitle: "Wichtig",
  disclaimerBody:
    "Dies ist ein Hilfsmittel, keine endgültige Instanz. In Krisen: Profis kontaktieren. Keine medizinische, rechtliche oder therapeutische Beratung.",
  decision: "Deine Frage / Entscheidung",
  decisionPh: "z. B. „Nach Deutschland ziehen?“, „Job kündigen?“ …",
  context: "Kontext (optional)",
  contextPh: "Zahlen, Zeitrahmen, Familie, Gesundheit …",
  constraints: "Werte & Grenzen (optional)",
  constraintsPh: "Was du nicht überschreitest, was du verlieren fürchtest …",
  analyze: "Analyse starten",
  analyzing: "Analysiere …",
  sectionSummary: "Zusammenfassung",
  sectionDimensions: "Vier Perspektiven",
  sectionScenarios: "Szenarien",
  sectionTimeline: "Zukunftssimulation",
  sectionScore: "Entscheidungs-Score",
  sectionTwin: "Digitaler Zwilling (Perspektive)",
  dimFinances: "Finanzen",
  dimPsychology: "Psychologie",
  dimRisks: "Risiken",
  dimOpportunities: "Chancen",
  scenBest: "Bester Fall",
  scenWorst: "Schlechtester Fall",
  scenLikely: "Wahrscheinlichster Fall",
  timeM6: "Nach 6 Monaten",
  timeY2: "Nach 2 Jahren",
  timeY5: "Nach 5 Jahren",
  badgeLive: "KI-Analyse",
  badgeDemo: "Demo-Modus",
  badgeFallback: "Fallback-Modus",
  scoreSublabel: "Passung / Machbarkeit",
  footerPremium:
    "Ein Premium-Tier könnte später echte Coaches hinzufügen—aktuell nur Software.",
  networkError: "Netzwerkfehler",
  features: ["Psychologie", "Finanzen", "Strukturierte KI"],
  accessLocal:
    "Lokal: http://localhost:3000 — `npm run dev` auf deinem Rechner ausführen.",
  langLabel: "Sprache",
  navMore: "Mehr",
  apiHintDemo:
    "Strukturierte Demo-Analyse. Die vollständige KI-Analyse ist in Kürze wieder verfügbar.",
  apiAnalysisServiceNotice:
    "Der Analysedienst ist gerade nicht erreichbar. Unten eine Demo-Auswertung — bitte später erneut versuchen.",
  securityTitle: "Sichere, private Plattform",
  securityIntro:
    "Diese Plattform ist auf Privatsphäre und Sicherheit ausgelegt: Deine Frage und Geschichte sind für andere Besucher nicht sichtbar und werden nicht als öffentlicher Beitrag für alle veröffentlicht.",
  securityPoints: [
    "Es gibt keinen öffentlichen Feed, keine Abstimmungswand und keinen Bereich „Fremde Geschichten“ — dein Text bleibt in deinem Sitzungsablauf.",
    "In dieser Version wird dein Text nicht als öffentliche Posts in einer Datenbank gespeichert, die Fremde lesen könnten.",
    "Wenn die KI-Analyse aktiv ist, wird dein Text nur an den Anbieter übermittelt, um deine Antwort zu erzeugen (gemäß deren Bedingungen).",
  ],
  analyzePageTitle: "Analyse-Workspace",
  analyzePageSubtitle:
    "Schreibe deine Frage unten, starte die Analyse. Dein strukturierter Bericht erscheint direkt unter dem Formular, sobald er fertig ist.",
  analyzeBackHome: "Zur Startseite",
  workspaceFillHint:
    "Schreib deine Hauptfrage ins erste Feld, dann Analyse starten. Der Bericht erscheint direkt unter dem Formular.",
  resultsYouAreHere: "Dein Bericht ist fertig",
  homeAnalyzerPromoLine:
    "Nur Analyse-Seite ohne langen Scroll?",
  homeAnalyzerPromoCta: "Analyzer öffnen",
  sectionProfessional: "Wen einbeziehen (fachliche Orientierung)",
  sectionDirectoryExperts: "Registrierte Experten in diesem Bereich",
  expertOpenInDirectory: "Im Verzeichnis öffnen",
  expertNoDirectoryMatch:
    "Noch kein passender Experte in dieser Kategorie — gesamtes Verzeichnis ansehen.",
  voiceDictate: "Diktieren",
  voiceListening: "Höre zu…",
  voiceStop: "Stopp",
  voiceNotSupported:
    "Manche Sprachen laufen im Browser nicht. Wenn eine Cloud-Aufnahme erscheint, nutze sie, sonst tippen. Chrome/Edge meist besser.",
  voiceInputHint:
    "Gleiche Oberflächensprache = gleiche Analyse- und Sprachfunktionen. Fehlt eine Stimme für «Vorlesen», kann das Gerät ausweichen (bestmöglich).",
  readAloud: "Bericht anhören",
  readAloudStop: "Stoppen",
  voiceWhisperStart: "Aufnahme (Cloud)",
  voiceWhisperStop: "Stopp & senden",
  voiceWhisperWorking: "Wird transkribiert…",
  voiceWhisperError: "Fehlgeschlagen — Browser-Button nutzen.",
  voiceWhisperNeedMic: "Mikrofon erlauben.",
  voiceSttArmenianUseCloud:
    "Armenische Spracheingabe im Desktop-Browser funktioniert meist nicht. Cloud-Aufnahme nutzen, wenn sichtbar, oder tippen.",
};

const uiFr: Partial<UIStrings> = {
  brand: "Life Decision Engine",
  heroLine1: "Life",
  heroAccent: "Decision Engine",
  subtitle:
    "Scénarios, horizons et score—structuré, pas un simple chat générique.",
  disclaimerTitle: "Important",
  disclaimerBody:
    "Outil d’aide, pas d’autorité finale. En crise, contactez un professionnel. Pas un avis médical, juridique ou thérapeutique.",
  decision: "Votre question / décision",
  decisionPh: "ex. « Déménager en Allemagne ? », « Quitter mon emploi ? » …",
  context: "Contexte (optionnel)",
  contextPh: "Chiffres, délais, famille, santé…",
  constraints: "Valeurs & contraintes (optionnel)",
  constraintsPh: "Lignes rouges, ce que vous craignez de perdre…",
  analyze: "Lancer l’analyse",
  analyzing: "Analyse…",
  sectionSummary: "Synthèse",
  sectionDimensions: "Quatre axes",
  sectionScenarios: "Scénarios",
  sectionTimeline: "Simulation temporelle",
  sectionScore: "Score de décision",
  sectionTwin: "Jumeau numérique (perspective)",
  dimFinances: "Finances",
  dimPsychology: "Psychologie",
  dimRisks: "Risques",
  dimOpportunities: "Opportunités",
  scenBest: "Meilleur cas",
  scenWorst: "Pire cas",
  scenLikely: "Le plus probable",
  timeM6: "Dans 6 mois",
  timeY2: "Dans 2 ans",
  timeY5: "Dans 5 ans",
  badgeLive: "Analyse IA",
  badgeDemo: "Mode démo",
  badgeFallback: "Mode secours",
  scoreSublabel: "alignement / faisabilité",
  footerPremium:
    "Un futur Premium pourrait ajouter des coachs humains—ici, logiciel seul.",
  networkError: "Erreur réseau",
  features: ["Psychologie", "Finance", "IA structurée"],
  accessLocal:
    "Local : http://localhost:3000 — lancez `npm run dev` sur votre machine.",
  langLabel: "Langue",
  navMore: "Plus",
  apiHintDemo:
    "Analyse de démonstration structurée. L’analyse IA complète sera de nouveau disponible sous peu.",
  apiAnalysisServiceNotice:
    "Le service d’analyse est indisponible pour le moment. Voici une version démo — réessayez dans quelques minutes.",
  securityTitle: "Une plateforme sûre et privée",
  securityIntro:
    "Cette plateforme est conçue pour la confidentialité et la sécurité : votre question et votre récit ne sont pas visibles par les autres visiteurs et ne sont pas publiés comme un message public pour tout le monde.",
  securityPoints: [
    "Pas de fil public, de votes ni de section « histoires des autres » — votre texte reste dans le flux de votre session.",
    "Cette version n’enregistre pas votre texte en base comme publications publiques lisibles par des inconnus.",
    "Si l’analyse IA est activée, votre texte est envoyé au fournisseur uniquement pour générer votre réponse (selon leurs conditions).",
  ],
  analyzePageTitle: "Espace d’analyse",
  analyzePageSubtitle:
    "Écrivez votre question ci-dessous, lancez l’analyse. Le rapport structuré apparaît juste sous le formulaire dès qu’il est prêt.",
  analyzeBackHome: "Retour à l’accueil",
  workspaceFillHint:
    "Écrivez votre question principale dans le premier champ, puis lancez l’analyse. Le rapport apparaît juste sous le formulaire.",
  resultsYouAreHere: "Votre rapport est prêt",
  homeAnalyzerPromoLine:
    "Une page avec seulement l’analyseur, sans long défilement ?",
  homeAnalyzerPromoCta: "Ouvrir l’analyseur",
  sectionProfessional: "Qui consulter (orientation professionnelle)",
  sectionDirectoryExperts: "Experts inscrits sur ce thème",
  expertOpenInDirectory: "Ouvrir dans l’annuaire",
  expertNoDirectoryMatch:
    "Aucun expert listé pour cette catégorie — parcourez l’annuaire complet.",
  voiceDictate: "Dicter",
  voiceListening: "J’écoute…",
  voiceStop: "Arrêter",
  voiceNotSupported:
    "La dictée intégrée ne couvre pas toutes les langues. Si un enregistrement « nuage » apparaît, essayez-le, sinon le clavier. Chrome/Edge de préférence.",
  voiceInputHint:
    "La langue d’interface guide analyse, dictée et lecture vocale. Sans voix adaptée, la lecture peut utiliser une autre langue (selon l’appareil).",
  readAloud: "Écouter le rapport",
  readAloudStop: "Arrêter",
  voiceWhisperStart: "Enregistrer (cloud)",
  voiceWhisperStop: "Stop et envoi",
  voiceWhisperWorking: "Transcription…",
  voiceWhisperError: "Échec — essayez le bouton du navigateur.",
  voiceWhisperNeedMic: "Autorisez le micro.",
  voiceSttArmenianUseCloud:
    "La dictée navigateur en arménien ne fonctionne en général pas. Si l’enregistrement nuage apparaît, essayez-le, ou tapez.",
};

const uiEs: Partial<UIStrings> = {
  brand: "Life Decision Engine",
  heroLine1: "Life",
  heroAccent: "Decision Engine",
  subtitle:
    "Escenarios, horizontes y puntuación—estructurado, no un chat genérico.",
  disclaimerTitle: "Importante",
  disclaimerBody:
    "Herramienta de apoyo, no autoridad final. En crisis, contacta a un profesional. No es consejo médico, legal ni terapéutico.",
  decision: "Tu pregunta / decisión",
  decisionPh: "ej. «¿Mudarme a Alemania?», «¿Dejar el trabajo?»…",
  context: "Contexto (opcional)",
  contextPh: "Cifras, plazos, familia, salud…",
  constraints: "Valores y límites (opcional)",
  constraintsPh: "Líneas rojas, qué temes perder…",
  analyze: "Analizar",
  analyzing: "Analizando…",
  sectionSummary: "Resumen",
  sectionDimensions: "Cuatro ejes",
  sectionScenarios: "Escenarios",
  sectionTimeline: "Simulación temporal",
  sectionScore: "Puntuación",
  sectionTwin: "Gemelo digital (perspectiva)",
  dimFinances: "Finanzas",
  dimPsychology: "Psicología",
  dimRisks: "Riesgos",
  dimOpportunities: "Oportunidades",
  scenBest: "Mejor caso",
  scenWorst: "Peor caso",
  scenLikely: "Más probable",
  timeM6: "En 6 meses",
  timeY2: "En 2 años",
  timeY5: "En 5 años",
  badgeLive: "Análisis IA",
  badgeDemo: "Modo demo",
  badgeFallback: "Modo alternativo",
  scoreSublabel: "alineación / viabilidad",
  footerPremium:
    "Un Premium futuro podría añadir coaches humanos—ahora solo software.",
  networkError: "Error de red",
  features: ["Psicología", "Finanzas", "IA estructurada"],
  accessLocal:
    "Local: http://localhost:3000 — ejecuta `npm run dev` en tu equipo.",
  langLabel: "Idioma",
  navMore: "Más",
  apiHintDemo:
    "Análisis de demostración estructurado. El análisis de IA completo volverá a estar disponible en breve.",
  apiAnalysisServiceNotice:
    "No pudimos conectar con el servicio de análisis. Abajo hay un informe de demostración — inténtalo de nuevo más tarde.",
  securityTitle: "Una plataforma segura y privada",
  securityIntro:
    "La plataforma está pensada para la privacidad y la seguridad: tu pregunta e historia no son visibles para otros visitantes ni se publican como un post abierto para todos.",
  securityPoints: [
    "No hay feed público, muro de votos ni sección de «historias de otras personas» — tu texto se mantiene en el flujo de tu sesión.",
    "Esta versión no guarda tu texto en la base de datos como publicaciones que extraños puedan leer.",
    "Si el análisis con IA está activo, tu texto se envía al proveedor solo para generar tu respuesta (según sus términos).",
  ],
  analyzePageTitle: "Analizador de decisiones",
  analyzePageSubtitle:
    "Escribe tu pregunta abajo y ejecuta el análisis. El informe estructurado aparece justo debajo del formulario cuando esté listo.",
  analyzeBackHome: "Volver al inicio",
  workspaceFillHint:
    "Escribe tu pregunta principal en el primer campo, luego ejecuta el análisis. El informe aparece justo debajo del formulario.",
  resultsYouAreHere: "Tu informe está listo",
  homeAnalyzerPromoLine:
    "¿Quieres una página solo con el analizador, sin scroll largo?",
  homeAnalyzerPromoCta: "Abrir analizador",
  sectionProfessional: "A quién acudir (orientación profesional)",
  sectionDirectoryExperts: "Expertos registrados en esta área",
  expertOpenInDirectory: "Abrir en el directorio",
  expertNoDirectoryMatch:
    "Aún no hay experto en esta categoría — ver el directorio completo.",
  voiceDictate: "Dictar",
  voiceListening: "Escuchando…",
  voiceStop: "Detener",
  voiceNotSupported:
    "El dictado del navegador a veces no soporta tu idioma. Si ves «nube (grabar)», pruébalo, o usa el teclado. Mejor con Chrome/Edge.",
  voiceInputHint:
    "El idioma de la página aplica a análisis, voz y «Escuchar». Sin voz en tu idioma, el dispositivo puede usar otro (mejor esfuerzo).",
  readAloud: "Escuchar informe",
  readAloudStop: "Detener",
  voiceWhisperStart: "Grabar (nube)",
  voiceWhisperStop: "Parar y enviar",
  voiceWhisperWorking: "Transcribiendo…",
  voiceWhisperError: "Error — prueba el botón del navegador.",
  voiceWhisperNeedMic: "Permite el micrófono.",
  voiceSttArmenianUseCloud:
    "El dictado del navegador en armenio casi nunca funciona. Si ves nube (grabar), pruébalo, o escribe.",
};

const uiAr: Partial<UIStrings> = {
  brand: "Life Decision Engine",
  heroLine1: "محرك",
  heroAccent: "قرارات الحياة",
  subtitle:
    "سيناريوهات وجداول زمنية ودرجة قرار—منظّم، وليس محادثة عامة.",
  disclaimerTitle: "تنبيه مهم",
  disclaimerBody:
    "هذه أداة دعم وليست مرجعًا نهائيًا. في الأزمات تواصل مع مختص. وليست استشارة طبية أو قانونية أو علاجية.",
  decision: "سؤالك / قرارك",
  decisionPh: "مثل: «هل أنتقل إلى ألمانيا؟»، «هل أترك العمل؟»…",
  context: "السياق (اختياري)",
  contextPh: "أرقام، مواعيد، عائلة، صحة…",
  constraints: "القيم والقيود (اختياري)",
  constraintsPh: "خطوط حمراء، ما تخاف خسارته…",
  analyze: "تشغيل التحليل",
  analyzing: "جارٍ التحليل…",
  sectionSummary: "الملخص",
  sectionDimensions: "أربعة محاور",
  sectionScenarios: "السيناريوهات",
  sectionTimeline: "محاكاة المستقبل",
  sectionScore: "درجة القرار",
  sectionTwin: "التوأم الرقمي (زاوية نظر)",
  dimFinances: "المالية",
  dimPsychology: "النفسية",
  dimRisks: "المخاطر",
  dimOpportunities: "الفرص",
  scenBest: "أفضل حالة",
  scenWorst: "أسوأ حالة",
  scenLikely: "الأرجح",
  timeM6: "بعد 6 أشهر",
  timeY2: "بعد سنتين",
  timeY5: "بعد 5 سنوات",
  badgeLive: "تحليل بالذكاء الاصطناعي",
  badgeDemo: "وضع تجريبي",
  badgeFallback: "وضع احتياطي",
  scoreSublabel: "التوافق / الجدوى",
  footerPremium:
    "قد يضيف إصدار مدفوع لاحقًا مدربين بشرين—هذا الإصدار برمجي فقط.",
  networkError: "خطأ في الشبكة",
  features: ["النفسية", "المالية", "ذكاء منظم"],
  accessLocal:
    "محلي: http://localhost:3000 — شغّل `npm run dev` على جهازك.",
  langLabel: "اللغة",
  navMore: "المزيد",
  apiHintDemo:
    "تحليل تجريبي مُنظَّم. سيعود التحليل الكامل بالذكاء الاصطناعي للعمل قريبًا.",
  apiAnalysisServiceNotice:
    "تعذّر الاتصال بخدمة التحليل الآن. أدناه تقرير تجريبي — أعِد المحاولة لاحقًا.",
  securityTitle: "منصة آمنة وخاصة",
  securityIntro:
    "صُممت المنصة مع مبدأ الخصوصية والأمان: سؤالك وقصتك لا يظهران للزوّار الآخرين، ولا يُنشران كمنشور عام للجميع.",
  securityPoints: [
    "لا يوجد شريط عام أو تصويت أو قسم «قصص الآخرين» — نصك يبقى ضمن جلسة استخدامك.",
    "هذا الإصدار لا يخزن نصك كمنشورات عامة في قاعدة بيانات يقرؤها غرباء.",
    "إذا كان تحليل الذكاء الاصطناعي مفعّلًا، يُرسل نصك إلى المزوّد فقط لإنشاء إجابتك (وفق شروطهم).",
  ],
  analyzePageTitle: "منصة التحليل",
  analyzePageSubtitle:
    "اكتب سؤالك أدناه ثم شغّل التحليل. يظهر التقرير المنظّم مباشرة تحت النموذج عند جاهزيته.",
  analyzeBackHome: "العودة للرئيسية",
  workspaceFillHint:
    "اكتب سؤالك الرئيسي في الحقل الأول، ثم شغّل التحليل. يظهر التقرير مباشرة تحت النموذج.",
  resultsYouAreHere: "تقريرك جاهز",
  homeAnalyzerPromoLine:
    "تريد صفحة فيها المحلّل فقط بدون تمرير طويل؟",
  homeAnalyzerPromoCta: "افتح المحلّل",
  sectionProfessional: "من تستعين به (توجيه مهني)",
  sectionDirectoryExperts: "خبراء مسجّلون في مجالك",
  expertOpenInDirectory: "فتح في الدليل",
  expertNoDirectoryMatch:
    "لا يوجد خبير مدرج في هذه الفئة حاليًا — تصفح الدليل كاملًا.",
  voiceDictate: "إملاء صوتي",
  voiceListening: "أستمع…",
  voiceStop: "إيقاف",
  voiceNotSupported:
    "قد لا يدعم المتصفح لغتك. إن ظهر زر (السحابة/تسجيل) جرّبه، وإلا اكتب. Chrome/Edge أغلب الأحيان أصلح.",
  voiceInputHint:
    "لغة الواجهة هي نفس لغة التحليل والتسجيل والاستماع. إن لم يتوفر صوت بلغتك، قد يستخدم الجهاز لغة أخرى حسب الإمكان.",
  readAloud: "استمع للتقرير",
  readAloudStop: "إيقاف التشغيل",
  voiceWhisperStart: "تسجيل (سحابي)",
  voiceWhisperStop: "إيقاف وإرسال",
  voiceWhisperWorking: "جارٍ النسخ…",
  voiceWhisperError: "فشل — جرّب زر المتصفح.",
  voiceWhisperNeedMic: "اسمح بالوصول للميكروفون.",
  voiceSttArmenianUseCloud:
    "إدخال أرميني صوتي من المتصفح نادرًا يعمل. إن ظهر التسجيل (سحابي) جرّبه، أو اكتب.",
};

const uiIt: Partial<UIStrings> = {
  brand: "Life Decision Engine",
  heroLine1: "Life",
  heroAccent: "Decision Engine",
  subtitle:
    "Scenari, orizzonti e punteggio—strutturato, non una chat generica.",
  disclaimerTitle: "Importante",
  disclaimerBody:
    "Strumento di supporto, non autorità finale. In crisi, rivolgiti a un professionista. Nessun parere medico, legale o terapeutico.",
  decision: "La tua domanda / decisione",
  decisionPh: "es. «Trasferirmi in Germania?», «Lasciare il lavoro?»…",
  context: "Contesto (opzionale)",
  contextPh: "Numeri, tempi, famiglia, salute…",
  constraints: "Valori e vincoli (opzionale)",
  constraintsPh: "Linee rosse, cosa temi di perdere…",
  analyze: "Avvia analisi",
  analyzing: "Analisi in corso…",
  sectionSummary: "Sintesi",
  sectionDimensions: "Quattro assi",
  sectionScenarios: "Scenari",
  sectionTimeline: "Simulazione temporale",
  sectionScore: "Punteggio decisione",
  sectionTwin: "Gemello digitale (prospettiva)",
  dimFinances: "Finanza",
  dimPsychology: "Psicologia",
  dimRisks: "Rischi",
  dimOpportunities: "Opportunità",
  scenBest: "Caso migliore",
  scenWorst: "Caso peggiore",
  scenLikely: "Più probabile",
  timeM6: "Tra 6 mesi",
  timeY2: "Tra 2 anni",
  timeY5: "Tra 5 anni",
  badgeLive: "Analisi IA",
  badgeDemo: "Modalità demo",
  badgeFallback: "Modalità fallback",
  scoreSublabel: "allineamento / fattibilità",
  footerPremium:
    "Un Premium futuro potrebbe aggiungere coach umani—qui solo software.",
  networkError: "Errore di rete",
  features: ["Psicologia", "Finanza", "IA strutturata"],
  accessLocal:
    "Locale: http://localhost:3000 — esegui `npm run dev` sul tuo PC.",
  langLabel: "Lingua",
  navMore: "Altro",
  apiHintDemo:
    "Analisi dimostrativa strutturata. L’analisi IA completa tornerà disponibile a breve.",
  apiAnalysisServiceNotice:
    "Il servizio di analisi non è raggiungibile. Sotto trovi un report demo — riprova tra qualche minuto.",
  securityTitle: "Una piattaforma sicura e privata",
  securityIntro:
    "La piattaforma è pensata per privacy e sicurezza: la tua domanda e la tua storia non sono visibili agli altri visitatori e non vengono pubblicate come post aperto a tutti.",
  securityPoints: [
    "Niente bacheca pubblica, votazioni o sezione «storie altrui» — il testo resta nel flusso della tua sessione.",
    "Questa versione non salva il tuo testo nel database come post pubblici leggibili da sconosciuti.",
    "Se l’analisi IA è attiva, il testo viene inviato al fornitore solo per generare la risposta (secondo i loro termini).",
  ],
  analyzePageTitle: "Analizzatore decisioni",
  analyzePageSubtitle:
    "Scrivi la tua domanda sotto, poi avvia l’analisi. Il report strutturato compare subito sotto al modulo quando è pronto.",
  analyzeBackHome: "Torna alla home",
  workspaceFillHint:
    "Scrivi la domanda principale nel primo campo, poi avvia l’analisi. Il report compare subito sotto al modulo.",
  resultsYouAreHere: "Il tuo report è pronto",
  homeAnalyzerPromoLine:
    "Vuoi una pagina solo con l’analizzatore, senza scroll lungo?",
  homeAnalyzerPromoCta: "Apri analizzatore",
  sectionProfessional: "Chi coinvolgere (orientamento professionale)",
  sectionDirectoryExperts: "Esperti registrati in quest’area",
  expertOpenInDirectory: "Apri in elenco",
  expertNoDirectoryMatch:
    "Nessun esperto in questa categoria in elenco — vedi l’elenco completo.",
  voiceDictate: "Dettatura",
  voiceListening: "In ascolto…",
  voiceStop: "Stop",
  voiceNotSupported:
    "Il dettatura del browser non supporta ogni lingua. Se compare Registra (cloud), provalo, altrimenti scrivi. Chrome/Edge di solito meglio.",
  voiceInputHint:
    "La lingua scelta vale per analisi, voce e ascolto. Se manca una voce nella tua lingua, il dispositivo può usare un’altra (possibile).",
  readAloud: "Ascolta il report",
  readAloudStop: "Interrompi",
  voiceWhisperStart: "Registra (cloud)",
  voiceWhisperStop: "Stop e invia",
  voiceWhisperWorking: "Trascrizione…",
  voiceWhisperError: "Errore — prova il pulsante del browser.",
  voiceWhisperNeedMic: "Consenti l’accesso al microfono.",
  voiceSttArmenianUseCloud:
    "L’inserimento vocale in armeno dal browser in genere non funziona. Se compare Registra (cloud), provalo, o scrivi.",
};

const table: Record<AppLocale, Partial<UIStrings>> = {
  hy: uiHy,
  en: uiEn,
  "en-US": uiEnUs,
  ru: uiRu,
  de: uiDe,
  fr: uiFr,
  es: uiEs,
  ar: uiAr,
  it: uiIt,
};

/** English defaults for home trust/demo copy—locales can override in `trustHow*`. */
const HOME_I18N_FALLBACKS: Pick<
  UIStrings,
  | "trustMicroPoints"
  | "homeDemoEyebrow"
  | "homeDemoTitle"
  | "homeDemoExample1"
  | "homeDemoExample2"
  | "homeDemoCta"
  | "analyzingProgressLine"
> = {
  trustMicroPoints: [
    "No data stored as a public post",
    "Private analysis in your session",
    "Optional expert help when you want a human",
  ],
  homeDemoEyebrow: "Try an example",
  homeDemoTitle: "See a structured report in one click",
  homeDemoExample1: "Should I move abroad?",
  homeDemoExample2: "Quit job or stay?",
  homeDemoCta: "Try demo",
  analyzingProgressLine: "Analyzing your decision…",
};

export function getUi(locale: AppLocale): UIStrings {
  const row = table[locale];
  if (locale === "hy") {
    return {
      ...HOME_I18N_FALLBACKS,
      ...trustHowEn,
      ...row,
      ...trustHowHy,
    } as UIStrings;
  }
  const trustBase =
    locale === "ru"
      ? trustHowRu
      : locale === "de"
        ? trustHowDe
        : locale === "fr"
          ? trustHowFr
          : locale === "es"
            ? trustHowEs
            : locale === "it"
              ? trustHowIt
              : locale === "ar"
                ? trustHowAr
                : trustHowEn;
  return { ...HOME_I18N_FALLBACKS, ...trustBase, ...row } as UIStrings;
}
