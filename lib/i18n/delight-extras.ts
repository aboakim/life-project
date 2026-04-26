import type { AppLocale } from "./locale";

export type ColdStartPack = {
  label: string;
  decision: string;
  context: string;
  constraints: string;
};

export type DelightCopy = {
  shortcutsTitle: string;
  shortcutsIntro: string;
  shortcutsClose: string;
  /** One line hint so users discover the ? panel */
  shortcutTeaser: string;
  shortcutRows: readonly { k: string; d: string }[];
  konamiTitle: string;
  konamiBody: string;
  konamiDismiss: string;
  milestone5: string;
  milestone10: string;
  milestone25: string;
  milestone50: string;
  milestone100: string;
  milestoneDismiss: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  coldStartEyebrow: string;
  coldStarts: readonly [ColdStartPack, ColdStartPack, ColdStartPack, ColdStartPack];
  resultCheers: readonly [string, string, string, string, string];
  /** Optional “off-topic” play — not part of the analyzer */
  playCornerSummary: string;
  playCornerDisclaimer: string;
  playCoinLabel: string;
  playCoinFlip: string;
  playCoinSpinning: string;
  playCoinYes: string;
  playCoinNo: string;
  playFactLabel: string;
  playFactNext: string;
  playFacts: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
};

const en: DelightCopy = {
  shortcutsTitle: "Quick keys",
  shortcutsIntro:
    "Press these when you are not typing in a text field. Escape closes this panel.",
  shortcutsClose: "Close",
  shortcutTeaser:
    "Tip: press ? (outside text boxes) for a tiny shortcut sheet — try the Konami code if you are feeling nostalgic.",
  shortcutRows: [
    { k: "?", d: "Open this panel (also Shift + /)." },
    { k: "Esc", d: "Close modals and this panel." },
    { k: "Nav", d: "Use the sticky section nav to jump around the page." },
    { k: "Chips", d: "Warm chips above fill a starter brief in one tap." },
  ],
  konamiTitle: "You found the secret handshake",
  konamiBody:
    "The old Konami code still works in 2026 — at least here. Nothing unlocks except this nod to curiosity. Go make a decision that feels honest, not loud.",
  konamiDismiss: "Back to reality",
  milestone5: "5 visits — you are actually using the tool. Try a second run with numbers in Context.",
  milestone10:
    "10 visits — patterns emerge when you compare runs. Scroll to history after two analyses.",
  milestone25:
    "25 visits — serious reflection energy. Consider saving one run as Markdown for your notes.",
  milestone50:
    "50 visits — you are a power thinker. Share the analyzer with someone stuck in a loop.",
  milestone100:
    "100 visits — legend status on this device. Take a real break; the best fork is a rested brain.",
  milestoneDismiss: "Nice — hide this",
  greetingMorning: "Morning mind — short brief, one honest fork, then coffee.",
  greetingAfternoon: "Afternoon clarity — add one number or deadline you have been avoiding.",
  greetingEvening: "Evening mode — lighter stakes or sleep on it; both are valid strategies.",
  coldStartEyebrow: "One-tap starters",
  coldStarts: [
    {
      label: "Boundaries",
      decision: "Where should I draw a firmer boundary this month — work, family, or money?",
      context: "I tend to say yes until I resent people.",
      constraints: "I want to stay kind, not vanish as a person.",
    },
    {
      label: "Regret test",
      decision: "Which regret would hurt more in two years — trying and failing, or never trying?",
      context: "I oscillate between fear of loss and fear of staying still.",
      constraints: "Health and relationships are non-negotiable lines.",
    },
    {
      label: "Energy audit",
      decision: "Should I redesign my week so one deep-work block exists, even if social plans shrink?",
      context: "Afternoons feel fragmented; mornings are sharper.",
      constraints: "I cannot drop childcare pickups.",
    },
    {
      label: "Honest no",
      decision: "How do I say a clean ‘no’ to an opportunity that looks good on paper but feels wrong?",
      context: "Reputation matters in my field; I do not want to burn bridges.",
      constraints: "Prefer a written response I can reuse as a template.",
    },
  ],
  resultCheers: [
    "Micro-win: you turned fog into a map. Screenshot the summary if it helps you sleep.",
    "That score is a mirror, not a judge — tweak the brief and watch it dance.",
    "You gave the machine something real to chew on. Future-you likes specificity.",
    "If one line in the report stings, circle it — that is often the real fork.",
    "Share nothing you are not proud of; the rest can stay on this device forever.",
  ],
  playCornerSummary: "Unserious corner (optional)",
  playCornerDisclaimer:
    "Pure playground: not advice, not scored, not saved to your analysis. For dopamine only.",
  playCoinLabel: "Coin flip",
  playCoinFlip: "Flip",
  playCoinSpinning: "…spinning…",
  playCoinYes: "Yes",
  playCoinNo: "No",
  playFactLabel: "Random useless fact",
  playFactNext: "Another fact",
  playFacts: [
    "Bananas are berries; strawberries are not. Taxonomy has a sense of humor.",
    "Honey basically never spoils — archaeologists found edible jars in tombs. Unlike your unread inbox.",
    "Wombat poop is cube-shaped. Still unrelated to your career fork. You're welcome.",
    "Rubber ducks were a sales stunt for rubber. Now they debug code and absorb silent screams.",
    "Clouds can weigh tons and still float — like heavy decisions before the deadline storm.",
    "Oxford commas prevent ambiguity; they also filter friends at typography parties.",
    "The English word “set” has a comical number of meanings. This UI stays intentionally smaller.",
    "Your pet has statistically considered replacing you with a warm rectangle. Love remains probable.",
  ],
};

