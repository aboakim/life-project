import type { AppLocale } from "./locale";

/** Shared “extra” UI: journal, checklists, transparency, visitor path, warm presets, demo, premium placeholder */
export type SiteExtras = {
  navJournal: string;
  navChecklists: string;
  navHowAi: string;
  footerJournal: string;
  footerChecklists: string;
  footerHowAi: string;
  journalTitle: string;
  journalSubtitle: string;
  journalPrivacy: string;
  journalPlaceholder: string;
  journalSave: string;
  journalSaved: string;
  journalEmpty: string;
  journalRemove: string;
  checklistsTitle: string;
  checklistsSubtitle: string;
  checklistsPrint: string;
  checklistsThemeLabel: string;
  checklistsBlogCta: string;
  cRelocateTitle: string;
  cRelocateItems: [string, string, string, string];
  cJobTitle: string;
  cJobItems: [string, string, string, string];
  cRelTitle: string;
  cRelItems: [string, string, string, string];
  howAiTitle: string;
  howAiLead: string;
  howAiS1h: string;
  howAiS1p: string;
  howAiS2h: string;
  howAiS2p: string;
  howAiS3h: string;
  howAiS3p: string;
  howAiS4h: string;
  howAiS4p: string;
  visitorEyebrow: string;
  visitorTitle: string;
  visitorStep1: string;
  visitorStep2: string;
  visitorStep3: string;
  visitorDismiss: string;
  warmEyebrow: string;
  warmRelocate: string;
  warmJob: string;
  warmRel: string;
  demoBadge: string;
  premiumTitle: string;
  premiumCta: string;
  premiumHint: string;
  moderationNote: string;
  filterLang: string;
  filterAll: string;
  /** Rotating one-line prompts on the home hero — encourages dwell time */
  stayStripEyebrow: string;
  stayMoments: [string, string, string, string, string];
  /** Playful micro-thoughts by the analyzer — shuffle + slow auto-rotate */
  sparkStripEyebrow: string;
  sparkShuffle: string;
  sparkMoments: [string, string, string, string, string, string];
  /** Sharp-brief “lab” hints — auto-rotate, distinct from stay/spark */
  labStripEyebrow: string;
  labMoments: readonly [string, string, string, string, string];
};

const en: SiteExtras = {
  navJournal: "Journal",
  navChecklists: "Checklists",
  navHowAi: "How we use AI",
  footerJournal: "Decision journal",
  footerChecklists: "Printable checklists",
  footerHowAi: "How we use AI",
  journalTitle: "Private decision journal",
  journalSubtitle:
    "One-line notes per question, stored only in your browser (localStorage). Not sent to our servers. Clear anytime.",
  journalPrivacy:
    "Privacy: entries stay on this device. Deleting site data removes them.",
  journalPlaceholder: "Short note (optional)",
  journalSave: "Add entry",
  journalSaved: "Saved locally.",
  journalEmpty: "No entries yet. Add your first reflection above.",
  journalRemove: "Remove",
  checklistsTitle: "Printable decision checklists",
  checklistsSubtitle:
    "Use Print / Save as PDF in your browser. Also read related posts on the blog.",
  checklistsPrint: "Print or save as PDF",
  checklistsThemeLabel: "Print theme",
  checklistsBlogCta: "See blog for deeper guides →",
  cRelocateTitle: "Relocation decision",
  cRelocateItems: [
    "List non-negotiables (family, school, health).",
    "Compare cost of living + tax for 12 months.",
    "Name one ‘no-go’ scenario you’d regret in 2 years.",
    "Schedule a concrete trial visit or remote research week.",
  ],
  cJobTitle: "Job / offer decision",
  cJobItems: [
    "Write the role in one sentence; what changes in 6 months if you say yes?",
    "Comp: base, bonus, equity, pace — what is missing?",
    "Energy: does the team culture fit your values?",
    "If you decline, what’s your plan B for income and identity?",
  ],
  cRelTitle: "Relationship / conversation",
  cRelItems: [
    "What outcome would respect both people?",
    "What fear are you avoiding naming?",
    "What support (therapy, time boundary) do you need first?",
    "One small next step within 7 days — not a verdict.",
  ],
  howAiTitle: "How we use AI",
  howAiLead:
    "Transparency matters. Here is how the analyzer works and what it is not.",
  howAiS1h: "Structured output, not a chatbot oracle",
  howAiS1p:
    "The engine asks for your decision, context, and constraints, then produces scenarios, dimensions, a timeline, and a score. That structure reduces vague answers compared with open-ended chat.",
  howAiS2h: "Your text and consent",
  howAiS2p:
    "When live AI is enabled, your question is sent to the provider only to generate the response, per their terms. We don’t run user-submitted code; don’t paste secrets into public community posts.",
  howAiS3h: "Ads & analytics",
  howAiS3p:
    "We may use Google AdSense and analytics with consent where required. You can read more in our Privacy Policy and Cookie/Consent banner.",
  howAiS4h: "Not professional advice",
  howAiS4p:
    "This tool does not replace doctors, lawyers, therapists, or financial advisers. In crisis, contact local emergency or qualified professionals.",
  visitorEyebrow: "Welcome back",
  visitorTitle: "Your 3-step path",
  visitorStep1: "Open the 60-second decision brief",
  visitorStep2: "Run the structured analyzer",
  visitorStep3: "Compare experts if you want humans in the loop",
  visitorDismiss: "Got it",
  warmEyebrow: "Try a warm start",
  warmRelocate: "Relocate for work?",
  warmJob: "Evaluate a job offer",
  warmRel: "Relationship next step",
  demoBadge: "Local / preview mode — not production data.",
  premiumTitle: "Export & more",
  premiumCta: "Export PDF (soon)",
  premiumHint: "Premium may include PDF export and deeper reviews — planned.",
  moderationNote:
    "Posts appear as plain text after light automated checks; we may remove spam or unsafe content. This is peer exchange, not therapy or legal counsel.",
  filterLang: "Language",
  filterAll: "All",
  stayStripEyebrow: "In the next minute",
  stayMoments: [
    "Clarity is a process — we map trade-offs, not pick vibes.",
    "One structured pass beats hours of open-ended scrolling.",
    "Scenarios, risks, and a timeline so the next step feels obvious.",
    "When stakes are high, structure is kindness to your future self.",
    "Save your run and revisit in a week — good decisions like a second look.",
  ],
  sparkStripEyebrow: "Tiny sparks",
  sparkShuffle: "Another spark",
  sparkMoments: [
    'The opposite of a decision isn’t “wrong” — it’s drift you stop naming.',
    "Unfinished forks feel like too many browser tabs: they quietly tax your RAM.",
    'Sometimes “not yet” is the bravest yes you’ll give yourself.',
    "Write the worst case in one sentence — half its power was the fog.",
    "A big choice is less a verdict than a hypothesis you test with calendar days.",
    "No framework replaces you saying aloud what you refuse to lose.",
  ],
  labStripEyebrow: "Brief lab",
  labMoments: [
    "Name one number you are afraid to write — the model calms down when digits appear.",
    "Constraints are not pessimism; they are guardrails that stop fantasy scenarios.",
    "If your decision is a question, rewrite it as a sentence a stranger could score.",
    "Paste nothing you would not show a colleague; redact names if you must.",
    "Second pass: add one deadline and one stakeholder — watch the timeline tighten.",
  ],
};

