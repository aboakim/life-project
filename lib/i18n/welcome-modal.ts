import type { AppLocale } from "./locale";

export type WelcomeCopy = {
  title: string;
  lead: string;
  cta: string;
  /** Screen reader label for the dimmed backdrop (closes dialog) */
  backdropDismissAria: string;
};

const enUs: WelcomeCopy = {
  title: "Welcome to Life Decision Engine",
  lead:
    "You get instant scenarios—not endless chat. Drop in your situation, see outcomes from six months to five years, then move. Switch language anytime; experts stay optional.",
  cta: "Let's continue",
  backdropDismissAria: "Close welcome screen",
};

const hy: WelcomeCopy = {
  title: "Բարի գալուստ",
  lead:
    "Այս կայքը մեծ կյանքային ընտրությունների (կարիերա, տեղափոխություն, հարաբերություններ) համար կառուցված վերլուծական տարածք է՝ ոչ թե անվերջ ընդհանուր զրույց։ Ստանում ես սցենարներ, ժամկետային շերջան, գնահատում և հստակ պատկեր՝ համեմատելու տարբերակները մինչև քայլ անելը։ Պատրաստ լինելիս վերլուծիր, օգտագործիր brief-ը դաշտերը արագ լցնելու համար, փոխիր լեզուն երբ ուզես, և անհրաժեշտության դեպքում բացիր մասնագետների ցանկը։",
  cta: "Հասկացա — շարունակել",
  backdropDismissAria: "Փակել ողջույնի պատուհանը",
};

const ru: WelcomeCopy = {
  title: "Добро пожаловать",
  lead:
    "Это спокойное пространство для больших жизненных решений — работа, переезд, отношения. Не бесконечный общий чат: вы получаете сценарии, сроки, оценку и четыре оси, чтобы сравнить варианты до действия. Запустите анализ, используйте бриф для полей, меняйте язык и при необходимости откройте каталог экспертов.",
  cta: "Понятно — дальше",
  backdropDismissAria: "Закрыть приветствие",
};

const de: WelcomeCopy = {
  title: "Willkommen",
  lead:
    "Diese Seite ist ein ruhiger Arbeitsraum für große Lebensentscheidungen — Job, Umzug, Beziehungen. Du bekommst Szenarien, Zeitlinien, Score und Perspektiven statt endlosen Standard-Chats. Starte die Analyse, nutze den Kurz-Brief für die Felder, wechsle die Sprache und öffne bei Bedarf die Expertenliste.",
  cta: "Verstanden — weiter",
  backdropDismissAria: "Willkommensfenster schließen",
};

const fr: WelcomeCopy = {
  title: "Bienvenue",
  lead:
    "Ce site est un espace calme pour les grandes décisions de vie — carrière, déménagement, relations. Vous obtenez des scénarios, des délais, un score et des axes pour comparer les options. Lancez l’analyse, utilisez le brief pour remplir les champs, changez de langue et explorez l’annuaire d’experts si besoin.",
  cta: "Compris — continuer",
  backdropDismissAria: "Fermer l’écran de bienvenue",
};

const es: WelcomeCopy = {
  title: "Bienvenido",
  lead:
    "Este sitio es un espacio tranquilo para decisiones importantes — carrera, mudanza, relaciones. Obtienes escenarios, plazas, puntuación y ejes para comparar opciones. Ejecuta el analizador, usa el brief de 60 segundos, cambia de idioma y explora el directorio de expertos cuando lo necesites.",
  cta: "Entendido — continuar",
  backdropDismissAria: "Cerrar bienvenida",
};

const it: WelcomeCopy = {
  title: "Benvenuto",
  lead:
    "Questo sito è uno spazio calmo per le grandi scelte — carriera, trasferimento, relazioni. Hai scenari, tempistiche, punteggio e assi per confrontare le opzioni. Avvia l’analisi, usa il brief per i campi, cambia lingua e apri la directory degli esperti se ti serve.",
  cta: "Ok — continua",
  backdropDismissAria: "Chiudi schermata di benvenuto",
};

const ar: WelcomeCopy = {
  title: "مرحباً",
  lead:
    "هذا الموقع مساحة هادئة لقرارات الحياة الكبرى — مهنة، انتقال، علاقات. تحصل على سيناريوهات وجداول زمنية وتقييماً لمقارنة الخيارات. شغّل المحلّل، استخدم الملخص السريع للحقول، بدّل اللغة وتصفّح دليل الخبراء عند الحاجة.",
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
