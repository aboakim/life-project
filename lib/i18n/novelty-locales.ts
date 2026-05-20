import type { NoveltyCopy } from "./novelty-extras";

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

function baseRu(): NoveltyCopy {
  return {
    navFieldNotes: "Лаборатория полевых заметок",
    footerFieldNotes: "Полевые заметки",
    fieldNotesEyebrow: "Новое · только в браузере",
    fieldNotesTitle: "Лаборатория полевых заметок",
    fieldNotesSubtitle:
      "Вставьте любой черновик. Считаем время чтения, плотность и словесный эскиз — всё в вашей вкладке, на сервер не отправляется.",
    fieldNotesPasteLabel: "Вставить текст",
    fieldNotesReading: "Время чтения (оценка)",
    fieldNotesWords: "Токены",
    fieldNotesUnique: "Уникальные токены",
    fieldNotesTop: "Взвешенные слова",
    fieldNotesClear: "Очистить",
    fieldNotesEmpty: "Вставьте текст, чтобы увидеть «радар».",
    fieldNotesLocaleHint:
      "Стоп-слова для английского и армянского; для других языков счётчики всё равно работают.",
    fieldNotesFlowEyebrow: "Рекомендуемый порядок на странице",
    fieldNotesFlow1:
      "Вставьте черновик в основное поле — он остаётся только на этом устройстве.",
    fieldNotesFlow2:
      "Смотрите правую панель: время чтения, токены, уникальные слова, веса.",
    fieldNotesFlow3:
      "Когда формулировка достаточно ясна — перенесите в анализатор (поля Решение или Контекст).",
    fieldNotesAnalyzerLink: "Открыть анализатор →",
    signatureEyebrow: "Подпись брифа",
    signatureMoodPrefix: "Настроение палитры",
    moodNames: MOODS_EN,
    capsuleEyebrow: "Новое · локально",
    capsuleTitle: "Капсула времени",
    capsuleExplain:
      "Запечатайте одну строку для будущего себя. Откроется только после выбранной задержки — хранится в браузере, не загружается.",
    capsulePlaceholder: "Одна честная строка будущему себе…",
    capsuleDaysLabel: "Открыть через",
    capsuleSeal7: "7 дней",
    capsuleSeal14: "14 дней",
    capsuleSeal30: "30 дней",
    capsuleSave: "Запечатать",
    capsuleFull: "Максимум 3 капсулы — удалите одну, чтобы добавить новую.",
    capsuleLocked: "Откроется",
    capsuleReveal: "Прошлый вы говорит",
    capsuleDelete: "Удалить",
    capsuleListAria: "Ваши запечатанные капсулы",
    analyzeToolsEyebrow: "Далее по порядку",
    analyzeToolFieldNotes:
      "Полевые заметки — вставьте черновик для словесного радара",
    analyzeToolJournal: "Дневник решений — локальные строки",
    analyzeToolChecklists: "Печатные чек-листы",
    workspaceFlowEyebrow: "Рекомендуемый порядок на этой странице",
    workspaceFlow1:
      "Выберите тёплый пресет или чип cold-start — заполнят Решение, Контекст и Ограничения.",
    workspaceFlow2:
      "По желанию: искры, уголок любопытства или капсула времени — боковые инструменты на той же странице.",
    workspaceFlow3:
      "Укажите ставки, «Анализировать» — отчёт появится сразу под формой.",
  };
}

export const noveltyRu = baseRu();