const hy: SiteExtras = {
  navJournal: "Օրագիր",
  navChecklists: "Չեկլիստներ",
  navHowAi: "AI-ի օգտագործում",
  footerJournal: "Որոշման օրագիր",
  footerChecklists: "Տպելի չեկլիստներ",
  footerHowAi: "Ինչպես ենք օգտագործում AI",
  journalTitle: "Գաղտնի որոշման օրագիր",
  journalSubtitle:
    "Մեկ տող մեկ հարցի համար՝ միայն քո բրաուզերում (localStorage)։ Մեր սերվեր չի ուղարկվում։",
  journalPrivacy:
    "Գաղտնիություն․ մուտքերը մնում են այս սարքում։ Կայքի տվյալների մաքրումը ջնջում է դրանք։",
  journalPlaceholder: "Կարճ նշում (ընտրովի)",
  journalSave: "Ավելացնել",
  journalSaved: "Պահվել է տեղում։",
  journalEmpty: "Դեռ գրառում չկա։",
  journalRemove: "Ջնջել",
  checklistsTitle: "Տպելի որոշման չեկլիստներ",
  checklistsSubtitle:
    "Օգտագործիր Print / Save as PDF բրաուզերում։ Ավելի մանրամասների համար՝ բլոգը։",
  checklistsPrint: "Տպել կամ PDF",
  checklistsThemeLabel: "Տպման թեմա",
  checklistsBlogCta: "Բլոգ՝ առաջարկված ուղիներ →",
  cRelocateTitle: "Տեղափոխության որոշում",
  cRelocateItems: [
    "Գրիր անխորհրդելիները (ընտանիք, դպրոց, առողջություն)։",
    "Համեմատիր կյանքի ծախսը + հարկը 12 ամիսով։",
    "Նշիր մեկ «ոչ» սցենար, որին կփոշմանիիր 2 տարից։",
    "Պլանավորիր փորձարկում կամ հեռվից ուսումնասիրում։",
  ],
  cJobTitle: "Աշխատանքի / առաջարկի որոշում",
  cJobItems: [
    "Դերը մեկ նախադասությամբ․ ի՞նչ փոխվի 6 ամիսում, եթե համաձայն ես։",
    "Վճարում՝ հիմք, բոնուս, բաժնետոմս, թեմպ․ ի՞նչ է բացակայում։",
    "Էներգիա․ արդյո՞ք թիմի մշակույթը համապատասխանում է արժեքներիդ։",
    "Եթե հրաժարվես՝ plan B եկամուտի ու ինքնության համար։",
  ],
  cRelTitle: "Հարաբերություն / խոսակցություն",
  cRelItems: [
    "Ո՞ր արդյունքը կհարգի երկու կողմին։",
    "Ո՞ր վախն ես չանվանակոչել։",
    "Ի՞նչ աջակցություն (թերապիա, սահման) է պետք նախ։",
    "Մեկ փոքր քայլ 7 օրվա ներսում — ոչ վերջակետ։",
  ],
  howAiTitle: "Ինչպես ենք օգտագործում AI-ն",
  howAiLead:
    "Թափանցիկություն․ ահա ինչպես է աշխատում վերլուծիչը և ինչ չէ։",
  howAiS1h: "Կառուցված պատասխան, ոչ թե «քվաքաթ chat»",
  howAiS1p:
    "Շարժիչը հարցում է քո որոշումը, կոնտեքստը, սահմանները, հետո տալիս է սցենարներ, առանցքներ, ժամանակացույց, գնահատում։",
  howAiS2h: "Քո տեքստը և համաձայնությունը",
  howAiS2p:
    "Երբ live AI-ն միացված է, հարցը ուղարկվում է մատակարարին միայն պատասխան գեներացնելու համար։ Հանրության մեջ գաղտնիքներ մի՛ փոխանցիր։",
  howAiS3h: "Գովազդ և վճիռաբանություն",
  howAiS3p:
    "Կարող ենք օգտագործել Google AdSense և վիճակագրություն համաձայնության կարգով։ Մանրամասներ՝ Privacy Policy։",
  howAiS4h: "Ոչ մասնագիտական խորհուրդ",
  howAiS4p:
    "Գործիքը չի փոխարինում բժիշկներին, իրավաբաններին, թերապևտներին։ Ճգնաժամում՝ տեղի մասնագետներ։",
  visitorEyebrow: "Բարի վերադարձ",
  visitorTitle: "Երեք քայլով ուղի",
  visitorStep1: "Բացիր 60 վայրկյանային brief-ը",
  visitorStep2: "Գործարկիր կառուցված վերլուծիչը",
  visitorStep3: "Համեմատիր մասնագետների հետ",
  visitorDismiss: "Պարզ է",
  warmEyebrow: "Սկսիր արագ",
  warmRelocate: "Տեղափոխություն աշխատանքի՞ համար",
  warmJob: "Գնահատել առաջարկը",
  warmRel: "Հարաբերության հաջորդ քայլ",
  demoBadge: "Տեղական / նախադիտում — production տվյալներ չեն։",
  premiumTitle: "Արտահանում և ավելին",
  premiumCta: "PDF արտահանում (շուտով)",
  premiumHint: "Premium-ով կարող է լինել PDF և խորացված վերանայում — նախատեսված է։",
  moderationNote:
    "Հաղորդագրությունները երևում են պարզ տեքստով․ կարող ենք ջնջել սպամ կամ վտանգավոր բովանդակություն։ Սա հասարակական փոխանակում է, ոչ թե թերապիա կամ իրավունք։",
  filterLang: "Լեզու",
  filterAll: "Բոլորը",
  stayStripEyebrow: "Մի րոպեի մեջ",
  stayMoments: [
    "Պարզությունը գործընթաց է — մենք քարտեզագրում ենք փոխանակումները, ոչ թե «զգացում ենք ընտրում»։",
    "Մեկ կառուցված անցումը լավն է ժամեր բաց թողնված սքրոլից։",
    "Սցենարներ, ռիսքեր, ժամանակացույց — որ հաջորդ քայլը ակնհայտ դառնա։",
    "Երբ դրույքը բարձր է, կառուցվածությունը բարություն է ապագա քեզ հանդեպ։",
    "Պահիր վերլուծությունն ու մեկ շաբաթից վերադարձիր — լավ որոշումները սիրում են երկրորդ հայացք։",
  ],
  sparkStripEyebrow: "Փոքր կայծեր",
  sparkShuffle: "Այլ կայծ",
  sparkMoments: [
    "Որոշման հակառակը «սխալը» չէ — այն շրջանն է, որտեղ դադար ես անում անուն տալը։",
    "Անավարտ ընտրությունները նման են բաց թողնված ներդիրների՝ աննկատ ծանրաբեռնում են ուղեղը։",
    "Երբեմն «դեռ ոչ»-ը ամենաքաջ քայլերից մեկն է, որ տալիս ես քեզ։",
    "Գրիր ամենավատ սցենարը մեկ նախադասությամբ — նրա ուժի կեսը մառախուղն էր։",
    "Մեծ ընտրությունը դատավճիռ չէ այնքան, որքան հիպոթեզ, որ ստուգում ես օրացուցարով։",
    "Ոչ մի կաղապար չի փոխարինում այն բանին բարձրաձայն ասելուն, ինչը չես ուզում կորցնել։",
  ],
  labStripEyebrow: "Brief-ի լաբոր",
  labMoments: [
    "Նշիր մեկ թիվ, որից վախենում ես գրել — մոդելը հանգստանում է, երբ թվեր են հայտնվում։",
    "Սահմանները չեն նշանակում պեսիմիզմ — դրանք արգելապատնեշներ են ֆանտաստիկ սցենարներից։",
    "Եթե որոշումը հարց է, վերագրիր այն որպես նախադասություն, որ օտարն էլ կարողանա գնահատել։",
    "Չկպցնես այն, ինչը չես ցույց տա գործընկերոջը — անունները կարող ես թաքցնել։",
    "Երկրորդ անցում՝ ավելացրու մեկ վերջնաթիվ և մեկ շահառու — ժամանակացույցը կկարծրացնի։",
  ],
};