const hy: DelightCopy = {
  shortcutsTitle: "Արագ ստեղներ",
  shortcutsIntro:
    "Սեղմիր դրանք, երբ կուրսորը տեքստային դաշտում չէ։ Esc-ը փակում է այս պատուհանը։",
  shortcutsClose: "Փակել",
  shortcutTeaser:
    "Հուշում․ սեղմիր ? (տեքստային դաշտից դուրս)՝ արագ ստեղների թերթիկի համար — կարող ես նաև փորձել Konami կոդը, եթե նոստալգիա է։",
  shortcutRows: [
    { k: "?", d: "Բացել այս վահանակը (նաև Shift + /)։" },
    { k: "Esc", d: "Փակել մոդալները և այս վահանակը։" },
    { k: "Nav", d: "Վերևի նավիգացիան՝ արագ ցատկել բաժինների միջև։" },
    { k: "Chips", d: "Տաք չիպերը մեկ սեղմումով լցնում են brief-ի սևագիր։" },
  ],
  konamiTitle: "Գտար գաղտնի ձեռքսեղմումը",
  konamiBody:
    "Հին Konami կոդը 2026-ում էլ աշխատում է — գոնե այստեղ։ Ոչինչ չի բացում, բացի հետաքրքրության հանդեպ այս խոնարհումից։ Գնա մի որոշում արա, որ քեզ համար անկեղծ զգաս, ոչ թե աղմկոտ։",
  konamiDismiss: "Վերադառնալ",
  milestone5:
    "5 այց — իսկապես օգտագործում ես գործիքը։ Փորձիր երկրորդ անցում՝ թվեր Կոնտեքստում։",
  milestone10:
    "10 այց — նախշեր երևում են համեմատելիս։ Երկու վերլուծությունից հետո նայիր պատմությունը։",
  milestone25:
    "25 այց — լուրջ մտածողական էներգիա։ Մեկ արդյունք Markdown պատճենիր նոթերի համար։",
  milestone50:
    "50 այց — power user այս սարքում։ Կիսվիր վերլուծիչով մեկի հետ, ով «փակ ցիկլում» է։",
  milestone100:
    "100 այց — լեգենդ այս բրաուզերում։ Հանգստացիր․ լավ fork-ը հանգստացած ուղեղն է։",
  milestoneDismiss: "Հասկացա — թաքցնել",
  greetingMorning: "Առավոտյան միտք — կարճ brief, մեկ անկեղծ fork, հետո սուրճ։",
  greetingAfternoon:
    "Կեսօրի պարզություն — ավելացրու մեկ թիվ կամ վերջնաթիվ, որից խուսափում ես։",
  greetingEvening:
    "Երեկոյան ռեժիմ — թեթև դրույք կամ քնել վրայից — երկուսն էլ վավեր են։",
  coldStartEyebrow: "Մեկ հպումով ստարտերներ",
  coldStarts: [
    {
      label: "Սահմաններ",
      decision:
        "Որտե՞ղ պետք է ավելի կոշտ սահման գծեմ այս ամիս՝ աշխատանք, ընտանիք, թե գումար։",
      context: "Սովորաբար ասում եմ «այո», մինչև դժգոհեմ մարդկանցից։",
      constraints: "Ուզում եմ մնալ բարի, ոչ թե անհետանալ որպես անհատ։",
    },
    {
      label: "Փոշման թեստ",
      decision:
        "Ո՞ր փոշման ցավը կլինի ավելի մեծ 2 տարից՝ փորձել և ձախողվել, թե երբեք չփորձել։",
      context: "Զարկվում եմ կորուստից վախի և տեղում մնալու վախի միջև։",
      constraints: "Առողջությունն ու հարաբերությունները անխորհրդելի են։",
    },
    {
      label: "Էներգիայի աուդիտ",
      decision:
        "Արժե՞ վերակազմել շաբաթը, որ լինի մեկ խորը աշխատանքի բլոկ, նույնիսկ եթե սոցիալական պլանները նվազեն։",
      context: "Կեսօրերը մասնիկացված են, առավոտները ավելի սուր են։",
      constraints: "Մանկական տեղափոխումները չեմ կարող թողնել։",
    },
    {
      label: "Անկեղծ «ոչ»",
      decision:
        "Ինչպե՞ս ասեմ մաքուր «ոչ» հնարավորությանը, որ թղթի վրա լավ է, բայց զգում եմ սխալ։",
      context: "Ոլորտում համբավը կարևոր է, կամուրջներ չեմ ուզում այրել։",
      constraints: "Նախընտրում եմ գրավոր պատասխան՝ որպես կաղապար։",
    },
  ],
  resultCheers: [
    "Միկրո-հաղթանակ՝ մառախուղը քարտեզ դարձրիր։ Եթե օգնի քնելուն՝ պատճենիր ամփոփումը։",
    "Միավորն հայելի է, ոչ դատավոր — խմբագրիր brief-ը և տես ինչպես է շարժվում։",
    "Մեքենային իրական նյութ տվեցիր։ Ապագա դուրը սիրում է կոնկրետություն։",
    "Եթե մեկ տողը ցավեց, շրջանագրիր այն — հաճախ դա իրական fork-ն է։",
    "Չկիսվիր այն, ինչով չես հպարտանում․ մնացածը կարող է մնալ այս սարքում։",
  ],
  playCornerSummary: "Ոչ-լուրջ անկյուն (ընտրովի)",
  playCornerDisclaimer:
    "Միայն ժամանց՝ ոչ խորհուրդ, ոչ միավոր, չի պահվում վերլուծության մեջ։ Միայն դոպամին։",
  playCoinLabel: "Մետաղադրամ",
  playCoinFlip: "Նետել",
  playCoinSpinning: "… պտտվում է …",
  playCoinYes: "Այո",
  playCoinNo: "Ոչ",
  playFactLabel: "Պատահական անիմաստ փաստ",
  playFactNext: "Հաջորդը",
  playFacts: [
    "Բանանը բերրի է, ելակը՝ ոչ։ Դասակարգման համակարգը երբեմն կատակում է։",
    "Մեղրը գրեթե չի փչանում՝ գերեզմաններում էլ են ուտելի անոթներ գտել։ Ոչ թե քո չկարդացած նամակները։",
    "Վոմբատի կղանքը խորանարդաձև է։ Դեռ կապ չունի քո կարիերայի fork-ի հետ։",
    "Ռետինե բադիկը վաճառքի հնարք էր։ Հիմա կոդ է դեբագում և կուլ է լռությունները։",
    "Ամպերը կարող են տոննաներով կշռել ու լողալ — մեծ որոշումները նախքան ժամկետային փոթորիկը։",
    "Oxford ստորակետը երկիմաստությունը նվազեցնում է և ընկերների ցուցակը՝ տիպոգրաֆիայի երեկույթներում։",
    "Անգլերենում «set» բառը ունի ծիծաղելի շատ նշանակություն. այս UI-ն միտումնավոր փոքր է։",
    "Կենդանինդ վիճակագրորեն մտածել է քեզ փոխարինել տաք ուղղանկյունով։ Սերը հավանական է մնում։",
  ],
};

const table: Record<AppLocale, DelightCopy> = {
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

export function getDelightCopy(locale: AppLocale): DelightCopy {
  return table[locale] ?? en;
}

export function milestoneMessage(
  delight: DelightCopy,
  n: number,
): string | null {
  switch (n) {
    case 5:
      return delight.milestone5;
    case 10:
      return delight.milestone10;
    case 25:
      return delight.milestone25;
    case 50:
      return delight.milestone50;
    case 100:
      return delight.milestone100;
    default:
      return null;
  }
}
