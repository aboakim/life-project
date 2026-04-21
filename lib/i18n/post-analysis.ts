import type { AppLocale } from "./locale";

export type PostAnalysisCopy = {
  followUpTitle: string;
  followUpQuestions: [string, string, string, string, string];
  assumptionsTitle: string;
  assumptionBullets: [string, string, string, string];
  actionsTitle: string;
  saveToJournal: string;
  savedToJournal: string;
  copyMarkdown: string;
  copied: string;
  shareLimited: string;
  shareFooter: string;
  printSummary: string;
  historyTitle: string;
  historyEmpty: string;
  clearHistory: string;
  remindLabel: string;
  remindSet: string;
  remindActive: string;
  remindClear: string;
  reminderBanner: string;
  reminderDismiss: string;
  expertsCta: string;
  playbooksCta: string;
  guidelinesCta: string;
  mdDecision: string;
  mdContext: string;
  mdConstraints: string;
  mdSummary: string;
  mdDimensions: string;
  mdScenarios: string;
  mdTimeline: string;
  mdScore: string;
  mdTwin: string;
};

const en: PostAnalysisCopy = {
  followUpTitle: "Next questions to sit with",
  followUpQuestions: [
    "What would ‘good enough’ look like in 30 days?",
    "Who loses something meaningful if you choose A vs B?",
    "What single assumption, if false, breaks your favourite scenario?",
    "What would you need to see in the next 2 weeks to update your view?",
    "If you had to explain this to a calm friend, what’s the one sentence verdict?",
  ],
  assumptionsTitle: "Assumptions worth pressure-testing",
  assumptionBullets: [
    "Income, health, and family constraints stay roughly as you described.",
    "The emotional cost you’re tolerating today won’t compound past 6 months.",
    "You can access the support (time, money, people) your plan requires.",
    "Regret would come from inaction more than from a structured ‘no’.",
  ],
  actionsTitle: "Keep & share",
  saveToJournal: "Add to journal",
  savedToJournal: "Saved to your journal (browser only).",
  copyMarkdown: "Copy as Markdown",
  copied: "Copied.",
  shareLimited: "Copy short summary",
  shareFooter: "— From Life Decision Engine (lifedecisions.space). Full analysis kept private on your device.",
  printSummary: "Print this analysis",
  historyTitle: "Recent analyses (this device)",
  historyEmpty: "No saved history yet — run another analysis to build a short list here.",
  clearHistory: "Clear history",
  remindLabel: "Revisit this decision",
  remindSet: "Remind me in 2 weeks",
  remindActive: "Reminder set for 2 weeks from now.",
  remindClear: "Clear reminder",
  reminderBanner:
    "You asked to revisit a big decision — take 10 minutes to update your brief and re-run the analyzer.",
  reminderDismiss: "Dismiss",
  expertsCta: "Browse experts",
  playbooksCta: "Topic playbooks",
  guidelinesCta: "Community guidelines",
  mdDecision: "Decision",
  mdContext: "Context",
  mdConstraints: "Constraints",
  mdSummary: "Summary",
  mdDimensions: "Dimensions",
  mdScenarios: "Scenarios",
  mdTimeline: "Timeline",
  mdScore: "Score",
  mdTwin: "Note",
};