const ru: SiteExtras = {
  ...en,
  navJournal: "Дневник",
  navChecklists: "Чеклисты",
  navHowAi: "Как мы используем ИИ",
  footerJournal: "Дневник решений",
  footerChecklists: "Чеклисты для печати",
  footerHowAi: "Как мы используем ИИ",
  journalTitle: "Личный дневник решений",
  journalSubtitle:
    "Короткие заметки к каждому вопросу — только в вашем браузере (localStorage). На сервер не отправляются.",
  journalPrivacy:
    "Конфиденциальность: записи остаются на этом устройстве. Очистка данных сайта удалит их.",
  journalPlaceholder: "Короткая заметка (необязательно)",
  journalSave: "Добавить",
  journalSaved: "Сохранено локально.",
  journalEmpty: "Пока пусто — добавьте первую заметку выше.",
  journalRemove: "Удалить",
  checklistsTitle: "Чеклисты для печати",
  checklistsSubtitle:
    "Используйте «Печать» / «Сохранить как PDF» в браузере. Подробные тексты — в блоге.",
  checklistsPrint: "Печать или PDF",
  checklistsThemeLabel: "Тема для печати",
  checklistsBlogCta: "Блог с разбором шагов →",
  cRelocateTitle: "Решение о переезде",
  cRelocateItems: [
    "Запишите «красные линии» (семья, школа, здоровье).",
    "Сравните стоимость жизни + налоги за 12 месяцев.",
    "Опишите один сценарий «катастрофы», которого боитесь через 2 года.",
    "Запланируйте пробную поездку или неделя исследований удалённо.",
  ],
  cJobTitle: "Решение о работе / оффере",
  cJobItems: [
    "Опишите роль в одном предложении: что изменится через 6 месяцев, если согласиться?",
    "Компенсация: оклад, бонус, акции, ритм — чего не хватает?",
    "Энергия: подходит ли культура команды вашим ценностям?",
    "Если откажетесь, какой план B по доходу и идентичности?",
  ],
  cRelTitle: "Отношения / разговор",
  cRelItems: [
    "Какой исход уважит обоих?",
    "Какой страх вы избегаете назвать?",
    "Какая поддержка (терапия, границы) нужна сначала?",
    "Один маленький шаг в течение 7 дней — не финальный приговор.",
  ],
  howAiTitle: "Как мы используем ИИ",
  howAiLead:
    "Прозрачность важна. Ниже — как работает анализатор и чем он не является.",
  howAiS1h: "Структура вместо «оракула в чате»",
  howAiS1p:
    "Система запрашивает решение, контекст и ограничения, затем формирует сценарии, измерения, временную шкалу и оценку. Такая структура снижает общие ответы по сравнению с открытым диалогом.",
  howAiS2h: "Ваш текст и согласие",
  howAiS2p:
    "При включённом «живом» ИИ вопрос отправляется провайдеру только для генерации ответа, согласно их условиям. Не вставляйте секреты в публичные посты сообщества.",
  howAiS3h: "Реклама и аналитика",
  howAiS3p:
    "Можем использовать Google AdSense и аналитику с учётом согласия там, где требуется. Подробности — в Политике конфиденциальности и в баннере cookie.",
  howAiS4h: "Не профессиональная консультация",
  howAiS4p:
    "Инструмент не заменяет врача, юриста, терапевта или финансового советника. В кризисе обращайтесь к местным специалистам или экстренным службам.",
  visitorEyebrow: "С возвращением",
  visitorTitle: "Три шага",
  visitorStep1: "Откройте короткий brief на 60 секунд",
  visitorStep2: "Запустите структурированный анализатор",
  visitorStep3: "При желании сравните экспертов",
  visitorDismiss: "Понятно",
  warmEyebrow: "Быстрый старт",
  warmRelocate: "Переезд из‑за работы?",
  warmJob: "Оценить оффер",
  warmRel: "Следующий шаг в отношениях",
  demoBadge: "Локальный / предпросмотр — не боевые данные.",
  premiumTitle: "Экспорт и другое",
  premiumCta: "Экспорт PDF (скоро)",
  premiumHint:
    "Premium может включать экспорт PDF и более глубокие обзоры — в планах.",
  moderationNote:
    "Сообщения показываются простым текстом после лёгких автопроверок; можем удалять спам или небезопасный контент. Это обмен мнениями, не терапия и не юридическая помощь.",
  filterLang: "Язык",
  filterAll: "Все",
  stayStripEyebrow: "В ближайшую минуту",
  stayMoments: [
    "Ясность — это процесс: мы картируем компромиссы, а не «ловим вайб».",
    "Один структурированный проход лучше часов бесцельного скролла.",
    "Сценарии, риски и временная шкала — чтобы следующий шаг был очевиден.",
    "Когда ставки высоки, структура — это забота о будущем себе.",
    "Сохраните прогон и перечитайте через неделю — хорошим решениям полезен второй взгляд.",
  ],
  sparkStripEyebrow: "Маленькие искры",
  sparkShuffle: "Ещё искра",
  sparkMoments: [
    "Противоположность решению — не «ошибка», а дрейф, которому вы перестали давать имя.",
    "Незавершённые развилки похожи на вкладки браузера: они тихо нагружают внимание.",
    "Иногда «пока нет» — самое смелое «да» для себя.",
    "Опишите худший случай в одном предложении — половина силы была в тумане.",
    "Большой выбор — скорее гипотеза, которую вы проверяете календарём.",
    "Ни одна методичка не заменит вслух сказанное, что вы не готовы потерять.",
  ],
};

