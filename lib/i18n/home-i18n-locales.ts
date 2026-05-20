import type { AppLocale } from "./locale";

/** Home/analyzer strings that were English fallbacks for non-hy locales. */
export type HomeI18nBundle = {
  trustMicroPoints: readonly [string, string, string];
  homeDemoEyebrow: string;
  homeDemoTitle: string;
  homeDemoExample1: string;
  homeDemoExample2: string;
  homeDemoExample3: string;
  homeDemoCta: string;
  analyzingProgressLine: string;
  analyzingPhaseLines: readonly string[];
  socialProofRotator: readonly string[];
  workspaceQuickFillIntro: string;
  workspaceQuickExamples: readonly {
    label: string;
    decision: string;
  }[];
  resultFeedbackPrompt: string;
  resultFeedbackThanks: string;
  sessionRunsThisVisit: string;
  analysisEmptyDetail: string;
};

const homeI18nRu: HomeI18nBundle = {
  trustMicroPoints: [
    "Ваша история не в публичной ленте",
    "Анализ остаётся в вашем сеансе",
    "Эксперт — только если вы сами захотите",
  ],
  homeDemoEyebrow: "Попробовать сейчас",
  homeDemoTitle: "Посмотрите полный отчёт за секунду",
  homeDemoExample1: "Стоит ли переехать за границу?",
  homeDemoExample2: "Уволиться или остаться?",
  homeDemoExample3: "В отношениях — остаться или уйти?",
  homeDemoCta: "Попробовать",
  analyzingProgressLine: "Анализируем ваше решение…",
  analyzingPhaseLines: [
    "Анализируем ваше решение…",
    "Выделяем компромиссы, которые реально важны для вас…",
    "Строим сценарии на месяцы и годы вперёд…",
    "Сравниваем пути по деньгам, нервам и времени…",
    "Проверяем скрытые допущения…",
    "Смотрим, не слишком ли «гладко» звучит история…",
    "Собираем понятный отчёт…",
  ],
  socialProofRotator: [
    "Для развилок, где ставки ощущаются по-настоящему — карьера, переезд, отношения.",
    "Три пути и шкала времени — не один абзац из чата.",
    "Ваши слова остаются в этом сеансе, пока вы сами не скопируете или не сохраните.",
  ],
  workspaceQuickFillIntro: "Начните с реалистичного примера (нажмите, чтобы заполнить):",
  workspaceQuickExamples: [
    {
      label: "Уволиться?",
      decision: "Стоит ли уволиться ради нового предложения?",
    },
    {
      label: "Переезд?",
      decision:
        "Стоит ли переехать в другую страну из‑за работы или семьи?",
    },
    {
      label: "Свой проект?",
      decision:
        "Стоит ли начать небольшой бизнес на стороне, оставаясь на работе?",
    },
    {
      label: "Остаться?",
      decision: "Оставаться в этих отношениях или расстаться?",
    },
  ],
  resultFeedbackPrompt: "Было полезно?",
  resultFeedbackThanks: "Спасибо — это помогает улучшать опыт.",
  sessionRunsThisVisit: "За этот визит: {n} структурированных запусков",
  analysisEmptyDetail:
    "Здесь нет содержательного ответа — обычно потому, что запрос не описывает реальную развилку (слишком общий, шумный или не по теме). Переформулируйте в одно‑два предложения: какое решение, вариант А против Б и что для вас важнее (время, деньги, риск, люди).",
};

