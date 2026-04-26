import type { AppLocale } from "./locale";

export type NoveltyCopy = {
  navFieldNotes: string;
  footerFieldNotes: string;
  fieldNotesEyebrow: string;
  fieldNotesTitle: string;
  fieldNotesSubtitle: string;
  fieldNotesPasteLabel: string;
  fieldNotesReading: string;
  fieldNotesWords: string;
  fieldNotesUnique: string;
  fieldNotesTop: string;
  fieldNotesClear: string;
  fieldNotesEmpty: string;
  fieldNotesLocaleHint: string;
  signatureEyebrow: string;
  signatureMoodPrefix: string;
  moodNames: readonly string[];
  capsuleEyebrow: string;
  capsuleTitle: string;
  capsuleExplain: string;
  capsulePlaceholder: string;
  capsuleDaysLabel: string;
  capsuleSeal7: string;
  capsuleSeal14: string;
  capsuleSeal30: string;
  capsuleSave: string;
  capsuleFull: string;
  capsuleLocked: string;
  capsuleReveal: string;
  capsuleDelete: string;
  capsuleListAria: string;
};

const MOODS_EN = [
  "Verdant Fork",
  "Quiet Voltage",
  "Paper Comet",
  "Soft Ledger",
  "Neon Patience",
  "Amber Circuit",
  "Drift Compass",
  "Glass Horizon",
  "Copper Thread",
  "Polar Memo",
  "Velvet Pivot",
  "Salted Orbit",
  "Moss Satellite",
  "Ink Tide",
  "Silver Parallax",
  "Cloud Anchor",
  "Granite Echo",
  "Lunar Ledger",
  "River Syntax",
  "Quartz Window",
  "Ember Archive",
  "Fog Lighthouse",
  "Marble Switchback",
  "Indigo Ledger",
] as const;

const MOODS_HY = [
  "Կանաչ fork",
  "Լուռ լարում",
  "Թղթե գիսաստղ",
  "Փափուկ մատյան",
  "Նեոն համբերություն",
  "Պնդուզ գիծ",
  "Շրջանցման կոմպաս",
  "Ապակե հորիզոն",
  "Պղնձե թել",
  "Բևեռային նշում",
  "Բարձրադիր պտույտ",
  "Աղի ուղեծիր",
  "Քարաքոսային արբանյակ",
  "Թանաքային հոսք",
  "Արծաթե պարալաքս",
  "Ամպային խարիսխ",
  "Գրանիտային արձագանք",
  "Լուսնային մատյան",
  "Գետի շարահյուսություն",
  "Քվարցային պատուհան",
  "Կայծակային արխիվ",
  "Մառախուղային փարոս",
  "Մարմարե շրջադարձ",
  "Ինդիգո մատյան",
] as const;

const en: NoveltyCopy = {
  navFieldNotes: "Field notes lab",
  footerFieldNotes: "Field notes lab",
  fieldNotesEyebrow: "New · browser only",
  fieldNotesTitle: "Field notes lab",
  fieldNotesSubtitle:
    "Paste any draft text. We compute reading time, density, and a word sketch — everything runs in your tab; nothing is sent to our servers.",
  fieldNotesPasteLabel: "Paste text",
  fieldNotesReading: "Reading time (est.)",
  fieldNotesWords: "Tokens",
  fieldNotesUnique: "Unique tokens",
  fieldNotesTop: "Weighted words",
  fieldNotesClear: "Clear",
  fieldNotesEmpty: "Paste something to see the radar.",
  fieldNotesLocaleHint:
    "Stopword filter adapts for English vs Armenian; other languages still get counts.",
  signatureEyebrow: "Brief signature",
  signatureMoodPrefix: "Palette mood",
  moodNames: MOODS_EN,
  capsuleEyebrow: "New · local only",
  capsuleTitle: "Time capsule",
  capsuleExplain:
    "Seal one line to your future self. It unlocks only after the delay you pick — stored in this browser, never uploaded.",
  capsulePlaceholder: "One honest line for future-you…",
  capsuleDaysLabel: "Open after",
  capsuleSeal7: "7 days",
  capsuleSeal14: "14 days",
  capsuleSeal30: "30 days",
  capsuleSave: "Seal capsule",
  capsuleFull: "Three sealed capsules max — delete one to add another.",
  capsuleLocked: "Unlocks",
  capsuleReveal: "Past-you says",
  capsuleDelete: "Remove",
  capsuleListAria: "Your sealed time capsules",
};

const hy: NoveltyCopy = {
  navFieldNotes: "Դաշտային նոթերի լաբոր",
  footerFieldNotes: "Դաշտային նոթերի լաբոր",
  fieldNotesEyebrow: "Նոր · միայն բրաուզերում",
  fieldNotesTitle: "Դաշտային նոթերի լաբոր",
  fieldNotesSubtitle:
    "Կպցրու ցանկացած սևագիր։ Կարդալու ժամանակ, խտություն և բառային ուրվագիծ՝ ամեն ինչ այս ներդիրում, մեր սերվեր չի ուղարկվում։",
  fieldNotesPasteLabel: "Տեքստը այստեղ",
  fieldNotesReading: "Կարդալու ժամանակ (գնահատ.)",
  fieldNotesWords: "Թոքեններ",
  fieldNotesUnique: "Չկրկնվող թոքեններ",
  fieldNotesTop: "Քաշով բառեր",
  fieldNotesClear: "Մաքրել",
  fieldNotesEmpty: "Կպցրու տեքստ՝ տեսնելու «ռադարը»։",
  fieldNotesLocaleHint:
    "Կանգառային բառերի ֆիլտրը հարմարեցված է անգլերեն/հայերենի համար, մնացած լեզուներում հաշվարկները մնում են։",
  signatureEyebrow: "Brief-ի ստորագրություն",
  signatureMoodPrefix: "Պալիտրայի տրամադրություն",
  moodNames: MOODS_HY,
  capsuleEyebrow: "Նոր · միայն տեղում",
  capsuleTitle: "Ժամանակի կապսուլա",
  capsuleExplain:
    "Մեկ տող կնքիր ապագա քեզ համար։ Բացվելու է միայն ընտրած ուշացումից հետո — պահվում է այս բրաուզերում, չի վերբեռնվում։",
  capsulePlaceholder: "Մեկ անկեղծ տող ապագա քեզ համար…",
  capsuleDaysLabel: "Բացել հետո",
  capsuleSeal7: "7 օր",
  capsuleSeal14: "14 օր",
  capsuleSeal30: "30 օր",
  capsuleSave: "Կնքել կապսուլան",
  capsuleFull: "Մինչև 3 կնքված կապսուլա — ջնջիր մեկը, որ ավելացնես նորը։",
  capsuleLocked: "Բացվելու է",
  capsuleReveal: "Անցյալի դու ասում է",
  capsuleDelete: "Ջնջել",
  capsuleListAria: "Քո կնքված ժամանակի կապսուլաները",
};

export function getNoveltyCopy(locale: AppLocale): NoveltyCopy {
  if (locale === "hy") return hy;
  return en;
}