const de: SiteExtras = {
  ...en,
  navJournal: "Tagebuch",
  navChecklists: "Checklisten",
  navHowAi: "KI‑Nutzung",
  footerJournal: "Entscheidungs­journal",
  footerChecklists: "Checklisten zum Drucken",
  footerHowAi: "Wie wir KI nutzen",
  journalTitle: "Privates Entscheidungsjournal",
  journalSubtitle:
    "Kurze Notizen pro Frage, nur im Browser (localStorage). Wird nicht an unsere Server gesendet.",
  journalPrivacy:
    "Datenschutz: Einträge bleiben auf diesem Gerät. Beim Löschen der Website-Daten verschwinden sie.",
  journalPlaceholder: "Kurze Notiz (optional)",
  journalSave: "Eintrag hinzufügen",
  journalSaved: "Lokal gespeichert.",
  journalEmpty: "Noch keine Einträge.",
  journalRemove: "Entfernen",
  checklistsTitle: "Druckbare Entscheidungs‑Checklisten",
  checklistsSubtitle:
    "Drucken oder „Als PDF speichern“ im Browser. Tiefer liegen die Artikel im Blog.",
  checklistsPrint: "Drucken oder PDF",
  checklistsThemeLabel: "Drucklayout",
  checklistsBlogCta: "Blog mit ausführlichen Ratgebern →",
  cRelocateTitle: "Umzugsentscheidung",
  cRelocateItems: [
    "Definieren Sie No‑gos (Familie, Schule, Gesundheit).",
    "Vergleichen Sie Lebenshaltungskosten + Steuern für 12 Monate.",
    "Benennen Sie ein „Worst Case“-Szenario in 2 Jahren.",
    "Planen Sie eine Probewoche vor Ort oder intensive Recherche.",
  ],
  cJobTitle: "Job / Angebotsentscheidung",
  cJobItems: [
    "Rolle in einem Satz: was ändert sich in 6 Monaten bei Zusage?",
    "Gehalt: Fix, Bonus, Equity, Tempo — was fehlt?",
    "Passt Teamkultur zu Ihren Werten?",
    "Plan B bei Nein: Einkommen und Identität.",
  ],
  cRelTitle: "Beziehung / Gespräch",
  cRelItems: [
    "Welches Ergebnis würde beide respektieren?",
    "Welche Angst wird nicht benannt?",
    "Welche Unterstützung (Therapie, Grenzen) brauchen Sie zuerst?",
    "Ein kleiner Schritt in 7 Tagen — kein Endurteil.",
  ],
  howAiTitle: "Wie wir KI nutzen",
  howAiLead:
    "Transparenz zählt. So funktioniert der Analyzer — und was er nicht ist.",
  howAiS1h: "Strukturierte Ausgabe statt Orakel‑Chat",
  howAiS1p:
    "Die Engine fragt nach Entscheidung, Kontext und Rahmen, dann liefert sie Szenarien, Dimensionen, Zeitplan und Score — weniger vage Antworten als im freien Chat.",
  howAiS2h: "Ihr Text und Ihre Zustimmung",
  howAiS2p:
    "Wenn Live‑KI aktiv ist, geht Ihre Frage nur zur Antwortgenerierung an den Anbieter. Keine Geheimnisse in öffentliche Community‑Posts posten.",
  howAiS3h: "Werbung & Analyse",
  howAiS3p:
    "Wir können Google AdSense und Analyse mit Einwilligung nutzen. Details: Datenschutz und Cookie‑Banner.",
  howAiS4h: "Keine Fachberatung",
  howAiS4p:
    "Dieses Tool ersetzt keine Ärzte, Anwälte, Therapeuten oder Finanzberater. In Krisen: lokale Experten oder Notruf.",
  visitorEyebrow: "Willkommen zurück",
  visitorTitle: "Ihr 3‑Schritte‑Pfad",
  visitorStep1: "Öffnen Sie das 60‑Sekunden‑Briefing",
  visitorStep2: "Starten Sie den strukturierten Analyzer",
  visitorStep3: "Vergleichen Sie Experten bei Bedarf",
  visitorDismiss: "OK",
  warmEyebrow: "Schnellstart",
  warmRelocate: "Umzug wegen Job?",
  warmJob: "Angebot prüfen",
  warmRel: "Nächster Schritt Beziehung",
  demoBadge: "Lokal / Vorschau — keine Produktionsdaten.",
  premiumTitle: "Export & mehr",
  premiumCta: "PDF exportieren (bald)",
  premiumHint:
    "Premium kann PDF‑Export und tiefere Reviews umfassen — geplant.",
  moderationNote:
    "Beiträge erscheinen als Klartext nach leichten automatischen Checks; Spam oder unsichere Inhalte können wir entfernen. Das ist Austausch unter Peers, keine Therapie oder Rechtsberatung.",
  filterLang: "Sprache",
  filterAll: "Alle",
  stayStripEyebrow: "In der nächsten Minute",
  stayMoments: [
    "Klarheit ist ein Prozess — wir kartieren Zielkonflikte statt „Vibes“.",
    "Ein strukturierter Durchlauf schlägt stundenloses Scrollen.",
    "Szenarien, Risiken und eine Zeitleiste — damit der nächste Schritt offensichtlich wird.",
    "Wenn viel auf dem Spiel steht, ist Struktur Freundlichkeit für dein zukünftiges Ich.",
    "Speichere den Lauf und lies ihn in einer Woche erneut — gute Entscheidungen profitieren vom zweiten Blick.",
  ],
  sparkStripEyebrow: "Kleine Funken",
  sparkShuffle: "Noch ein Funke",
  sparkMoments: [
    "Das Gegenteil einer Entscheidung ist nicht „falsch“ — es ist Drift, die du nicht mehr benennst.",
    "Offene Entscheidungen sind wie zu viele Tabs: sie kosten leise Aufmerksamkeit.",
    "Manchmal ist „noch nicht“ das mutigste „Ja“ an dich selbst.",
    "Schreib den Worst Case in einem Satz — die Hälfte der Macht war der Nebel.",
    "Eine große Wahl ist eher eine Hypothese, die du mit Kalendertagen testest.",
    "Kein Framework ersetzt, dass du laut sagst, was du nicht verlieren willst.",
  ],
};