const homeI18nDe: HomeI18nBundle = {
  trustMicroPoints: [
    "Kein öffentlicher Feed deiner Geschichte",
    "Analyse bleibt in deiner Sitzung",
    "Menschliche Hilfe nur, wenn du sie willst",
  ],
  homeDemoEyebrow: "Jetzt testen",
  homeDemoTitle: "Vorschau auf einen vollen Bericht",
  homeDemoExample1: "Ins Ausland ziehen?",
  homeDemoExample2: "Job kündigen oder bleiben?",
  homeDemoExample3: "Beziehung — bleiben oder gehen?",
  homeDemoCta: "Jetzt testen",
  analyzingProgressLine: "Deine Entscheidung wird analysiert…",
  analyzingPhaseLines: [
    "Deine Entscheidung wird analysiert…",
    "Abwägungen benennen, die dir wirklich wichtig sind…",
    "Szenarien über Monate und Jahre abbilden…",
    "Wege nach Geld, Nerven und Zeit vergleichen…",
    "Versteckte Annahmen prüfen…",
    "Prüfen, ob die Story zu glatt klingt…",
    "Einen klaren Bericht erstellen…",
  ],
  socialProofRotator: [
    "Für Weichen mit echtem Gewicht — Karriere, Umzug, Beziehungen.",
    "Drei Pfade und eine Zeitachse — kein generischer Chat-Absatz.",
    "Dein Text bleibt in dieser Sitzung, bis du kopierst oder speicherst.",
  ],
  workspaceQuickFillIntro: "Mit einem realistischen Beispiel starten (tippen zum Ausfüllen):",
  workspaceQuickExamples: [
    {
      label: "Kündigen?",
      decision: "Soll ich für ein neues Angebot kündigen?",
    },
    {
      label: "Umzug?",
      decision:
        "Soll ich aus Arbeit- oder Familiengründen ins Ausland ziehen?",
    },
    {
      label: "Nebenprojekt?",
      decision:
        "Soll ich neben dem Job ein kleines Business starten?",
    },
    {
      label: "Bleiben?",
      decision: "In dieser Beziehung bleiben oder beenden?",
    },
  ],
  resultFeedbackPrompt: "War das hilfreich?",
  resultFeedbackThanks: "Danke — das hilft uns, die Erfahrung zu verbessern.",
  sessionRunsThisVisit: "Dieser Besuch: {n} strukturierte Durchläufe",
  analysisEmptyDetail:
    "Kein inhaltlicher Text in diesem Slot — meist, weil die Eingabe keine echte Gabelung ist. Formuliere in ein bis zwei Sätzen: welche Entscheidung, Option A vs. B und was du optimierst (Zeit, Geld, Risiko, Beziehungen).",
};

const homeI18nFr: HomeI18nBundle = {
  trustMicroPoints: [
    "Pas de fil public de votre histoire",
    "L’analyse reste dans votre session",
    "Un humain seulement si vous le voulez",
  ],
  homeDemoEyebrow: "Essayer maintenant",
  homeDemoTitle: "Aperçu d’un rapport complet",
  homeDemoExample1: "Partir vivre à l’étranger ?",
  homeDemoExample2: "Quitter son emploi ou rester ?",
  homeDemoExample3: "Couple — rester ou partir ?",
  homeDemoCta: "Essayer",
  analyzingProgressLine: "Analyse de votre décision…",
  analyzingPhaseLines: [
    "Analyse de votre décision…",
    "Nommer les compromis qui comptent vraiment pour vous…",
    "Cartographier des scénarios sur des mois et des années…",
    "Comparer les voies argent, stress et temps…",
    "Tester des hypothèses cachées…",
    "Vérifier si le récit paraît trop lisse…",
    "Transformer cela en rapport clair…",
  ],
  socialProofRotator: [
    "Pour les fourches où les enjeux sont réels — carrière, déménagement, relations.",
    "Trois chemins et une ligne de temps — pas un paragraphe de chat générique.",
    "Vos mots restent dans cette session jusqu’à copie ou sauvegarde.",
  ],
  workspaceQuickFillIntro: "Commencer par un exemple réaliste (appuyer pour remplir) :",
  workspaceQuickExamples: [
    {
      label: "Démission ?",
      decision: "Dois-je quitter mon emploi pour une nouvelle offre ?",
    },
    {
      label: "Déménager ?",
      decision:
        "Dois-je déménager à l’étranger pour le travail ou la famille ?",
    },
    {
      label: "Side business ?",
      decision:
        "Dois-je lancer une petite activité à côté en gardant mon emploi ?",
    },
    {
      label: "Rester ?",
      decision: "Rester dans cette relation ou la terminer ?",
    },
  ],
  resultFeedbackPrompt: "Utile ?",
  resultFeedbackThanks: "Merci — cela nous aide à améliorer l’expérience.",
  sessionRunsThisVisit: "Cette visite : {n} analyse(s) structurée(s)",
  analysisEmptyDetail:
    "Pas de contenu substantiel ici — souvent parce que la question n’est pas une vraie fourche. Réécrivez en une ou deux phrases : quelle décision, option A vs B et ce que vous optimisez (temps, argent, risque, relations).",
};

