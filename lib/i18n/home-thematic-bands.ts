import type { AppLocale } from "./locale";

export type ThematicBandCopy = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
  imageAlt: string;
};

const enA: ThematicBandCopy = {
  eyebrow: "Clarity, not noise",
  title: "A big decision is a document, not a mood.",
  body: "Name the fork and trade-offs in one place—then scenarios, lenses, a timeline, and a score. No feed, no hot takes: a report you can reread later.",
  cta: "Open the analyzer",
  ctaHref: "/analyze",
  imageAlt:
    "Bright modern workspace with desk, chairs, and warm lighting from the window",
};

const enB: ThematicBandCopy = {
  eyebrow: "Human layer",
  title: "Software first. Real experts when you want backup.",
  body: "When you are ready: psychologists, legal, finance. The tool does not replace them—it helps you arrive with clearer questions.",
  cta: "Browse experts",
  ctaHref: "/experts",
  imageAlt: "Diverse team collaborating with laptops around a long table",
};

const hyA: ThematicBandCopy = {
  eyebrow: "Պարզություն, ոչ աղմուկ",
  title: "Խոշոր որոշումը «լուսանկար չէ»՝ փաստաթուղթ է։",
  body: "Մեկ հարթակում՝ տարաձայնությունը, սահմանները, սցենարներ, ժամանակացույց, միավոր։ Ոչ feed, ոչ աղմուկ․ հաշվետվություն, որ կարելի է կրկին կարդալ։",
  cta: "Բացել վերլուծիչ",
  ctaHref: "/analyze",
  imageAlt: "Ժամանակակից աշխատատարածք՝ սեղան, նստարաններ, լուսամուտի բացվող լույս",
};

const hyB: ThematicBandCopy = {
  eyebrow: "Մարդկային շերտ",
  title: "Նախ software, հետո աջակցություն մասնագետից, երբ կամենաս։",
  body: "Երբ պատրաստ ես․ հոգեբաններ, իրավունք, ֆինանս։ Գործիքը չի փոխարինում նրանց, բայց ավելի հստակ հարցեր ես բերում։",
  cta: "Դիտարկել մասնագետներ",
  ctaHref: "/experts",
  imageAlt: "Թիմի համագործակցություն՝ նոութբուքներ, երկար սեղան, համատեղ աշխատանք",
};

const ruA: ThematicBandCopy = {
  eyebrow: "Ясность, а не шум",
  title: "Большое решение — документ, а не настроение.",
  body: "Назовите развилку и компромиссы в одном месте — затем сценарии, оси, сроки и оценка. Без ленты и «горячих» мнений: отчёт, который можно перечитать.",
  cta: "Открыть анализатор",
  ctaHref: "/analyze",
  imageAlt:
    "Светлое современное рабочее место: стол, стулья, тёплый свет из окна",
};

const ruB: ThematicBandCopy = {
  eyebrow: "Человеческий слой",
  title: "Сначала софт. Реальные эксперты, когда нужна опора.",
  body: "Когда будете готовы: психологи, юристы, финансы. Инструмент их не заменяет — помогает прийти с более ясными вопросами.",
  cta: "Смотреть экспертов",
  ctaHref: "/experts",
  imageAlt: "Разнообразная команда с ноутбуками за длинным столом",
};

const deA: ThematicBandCopy = {
  eyebrow: "Klarheit, nicht Lärm",
  title: "Eine große Entscheidung ist ein Dokument, keine Stimmung.",
  body: "Gabelung und Trade-offs an einem Ort — dann Szenarien, Linsen, Zeitplan und Score. Kein Feed, keine Hot Takes: ein Bericht zum Wiederlesen.",
  cta: "Analyzer öffnen",
  ctaHref: "/analyze",
  imageAlt: "Helles modernes Büro mit Schreibtisch, Stühlen und Fensterlicht",
};

const deB: ThematicBandCopy = {
  eyebrow: "Menschliche Ebene",
  title: "Software zuerst. Echte Expert:innen als Backup.",
  body: "Wenn du bereit bist: Psychologie, Recht, Finanzen. Das Tool ersetzt sie nicht — du kommst mit klareren Fragen.",
  cta: "Experten ansehen",
  ctaHref: "/experts",
  imageAlt: "Vielseitiges Team mit Laptops an einem langen Tisch",
};