const fr: SiteExtras = {
  ...en,
  navJournal: "Journal",
  navChecklists: "Listes",
  navHowAi: "Utilisation de l’IA",
  footerJournal: "Journal de décision",
  footerChecklists: "Listes imprimables",
  footerHowAi: "Notre usage de l’IA",
  journalTitle: "Journal de décisions privé",
  journalSubtitle:
    "Une ligne par question, stockée uniquement dans votre navigateur (localStorage). Rien n’est envoyé à nos serveurs.",
  journalPrivacy:
    "Confidentialité : les entrées restent sur cet appareil. Effacer les données du site les supprime.",
  journalPlaceholder: "Courte note (optionnel)",
  journalSave: "Ajouter",
  journalSaved: "Enregistré localement.",
  journalEmpty: "Pas encore d’entrée — ajoutez votre première réflexion ci‑dessus.",
  journalRemove: "Supprimer",
  checklistsTitle: "Listes de décision imprimables",
  checklistsSubtitle:
    "Utilisez Imprimer / Enregistrer au format PDF dans le navigateur. Des guides plus longs sont sur le blog.",
  checklistsPrint: "Imprimer ou PDF",
  checklistsThemeLabel: "Thème d’impression",
  checklistsBlogCta: "Blog — guides approfondis →",
  cRelocateTitle: "Décision de déménagement",
  cRelocateItems: [
    "Listez l’inacceptable (famille, école, santé).",
    "Comparez coût de la vie + fiscalité sur 12 mois.",
    "Nommez un scénario « no‑go » que vous regretteriez dans 2 ans.",
    "Planifiez un essai sur place ou une semaine de recherche à distance.",
  ],
  cJobTitle: "Décision sur un emploi / une offre",
  cJobItems: [
    "Décrivez le poste en une phrase : que change‑t‑il dans 6 mois si vous acceptez ?",
    "Rémunération : fixe, bonus, actions, rythme — qu’est‑ce qui manque ?",
    "Énergie : la culture d’équipe colle‑t‑elle à vos valeurs ?",
    "Si vous refusez, quel plan B pour revenu et identité ?",
  ],
  cRelTitle: "Relation / conversation",
  cRelItems: [
    "Quel résultat respecterait les deux personnes ?",
    "Quelle peur évitez‑vous de nommer ?",
    "Quel soutien (thérapie, limites) avant tout ?",
    "Un petit pas dans 7 jours — pas un verdict final.",
  ],
  howAiTitle: "Comment nous utilisons l’IA",
  howAiLead:
    "La transparence compte. Voici comment l’outil fonctionne — et ce qu’il n’est pas.",
  howAiS1h: "Une sortie structurée, pas un oracle de chat",
  howAiS1p:
    "Le moteur demande votre décision, le contexte et les contraintes, puis produit scénarios, dimensions, calendrier et score — moins de réponses floues qu’en chat libre.",
  howAiS2h: "Votre texte et votre consentement",
  howAiS2p:
    "Quand l’IA en direct est activée, la question est envoyée au fournisseur seulement pour générer la réponse. Ne collez pas de secrets dans des posts publics.",
  howAiS3h: "Publicité et mesure d’audience",
  howAiS3p:
    "Nous pouvons utiliser Google AdSense et des analytics avec consentement lorsque requis. Voir la politique et la bannière cookies.",
  howAiS4h: "Pas un conseil professionnel",
  howAiS4p:
    "L’outil ne remplace pas médecins, avocats, thérapeutes ou conseillers financiers. En urgence, contactez les professionnels locaux.",
  visitorEyebrow: "Bon retour",
  visitorTitle: "Votre parcours en 3 étapes",
  visitorStep1: "Ouvrez le brief de 60 secondes",
  visitorStep2: "Lancez l’analyseur structuré",
  visitorStep3: "Comparez les experts si vous le souhaitez",
  visitorDismiss: "Compris",
  warmEyebrow: "Démarrage rapide",
  warmRelocate: "Déménager pour le travail ?",
  warmJob: "Évaluer une offre",
  warmRel: "Étape suivante en couple",
  demoBadge: "Mode local / aperçu — pas des données de production.",
  premiumTitle: "Export et plus",
  premiumCta: "Export PDF (bientôt)",
  premiumHint:
    "L’offre Premium pourrait inclure export PDF et revues plus poussées — prévu.",
  moderationNote:
    "Les messages apparaissent en texte brut après contrôles automatisés légers ; nous pouvons retirer spam ou contenu risqué. Échange entre pairs, pas thérapie ni conseil juridique.",
  filterLang: "Langue",
  filterAll: "Toutes",
  stayStripEyebrow: "Dans la prochaine minute",
  stayMoments: [
    "La clarté est un processus — on cartographie les compromis, pas les « vibes ».",
    "Un passage structuré vaut mieux que des heures de défilement sans fin.",
    "Scénarios, risques et chronologie pour que la prochaine étape paraisse évidente.",
    "Quand les enjeux sont hauts, la structure est une gentillesse envers votre futur vous.",
    "Sauvegardez votre analyse et relisez-la une semaine plus tard — les bonnes décisions aiment le second regard.",
  ],
  sparkStripEyebrow: "Petites étincelles",
  sparkShuffle: "Une autre étincelle",
  sparkMoments: [
    "L’inverse d’une décision n’est pas « faux » — c’est la dérive que vous ne nommez plus.",
    "Les bifurcations ouvertes ressemblent à trop d’onglets : elles taxent discrètement votre attention.",
    "Parfois « pas encore » est le « oui » le plus courageux que vous vous accorderez.",
    "Écrivez le pire cas en une phrase — la moitié de sa force était le brouillard.",
    "Un grand choix est plutôt une hypothèse que vous testez avec des jours sur le calendrier.",
    "Aucun cadre ne remplace le fait de dire à voix haut ce que vous refusez de perdre.",
  ],
};

const es: SiteExtras = {
  ...en,
  navJournal: "Diario",
  navChecklists: "Listas",
  navHowAi: "Uso de la IA",
  footerJournal: "Diario de decisiones",
  footerChecklists: "Listas imprimibles",
  footerHowAi: "Cómo usamos la IA",
  journalTitle: "Diario privado de decisiones",
  journalSubtitle:
    "Notas cortas por pregunta, solo en tu navegador (localStorage). No se envía a nuestros servidores.",
  journalPrivacy:
    "Privacidad: las entradas se quedan en este dispositivo. Si borras los datos del sitio, desaparecen.",
  journalPlaceholder: "Nota breve (opcional)",
  journalSave: "Añadir",
  journalSaved: "Guardado localmente.",
  journalEmpty: "Aún no hay entradas — añade la primera arriba.",
  journalRemove: "Quitar",
  checklistsTitle: "Listas de decisión imprimibles",
  checklistsSubtitle:
    "Usa Imprimir / Guardar como PDF en el navegador. Más profundidad en el blog.",
  checklistsPrint: "Imprimir o PDF",
  checklistsThemeLabel: "Tema de impresión",
  checklistsBlogCta: "Blog con guías →",
  cRelocateTitle: "Decisión de mudanza",
  cRelocateItems: [
    "Anota lo innegociable (familia, colegio, salud).",
    "Compara coste de vida + impuestos a 12 meses.",
    "Describe un escenario «no quiero» dentro de 2 años.",
    "Programa una visita de prueba o una semana de investigación remota.",
  ],
  cJobTitle: "Decisión de trabajo / oferta",
  cJobItems: [
    "Resume el rol en una frase: ¿qué cambia en 6 meses si dices que sí?",
    "Comp: fijo, bonus, equity, ritmo — ¿qué falta?",
    "¿Encaja la cultura del equipo con tus valores?",
    "Si rechazas, ¿plan B de ingresos e identidad?",
  ],
  cRelTitle: "Relación / conversación",
  cRelItems: [
    "¿Qué resultado respetaría a ambas personas?",
    "¿Qué miedo evitas nombrar?",
    "¿Qué apoyo (terapia, límites) necesitas primero?",
    "Un paso pequeño en 7 días — no un veredicto.",
  ],
  howAiTitle: "Cómo usamos la IA",
  howAiLead:
    "La transparencia importa. Así funciona el analizador y lo que no es.",
  howAiS1h: "Salida estructurada, no un oráculo de chat",
  howAiS1p:
    "El motor pide tu decisión, contexto y límites; devuelve escenarios, dimensiones, calendario y una puntuación. Menos vaguedad que un chat abierto.",
  howAiS2h: "Tu texto y tu consentimiento",
  howAiS2p:
    "Si la IA en vivo está activa, la pregunta se envía al proveedor solo para generar la respuesta. No pegues secretos en la comunidad pública.",
  howAiS3h: "Anuncios y analítica",
  howAiS3p:
    "Podemos usar Google AdSense y analítica con consentimiento donde aplique. Más en Privacidad y banner de cookies.",
  howAiS4h: "No es asesoramiento profesional",
  howAiS4p:
    "La herramienta no sustituye a médicos, abogados, terapeutas o asesores financieros. En crisis, profesionales locales o emergencias.",
  visitorEyebrow: "Bienvenido de nuevo",
  visitorTitle: "Tu camino en 3 pasos",
  visitorStep1: "Abre el informe breve de 60 segundos",
  visitorStep2: "Ejecuta el analizador estructurado",
  visitorStep3: "Compara expertos si quieres intervención humana",
  visitorDismiss: "Entendido",
  warmEyebrow: "Inicio rápido",
  warmRelocate: "¿Mudarte por trabajo?",
  warmJob: "Evaluar oferta",
  warmRel: "Siguiente paso en la relación",
  demoBadge: "Modo local / vista previa — no datos de producción.",
  premiumTitle: "Exportar y más",
  premiumCta: "Exportar PDF (pronto)",
  premiumHint:
    "Premium puede incluir exportación PDF y revisiones más profundas — previsto.",
  moderationNote:
    "Las publicaciones se muestran en texto plano tras controles automáticos ligeros; podemos eliminar spam o contenido inseguro. Esto es intercambio entre pares, no terapía ni asesoramiento legal.",
  filterLang: "Idioma",
  filterAll: "Todos",
  stayStripEyebrow: "En el próximo minuto",
  stayMoments: [
    "La claridad es un proceso: mapeamos compensaciones, no «vibes».",
    "Una pasada estructurada vale más que horas de scroll sin rumbo.",
    "Escenarios, riesgos y una línea de tiempo para que el siguiente paso sea obvio.",
    "Cuando las apuestas son altas, la estructura es amabilidad con tu yo futuro.",
    "Guarda tu corrida y revísala en una semana — a las buenas decisiones les gusta la segunda mirada.",
  ],
  sparkStripEyebrow: "Chispas pequeñas",
  sparkShuffle: "Otra chispa",
  sparkMoments: [
    "Lo opuesto a decidir no es «equivocarse» — es la deriva que dejas de nombrar.",
    "Las bifurcaciones abiertas son como demasiadas pestañas: roban atención en silencio.",
    "A veces «todavía no» es el «sí» más valiente que te das.",
    "Escribe el peor caso en una oración — la mitad del poder era la niebla.",
    "Una gran elección es menos un veredicto que una hipótesis que pruebas con días en el calendario.",
    "Ningún marco reemplaza decir en voz alta lo que no estás dispuesto a perder.",
  ],
};

