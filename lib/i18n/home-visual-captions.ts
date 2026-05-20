import type { AppLocale } from "./locale";

type Triple = readonly [string, string, string];

/**
 * One scannable line per image — same meaning as the long copy in `getUi()`.
 * Full text remains in `sr-only` next to each card.
 */
const atEn: Triple = [
  "Map six months to five years ahead—not vibes, real paths.",
  "Quit the overthinking loop in one structured pass.",
  "Plain answers you can use—pros optional, nothing posted publicly.",
];

const atHy: Triple = [
  "Գրիր հարցը, ավելացրու կոնտեքստ, հետո միացրու վերլուծիչը։",
  "Համեմատի՛ր լավագույն/վատ/հավանական՝ փոխարժեքներով։",
  "Միավոր և ժամկետ․ ոչ թերապիա կամ իրավական խորհուրդ. մասնագետ՝ ցանկությամբ։",
];

const trustEn: Triple = [
  "Structured logic and clear trade-offs—not random opinions.",
  "Session-private analysis. No public feed of your story.",
  "Expert directory in many languages—only when you want a human.",
];

const trustHy: Triple = [
  "Կարգավորված մտածողություն, ոչ կարծիքներ, հստակ փոխարժեքներ։",
  "Գաղտնի վերլուծություն սեանսում, հրապարակային ժապավեն չէ։",
  "Բազմալեզու ցանց, երբ ուզում ես մասնագետի։",
];

const howEn: Triple = [
  "Say the fork you're in—facts optional, fears welcome.",
  "Lay out paths instead of debating them silently.",
  "See futures fast—six months to five years in one glance.",
];

const howHy: Triple = [
  "Ձեր հարցը + կոնտեքստ՝ թվեր, վախեր, արժեքներ, ժամկետներ։",
  "6 ամիսից մինչև 5 տարու ֆինանս, մտքի, ռիսկ, շանս։",
  "Միավորը որպես կողմնացույց, մասնագետին՝ եթե պետք է։",
];

const atRu: Triple = [
  "От полугода до пяти лет вперёд — не «вайб», а пути.",
  "Выйти из петли перегруза за один структурированный проход.",
  "Понятные ответы — эксперт по желанию, без публичной ленты.",
];
const trustRu: Triple = [
  "Логика и компромиссы — не случайные мнения.",
  "Анализ в сессии. Ваша история не в открытом фиде.",
  "Каталог экспертов на многих языках — когда нужен человек.",
];
const howRu: Triple = [
  "Опишите развилку — факты по желанию, страхи можно.",
  "Разложите пути вместо бесконечного обдумывания.",
  "Будущее быстро: от 6 месяцев до 5 лет одним взглядом.",
];

const atDe: Triple = [
  "Halbes Jahr bis fünf Jahre voraus — Wege, nicht Vibes.",
  "Überdenken-Schleife in einem strukturierten Durchlauf lösen.",
  "Klare Antworten — Profis optional, nichts öffentlich gepostet.",
];
const trustDe: Triple = [
  "Strukturierte Logik und Trade-offs — keine Zufallsmeinungen.",
  "Analyse in deiner Sitzung. Kein öffentlicher Feed.",
  "Expertenverzeichnis in vielen Sprachen — wenn du einen Menschen willst.",
];
const howDe: Triple = [
  "Sag die Gabelung — Fakten optional, Ängste erlaubt.",
  "Wege legen statt still debattieren.",
  "Zukunft schnell — 6 Monate bis 5 Jahre auf einen Blick.",
];

const atFr: Triple = [
  "De six mois à cinq ans — des chemins, pas des vibes.",
  "Sortir de la boucle rumination en un passage structuré.",
  "Réponses claires — expert si vous voulez, rien en public.",
];
const trustFr: Triple = [
  "Logique structurée et compromis — pas d’avis au hasard.",
  "Analyse privée en session. Pas de fil public.",
  "Annuaire d’experts multilingue — quand vous voulez un humain.",
];
const howFr: Triple = [
  "Décrivez la fourche — faits optionnels, peurs bienvenues.",
  "Posez les chemins au lieu de débattre en silence.",
  "Futurs vite — six mois à cinq ans d’un coup d’œil.",
];

const atEs: Triple = [
  "De seis meses a cinco años — caminos, no vibes.",
  "Sal del bucle de rumiar en un pase estructurado.",
  "Respuestas claras — experto si quieres, nada público.",
];
const trustEs: Triple = [
  "Lógica y compensaciones — no opiniones al azar.",
  "Análisis en tu sesión. Sin feed público de tu historia.",
  "Directorio de expertos en muchos idiomas — cuando quieras un humano.",
];
const howEs: Triple = [
  "Di la bifurcación — hechos opcionales, miedos bienvenidos.",
  "Expón caminos en lugar de debatir en silencio.",
  "Futuros rápido — de 6 meses a 5 años de un vistazo.",
];

const atIt: Triple = [
  "Da sei mesi a cinque anni — percorsi, non vibes.",
  "Esci dal loop del rimuginare in un passaggio strutturato.",
  "Risposte chiare — esperto se vuoi, nulla in pubblico.",
];
const trustIt: Triple = [
  "Logica strutturata e compromessi — non opinioni a caso.",
  "Analisi nella sessione. Nessun feed pubblico.",
  "Elenco esperti multilingue — quando vuoi un umano.",
];
const howIt: Triple = [
  "Descrivi il bivio — fatti opzionali, paure ammesse.",
  "Metti giù i percorsi invece di dibattere in silenzio.",
  "Futuri in fretta — da 6 mesi a 5 anni in un colpo.",
];

const atAr: Triple = [
  "من ستة أشهر إلى خمس سنوات — مسارات لا مزاجاً فقط.",
  "اخرج من حلقة الإفراط في التفكير بمرور منظم واحد.",
  "إجابات واضحة — خبير إن أردت، بلا نشر عام.",
];
const trustAr: Triple = [
  "منطق منظم ومفاضلات — لا آراء عشوائية.",
  "تحليل في جلستك. بلا موجز عام لقصتك.",
  "دليل خبراء بعدة لغات — عندما تريد إنساناً.",
];
const howAr: Triple = [
  "صف التفرع — حقائق اختيارية ومخاوف مقبولة.",
  "ضع المسارات بدل الجدال الصامت.",
  "مستقبل سريع — من 6 أشهر إلى 5 سنوات بنظرة.",
];

const table: Partial<Record<AppLocale, { at: Triple; trust: Triple; how: Triple }>> =
  {
    en: { at: atEn, trust: trustEn, how: howEn },
    "en-US": { at: atEn, trust: trustEn, how: howEn },
    hy: { at: atHy, trust: trustHy, how: howHy },
    ru: { at: atRu, trust: trustRu, how: howRu },
    de: { at: atDe, trust: trustDe, how: howDe },
    fr: { at: atFr, trust: trustFr, how: howFr },
    es: { at: atEs, trust: trustEs, how: howEs },
    it: { at: atIt, trust: trustIt, how: howIt },
    ar: { at: atAr, trust: trustAr, how: howAr },
  };

function triplet(
  locale: AppLocale,
  key: "at" | "trust" | "how"
): Triple {
  const base = { at: atEn, trust: trustEn, how: howEn };
  const row = table[locale];
  if (row) return row[key];
  return base[key];
}

export function getAtAGlanceShortLines(locale: AppLocale): Triple {
  return triplet(locale, "at");
}

export function getTrustShortLines(locale: AppLocale): Triple {
  return triplet(locale, "trust");
}

export function getHowShortLines(locale: AppLocale): Triple {
  return triplet(locale, "how");
}
