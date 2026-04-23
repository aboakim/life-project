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
  /** @deprecated Replaced by day-specific remind buttons; kept for table fallbacks */
  remindSet: string;
  /** @deprecated */
  remindActive: string;
  remind3Days: string;
  remind7Days: string;
  remind14Days: string;
  remindActive3: string;
  remindActive7: string;
  remindActive14: string;
  remindClear: string;
  printPdfHint: string;
  specialistTitle: string;
  specialistLead: string;
  specialistPhrases: [
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  specialistCopy: string;
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
  mdProfessional: string;
  mdStakes: string;
  /** Nudge users to run analyses repeatedly */
  runAnotherHint: string;
  runAnotherCta: string;
  historyLoadBrief: string;
  nextIterationTitle: string;
  nextIterationLead: string;
  compareTitle: string;
  compareNeedTwo: string;
  comparePickA: string;
  comparePickB: string;
  compareDecisionLabel: string;
  compareScoreLabel: string;
  compareSummaryLabel: string;
  compareDifferentRuns: string;
  emailRemindSectionTitle: string;
  emailRemindSectionLead: string;
  emailRemindFirstName: string;
  emailRemindLastName: string;
  emailRemindEmail: string;
  emailRemindSubmit: string;
  emailRemindSubmitting: string;
  emailRemindSuccess: string;
  emailRemindError: string;
  emailRemindCaptchaFailed: string;
  emailRemindNeedTurnstile: string;
  emailRemindPrivacy: string;
  emailRemindDevCaptchaBypass: string;
  emailRemindIdStored: string;
  emailRemindScheduleNote: string;
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
  remind3Days: "In 3 days",
  remind7Days: "In 7 days",
  remind14Days: "In 14 days",
  remindActive3: "We’ll nudge you in 3 days (this browser).",
  remindActive7: "We’ll nudge you in 7 days (this browser).",
  remindActive14: "We’ll nudge you in 14 days (this browser).",
  remindClear: "Clear reminder",
  printPdfHint:
    "Tip: in the print dialog, choose “Save as PDF” for a one-page file.",
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
  mdProfessional: "Professional guidance",
  mdStakes: "Subjective weight (1–10)",
  specialistTitle: "What to ask a specialist or coach",
  specialistLead: "Copy a line, paste it in email or chat—edit with your own details.",
  specialistPhrases: [
    "Given what I’ve shared, what would you suggest as the next 2–3 concrete steps—and why?",
    "What are the main blind spots or risks in how I’m framing this decision?",
    "If you saw five people in a similar situation, what made the difference between a good and a bad outcome?",
    "What information would you need to give advice that’s actually tailored—not generic?",
    "What is one early warning sign that I should slow down, get help, or change course?",
    "If we check in in 4–6 weeks, what would ‘meaningful progress’ look like in practical terms?",
  ],
  specialistCopy: "Copy",
  runAnotherHint:
    "Most big decisions need a second pass — update your brief and compare the score.",
  runAnotherCta: "Run another analysis",
  historyLoadBrief: "Load brief & re-run",
  nextIterationTitle: "Before your next run",
  nextIterationLead:
    "A quick set of angles for your next edit. The full reflection list follows in the next section.",
  compareTitle: "Compare two saved runs",
  compareNeedTwo:
    "Run the analyzer at least twice on this device to compare scores and summaries side by side.",
  comparePickA: "Run A",
  comparePickB: "Run B",
  compareDecisionLabel: "Question",
  compareScoreLabel: "Score",
  compareSummaryLabel: "Summary",
  compareDifferentRuns: "Choose two different entries.",
  emailRemindSectionTitle: "Email nudges (optional)",
  emailRemindSectionLead:
    "Add your name and email so we know who to nudge. The “I’m not a robot” check helps keep junk out. We store your address only to send the reminder you choose below — not newsletter spam.",
  emailRemindFirstName: "First name",
  emailRemindLastName: "Last name",
  emailRemindEmail: "Email",
  emailRemindSubmit: "Save my email for reminders",
  emailRemindSubmitting: "Saving…",
  emailRemindSuccess: "Saved. When you tap a reminder below, we’ll also schedule an email to this address (if your host has Resend + cron configured).",
  emailRemindError: "Could not save — try again in a moment.",
  emailRemindCaptchaFailed: "Robot check failed — try again.",
  emailRemindNeedTurnstile:
    "Email reminders need Cloudflare Turnstile keys (NEXT_PUBLIC_TURNSTILE_SITE_KEY + TURNSTILE_SECRET_KEY) in the site environment.",
  emailRemindPrivacy:
    "By continuing, you agree we may send one-off reminder emails associated with this tool. See the site privacy policy for how data is handled.",
  emailRemindDevCaptchaBypass:
    "Local dev: Turnstile not set — use REMINDER_SKIP_CAPTCHA=1 on the server to test without the widget.",
  emailRemindIdStored: "This browser is linked to your saved email — use the same device when you pick 3 / 7 / 14 days.",
  emailRemindScheduleNote:
    "If you saved your email above, we’ll try to send the same-day nudge by email (in addition to this browser).",
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
  mdProfessional: "Մասնագիտական ուղեցույց",
  mdStakes: "Զգացողական ծանրություն (1‒10)",
  remind3Days: "3 օրից",
  remind7Days: "7 օրից",
  remind14Days: "14 օրից",
  remindActive3: "Հիշեցումը սահմանված է 3 օրից (այս բրաուզերում)։",
  remindActive7: "Հիշեցումը սահմանված է 7 օրից (այս բրաուզերում)։",
  remindActive14: "Հիշեցումը սահմանված է 14 օրից (այս բրաուզերում)։",
  printPdfHint: "Խնդրահատուկ` տպման պատուհանում ընտրիր «Պահել որպես PDF»։",
  specialistTitle: "Ի՞նչ հարց տալ մասնագետին կամ coach-ին",
  specialistLead: "Պատճենիր տողը, տեղակիր նամակում կամ չաթում, խմբագիր ձեր մանրամասներով։",
  specialistPhrases: [
    "Ինչ ես առաջարկում որպես հաջորդ 2‒3 կոնկրետ քայլ՝ հաշվի առնելով ինչ եմ գրել, և ինչու՞",
    "Ի՞նչ «կույր կետեր» կամ ռիսկեր եմ կարող բաց թողնել, եթե այսպես եմ դնում հարցը։",
    "Եթե հինգ մարդ նման իրավիճակում է եղել, ի՞նչն էր տարբերում լավ և վատ ելքը։",
    "Ի՞նչ տվյալներ պետք է տաս, որ խորհուրդը կոնկրետ լինի, ոչ թե ընդհանուր։",
    "Մի՞ ազդանշան, որ պետք է ավելի դանդաղեմ, մասնագետի դիմեմ կամ ուղի փոխեմ։",
    "Եթե 4‒6 շաբաթից նորից խոսենք, ի՞նչն է «նշանակալի առաջընթաց» աշխարհիկ իմաստով։",
  ],
  specialistCopy: "Պատճենել",
  runAnotherHint:
    "Մեծ որոշումները հաճախ պահանջում են երկրորդ փորձ — թարմացրու brief-ը և համեմատիր միավորները։",
  runAnotherCta: "Նոր վերլուծություն",
  historyLoadBrief: "Բեռնել brief-ը և կրկին գործարկել",
  nextIterationTitle: "Հաջորդ գործարկումից առաջ",
  nextIterationLead:
    "Երեք արագ ուղղություն հաջորդ խմբագրման համար։ Լրիվ հարցերի ցանկը՝ հաջորդ բաժնում։",
  compareTitle: "Երկու պահված վերլուծությունների համեմատում",
  compareNeedTwo:
    "Այս սարքում գոնե երկու անգամ գործարկիր վերլուծիչը, որպեսզի տեսնես միավորներն ու ամփոփումները կողք կողքի։",
  comparePickA: "A վերլուծություն",
  comparePickB: "B վերլուծություն",
  compareDecisionLabel: "Հարց",
  compareScoreLabel: "Միավոր",
  compareSummaryLabel: "Ամփոփում",
  compareDifferentRuns: "Ընտրիր երկու տարբեր գրառում։",
  emailRemindSectionTitle: "Էլ․ փոստով հիշեցում (ընտրովի)",
  emailRemindSectionLead:
    "Գրիր անուն, ազգանուն և էլ․ փոստ, որ իմանանք ում գրել։ «Ես ռոբոտ չեմ» ստուգումը պաշտպանում է սպամից։ Հասցեն պահում ենք միայն քո ընտրած հիշեցումն ուղարկելու համար, ոչ թե նամակագիր ցուցակի համար։",
  emailRemindFirstName: "Անուն",
  emailRemindLastName: "Ազգանուն",
  emailRemindEmail: "Էլ․ փոստ",
  emailRemindSubmit: "Պահել իմ հասցեն հիշեցումների համար",
  emailRemindSubmitting: "Պահվում է…",
  emailRemindSuccess:
    "Պահվեց։ Երբ ստորև ընտրես 3 / 7 / 14 օր, կծրագրենք նաև էլ․ նամակ (եթե սերվերում միացված են Resend և cron)։",
  emailRemindError: "Չհաջողվեց — փորձիր մի քիչ հետո։",
  emailRemindCaptchaFailed: "Ռոբոտի ստուգումը չանցավ — կրկին փորձիր։",
  emailRemindNeedTurnstile:
    "Էլ․ հիշեցումների համար պետք են Cloudflare Turnstile բանալիներ (NEXT_PUBLIC_TURNSTILE_SITE_KEY և TURNSTILE_SECRET_KEY) սերվերի կարգավորումներում։",
  emailRemindPrivacy:
    "Շարունակելով՝ համաձայն ես, որ կարող ենք ուղարկել մեկանգամյա հիշեցումներ՝ կապված այս գործիքի հետ։ Մանրամասների համար՝ գաղտնիության քաղաքականություն։",
  emailRemindDevCaptchaBypass:
    "Տեղային dev՝ Turnstile չկա — սերվերում դրու REMINDER_SKIP_CAPTCHA=1, որ փորձես առանց վիջեթի։",
  emailRemindIdStored:
    "Այս բրաուզերը կապված է պահված հասցեի հետ — նույն սարքով ընտրիր 3 / 7 / 14 օրը։",
  emailRemindScheduleNote:
    "Եթե վերևում պահել ես էլ․ փոստը, կփորձենք նաև նամակով հիշեցնել (լրացուցիչ բրաուզերի հիշեցմանը)։",
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