const it: SiteExtras = {
  ...en,
  navJournal: "Diario",
  navChecklists: "Checklist",
  navHowAi: "Come usiamo l’IA",
  footerJournal: "Diario delle decisioni",
  footerChecklists: "Checklist stampabili",
  footerHowAi: "Come usiamo l’IA",
  journalTitle: "Diario privato delle decisioni",
  journalSubtitle:
    "Note brevi per domanda, solo nel browser (localStorage). Non inviate ai nostri server.",
  journalPrivacy:
    "Privacy: le voci restano su questo dispositivo. Cancellando i dati del sito si eliminano.",
  journalPlaceholder: "Nota breve (facoltativa)",
  journalSave: "Aggiungi",
  journalSaved: "Salvato in locale.",
  journalEmpty: "Nessuna voce — aggiungi la prima riflessione sopra.",
  journalRemove: "Rimuovi",
  checklistsTitle: "Checklist di decisione stampabili",
  checklistsSubtitle:
    "Usa Stampa / Salva come PDF nel browser. Approfondimenti nel blog.",
  checklistsPrint: "Stampa o PDF",
  checklistsThemeLabel: "Tema di stampa",
  checklistsBlogCta: "Blog con guide dettagliate →",
  cRelocateTitle: "Decisione di trasferimento",
  cRelocateItems: [
    "Elenco dei non negoziabili (famiglia, scuola, salute).",
    "Confronta costo della vita + tasse su 12 mesi.",
    "Uno scenario «mai» che temeresti tra 2 anni.",
    "Prova sul posto o settimana di ricerca a distanza.",
  ],
  cJobTitle: "Decisione sul lavoro / offerta",
  cJobItems: [
    "Ruolo in una frase: cosa cambia tra 6 mesi se accetti?",
    "Compenso: fisso, bonus, equity, ritmo — cosa manca?",
    "La cultura del team è allineata ai tuoi valori?",
    "Se rifiuti, piano B per reddito e identità?",
  ],
  cRelTitle: "Relazione / conversazione",
  cRelItems: [
    "Quale esito rispetterebbe entrambe le persone?",
    "Quale paura eviti di nominare?",
    "Che supporto (terapia, confini) serve prima?",
    "Un piccolo passo entro 7 giorni — non un verdetto.",
  ],
  howAiTitle: "Come usiamo l’IA",
  howAiLead:
    "La trasparenza conta. Ecco come funziona l’analizzatore e cosa non è.",
  howAiS1h: "Output strutturato, non un oracolo in chat",
  howAiS1p:
    "Il motore chiede decisione, contesto e vincoli, poi produce scenari, dimensioni, timeline e punteggio — meno risposte vaghe della chat aperta.",
  howAiS2h: "Il tuo testo e il consenso",
  howAiS2p:
    "Con IA live la domanda va al provider solo per generare la risposta. Non incollare segreti nei post pubblici.",
  howAiS3h: "Annunci e analitica",
  howAiS3p:
    "Possiamo usare Google AdSense e analitica con consenso ove richiesto. Dettagli in Informativa e banner cookie.",
  howAiS4h: "Non è consulenza professionale",
  howAiS4p:
    "Lo strumento non sostituisce medici, avvocati, terapeuti o consulenti finanziari. In crisi: professionisti locali o emergenza.",
  visitorEyebrow: "Bentornato",
  visitorTitle: "Il percorso in 3 passi",
  visitorStep1: "Apri il brief di 60 secondi",
  visitorStep2: "Avvia l’analizzatore strutturato",
  visitorStep3: "Confronta gli esperti se vuoi supporto umano",
  visitorDismiss: "OK",
  warmEyebrow: "Avvio rapido",
  warmRelocate: "Trasferimento per lavoro?",
  warmJob: "Valuta offerta",
  warmRel: "Prossimo passo nella relazione",
  demoBadge: "Modalità locale/anteprima — non dati di produzione.",
  premiumTitle: "Export e altro",
  premiumCta: "Esporta PDF (presto)",
  premiumHint:
    "Premium potrebbe includere export PDF e revisioni più profonde — in programma.",
  moderationNote:
    "I messaggi compaiono come testo semplice dopo controlli automatici leggeri; possiamo rimuovere spam o contenuti non sicuri. Scambio tra pari, non terapia o consulenza legale.",
  filterLang: "Lingua",
  filterAll: "Tutte",
  stayStripEyebrow: "Nel prossimo minuto",
  stayMoments: [
    "La chiarezza è un processo — mappiamo i trade‑off, non «i vibe».",
    "Un passaggio strutturato batte ore di scroll senza meta.",
    "Scenari, rischi e una timeline così il passo successivo è ovvio.",
    "Quando la posta in gioco è alta, la struttura è gentilezza verso il te futuro.",
    "Salva l’analisi e rileggila tra una settimana — alle buone decisioni piace il secondo sguardo.",
  ],
  sparkStripEyebrow: "Piccole scintille",
  sparkShuffle: "Altra scintilla",
  sparkMoments: [
    "Il contrario di una decisione non è «sbagliato» — è la deriva che smetti di nominare.",
    "Le biforcazioni aperte sono come troppe schede: ti rubano attenzione in silenzio.",
    "A volte «non ancora» è il «sì» più coraggioso che ti dai.",
    "Scrivi il caso peggiore in una frase — metà potenza era nella nebbia.",
    "Una grande scelta è meno un verdetto che un’ipotesi che testi con i giorni del calendario.",
    "Nessun framework sostituisce dirti ad alta voce cosa non sei disposto a perdere.",
  ],
};