const homeI18nEs: HomeI18nBundle = {
  trustMicroPoints: [
    "Sin feed público de tu historia",
    "El análisis queda en tu sesión",
    "Experto humano solo si lo quieres",
  ],
  homeDemoEyebrow: "Probar ahora",
  homeDemoTitle: "Vista previa de un informe completo",
  homeDemoExample1: "¿Mudarme al extranjero?",
  homeDemoExample2: "¿Renunciar o quedarme?",
  homeDemoExample3: "¿Relación — quedarse o irse?",
  homeDemoCta: "Probar",
  analyzingProgressLine: "Analizando tu decisión…",
  analyzingPhaseLines: [
    "Analizando tu decisión…",
    "Nombrando compensaciones que de verdad te importan…",
    "Trazando escenarios a meses y años…",
    "Comparando caminos en dinero, nervios y tiempo…",
    "Probando supuestos ocultos…",
    "Comprobando si la historia suena demasiado limpia…",
    "Convirtiendo esto en un informe claro…",
  ],
  socialProofRotator: [
    "Para bifurcaciones con apuestas reales — carrera, mudanza, relaciones.",
    "Tres caminos y una línea temporal — no un párrafo genérico de chat.",
    "Tus palabras permanecen en esta sesión hasta que copies o guardes.",
  ],
  workspaceQuickFillIntro: "Empieza con un ejemplo realista (toca para rellenar):",
  workspaceQuickExamples: [
    {
      label: "¿Renunciar?",
      decision: "¿Debería renunciar por una nueva oferta?",
    },
    {
      label: "¿Mudanza?",
      decision:
        "¿Debería mudarme a otro país por trabajo o familia?",
    },
    {
      label: "¿Negocio?",
      decision:
        "¿Debería empezar un pequeño negocio aparte manteniendo el empleo?",
    },
    {
      label: "¿Quedarse?",
      decision: "¿Seguir en esta relación o terminarla?",
    },
  ],
  resultFeedbackPrompt: "¿Te ayudó?",
  resultFeedbackThanks: "Gracias — nos ayuda a mejorar la experiencia.",
  sessionRunsThisVisit: "Esta visita: {n} análisis estructurado(s)",
  analysisEmptyDetail:
    "No hay contenido sustantivo aquí — suele ser porque la entrada no es una bifurcación real. Reescribe en una o dos frases: qué decisión, opción A vs B y qué optimizas (tiempo, dinero, riesgo, relaciones).",
};

const homeI18nIt: HomeI18nBundle = {
  trustMicroPoints: [
    "Nessun feed pubblico della tua storia",
    "L’analisi resta nella tua sessione",
    "Un umano solo se lo vuoi",
  ],
  homeDemoEyebrow: "Prova ora",
  homeDemoTitle: "Anteprima di un report completo",
  homeDemoExample1: "Trasferirsi all’estero?",
  homeDemoExample2: "Lasciare il lavoro o restare?",
  homeDemoExample3: "Relazione — restare o andarsene?",
  homeDemoCta: "Prova",
  analyzingProgressLine: "Analisi della tua decisione…",
  analyzingPhaseLines: [
    "Analisi della tua decisione…",
    "Nominiamo i compromessi che contano davvero per te…",
    "Mappiamo scenari su mesi e anni…",
    "Confrontiamo percorsi su soldi, nervi e tempo…",
    "Mettiamo alla prova assunzioni nascoste…",
    "Verifichiamo se la storia suona troppo pulita…",
    "Trasformiamo tutto in un report chiaro…",
  ],
  socialProofRotator: [
    "Per bivi con posta in gioco reale — carriera, trasferimento, relazioni.",
    "Tre percorsi e una timeline — non un paragrafo generico di chat.",
    "Le tue parole restano in questa sessione finché non copi o salvi.",
  ],
  workspaceQuickFillIntro: "Inizia da un esempio realistico (tocca per compilare):",
  workspaceQuickExamples: [
    {
      label: "Licenziarsi?",
      decision: "Dovrei lasciare il lavoro per una nuova offerta?",
    },
    {
      label: "Trasferimento?",
      decision:
        "Dovrei trasferirmi in un altro paese per lavoro o famiglia?",
    },
    {
      label: "Side business?",
      decision:
        "Dovrei avviare una piccola attività extra mantenendo il lavoro?",
    },
    {
      label: "Restare?",
      decision: "Restare in questa relazione o chiuderla?",
    },
  ],
  resultFeedbackPrompt: "Ti è stato utile?",
  resultFeedbackThanks: "Grazie — ci aiuta a migliorare l’esperienza.",
  sessionRunsThisVisit: "Questa visita: {n} analisi strutturate",
  analysisEmptyDetail:
    "Nessun contenuto sostanziale qui — di solito perché l’input non è un bivio reale. Riscrivi in una o due frasi: quale decisione, opzione A vs B e cosa ottimizzi (tempo, soldi, rischio, relazioni).",
};

