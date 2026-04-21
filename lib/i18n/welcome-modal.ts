import type { AppLocale } from "./locale";

export type WelcomeCopy = {
  title: string;
  lead: string;
  bulletsEyebrow: string;
  /** What the user can do on the site — three concise points */
  bullets: readonly [string, string, string];
  cta: string;
  /** Screen reader label for the dimmed backdrop (closes dialog) */
  backdropDismissAria: string;
};

const enUs: WelcomeCopy = {
  title: "Welcome to Life Decision Engine",
  lead:
    "This site is a calm workspace for major life choices—career, relocation, relationships—not a generic endless chat. You get structured scenarios, timelines, a score, and clear dimensions so you can compare options before you act.",
  bulletsEyebrow: "What you can do here",
  bullets: [
    "Describe your decision and run the analyzer: AI builds best / worst / likely paths, four lenses (finance, mind, risk, upside), and a 6-month to 5-year view.",
    "Use the 60-second brief to auto-fill the three fields so the model sees your situation clearly.",
    "Switch language anytime; explore the expert directory when you want a human psychologist, lawyer, or finance professional.",
  ],
  cta: "Got it — continue",
  backdropDismissAria: "Close welcome screen",
};

const hy: WelcomeCopy = {
  title: "Բարի գալուստ",
  lead:
    "Այս կայքը մեծ կյանքային ընտրությունների (կարիերա, տեղափոխություն, հարաբերություններ) համար կառուցված վերլուծական տարածք է՝ ոչ թե անվերջ ընդհանուր զրույց։ Ստանում ես սցենարներ, ժամկետային շերջան, չորս առանցք և հստակ պատկեր՝ համեմատելու տարբերակները մինչև քայլ անելը։",
  bulletsEyebrow: "Ինչ կարող ես անել այստեղ",
  bullets: [
    "Գրիր հարցդ, ավելացրու կոնտեքստ և վերլուծիր՝ AI-ն կկառուցի լավագույն / վատագույն / հավանական ուղիները, չորս առանցքը և 6 ամիս → 5 տարի հատվածը։",
    "Օգտագործիր 60 վայրկյանային brief-ը՝ երեք դաշտերը արագ լցնելու համար, որ մոդելը ճիշտ տեսնի իրավիճակը։",
    "Ցանկացած պահի փոխիր լեզուն, և անհրաժեշտության դեպքում բացիր մասնագետների ցուցակը՝ հոգեբան, իրավաբան կամ ֆինանսիստ։",
  ],
  cta: "Հասկացա — շարունակել",
  backdropDismissAria: "Փակել ողջույնի պատուհանը",
};

const ru: WelcomeCopy = {
  title: "Добро пожаловать",
  lead:
    "Это спокойное пространство для больших жизненных решений — работа, переезд, отношения. Не бесконечный общий чат: вы получаете сценарии, сроки, оценку и четыре оси, чтобы сравнить варианты до действия.",
  bulletsEyebrow: "Что вы можете сделать",
  bullets: [
    "Опишите решение и запустите анализ: ИИ строит лучший / худший / вероятный сценарии, четыре перспективы и горизонт от 6 месяцев до 5 лет.",
    "Используйте 60-секундный бриф — три поля заполнятся быстро, чтобы модель видела контекст.",
    "Меняйте язык в любой момент; при необходимости откройте каталог психологов, юристов и финансистов.",
  ],
  cta: "Понятно — дальше",
  backdropDismissAria: "Закрыть приветствие",
};

const de: WelcomeCopy = {
  title: "Willkommen",
  lead:
    "Diese Seite ist ein ruhiger Arbeitsraum für große Lebensentscheidungen — Job, Umzug, Beziehungen. Kein endloser Standard-Chat: du bekommst Szenarien, Zeitlinien, Score und vier Perspektiven, um Optionen zu vergleichen.",
  bulletsEyebrow: "Was Sie hier tun können",
  bullets: [
    "Formuliere deine Frage und starte die Analyse: KI liefert besten / schlimmsten / wahrscheinlichen Pfad, vier Linsen und 6 Monate bis 5 Jahre.",
    "Nutze den 60-Sekunden-Brief, um die drei Felder schnell zu füllen, damit das Modell den Kontext sieht.",
    "Sprache jederzeit wechseln; bei Bedarf Expertenliste öffnen — Psychologie, Recht, Finanzen.",
  ],
  cta: "Verstanden — weiter",
  backdropDismissAria: "Willkommensfenster schließen",
};