const ar: SiteExtras = {
  ...en,
  navJournal: "يوميات",
  navChecklists: "قوائم",
  navHowAi: "كيف نستخدم الذكاء الاصطناعي",
  footerJournal: "يوميات القرار",
  footerChecklists: "قوائم للطباعة",
  footerHowAi: "كيف نستخدم الذكاء الاصطناعي",
  journalTitle: "يوميات قرارات خاصة",
  journalSubtitle:
    "ملاحظة قصيرة لكل سؤال، تُخزَّن فقط في المتصفح (localStorage). لا تُرسل إلى خوادمنا.",
  journalPrivacy:
    "الخصوصية: المدخلات تبقى على هذا الجهاز. مسح بيانات الموقع يحذفها.",
  journalPlaceholder: "ملاحظة قصيرة (اختياري)",
  journalSave: "إضافة",
  journalSaved: "حُفظ محلياً.",
  journalEmpty: "لا توجد مدخلات بعد — أضف أول ملاحظة أعلاه.",
  journalRemove: "حذف",
  checklistsTitle: "قوائم تحقق قابلة للطباعة",
  checklistsSubtitle:
    "استخدم الطباعة أو «حفظ كملف PDF» في المتصفح. مقالات أعمق في المدونة.",
  checklistsPrint: "طباعة أو PDF",
  checklistsThemeLabel: "مظهر الطباعة",
  checklistsBlogCta: "المدونة لمزيد من الإرشادات ←",
  cRelocateTitle: "قرار الانتقال",
  cRelocateItems: [
    "اذكر غير القابل للتنازل (العائلة، المدرسة، الصحة).",
    "قارن تكلفة المعيشة + الضرائب لمدة 12 شهراً.",
    "سمِّ سيناريو «لا» تخشاه بعد عامين.",
    "جدولة زيارة تجريبية أو أسبوع بحث عن بُعد.",
  ],
  cJobTitle: "قرار العمل / العرض",
  cJobItems: [
    "صف الدور في جملة واحدة: ماذا يتغير خلال 6 أشهر إن قلت نعم؟",
    "التعويض: ثابت، مكافأة، حصص، إيقاع — ما الناقص؟",
    "الطاقة: هل ثقافة الفريق تتماشى مع قيمك؟",
    "إن رفضت، ما البديل للدخل والهوية؟",
  ],
  cRelTitle: "العلاقة / الحوار",
  cRelItems: [
    "أي نتيجة تحترم الطرفين؟",
    "أي خوف تتجنب تسميته؟",
    "أي دعم (علاج، حدود) تحتاجه أولاً؟",
    "خطوة صغيرة خلال 7 أيام — وليس حكماً نهائياً.",
  ],
  howAiTitle: "كيف نستخدم الذكاء الاصطناعي",
  howAiLead:
    "الشفافية مهمة. إليك كيف يعمل المحلّل وماهو لا يفعله.",
  howAiS1h: "مخرجات منظّمة لا عرّاف دردشة",
  howAiS1p:
    "المحرك يطلب قرارك وسياقك وقيودك ثم يقدّم سيناريوهات وأبعاداً وجدولاً زمنياً ودرجة — أقل غموضاً من دردشة مفتوحة.",
  howAiS2h: "نصك وموافقتك",
  howAiS2p:
    "عند تفعيل الذكاء الاصطناعي المباشر تُرسل سؤالك إلى المزوّد فقط لتوليد الرد. لا تلصق أسراراً في منشورات عامة.",
  howAiS3h: "الإعلانات والتحليلات",
  howAiS3p:
    "قد نستخدم Google AdSense والتحليلات مع الموافقة حيث يلزم. التفاصيل في سياسة الخصوصية وبانر الكوكيز.",
  howAiS4h: "ليس استشارة مهنية",
  howAiS4p:
    "الأداة لا تحل محل أطباء أو محامين أو معالجين أو مستشارين ماليين. في الأزمات تواصل مع مختصّين محليين أو الطوارئ.",
  visitorEyebrow: "مرحباً بعودتك",
  visitorTitle: "مسارك بثلاث خطوات",
  visitorStep1: "افتح الملخص السريع لمدة 60 ثانية",
  visitorStep2: "شغّل المحلّل المنظّم",
  visitorStep3: "قارن الخبراء إن رغبت",
  visitorDismiss: "حسناً",
  warmEyebrow: "بداية سريعة",
  warmRelocate: "الانتقال من أجل العمل؟",
  warmJob: "تقييم العرض",
  warmRel: "خطوة تالية في العلاقة",
  demoBadge: "وضع محلي / معاينة — ليست بيانات إنتاج.",
  premiumTitle: "التصدير وأكثر",
  premiumCta: "تصدير PDF (قريباً)",
  premiumHint:
    "قد تشمل الخطة المدفوعة تصدير PDF ومراجعات أعمق — قيد التخطيط.",
  moderationNote:
    "تظهر المشاركات كنص عادي بعد فحوصات آلية خفيفة؛ قد نزيل محتوى غير آمن أو سبام. هذا تبادل بين الأقران لا علاجاً ولا استشارة قانونية.",
  filterLang: "اللغة",
  filterAll: "الكل",
  stayStripEyebrow: "في الدقيقة التالية",
  stayMoments: [
    "الوضوح عملية — نرسم المفاضلات لا «الأجواء».",
    "جولة منظّمة واحدة أفضل من ساعات تمرير بلا هدف.",
    "سيناريوهات ومخاطر وجدول زمني حتى يصبح الخطوة التالية واضحة.",
    "عندما تكون المخاطر عالية، التنظيم لطف تجاه ذاتك المستقبلية.",
    "احفظ التشغيل وأعد القراءة بعد أسبوع — القرارات الجيدة تحب النظرة الثانية.",
  ],
  sparkStripEyebrow: "شرارات صغيرة",
  sparkShuffle: "شرارة أخرى",
  sparkMoments: [
    "عكس القرار ليس «خطأ» — إنها انجراف تتوقف عن تسميته.",
    "التفرعات المفتوحة مثل تبويبات كثيرة: تسرق انتباهك بهدوء.",
    "أحياناً «ليس بعد» هي أشجع «نعم» تعطيها لنفسك.",
    "اكتب أسوأ سيناريو في جملة — نصف قوته كان الضباب.",
    "الخيار الكبير أقل حكماً وأكثر فرضية تختبرها بأيام التقويم.",
    "لا إطار يحل محل أن تقول بصوت عالٍ ما لن تخسره.",
  ],
};