const hy: PostAnalysisCopy = {
  followUpTitle: "Հաջորդ հարցերը մտածելու համար",
  followUpQuestions: [
    "Ի՞նչ կլինի «բավարար լավը» 30 օրվա ընթացքում։",
    "Ո՞վ կկորցնի ինչ-որ բան, եթե ընտրես A կամ B։",
    "Ո՞ր մեկ ենթադրությունը, եթե սխալ է, կփլուզի ամենալավ սցենարը։",
    "Ի՞նչ պետք է տեսնես 2 շաբաթում, որ տեսակետդ թարմացնես։",
    "Եթե մեկ նախադասությամբ բացատրես հանգիստ ընկերոջը՝ ո՞րն է վերջաբանը։",
  ],
  assumptionsTitle: "Ենթադրություններ, որոնք արժե ստուգել",
  assumptionBullets: [
    "Եկամուտը, առողջությունը և ընտանեկան սահմանները մոտավորապես այնպիսին կմնան, ինչպես նկարագրել ես։",
    "Ներկա զգացմունքային գինը չի մեծանա 6 ամիսից հետո։",
    "Կարող ես հասանելիություն ունենալ պլանիդ համար անհրաժեշտ աջակցությանը (ժամանակ, գումար, մարդիկ)։",
    "Ներքին ծանրությունը ավելի շատ կգա չգործելուց, քան կառուցված «ոչ»-ից։",
  ],
  actionsTitle: "Պահել և կիսվել",
  saveToJournal: "Ավելացնել օրագիր",
  savedToJournal: "Պահվել է օրագրում (միայն այս բրաուզերում)։",
  copyMarkdown: "Պատճենել Markdown",
  copied: "Պատճենվեց։",
  shareLimited: "Կարճ ամփոփում",
  shareFooter:
    "— Life Decision Engine (lifedecisions.space)։ Լրիվ վերլուծությունը մնում է այս սարքում։",
  printSummary: "Տպել վերլուծությունը",
  historyTitle: "Վերջին վերլուծություններ (այս սարքում)",
  historyEmpty: "Դեռ պատմություն չկա — գործարկիր նոր վերլուծություն։",
  clearHistory: "Մաքրել պատմությունը",
  remindLabel: "Վերադառնալ այս որոշմանը",
  remindSet: "Հիշեցնել 2 շաբաթից",
  remindActive: "Հիշեցումը սահմանված է 2 շաբաթից։",
  remindClear: "Չեղարկել հիշեցումը",
  reminderBanner:
    "Դու խնդրել ես վերադառնալ մեծ որոշմանը — տուր 10 րոպե թարմացրու brief-ը և կրկին գործարկիր վերլուծիչը։",
  reminderDismiss: "Փակել",
  expertsCta: "Փորձագետներ",
  playbooksCta: "Playbook-ներ",
  guidelinesCta: "Համայնքի կանոններ",
  mdDecision: "Որոշում",
  mdContext: "Կոնտեքստ",
  mdConstraints: "Սահմաններ",
  mdSummary: "Ամփոփում",
  mdDimensions: "Չափանիշներ",
  mdScenarios: "Սցենարներ",
  mdTimeline: "Ժամանակացույց",
  mdScore: "Գնահատում",
  mdTwin: "Նշում",
};

const table: Record<AppLocale, PostAnalysisCopy> = {
  "en-US": en,
  en,
  hy,
  ru: { ...en, expertsCta: "Эксперты", playbooksCta: "Гайды", guidelinesCta: "Правила сообщества", remindSet: "Напомнить через 2 недели", reminderDismiss: "Скрыть", copyMarkdown: "Копировать Markdown", saveToJournal: "В дневник", followUpTitle: "Следующие вопросы", assumptionsTitle: "Проверьте допущения", actionsTitle: "Сохранить и поделиться" },
  de: { ...en, expertsCta: "Experten", playbooksCta: "Playbooks", guidelinesCta: "Community-Regeln", remindSet: "In 2 Wochen erinnern", reminderDismiss: "Schließen", copyMarkdown: "Markdown kopieren", saveToJournal: "Ins Tagebuch", followUpTitle: "Nächste Fragen", assumptionsTitle: "Annahmen prüfen", actionsTitle: "Speichern & teilen" },
  fr: { ...en, expertsCta: "Experts", playbooksCta: "Guides", guidelinesCta: "Règles communauté", remindSet: "Rappel dans 2 semaines", reminderDismiss: "Fermer", copyMarkdown: "Copier Markdown", saveToJournal: "Au journal", followUpTitle: "Questions suivantes", assumptionsTitle: "Tester les hypothèses", actionsTitle: "Garder & partager" },
  es: { ...en, expertsCta: "Expertos", playbooksCta: "Guías", guidelinesCta: "Normas de la comunidad", remindSet: "Recordar en 2 semanas", reminderDismiss: "Cerrar", copyMarkdown: "Copiar Markdown", saveToJournal: "Al diario", followUpTitle: "Siguientes preguntas", assumptionsTitle: "Comprobar supuestos", actionsTitle: "Guardar y compartir" },
  it: { ...en, expertsCta: "Esperti", playbooksCta: "Guide", guidelinesCta: "Regole community", remindSet: "Promemoria tra 2 settimane", reminderDismiss: "Chiudi", copyMarkdown: "Copia Markdown", saveToJournal: "Nel diario", followUpTitle: "Prossime domande", assumptionsTitle: "Verifica le ipotesi", actionsTitle: "Salva e condividi" },
  ar: { ...en, expertsCta: "الخبراء", playbooksCta: "أدلة", guidelinesCta: "إرشادات المجتمع", remindSet: "تذكير خلال أسبوعين", reminderDismiss: "إغلاق", copyMarkdown: "نسخ Markdown", saveToJournal: "إلى اليوميات", followUpTitle: "أسئلة تالية", assumptionsTitle: "اختبر الافتراضات", actionsTitle: "احفظ وشارك" },
};

export function getPostAnalysisCopy(locale: AppLocale): PostAnalysisCopy {
  return table[locale] ?? en;
}