const fr: WelcomeCopy = {
  title: "Bienvenue",
  lead:
    "Ce site est un espace calme pour les grandes décisions de vie — carrière, déménagement, relations. Pas une discussion générique infinie : vous obtenez des scénarios, des délais, un score et quatre axes pour comparer les options.",
  bulletsEyebrow: "Ce que vous pouvez faire ici",
  bullets: [
    "Décrivez votre décision et lancez l’analyse : l’IA propose meilleur / pire / probable, quatre angles et une vision de 6 mois à 5 ans.",
    "Utilisez le brief de 60 secondes pour remplir rapidement les trois champs.",
    "Changez de langue à tout moment ; explorez l’annuaire d’experts si vous voulez un humain.",
  ],
  cta: "Compris — continuer",
  backdropDismissAria: "Fermer l’écran de bienvenue",
};

const es: WelcomeCopy = {
  title: "Bienvenido",
  lead:
    "Este sitio es un espacio tranquilo para decisiones importantes — carrera, mudanza, relaciones. No es un chat genérico interminable: obtienes escenarios, plazos, puntuación y cuatro ejes para comparar opciones.",
  bulletsEyebrow: "Qué puedes hacer aquí",
  bullets: [
    "Describe tu decisión y ejecuta el analizador: la IA arma mejor / peor / probable, cuatro perspectivas y un horizonte de 6 meses a 5 años.",
    "Usa el brief de 60 segundos para rellenar los tres campos con rapidez.",
    "Cambia de idioma cuando quieras; explora el directorio de expertos si necesitas ayuda humana.",
  ],
  cta: "Entendido — continuar",
  backdropDismissAria: "Cerrar bienvenida",
};

const it: WelcomeCopy = {
  title: "Benvenuto",
  lead:
    "Questo sito è uno spazio calmo per le grandi scelte — carriera, trasferimento, relazioni. Non una chat generica infinita: hai scenari, tempistiche, punteggio e quattro assi per confrontare le opzioni.",
  bulletsEyebrow: "Cosa puoi fare qui",
  bullets: [
    "Descrivi la decisione e avvia l’analisi: l’IA costruisce migliore / peggiore / probabile, quattro prospettive e orizzonte da 6 mesi a 5 anni.",
    "Usa il brief di 60 secondi per compilare velocemente i tre campi.",
    "Cambia lingua quando vuoi; apri la directory degli esperti se ti serve un professionista.",
  ],
  cta: "Ok — continua",
  backdropDismissAria: "Chiudi schermata di benvenuto",
};

const ar: WelcomeCopy = {
  title: "مرحباً",
  lead:
    "هذا الموقع مساحة هادئة لقرارات الحياة الكبرى — مهنة، انتقال، علاقات. ليس دردشة عامة لا نهائية: تحصل على سيناريوهات، جداول زمنية، تقييم وأربعة محاور لمقارنة الخيارات.",
  bulletsEyebrow: "ما يمكنك فعله هنا",
  bullets: [
    "صف قرارك وشغّل المحلّل: يبني الذكاء الاصطناعي أفضل / أسوأ / مرجح، أربع زوايا وأفقاً من 6 أشهر إلى 5 سنوات.",
    "استخدم ملخص الـ60 ثانية لملء الحقول الثلاثة بسرعة.",
    "بدّل اللغة في أي وقت؛ تصفّح دليل الخبراء عند الحاجة لمساعدة بشرية.",
  ],
  cta: "فهمت — متابعة",
  backdropDismissAria: "إغلاق شاشة الترحيب",
};

const table: Record<AppLocale, WelcomeCopy> = {
  "en-US": enUs,
  en: enUs,
  hy,
  ru,
  de,
  fr,
  es,
  ar,
  it,
};

export function getWelcomeCopy(locale: AppLocale): WelcomeCopy {
  return table[locale] ?? enUs;
}
