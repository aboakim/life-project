import type { DelightCopy } from "./delight-extras";

/** UI-facing delight strings; long “corner” arrays stay English from base merge. */
export type DelightUiOverlay = Pick<
  DelightCopy,
  | "shortcutsTitle"
  | "shortcutsIntro"
  | "shortcutsClose"
  | "shortcutTeaser"
  | "shortcutRows"
  | "konamiTitle"
  | "konamiBody"
  | "konamiDismiss"
  | "milestone5"
  | "milestone10"
  | "milestone25"
  | "milestone50"
  | "milestone100"
  | "milestoneDismiss"
  | "greetingMorning"
  | "greetingAfternoon"
  | "greetingEvening"
  | "coldStartEyebrow"
  | "coldStarts"
  | "resultCheers"
  | "playCornerSummary"
  | "playCornerDisclaimer"
  | "cornerFrameLabel"
  | "cornerFrameNext"
  | "cornerFrameSurprise"
  | "playFactLabel"
  | "playFactNext"
  | "playFactRandom"
  | "cornerWordLabel"
  | "cornerWordNext"
  | "cornerWordSurprise"
>;

export const delightUiRu: DelightUiOverlay = {
  shortcutsTitle: "Горячие клавиши",
  shortcutsIntro:
    "Работают, когда курсор не в поле ввода. Escape закрывает панель.",
  shortcutsClose: "Закрыть",
  shortcutTeaser:
    "Подсказка: ? (вне полей ввода) — шпаргалка; код Konami — для ностальгии.",
  shortcutRows: [
    { k: "?", d: "Открыть панель (также Shift + /)." },
    { k: "Esc", d: "Закрыть модалки и панель." },
    { k: "Нав", d: "Липкая навигация по разделам страницы." },
    { k: "Чипы", d: "Тёплые чипы выше заполняют стартовый бриф." },
  ],
  konamiTitle: "Вы нашли секретное рукопожатие",
  konamiBody:
    "Старый код Konami всё ещё работает — здесь. Ничего не разблокируется, кроме уважения к любопытству. Примите честное решение.",
  konamiDismiss: "Назад к реальности",
  milestone5: "5 визитов — вы реально пользуетесь инструментом. Запустите второй раз с цифрами в Контексте.",
  milestone10:
    "10 визитов — паттерны видны при сравнении запусков. История после двух анализов.",
  milestone25:
    "25 визитов — серьёзная рефлексия. Сохраните один запуск в Markdown.",
  milestone50:
    "50 визитов — power user на этом устройстве. Поделитесь анализатором с тем, кто застрял в петле.",
  milestone100:
    "100 визитов — легенда на этом устройстве. Отдохните; лучшая развилка — отдохнувший мозг.",
  milestoneDismiss: "Скрыть",
  greetingMorning: "Утро — короткий бриф, одна честная развилка, потом кофе.",
  greetingAfternoon: "День — добавьте число или дедлайн, которого избегали.",
  greetingEvening: "Вечер — меньшие ставки или сон на нём; оба варианта нормальны.",
  coldStartEyebrow: "Старт в один тап",
  coldStarts: [
    {
      label: "Границы",
      decision:
        "Где провести более жёсткую границу в этом месяце — работа, семья или деньги?",
      context: "Я соглашаюсь, пока не начну злиться на людей.",
      constraints: "Хочу остаться добрым, не исчезнуть как личность.",
    },
    {
      label: "Тест сожаления",
      decision:
        "Что болит сильнее через два года — попробовать и не выйти, или не попробовать?",
      context: "Качаюсь между страхом потери и страхом стоять на месте.",
      constraints: "Здоровье и отношения — красные линии.",
    },
    {
      label: "Энергия",
      decision:
        "Перестроить неделю с одним блоком глубокой работы, даже если меньше соцпланов?",
      context: "После обеда всё рвётся; утро острее.",
      constraints: "Не могу пропускать забор детей из сада.",
    },
    {
      label: "Честное «нет»",
      decision:
        "Как сказать чистое «нет» возможности, которая на бумаге хороша, а внутри нет?",
      context: "Репутация важна в моей сфере; не хочу сжечь мосты.",
      constraints: "Нужен письменный ответ-шаблон.",
    },
  ],
  resultCheers: [
    "Микропобеда: туман стал картой. Скриншот резюме, если помогает уснуть.",
    "Оценка — зеркало, не судья. Подправьте бриф и перезапустите.",
    "Вы дали модели что-то настоящее. Будущий вы любит конкретику.",
    "Если одна строка «жжёт» — обведите; часто это и есть развилка.",
    "Не делитесь тем, чем не гордитесь; остальное может остаться на устройстве.",
    "Два запуска с разными ставками учат больше одного идеального абзаца.",
    "Экспортируйте Markdown, пока свежо — память переписывает историю ночью.",
    "Если отчёт со всем согласен — добавьте адвоката дьявола и перезапустите.",
  ],
  playCornerSummary: "Доп. любопытство (необязательно)",
  playCornerDisclaimer:
    "Лёгкое чтение — не совет, не в оценке, не сохраняется с анализом. Без игр, только текстура.",
  cornerFrameLabel: "Промпты переформулировки",
  cornerFrameNext: "Следующий",
  cornerFrameSurprise: "Перемешать",
  playFactLabel: "Мини-факты",
  playFactNext: "Ещё факт",
  playFactRandom: "Сюрприз",
  cornerWordLabel: "Словесные курьёзы",
  cornerWordNext: "Следующее",
  cornerWordSurprise: "Перемешать",
};