const homeI18nAr: HomeI18nBundle = {
  trustMicroPoints: [
    "لا يوجد موجز عام لقصتك",
    "يبقى التحليل في جلستك",
    "خبير بشري فقط إذا أردت",
  ],
  homeDemoEyebrow: "جرّب الآن",
  homeDemoTitle: "معاينة تقرير كامل فوراً",
  homeDemoExample1: "هل أنتقل للعيش في الخارج؟",
  homeDemoExample2: "أستقيل أم أبقى؟",
  homeDemoExample3: "علاقة — أبقى أم أغادر؟",
  homeDemoCta: "جرّب",
  analyzingProgressLine: "جارٍ تحليل قرارك…",
  analyzingPhaseLines: [
    "جارٍ تحليل قرارك…",
    "تسمية المفاضلات التي تهمك فعلاً…",
    "رسم سيناريوهات على أشهر وسنوات…",
    "مقارنة المسارات بالمال والتوتر والوقت…",
    "اختبار افتراضات خفية…",
    "التحقق إن كان السرد أنعم مما ينبغي…",
    "تحويل ذلك إلى تقرير واضح…",
  ],
  socialProofRotator: [
    "لتفرعات حيث الرهان حقيقي — مهنة، انتقال، علاقات.",
    "ثلاثة مسارات وجدول زمني — لا فقرة دردشة عامة.",
    "كلماتك تبقى في هذه الجلسة حتى تنسخ أو تحفظ.",
  ],
  workspaceQuickFillIntro: "ابدأ بمثال واقعي (اضغط للملء):",
  workspaceQuickExamples: [
    {
      label: "استقالة؟",
      decision: "هل أستقيل من أجل عرض جديد؟",
    },
    {
      label: "انتقال؟",
      decision: "هل أنتقل لبلد آخر للعمل أو العائلة؟",
    },
    {
      label: "مشروع جانبي؟",
      decision: "هل أبدأ عملاً صغيراً مع الإبقاء على الوظيفة؟",
    },
    {
      label: "بقاء؟",
      decision: "أبقى في هذه العلاقة أم أنهيها؟",
    },
  ],
  resultFeedbackPrompt: "هل كان مفيداً؟",
  resultFeedbackThanks: "شكراً — يساعدنا على تحسين التجربة.",
  sessionRunsThisVisit: "هذه الزيارة: {n} تحليلاً منظماً",
  analysisEmptyDetail:
    "لا يوجد محتوى جوهري هنا — غالباً لأن السؤال ليس تفرعاً حقيقياً. أعد الصياغة في جملة أو اثنتين: أي قرار، خيار أ مقابل ب وما الذي تُحسّنه (وقت، مال، مخاطر، علاقات).",
};

export const homeI18nByLocale: Partial<Record<AppLocale, HomeI18nBundle>> = {
  ru: homeI18nRu,
  de: homeI18nDe,
  fr: homeI18nFr,
  es: homeI18nEs,
  it: homeI18nIt,
  ar: homeI18nAr,
};