export const noveltyDe: NoveltyCopy = {
  ...baseRu(),
  navFieldNotes: "Field-Notes-Labor",
  footerFieldNotes: "Field Notes",
  fieldNotesEyebrow: "Neu · nur im Browser",
  fieldNotesTitle: "Field-Notes-Labor",
  fieldNotesSubtitle:
    "Beliebigen Entwurf einfügen. Lesezeit, Dichte und Wortskizze — alles in deinem Tab, nichts an unsere Server.",
  fieldNotesPasteLabel: "Text einfügen",
  fieldNotesReading: "Lesezeit (geschätzt)",
  fieldNotesWords: "Tokens",
  fieldNotesUnique: "Eindeutige Tokens",
  fieldNotesTop: "Gewichtete Wörter",
  fieldNotesClear: "Leeren",
  fieldNotesEmpty: "Text einfügen, um den Radar zu sehen.",
  fieldNotesLocaleHint:
    "Stoppwörter für Englisch und Armenisch; andere Sprachen bekommen trotzdem Zählungen.",
  fieldNotesFlowEyebrow: "Empfohlene Reihenfolge",
  fieldNotesFlow1:
    "Rohtext ins Hauptfeld — bleibt nur auf diesem Gerät.",
  fieldNotesFlow2:
    "Rechte Spalte: Lesezeit, Tokens, eindeutige Wörter, Gewichte.",
  fieldNotesFlow3:
    "Wenn eine Zeile scharf genug ist — in den Analyzer (Entscheidung oder Kontext).",
  fieldNotesAnalyzerLink: "Analyzer öffnen →",
  signatureEyebrow: "Brief-Signatur",
  signatureMoodPrefix: "Paletten-Stimmung",
  capsuleEyebrow: "Neu · lokal",
  capsuleTitle: "Zeitkapsel",
  capsuleExplain:
    "Eine Zeile an dein zukünftiges Ich versiegeln. Öffnet erst nach der gewählten Verzögerung — nur in diesem Browser.",
  capsulePlaceholder: "Eine ehrliche Zeile für später…",
  capsuleDaysLabel: "Öffnen nach",
  capsuleSeal7: "7 Tage",
  capsuleSeal14: "14 Tage",
  capsuleSeal30: "30 Tage",
  capsuleSave: "Versiegeln",
  capsuleFull: "Max. 3 Kapseln — eine löschen, um neue hinzuzufügen.",
  capsuleLocked: "Öffnet",
  capsuleReveal: "Früheres du sagt",
  capsuleDelete: "Entfernen",
  capsuleListAria: "Deine versiegelten Kapseln",
  analyzeToolsEyebrow: "Dann der Reihe nach",
  analyzeToolFieldNotes: "Field Notes — Entwurf für Wort-Radar",
  analyzeToolJournal: "Entscheidungstagebuch — lokal",
  analyzeToolChecklists: "Druckbare Checklisten",
  workspaceFlowEyebrow: "Empfohlene Reihenfolge auf dieser Seite",
  workspaceFlow1:
    "Warm-Preset oder Cold-Start-Chip — füllt Entscheidung, Kontext, Grenzen.",
  workspaceFlow2:
    "Optional: Funken, Neugier-Ecke oder Zeitkapsel — Seitenwerkzeuge.",
  workspaceFlow3:
    "Einsatz setzen, Analysieren — Bericht direkt unter dem Formular.",
};

export const noveltyFr: NoveltyCopy = {
  ...noveltyRu,
  navFieldNotes: "Labo notes de terrain",
  footerFieldNotes: "Notes de terrain",
  fieldNotesTitle: "Labo notes de terrain",
  fieldNotesSubtitle:
    "Collez un brouillon. Temps de lecture, densité et esquisse de mots — tout dans votre onglet, rien sur nos serveurs.",
  fieldNotesPasteLabel: "Coller le texte",
  fieldNotesReading: "Temps de lecture (est.)",
  fieldNotesClear: "Effacer",
  fieldNotesEmpty: "Collez du texte pour voir le radar.",
  fieldNotesAnalyzerLink: "Ouvrir l’analyseur →",
  capsuleTitle: "Capsule temporelle",
  capsuleSave: "Sceller",
  analyzeToolFieldNotes: "Notes de terrain — brouillon pour radar de mots",
  analyzeToolJournal: "Journal de décision — local",
  analyzeToolChecklists: "Listes imprimables",
  workspaceFlow3:
    "Enjeux, Analyser — le rapport apparaît sous le formulaire.",
};

export const noveltyEs: NoveltyCopy = {
  ...noveltyRu,
  navFieldNotes: "Laboratorio de notas",
  footerFieldNotes: "Notas de campo",
  fieldNotesTitle: "Laboratorio de notas",
  fieldNotesSubtitle:
    "Pega un borrador. Tiempo de lectura, densidad y esquema de palabras — todo en tu pestaña, sin enviar a servidores.",
  fieldNotesPasteLabel: "Pegar texto",
  fieldNotesReading: "Tiempo de lectura (est.)",
  fieldNotesClear: "Borrar",
  fieldNotesEmpty: "Pega texto para ver el radar.",
  fieldNotesAnalyzerLink: "Abrir analizador →",
  capsuleTitle: "Cápsula del tiempo",
  capsuleSave: "Sellar",
  analyzeToolFieldNotes: "Notas de campo — borrador para radar de palabras",
  analyzeToolJournal: "Diario de decisiones — local",
  analyzeToolChecklists: "Listas imprimibles",
  workspaceFlow3:
    "Apuestas, Analizar — el informe aparece bajo el formulario.",
};