export const delightUiDe: DelightUiOverlay = {
  ...delightUiRu,
  shortcutsTitle: "Tastenkürzel",
  shortcutsIntro:
    "Funktioniert außerhalb von Textfeldern. Escape schließt das Panel.",
  shortcutsClose: "Schließen",
  shortcutTeaser: "Tipp: ? außerhalb von Feldern — Kurzübersicht; Konami-Code optional.",
  konamiTitle: "Geheimes Handshake gefunden",
  konamiBody:
    "Der alte Konami-Code funktioniert hier noch — es schaltet nur Neugier frei. Triff eine ehrliche Entscheidung.",
  konamiDismiss: "Zurück zur Realität",
  milestone5: "5 Besuche — du nutzt das Tool wirklich. Zweiter Lauf mit Zahlen im Kontext.",
  milestone10: "10 Besuche — Muster beim Vergleich von Läufen. Historie nach zwei Analysen.",
  milestone25: "25 Besuche — ernsthafte Reflexion. Einen Lauf als Markdown speichern.",
  milestone50: "50 Besuche — Power-User auf diesem Gerät. Teile den Analyzer mit jemandem im Loop.",
  milestone100: "100 Besuche — Legende auf diesem Gerät. Pause — beste Gabelung: ausgeruhter Kopf.",
  milestoneDismiss: "Ausblenden",
  greetingMorning: "Morgen — kurzer Brief, eine ehrliche Gabelung, dann Kaffee.",
  greetingAfternoon: "Nachmittag — eine Zahl oder Deadline, die du vermieden hast.",
  greetingEvening: "Abend — leichtere Einsätze oder schlafen drüber; beides ok.",
  coldStartEyebrow: "Ein-Tap-Starter",
  playCornerSummary: "Extra Neugier (optional)",
  playCornerDisclaimer:
    "Leichte Lektüre — kein Rat, nicht bewertet, nicht mit Analyse gespeichert.",
  cornerFrameLabel: "Umformulierungen",
  cornerFrameNext: "Weiter",
  cornerFrameSurprise: "Mischen",
  playFactLabel: "Mini-Fakten",
  playFactNext: "Nächster Fakt",
  playFactRandom: "Überraschung",
  cornerWordLabel: "Wort-Kuriositäten",
  cornerWordNext: "Weiter",
  cornerWordSurprise: "Mischen",
};

export const delightUiFr: DelightUiOverlay = {
  ...delightUiDe,
  shortcutsTitle: "Raccourcis",
  shortcutsClose: "Fermer",
  konamiDismiss: "Retour au réel",
  milestoneDismiss: "Masquer",
  greetingMorning: "Matin — bref, une fourche honnête, puis café.",
  greetingAfternoon: "Après-midi — ajoutez un chiffre ou une date évitée.",
  greetingEvening: "Soir — enjeux plus légers ou dormir dessus.",
  coldStartEyebrow: "Démarrage en un tap",
  playCornerSummary: "Curiosité extra (facultatif)",
  cornerFrameLabel: "Prompts de recadrage",
  playFactLabel: "Mini-faits",
  cornerWordLabel: "Curiosités de mots",
};