const frA: ThematicBandCopy = {
  eyebrow: "Clarté, pas le bruit",
  title: "Une grande décision est un document, pas une humeur.",
  body: "Nommez la fourche et les compromis au même endroit — puis scénarios, axes, chronologie et score. Pas de fil ni de punchlines : un rapport à relire.",
  cta: "Ouvrir l’analyseur",
  ctaHref: "/analyze",
  imageAlt: "Espace de travail moderne lumineux avec bureau et chaises",
};

const frB: ThematicBandCopy = {
  eyebrow: "Couche humaine",
  title: "Logiciel d’abord. De vrais experts si vous voulez un filet.",
  body: "Quand vous êtes prêt : psychologie, juridique, finances. L’outil ne les remplace pas — il clarifie vos questions.",
  cta: "Voir les experts",
  ctaHref: "/experts",
  imageAlt: "Équipe diverse collaborant avec des ordinateurs portables",
};

const esA: ThematicBandCopy = {
  eyebrow: "Claridad, no ruido",
  title: "Una gran decisión es un documento, no un estado de ánimo.",
  body: "Nombra la bifurcación y los compromisos en un solo lugar; luego escenarios, lentes, línea temporal y puntuación. Sin feed ni titulares: un informe para releer.",
  cta: "Abrir el analizador",
  ctaHref: "/analyze",
  imageAlt: "Espacio de trabajo moderno y luminoso con escritorio y sillas",
};

const esB: ThematicBandCopy = {
  eyebrow: "Capa humana",
  title: "Software primero. Expertos reales cuando quieras respaldo.",
  body: "Cuando estés listo: psicología, legal, finanzas. La herramienta no los sustituye — te ayuda a llegar con preguntas más claras.",
  cta: "Ver expertos",
  ctaHref: "/experts",
  imageAlt: "Equipo diverso colaborando con portátiles en una mesa larga",
};

const itA: ThematicBandCopy = {
  eyebrow: "Chiarezza, non rumore",
  title: "Una grande decisione è un documento, non un umore.",
  body: "Nomina il bivio e i compromessi in un posto — poi scenari, lenti, timeline e punteggio. Niente feed né slogan: un report da rileggere.",
  cta: "Apri l’analizzatore",
  ctaHref: "/analyze",
  imageAlt: "Workspace moderno luminoso con scrivania e sedie",
};

const itB: ThematicBandCopy = {
  eyebrow: "Strato umano",
  title: "Software prima. Esperti reali quando vuoi un backup.",
  body: "Quando sei pronto: psicologia, legale, finanze. Lo strumento non li sostituisce — ti aiuta ad arrivare con domande più chiare.",
  cta: "Sfoglia esperti",
  ctaHref: "/experts",
  imageAlt: "Team eterogeneo che collabora con laptop a un tavolo lungo",
};

const arA: ThematicBandCopy = {
  eyebrow: "وضوح، لا ضجيج",
  title: "القرار الكبير وثيقة، لا مزاجاً.",
  body: "سمِّ التفرع والمفاضلات في مكان واحد — ثم سيناريوهات ومحاور وجدول زمني ودرجة. بلا موجز ولا عناوين صاخبة: تقرير تعيد قراءته.",
  cta: "فتح المحلّل",
  ctaHref: "/analyze",
  imageAlt: "مساحة عمل عصرية مضيئة مع مكتب وكراسٍ وضوء من النافذة",
};

const arB: ThematicBandCopy = {
  eyebrow: "طبقة بشرية",
  title: "البرنامج أولاً. خبراء حقيقيون عندما تريد دعماً.",
  body: "عندما تكون جاهزاً: نفسية، قانون، مال. الأداة لا تستبدلهم — تساعدك على وصول أسئلة أوضح.",
  cta: "تصفح الخبراء",
  ctaHref: "/experts",
  imageAlt: "فريق متنوع يتعاون مع حواسيب محمولة حول طاولة طويلة",
};

const table: Partial<Record<AppLocale, { a: ThematicBandCopy; b: ThematicBandCopy }>> = {
  hy: { a: hyA, b: hyB },
  ru: { a: ruA, b: ruB },
  de: { a: deA, b: deB },
  fr: { a: frA, b: frB },
  es: { a: esA, b: esB },
  it: { a: itA, b: itB },
  ar: { a: arA, b: arB },
};

export function getHomeThematicBands(
  locale: AppLocale
): { a: ThematicBandCopy; b: ThematicBandCopy } {
  return table[locale] ?? { a: enA, b: enB };
}