export const noveltyIt: NoveltyCopy = {
  ...noveltyRu,
  navFieldNotes: "Lab appunti di campo",
  footerFieldNotes: "Appunti di campo",
  fieldNotesTitle: "Lab appunti di campo",
  fieldNotesSubtitle:
    "Incolla una bozza. Tempo di lettura, densità e schizzo di parole — tutto nel tab, nulla ai nostri server.",
  fieldNotesPasteLabel: "Incolla testo",
  fieldNotesReading: "Tempo di lettura (stim.)",
  fieldNotesClear: "Pulisci",
  fieldNotesEmpty: "Incolla testo per vedere il radar.",
  fieldNotesAnalyzerLink: "Apri analizzatore →",
  capsuleTitle: "Capsula del tempo",
  capsuleSave: "Sigilla",
  analyzeToolFieldNotes: "Appunti — bozza per radar parole",
  analyzeToolJournal: "Diario decisioni — locale",
  analyzeToolChecklists: "Checklist stampabili",
  workspaceFlow3:
    "Posta in gioco, Analizza — il report appare sotto il modulo.",
};

export const noveltyAr: NoveltyCopy = {
  ...noveltyRu,
  navFieldNotes: "مختبر الملاحظات",
  footerFieldNotes: "ملاحظات ميدانية",
  fieldNotesEyebrow: "جديد · في المتصفح فقط",
  fieldNotesTitle: "مختبر الملاحظات الميدانية",
  fieldNotesSubtitle:
    "الصق أي مسودة. وقت القراءة والكثافة وخريطة الكلمات — كلها في تبويبك دون إرسال لخوادمنا.",
  fieldNotesPasteLabel: "لصق النص",
  fieldNotesReading: "وقت القراءة (تقدير)",
  fieldNotesWords: "رموز",
  fieldNotesUnique: "رموز فريدة",
  fieldNotesTop: "كلمات موزونة",
  fieldNotesClear: "مسح",
  fieldNotesEmpty: "الصق نصاً لرؤية الرادار.",
  fieldNotesLocaleHint:
    "مرشح كلمات للإنجليزية والأرمنية؛ باقي اللغات تحصل على العدّ.",
  fieldNotesFlowEyebrow: "ترتيب مقترح",
  fieldNotesFlow1: "الصق المسودة في الحقل الرئيسي — تبقى على هذا الجهاز فقط.",
  fieldNotesFlow2: "راقب اللوحة اليمنى: وقت القراءة والرموز والكلمات المميزة.",
  fieldNotesFlow3: "عندما يصبح السطر حاداً بما يكفي — انقله إلى المحلّل.",
  fieldNotesAnalyzerLink: "فتح المحلّل →",
  signatureEyebrow: "توقيع الملخص",
  signatureMoodPrefix: "مزاج اللوحة",
  capsuleTitle: "كapsولة زمنية",
  capsuleExplain:
    "اختم سطراً لذاتك المستقبلية. يُفتح بعد التأخير الذي تختاره — محلي في المتصفح.",
  capsulePlaceholder: "سطر صادق لمستقبلك…",
  capsuleDaysLabel: "يفتح بعد",
  capsuleSeal7: "7 أيام",
  capsuleSeal14: "14 يوماً",
  capsuleSeal30: "30 يوماً",
  capsuleSave: "ختم",
  capsuleFull: "حد أقصى 3 كبسولات — احذف واحدة لإضافة أخرى.",
  capsuleLocked: "يفتح",
  capsuleReveal: "أنت السابق يقول",
  capsuleDelete: "حذف",
  analyzeToolsEyebrow: "ثم بالترتيب",
  analyzeToolFieldNotes: "ملاحظات ميدانية — مسودة لرادار الكلمات",
  analyzeToolJournal: "يوميات القرار — محلي",
  analyzeToolChecklists: "قوائم قابلة للطباعة",
  workspaceFlowEyebrow: "ترتيب مقترح في هذه الصفحة",
  workspaceFlow1: "اختر preset دافئاً أو chip — يملأ الحقول.",
  workspaceFlow2: "اختياري: شرارات أو زاوية فضول أو كبسولة.",
  workspaceFlow3: "حدّد الرهان، «حلّل» — يظهر التقرير تحت النموذج.",
};