export const delightUiEs: DelightUiOverlay = {
  ...delightUiDe,
  shortcutsTitle: "Atajos",
  shortcutsClose: "Cerrar",
  konamiDismiss: "Volver a la realidad",
  milestoneDismiss: "Ocultar",
  greetingMorning: "Mañana — brief corto, una bifurcación honesta, café.",
  greetingAfternoon: "Tarde — añade un número o fecha evitada.",
  greetingEvening: "Noche — apuestas más ligeras o dormir; ambos válidos.",
  coldStartEyebrow: "Inicio en un toque",
  playCornerSummary: "Curiosidad extra (opcional)",
  cornerFrameLabel: "Prompts de reencuadre",
  playFactLabel: "Mini datos",
  cornerWordLabel: "Curiosidades léxicas",
};

export const delightUiIt: DelightUiOverlay = {
  ...delightUiDe,
  shortcutsTitle: "Scorciatoie",
  shortcutsClose: "Chiudi",
  konamiDismiss: "Torna alla realtà",
  milestoneDismiss: "Nascondi",
  greetingMorning: "Mattina — brief corto, un bivio onesto, poi caffè.",
  greetingAfternoon: "Pomeriggio — aggiungi un numero o una scadenza evitata.",
  greetingEvening: "Sera — posta in gioco più leggera o dormirci sopra.",
  coldStartEyebrow: "Avvio in un tap",
  playCornerSummary: "Curiosità extra (facoltativo)",
  cornerFrameLabel: "Prompt di reframe",
  playFactLabel: "Mini-fatti",
  cornerWordLabel: "Curiosità lessicali",
};

export const delightUiAr: DelightUiOverlay = {
  ...delightUiRu,
  shortcutsTitle: "اختصارات",
  shortcutsIntro: "تعمل خارج حقول النص. Escape يغلق اللوحة.",
  shortcutsClose: "إغلاق",
  shortcutTeaser: "نصيحة: ? خارج الحقول — ورقة مختصرة؛ رمز Konami اختياري.",
  konamiTitle: "وجدت المصافحة السرية",
  konamiBody: "رمز Konami القديم يعمل هنا — يفتح فضولاً فقط. قرار صادق.",
  konamiDismiss: "عودة للواقع",
  milestone5: "5 زيارات — تستخدم الأداة فعلاً. تشغيل ثانٍ بأرقام في السياق.",
  milestone10: "10 زيارات — أنماط عند مقارنة التشغيلات.",
  milestone25: "25 زيارة — تأمل جاد. احفظ تشغيلاً كـ Markdown.",
  milestone50: "50 زيارة — مستخدم قوي على هذا الجهاز.",
  milestone100: "100 زيارة — أسطورة على هذا الجهاز. استرح.",
  milestoneDismiss: "إخفاء",
  greetingMorning: "صباح — ملخص قصير، تفرع صادق، ثم قهوة.",
  greetingAfternoon: "ظهر — أضف رقماً أو موعداً تتجنبه.",
  greetingEvening: "مساء — رهان أخف أو النوم عليه.",
  coldStartEyebrow: "بداية بنقرة",
  playCornerSummary: "فضول إضافي (اختياري)",
  playCornerDisclaimer: "قراءة خفيفة — ليست نصيحة ولا تُحفظ مع التحليل.",
  cornerFrameLabel: "مطالبات إعادة الإطار",
  cornerFrameNext: "التالي",
  cornerFrameSurprise: "خلط",
  playFactLabel: "حقائق صغيرة",
  playFactNext: "حقيقة أخرى",
  playFactRandom: "مفاجأة",
  cornerWordLabel: "غرائب لغوية",
  cornerWordNext: "التالي",
  cornerWordSurprise: "خلط",
};

export const delightUiByLocale: Partial<Record<string, DelightUiOverlay>> = {
  ru: delightUiRu,
  de: delightUiDe,
  fr: delightUiFr,
  es: delightUiEs,
  it: delightUiIt,
  ar: delightUiAr,
};