const table: Record<AppLocale, SiteExtras> = {
  "en-US": en,
  en,
  hy,
  ru,
  de,
  fr,
  es,
  it,
  ar,
};

export function getSiteExtras(locale: AppLocale): SiteExtras {
  return table[locale] ?? en;
}

/** Preset strings for hero chips + URL ?preset= — keyed by locale */
export function getWarmPresets(locale: AppLocale): {
  relocate: { decision: string; context: string; constraints: string };
  job: { decision: string; context: string; constraints: string };
  relationship: { decision: string; context: string; constraints: string };
} {
  const enP = {
    relocate: {
      decision: "Should I relocate for my current job offer / role?",
      context: "Salary vs cost of living, family/school timeline, visa if any.",
      constraints: "Won’t move before end of school year; need hybrid option.",
    },
    job: {
      decision: "Should I accept this job offer vs. stay where I am?",
      context: "Comp: base, bonus, equity; commute; manager fit.",
      constraints: "Need stable income for mortgage; max 45h/week.",
    },
    relationship: {
      decision: "Should we try couples therapy before separating?",
      context: "Together 5 years; conflict about future location and kids.",
      constraints: "Willing to try 3 months structured work; no contact with ex if we split.",
    },
  };
  const hyP = {
    relocate: {
      decision: "Արժե՞ տեղափոխվել այս աշխատանքային առաջարկի/դերի համար։",
      context: "Աշխատավարձ և կյանքի ծախս, ընտանիք/դպրոց, վիզա եթե կա։",
      constraints: "Չեմ տեղափոխվի մինչ դպրոցական տարին ավարտվի, հիբրիդի կարիք։",
    },
    job: {
      decision: "Արժե՞ ընդունել այս աշխատանքը, թե մնալ նույն տեղում։",
      context: "Վճարում՝ հիմք, բոնուս, բաժնետոմս, երթուղի, մենեջեր։",
      constraints: "Կայուն եկամուտ հիփոթեքի համար, առավելագույն 45 ժ/շաբաթ։",
    },
    relationship: {
      decision: "Արժե՞ նախ զույգային թերապիա, նախքան բաժանումը։",
      context: "5 տարի միասին, տարաձայնություն երեխաների և վայրի մասին։",
      constraints: "Պատրաստ եմ 3 ամիս կառուցված աշխատանքի, եթե բաժանվենք՝ կապ չունենալ։",
    },
  };
  const ruP = {
    relocate: {
      decision: "Переезжать ради этой роли / предложения?",
      context: "Зарплата и стоимость жизни, семья, школа, виза при необходимости.",
      constraints: "Не раньше конца учебного года; нужен гибрид.",
    },
    job: {
      decision: "Принять оффер или остаться?",
      context: "Оклад, бонус, акции, дорога, руководитель.",
      constraints: "Стабильный доход для ипотеки, макс. 45 ч/нед.",
    },
    relationship: {
      decision: "Попробовать парную терапию перед расставанием?",
      context: "5 лет вместе, конфликт о детях и городе.",
      constraints: "Готовы к 3 месяцам структурированной работы.",
    },
  };
  const deP = {
    relocate: {
      decision:
        "Soll ich wegen dieses Jobangebots / dieser Rolle umziehen?",
      context: "Gehalt vs. Lebenshaltung, Familie/Schule, ggf. Visum.",
      constraints:
        "Nicht vor Schuljahresende umziehen; brauche Hybrid‑Option.",
    },
    job: {
      decision: "Angebot annehmen oder bleiben?",
      context: "Fixgehalt, Bonus, Equity; Weg; Führungskraft.",
      constraints: "Stabiles Einkommen für Hypothek; max. 45 Std/Woche.",
    },
    relationship: {
      decision: "Paartherapie vor einer Trennung probieren?",
      context: "5 Jahre zusammen, Konflikt über Ort und Kinder.",
      constraints: "Bereit für 3 Monate strukturierte Arbeit.",
    },
  };
  const frP = {
    relocate: {
      decision:
        "Déménager pour cette offre / ce rôle professionnel ?",
      context: "Salaire vs coût de la vie, famille/école, visa si besoin.",
      constraints:
        "Pas avant la fin de l’année scolaire ; besoin d’un mode hybride.",
    },
    job: {
      decision: "Accepter l’offre ou rester ?",
      context: "Fixe, bonus, actions ; trajet ; management.",
      constraints: "Revenu stable pour le prêt immo ; max 45 h/semaine.",
    },
    relationship: {
      decision: "Essayer une thérapie de couple avant de se séparer ?",
      context: "5 ans ensemble, conflit sur lieu et enfants.",
      constraints: "Prêt·e pour 3 mois de travail structuré.",
    },
  };
  const esP = {
    relocate: {
      decision: "¿Mudarme por esta oferta / este rol?",
      context: "Salario vs coste de vida, familia/colegio, visado si aplica.",
      constraints: "No antes de fin de curso; necesito híbrido.",
    },
    job: {
      decision: "¿Aceptar la oferta o quedarme?",
      context: "Base, bonus, equity; trayecto; encaje con el manager.",
      constraints: "Ingreso estable para hipoteca; máx. 45 h/semana.",
    },
    relationship: {
      decision: "¿Terapia de pareja antes de separarnos?",
      context: "5 años juntos; conflicto por hijos y ciudad.",
      constraints: "Dispuesto a 3 meses de trabajo estructurado.",
    },
  };
  const itP = {
    relocate: {
      decision: "Trasferirmi per questa offerta / questo ruolo?",
      context: "Stipendio vs costo della vita, famiglia/scuola, visto se serve.",
      constraints: "Non prima della fine dell’anno scolastico; serve ibrido.",
    },
    job: {
      decision: "Accettare l’offerta o restare?",
      context: "Fisso, bonus, equity; tragitto; manager.",
      constraints: "Reddito stabile per il mutuo; max 45 h/settimana.",
    },
    relationship: {
      decision: "Provare la terapia di coppia prima della separazione?",
      context: "5 anni insieme; conflitto su figli e città.",
      constraints: "Disposti a 3 mesi di lavoro strutturato.",
    },
  };
  const arP = {
    relocate: {
      decision: "هل أنتقل من أجل هذا العرض / هذا الدور؟",
      context: "الراتب مقابل تكلفة المعيشة، العائلة/المدرسة، التأشيرة إن وجدت.",
      constraints: "لن أنتقل قبل نهاية العام الدراسي؛ أحتاج خياراً هجيناً.",
    },
    job: {
      decision: "أأقبل عرض العمل أم أبقى؟",
      context: "أساسي، مكافأة، حصص؛ التنقّل؛ المدير.",
      constraints: "دخل ثابت للرهن؛ بحد أقصى 45 ساعة أسبوعياً.",
    },
    relationship: {
      decision: "نجرب علاجاً للأزواج قبل الانفصال؟",
      context: "5 سنوات معاً؛ خلاف حول المدينة والأطفال.",
      constraints: "مستعد لثلاثة أشهر عمل منظم.",
    },
  };
  const presets: Record<AppLocale, typeof enP> = {
    "en-US": enP,
    en: enP,
    hy: hyP,
    ru: ruP,
    de: deP,
    fr: frP,
    es: esP,
    it: itP,
    ar: arP,
  };
  return presets[locale] ?? enP;
}
