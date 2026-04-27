import type { UIStrings } from "./ui";

type TrustHowCore = Pick<
  UIStrings,
  | "heroRibbon"
  | "trustSectionTitle"
  | "trustCards"
  | "howSectionTitle"
  | "howSteps"
  | "sectionNavOverview"
  | "sectionNavFixes"
  | "sectionNavProduct"
  | "sectionNavTrust"
  | "sectionNavHow"
  | "sectionNavAnalyzer"
  | "sectionNavLanguage"
  | "sectionNavPrivacy"
  | "productSectionTitle"
  | "productSectionSubtitle"
  | "bentoCards"
  | "heroCtaPrimary"
  | "heroCtaSecondary"
  | "previewCardTitle"
  | "previewRows"
  | "workspaceTitle"
  | "heroSlides"
  | "heroCarouselAriaLabel"
  | "productStripEyebrow"
  | "productStripAria"
  | "productStripAlts"
  | "atAGlanceEyebrow"
  | "atAGlanceTitle"
  | "atAGlanceCards"
>;

type HomeExtra = Partial<
  Pick<
    UIStrings,
    | "trustMicroPoints"
    | "homeDemoEyebrow"
    | "homeDemoTitle"
    | "homeDemoExample1"
    | "homeDemoExample2"
    | "homeDemoExample3"
    | "homeDemoCta"
    | "analyzingProgressLine"
  >
>;

/** Same shape as `trustHowEn` / `trustHowHy` in ui.ts — full homepage marketing blocks. */
export type TrustHowPick = TrustHowCore & HomeExtra;

export const trustHowRu: TrustHowPick = {
  heroRibbon: "8+ языков · Сценарный движок · Приватность прежде всего",
  sectionNavOverview: "Обзор",
  sectionNavFixes: "Чем помогает",
  atAGlanceEyebrow: "Начните здесь",
  atAGlanceTitle: "Что это за сайт — в трёх строках",
  atAGlanceCards: [
    {
      title: "Что это",
      body: "Структурированное пространство для больших жизненных развилок (переезд, карьера, отношения): сценарии, четыре оси, сроки и оценка — не бесконечный общий чат.",
    },
    {
      title: "Что вы делаете",
      body: "Пишете вопрос, при желании контекст, запускаете анализ, читаете отчёт. При необходимости — эксперты или тарифы.",
    },
    {
      title: "Чем это не является",
      body: "Не терапия, не юридическая или медицинская консультация и не лента соцсети. В экстренном случае обратитесь к специалисту.",
    },
  ],
  trustSectionTitle: "Почему этим пользуются",
  trustCards: [
    {
      emoji: "🧭",
      title: "Структура, а не хаос",
      body: "Лучший / худший / вероятный сценарии, четыре оси и сроки — сравниваете варианты рядом.",
    },
    {
      emoji: "🔐",
      title: "Уважение к вашей истории",
      body: "Нет публичной ленты и голосований. Текст остаётся в сеансе; ИИ (если включён) только формирует ответ.",
    },
    {
      emoji: "🌍",
      title: "Люди, когда нужно",
      body: "Многоязычный интерфейс и растущий каталог психологов, юристов и финансистов.",
    },
  ],
  howSectionTitle: "Как это работает",
  howSteps: [
    {
      title: "Описать",
      body: "Сформулируйте решение и контекст — цифры, страхи, ценности, сроки.",
    },
    {
      title: "Анализ",
      body: "Движок сводит финансы, психологию, риски и выгоду на горизонте 6 месяцев → 5 лет.",
    },
    {
      title: "Решить",
      body: "Используйте оценку как ориентир — при необходимости обсудите с профессионалом.",
    },
  ],
  sectionNavProduct: "Продукт",
  sectionNavTrust: "Доверие",
  sectionNavHow: "Как это работает",
  sectionNavAnalyzer: "Анализ",
  sectionNavLanguage: "Язык",
  sectionNavPrivacy: "Конфиденциальность",
  productSectionTitle: "Всё в одном структурированном потоке",
  productSectionSubtitle:
    "Спокойное место для важных решений — сценарии, оси, сроки и оценка. По аналогии с тем, как продуктовые команды разбирают решения.",
  bentoCards: [
    {
      pill: "Сценарии",
      title: "Лучший · худший · вероятный",
      body: "Три явных пути — не гадание вслепую.",
    },
    {
      pill: "Оси",
      title: "Финансы · психология · риск · выгода",
      body: "Четыре угла, как у коучей и консультантов.",
    },
    {
      pill: "Сроки",
      title: "6 месяцев → 5 лет",
      body: "Краткосрочные и долгосрочные последствия в одном виде.",
    },
    {
      pill: "Оценка",
      title: "Соответствие и реализуемость",
      body: "Процент с обоснованием — не «магический ответ».",
    },
  ],
  heroCtaPrimary: "Открыть анализ",
  heroCtaSecondary: "К экспертам",
  previewCardTitle: "Предпросмотр",
  previewRows: [
    { label: "Выход", value: "Структурированный отчёт", section: "workspace" },
    { label: "Сценарии", value: "3 варианта", section: "product" },
    { label: "Интерфейс", value: "9 языков", section: "language" },
  ],
  workspaceTitle: "Ваше рабочее место для анализа",
  heroSlides: [
    {
      alt: "Горный хребет над облаками на рассвете",
      caption: "Смотрите дальше — моделируйте сценарии до шага.",
    },
    {
      alt: "Чертежи и план на столе",
      caption: "Большие шаги заслуживают структуры, а не угадывания.",
    },
    {
      alt: "Команда за столом",
      caption: "Люди в контуре, когда нужен опыт, а не шум.",
    },
    {
      alt: "Современное рабочее место",
      caption: "Одно спокойное место для карьеры, переезда и развилок.",
    },
    {
      alt: "Графики на экране ноутбука",
      caption: "Оценка и сроки — ясность без притворства судьбой.",
    },
    {
      alt: "Лесная тропа с высокими деревьями",
      caption:
        "Назовите пути, а не только страх — развилки проще, когда выборы видны.",
    },
    {
      alt: "Ноутбук и кофе на деревянном столе",
      caption:
        "Запишите, отложите, перечитайте — ясность часто приходит со второго взгляда.",
    },
  ],
  heroCarouselAriaLabel:
    "Карусель изображений — проведите пальцем влево или вправо по фото, чтобы сменить слайд, или используйте кнопки ниже.",
  productStripEyebrow: "Моменты",
  productStripAria: "Иллюстрации к потоку продукта",
  productStripAlts: [
    "Дорога к горам",
    "Команда за общим столом",
    "Планирование в офисе",
    "Воркшоп за столом",
    "Городской проспект с пешеходным переходом",
    "Светлая гостиная с диваном и окнами",
  ],
  trustMicroPoints: [
    "Нет хранения как публичного поста",
    "Приватный анализ в рамках сеанса",
    "Помощь эксперта — по желанию",
  ],
  homeDemoEyebrow: "Попробовать пример",
  homeDemoTitle: "Как выглядит отчёт в один клик",
  homeDemoExample1: "Стоит ли уехать жить за границу?",
  homeDemoExample2: "Уволиться или остаться?",
  homeDemoCta: "Демо",
  analyzingProgressLine: "Анализируем ваше решение…",
};

export const trustHowDe: TrustHowPick = {
  heroRibbon: "8+ Sprachen · Szenario-Engine · Privacy-first",
  sectionNavOverview: "Überblick",
  sectionNavFixes: "Was es bringt",
  atAGlanceEyebrow: "Hier starten",
  atAGlanceTitle: "Was diese Seite ist — in drei Sätzen",
  atAGlanceCards: [
    {
      title: "Was es ist",
      body: "Ein strukturierter Entscheidungsraum für große Weichen (Umzug, Job, Beziehungen): Szenarien, vier Perspektiven, Zeitlinien und ein Score — kein endloser Standard-Chat.",
    },
    {
      title: "Was du tust",
      body: "Frage formulieren, optional Kontext, Analyse starten, Bericht lesen. Bei Bedarf Experten oder Preise.",
    },
    {
      title: "Was es nicht ist",
      body: "Keine Therapie, kein Rechts- oder Medizinrat und kein Social Feed. In Notfällen: echte Fachleute.",
    },
  ],
  trustSectionTitle: "Warum dieses Framework",
  trustCards: [
    {
      emoji: "🧭",
      title: "Strukturiert, nicht zufällig",
      body: "Bester / schlimmster / wahrscheinlicher Pfad, vier Linsen und Zeitlinie — Optionen direkt vergleichen.",
    },
    {
      emoji: "🔐",
      title: "Respekt vor deiner Geschichte",
      body: "Kein öffentlicher Feed. Dein Text bleibt in der Sitzung; KI (falls aktiv) erzeugt nur deine Antwort.",
    },
    {
      emoji: "🌍",
      title: "Menschen, wenn nötig",
      body: "Mehrsprachige Oberfläche und ein wachsendes Verzeichnis von Psychologen, Juristen und Finanzexperten.",
    },
  ],
  howSectionTitle: "So funktioniert’s",
  howSteps: [
    {
      title: "Beschreiben",
      body: "Entscheidung und Kontext — Zahlen, Ängste, Werte, Fristen.",
    },
    {
      title: "Analysieren",
      body: "Die Engine bildet Finanzen, Psychologie, Risiken und Chancen von 6 Monaten bis 5 Jahren ab.",
    },
    {
      title: "Entscheiden",
      body: "Score als Kompass — bei Bedarf mit Profis sprechen.",
    },
  ],
  sectionNavProduct: "Produkt",
  sectionNavTrust: "Vertrauen",
  sectionNavHow: "Ablauf",
  sectionNavAnalyzer: "Analyzer",
  sectionNavLanguage: "Sprache",
  sectionNavPrivacy: "Datenschutz",
  productSectionTitle: "Alles in einem strukturierten Flow",
  productSectionSubtitle:
    "Ruhiger Raum für große Entscheidungen — Szenarien, Linsen, Zeitlinien und Score. Wie Produktteams Entscheidungen reviewen.",
  bentoCards: [
    {
      pill: "Szenarien",
      title: "Best · schlechtest · wahrscheinlich",
      body: "Drei klare Pfade — kein Raten im Dunkeln.",
    },
    {
      pill: "Linsen",
      title: "Finanzen · Kopf · Risiko · Chance",
      body: "Vier Blickwinkel wie bei Coaches.",
    },
    {
      pill: "Zeitlinie",
      title: "6 Monate → 5 Jahre",
      body: "Kurz- und langfristig auf einen Blick.",
    },
    {
      pill: "Score",
      title: "Passung & Machbarkeit",
      body: "Prozent mit Begründung — keine Zauberantwort.",
    },
  ],
  heroCtaPrimary: "Analyzer öffnen",
  heroCtaSecondary: "Experten",
  previewCardTitle: "Vorschau",
  previewRows: [
    { label: "Output", value: "Strukturierter Bericht", section: "workspace" },
    { label: "Pfade", value: "3 Szenarien", section: "product" },
    { label: "UI", value: "9 Sprachen", section: "language" },
  ],
  workspaceTitle: "Dein Analyse-Arbeitsbereich",
  heroSlides: [
    {
      alt: "Berge über den Wolken",
      caption: "Weiter sehen — Szenarien vor dem Schritt.",
    },
    {
      alt: "Pläne auf dem Tisch",
      caption: "Große Schritte brauchen Struktur.",
    },
    {
      alt: "Team am Tisch",
      caption: "Menschen eingebunden, wenn du Expertise willst.",
    },
    {
      alt: "Modernes Büro",
      caption: "Ein ruhiger Ort für Job, Umzug und Weichen.",
    },
    {
      alt: "Charts am Laptop",
      caption: "Score und Zeitlinie — Klarheit ohne Schicksalsmystik.",
    },
    {
      alt: "Waldweg mit hohen Bäumen",
      caption:
        "Benenne die Wege, nicht nur die Angst — Weichen sind leichter, wenn Optionen sichtbar sind.",
    },
    {
      alt: "Laptop und Kaffee auf einem Holztisch",
      caption:
        "Aufs Schreiben kommt ein zweiter Blick — Klarheit kommt oft später.",
    },
  ],
  heroCarouselAriaLabel:
    "Bildkarussell — wischen Sie auf den Fotos nach links oder rechts, um den Slide zu wechseln, oder nutzen Sie die Steuerung darunter.",
  productStripEyebrow: "Momente",
  productStripAria: "Illustrationen zum Produktfluss",
  productStripAlts: [
    "Offene Straße zu Bergen",
    "Team an einem Tisch",
    "Planung im Büro",
    "Workshop am Tisch",
    "Stadtboulevard mit Zebrastreifen",
    "Helles Wohnzimmer mit Sofa und großen Fenstern",
  ],
};

export const trustHowFr: TrustHowPick = {
  heroRibbon: "8+ langues · Moteur de scénarios · Vie privée d’abord",
  sectionNavOverview: "Aperçu",
  sectionNavFixes: "Utilité",
  atAGlanceEyebrow: "Commencer ici",
  atAGlanceTitle: "Ce qu’est ce site — en trois phrases",
  atAGlanceCards: [
    {
      title: "Ce que c’est",
      body: "Un espace structuré pour les grands choix de vie (déménagement, carrière, relations) : scénarios, quatre axes, délais et score — pas un chat générique infini.",
    },
    {
      title: "Ce que vous faites",
      body: "Vous écrivez la question, ajoutez du contexte si besoin, lancez l’analyse, lisez le rapport. Experts ou tarifs en option.",
    },
    {
      title: "Ce que ce n’est pas",
      body: "Pas une thérapie, pas un conseil juridique ou médical, pas un fil social. En urgence, contactez un professionnel.",
    },
  ],
  trustSectionTitle: "Pourquoi ce cadre",
  trustCards: [
    {
      emoji: "🧭",
      title: "Structuré, pas aléatoire",
      body: "Meilleur / pire / probable, quatre axes et une frise — vous comparez côte à côte.",
    },
    {
      emoji: "🔐",
      title: "Respect de votre histoire",
      body: "Pas de fil public. Votre texte reste dans la session ; l’IA (si activée) ne fait que générer votre réponse.",
    },
    {
      emoji: "🌍",
      title: "Des humains quand il le faut",
      body: "Interface multilingue et annuaire de psychologues, juristes et financiers.",
    },
  ],
  howSectionTitle: "Comment ça marche",
  howSteps: [
    {
      title: "Décrire",
      body: "La décision et le contexte — chiffres, peurs, valeurs, échéances.",
    },
    {
      title: "Analyser",
      body: "Le moteur relie finances, psychologie, risques et opportunités sur 6 mois → 5 ans.",
    },
    {
      title: "Décider",
      body: "Utilisez le score comme boussole — parlez à un pro si besoin.",
    },
  ],
  sectionNavProduct: "Produit",
  sectionNavTrust: "Confiance",
  sectionNavHow: "Fonctionnement",
  sectionNavAnalyzer: "Analyseur",
  sectionNavLanguage: "Langue",
  sectionNavPrivacy: "Confidentialité",
  productSectionTitle: "Tout dans un flux structuré",
  productSectionSubtitle:
    "Un espace calme pour les grands choix — scénarios, axes, délais et score. Comme les équipes produit examinent les décisions.",
  bentoCards: [
    {
      pill: "Scénarios",
      title: "Meilleur · pire · probable",
      body: "Trois chemins explicites — pas de devinettes.",
    },
    {
      pill: "Axes",
      title: "Finance · esprit · risque · potentiel",
      body: "Quatre angles comme chez les coachs.",
    },
    {
      pill: "Frise",
      title: "6 mois → 5 ans",
      body: "Court et long terme d’un coup d’œil.",
    },
    {
      pill: "Score",
      title: "Alignement et faisabilité",
      body: "Un pourcentage avec justification — pas une réponse magique.",
    },
  ],
  heroCtaPrimary: "Ouvrir l’analyseur",
  heroCtaSecondary: "Voir les experts",
  previewCardTitle: "Aperçu de l’espace",
  previewRows: [
    { label: "Sortie", value: "Rapport structuré", section: "workspace" },
    { label: "Chemins", value: "3 scénarios", section: "product" },
    { label: "Interface", value: "9 langues", section: "language" },
  ],
  workspaceTitle: "Votre espace d’analyse",
  heroSlides: [
    {
      alt: "Crête au-dessus des nuages",
      caption: "Voir plus loin — modélisez avant d’agir.",
    },
    {
      alt: "Plans sur un bureau",
      caption: "Les grands mouvements méritent une méthode.",
    },
    {
      alt: "Équipe autour d’une table",
      caption: "Des humains quand vous voulez de l’expertise.",
    },
    {
      alt: "Bureau moderne",
      caption: "Un lieu calme pour carrière, déménagement et choix.",
    },
    {
      alt: "Graphiques sur un portable",
      caption: "Score et frise — clarté sans mystique.",
    },
    {
      alt: "Sentier forestier avec de grands arbres",
      caption:
        "Nommez les chemins, pas seulement la peur — les bifurcations sont plus claires quand les choix sont visibles.",
    },
    {
      alt: "Ordinateur portable et café sur un bureau en bois",
      caption:
        "Écrivez, posez, relisez — la clarté arrive souvent au second regard.",
    },
  ],
  heroCarouselAriaLabel:
    "Carrousel d’images — balayez vers la gauche ou la droite sur les photos pour changer de slide, ou utilisez les commandes ci-dessous.",
  productStripEyebrow: "Moments",
  productStripAria: "Illustrations du parcours produit",
  productStripAlts: [
    "Route vers les montagnes",
    "Équipe à une table",
    "Planification en bureau",
    "Atelier collectif",
    "Avenue urbaine avec passage piéton",
    "Salon lumineux avec canapé et grandes fenêtres",
  ],
};

export const trustHowEs: TrustHowPick = {
  heroRibbon: "8+ idiomas · Motor de escenarios · Privacidad primero",
  sectionNavOverview: "Resumen",
  sectionNavFixes: "Qué alivia",
  atAGlanceEyebrow: "Empieza aquí",
  atAGlanceTitle: "Qué es este sitio — en tres frases",
  atAGlanceCards: [
    {
      title: "Qué es",
      body: "Un espacio estructurado para grandes decisiones de vida (mudanza, carrera, relaciones): escenarios, cuatro ejes, plazos y puntuación — no un chat genérico interminable.",
    },
    {
      title: "Qué haces",
      body: "Escribes la pregunta, opcionalmente el contexto, lanzas el análisis y lees el informe. Si hace falta, expertos o planes.",
    },
    {
      title: "Qué no es",
      body: "No es terapia, ni asesoramiento jurídico o médico, ni una red social. En urgencias, acude a un profesional.",
    },
  ],
  trustSectionTitle: "Por qué este marco",
  trustCards: [
    {
      emoji: "🧭",
      title: "Estructurado, no al azar",
      body: "Mejor / peor / probable, cuatro ejes y una línea de tiempo — comparas opciones lado a lado.",
    },
    {
      emoji: "🔐",
      title: "Respeto a tu historia",
      body: "Sin muro público. Tu texto queda en la sesión; la IA (si está activa) solo genera tu respuesta.",
    },
    {
      emoji: "🌍",
      title: "Personas cuando hace falta",
      body: "Interfaz multilingüe y un directorio de psicólogos, juristas y financieros.",
    },
  ],
  howSectionTitle: "Cómo funciona",
  howSteps: [
    {
      title: "Describir",
      body: "La decisión y el contexto — cifras, miedos, valores, plazos.",
    },
    {
      title: "Analizar",
      body: "El motor une finanzas, psicología, riesgos y oportunidades en 6 meses → 5 años.",
    },
    {
      title: "Decidir",
      body: "Usa la puntuación como brújula — habla con un profesional si lo necesitas.",
    },
  ],
  sectionNavProduct: "Producto",
  sectionNavTrust: "Confianza",
  sectionNavHow: "Funcionamiento",
  sectionNavAnalyzer: "Analizador",
  sectionNavLanguage: "Idioma",
  sectionNavPrivacy: "Privacidad",
  productSectionTitle: "Todo en un flujo estructurado",
  productSectionSubtitle:
    "Un espacio tranquilo para decisiones grandes — escenarios, ejes, plazos y puntuación. Como los equipos de producto revisan decisiones.",
  bentoCards: [
    {
      pill: "Escenarios",
      title: "Mejor · peor · probable",
      body: "Tres caminos claros — sin adivinar.",
    },
    {
      pill: "Ejes",
      title: "Finanzas · mente · riesgo · potencial",
      body: "Cuatro ángulos como en el coaching.",
    },
    {
      pill: "Línea",
      title: "6 meses → 5 años",
      body: "Corto y largo plazo de un vistazo.",
    },
    {
      pill: "Puntuación",
      title: "Alineación y viabilidad",
      body: "Un porcentaje con razones — no una respuesta mágica.",
    },
  ],
  heroCtaPrimary: "Abrir analizador",
  heroCtaSecondary: "Ver expertos",
  previewCardTitle: "Vista previa del espacio",
  previewRows: [
    { label: "Salida", value: "Informe estructurado", section: "workspace" },
    { label: "Caminos", value: "3 escenarios", section: "product" },
    { label: "Interfaz", value: "9 idiomas", section: "language" },
  ],
  workspaceTitle: "Tu espacio de análisis",
  heroSlides: [
    {
      alt: "Cresta sobre las nubes",
      caption: "Ver más lejos — modela antes de actuar.",
    },
    {
      alt: "Planos sobre un escritorio",
      caption: "Los grandes pasos merecen método.",
    },
    {
      alt: "Equipo alrededor de una mesa",
      caption: "Personas cuando quieres experiencia real.",
    },
    {
      alt: "Oficina moderna",
      caption: "Un lugar tranquilo para carrera, mudanza y decisiones.",
    },
    {
      alt: "Gráficos en un portátil",
      caption: "Puntuación y plazos — claridad sin misticismo.",
    },
    {
      alt: "Sendero en el bosque con árboles altos",
      caption:
        "Nombra los caminos, no solo el miedo — las bifurcaciones son más claras cuando las opciones se ven.",
    },
    {
      alt: "Portátil y café sobre un escritorio de madera",
      caption:
        "Escríbelo, déjalo reposar y vuelve a leer — la claridad suele llegar en la segunda lectura.",
    },
  ],
  heroCarouselAriaLabel:
    "Carrusel de imágenes — desliza a la izquierda o derecha sobre las fotos para cambiar de diapositiva, o usa los controles de abajo.",
  productStripEyebrow: "Momentos",
  productStripAria: "Ilustraciones del recorrido del producto",
  productStripAlts: [
    "Carretera hacia las montañas",
    "Equipo en una mesa",
    "Planificación en la oficina",
    "Taller en grupo",
    "Avenida urbana con paso de peatones",
    "Salón luminoso con sofá y ventanales",
  ],
};

export const trustHowIt: TrustHowPick = {
  heroRibbon: "8+ lingue · Motore di scenari · Privacy al primo posto",
  sectionNavOverview: "Panoramica",
  sectionNavFixes: "A cosa serve",
  atAGlanceEyebrow: "Inizia qui",
  atAGlanceTitle: "Che cos’è questo sito — in tre righe",
  atAGlanceCards: [
    {
      title: "Cos’è",
      body: "Uno spazio strutturato per le grandi scelte di vita (trasferimento, carriera, relazioni): scenari, quattro assi, tempistiche e punteggio — non una chat generica infinita.",
    },
    {
      title: "Cosa fai",
      body: "Scrivi la domanda, opzionalmente il contesto, avvii l’analisi e leggi il report. Se serve, esperti o piani.",
    },
    {
      title: "Cosa non è",
      body: "Non è terapia, né consulenza legale o medica, né un social feed. In emergenza rivolgiti a un professionista.",
    },
  ],
  trustSectionTitle: "Perché questo framework",
  trustCards: [
    {
      emoji: "🧭",
      title: "Strutturato, non casuale",
      body: "Migliore / peggiore / probabile, quattro assi e una timeline — confronti affiancati.",
    },
    {
      emoji: "🔐",
      title: "Rispetto per la tua storia",
      body: "Niente bacheca pubblica. Il testo resta nella sessione; l’IA (se attiva) genera solo la tua risposta.",
    },
    {
      emoji: "🌍",
      title: "Persone quando serve",
      body: "Interfaccia multilingue e directory di psicologi, legali e consulenti finanziari.",
    },
  ],
  howSectionTitle: "Come funziona",
  howSteps: [
    {
      title: "Descrivere",
      body: "Decisione e contesto — numeri, paure, valori, scadenze.",
    },
    {
      title: "Analizzare",
      body: "Il motore collega finanza, psicologia, rischi e opportunità da 6 mesi a 5 anni.",
    },
    {
      title: "Decidere",
      body: "Usa il punteggio come bussola — parla con un professionista se serve.",
    },
  ],
  sectionNavProduct: "Prodotto",
  sectionNavTrust: "Fiducia",
  sectionNavHow: "Funzionamento",
  sectionNavAnalyzer: "Analizzatore",
  sectionNavLanguage: "Lingua",
  sectionNavPrivacy: "Privacy",
  productSectionTitle: "Tutto in un flusso strutturato",
  productSectionSubtitle:
    "Uno spazio calmo per le grandi scelte — scenari, assi, tempistiche e punteggio. Come i team prodotto esaminano le decisioni.",
  bentoCards: [
    {
      pill: "Scenari",
      title: "Migliore · peggiore · probabile",
      body: "Tre percorsi espliciti — niente tentativi al buio.",
    },
    {
      pill: "Assi",
      title: "Finanza · mente · rischio · potenziale",
      body: "Quattro angolazioni come dal coach.",
    },
    {
      pill: "Timeline",
      title: "6 mesi → 5 anni",
      body: "Breve e lungo termine in un colpo d’occhio.",
    },
    {
      pill: "Punteggio",
      title: "Allineamento e fattibilità",
      body: "Una percentuale con motivazione — non una risposta magica.",
    },
  ],
  heroCtaPrimary: "Apri analizzatore",
  heroCtaSecondary: "Vedi esperti",
  previewCardTitle: "Anteprima dello spazio",
  previewRows: [
    { label: "Output", value: "Report strutturato", section: "workspace" },
    { label: "Percorsi", value: "3 scenari", section: "product" },
    { label: "Interfaccia", value: "9 lingue", section: "language" },
  ],
  workspaceTitle: "Il tuo spazio di analisi",
  heroSlides: [
    {
      alt: "Cresta sopra le nuvole",
      caption: "Guarda più lontano — modella prima di agire.",
    },
    {
      alt: "Progetti su una scrivania",
      caption: "I grandi passi meritano un metodo.",
    },
    {
      alt: "Team intorno a un tavolo",
      caption: "Persone quando vuoi competenza vera.",
    },
    {
      alt: "Ufficio moderno",
      caption: "Un luogo calmo per carriera, trasferimento e scelte.",
    },
    {
      alt: "Grafici su un laptop",
      caption: "Punteggio e timeline — chiarezza senza misticismo.",
    },
    {
      alt: "Sentiero nel bosco con alberi alti",
      caption:
        "Dai un nome ai percorsi, non solo alla paura — le biforcazioni sono più chiare quando le opzioni si vedono.",
    },
    {
      alt: "Laptop e caffè su una scrivania in legno",
      caption:
        "Scrivi, aspetta, rileggi — la chiarezza spesso arriva al secondo sguardo.",
    },
  ],
  heroCarouselAriaLabel:
    "Carosello di immagini — scorri a sinistra o a destra sulle foto per cambiare slide, oppure usa i controlli sotto.",
  productStripEyebrow: "Momenti",
  productStripAria: "Illustrazioni del percorso prodotto",
  productStripAlts: [
    "Strada verso le montagne",
    "Team a un tavolo",
    "Pianificazione in ufficio",
    "Workshop di gruppo",
    "Boulevard urbano con strisce pedonali",
    "Soggiorno luminoso con divano e grandi finestre",
  ],
};

export const trustHowAr: TrustHowPick = {
  heroRibbon: "أكثر من 8 لغات · محرك السيناريوهات · الخصوصية أولاً",
  sectionNavOverview: "نظرة عامة",
  sectionNavFixes: "الفائدة",
  atAGlanceEyebrow: "ابدأ هنا",
  atAGlanceTitle: "ما هذا الموقع — في ثلاث جمل",
  atAGlanceCards: [
    {
      title: "ما هو",
      body: "مساحة منظمة لقرارات الحياة الكبرى (الانتقال، المهنة، العلاقات): سيناريوهات، أربعة محاور، جداول زمنية وتقييم — وليس دردشة عامة لا نهائية.",
    },
    {
      title: "ماذا تفعل",
      body: "تكتب السؤال، واختيارياً السياق، تشغّل التحليل، تقرأ التقرير. عند الحاجة — خبراء أو خطط.",
    },
    {
      title: "ما ليس عليه",
      body: "ليس علاجاً ولا استشارة قانونية أو طبية ولا موجزاً اجتماعياً. في الطوارئ تواصل مع مختص.",
    },
  ],
  trustSectionTitle: "لماذا هذا الإطار",
  trustCards: [
    {
      emoji: "🧭",
      title: "منظم، لا عشوائي",
      body: "أفضل / أسوأ / مرجح، أربعة محاور وجدول زمني — تقارن الخيارات جنباً إلى جنب.",
    },
    {
      emoji: "🔐",
      title: "احترام لقصتك",
      body: "لا جدار عاماً. نصك يبقى في الجلسة؛ الذكاء الاصطناعي (إن وُجد) يولّد إجابتك فقط.",
    },
    {
      emoji: "🌍",
      title: "بشر عند الحاجة",
      body: "واجهة متعددة اللغات ودليل أخصائيي نفس وقانون ومال.",
    },
  ],
  howSectionTitle: "كيف يعمل",
  howSteps: [
    {
      title: "صف",
      body: "القرار والسياق — أرقام، مخاوف، قيم، مواعيد.",
    },
    {
      title: "حلّل",
      body: "المحرك يربط المال والنفس والمخاطر والفرص من 6 أشهر إلى 5 سنوات.",
    },
    {
      title: "قرّر",
      body: "استخدم النتيجة كبوصلة — تحدث مع مختص إن لزم.",
    },
  ],
  sectionNavProduct: "المنتج",
  sectionNavTrust: "الثقة",
  sectionNavHow: "آلية العمل",
  sectionNavAnalyzer: "المحلّل",
  sectionNavLanguage: "اللغة",
  sectionNavPrivacy: "الخصوصية",
  productSectionTitle: "كل شيء في تدفق منظم",
  productSectionSubtitle:
    "مساحة هادئة للقرارات الكبرى — سيناريوهات، محاور، جداول وتقييم. كما تدرس فرق المنتج القرارات.",
  bentoCards: [
    {
      pill: "سيناريوهات",
      title: "أفضل · أسوأ · مرجح",
      body: "ثلاث مسارات واضحة — لا تخميناً في الظلام.",
    },
    {
      pill: "محاور",
      title: "مال · نفس · مخاطر · فرص",
      body: "أربع زوايا كما عند المدربين.",
    },
    {
      pill: "زمن",
      title: "6 أشهر ← 5 سنوات",
      body: "قصير وطويل المدى في لمحة.",
    },
    {
      pill: "تقييم",
      title: "التوافق والجدوى",
      body: "نسبة مع تبرير — وليس إجابة سحرية.",
    },
  ],
  heroCtaPrimary: "افتح المحلّل",
  heroCtaSecondary: "الخبراء",
  previewCardTitle: "معاينة المساحة",
  previewRows: [
    { label: "المخرجات", value: "تقرير منظم", section: "workspace" },
    { label: "المسارات", value: "3 سيناريوهات", section: "product" },
    { label: "الواجهة", value: "9 لغات", section: "language" },
  ],
  workspaceTitle: "مساحة التحليل الخاصة بك",
  heroSlides: [
    {
      alt: "قمة فوق الغيوم",
      caption: "انظر أبعد — نمّذج قبل أن تخطو.",
    },
    {
      alt: "مخططات على مكتب",
      caption: "الخطوات الكبرى تستحق أسلوباً لا تخميناً.",
    },
    {
      alt: "فريق حول طاولة",
      caption: "بشر عندما تحتاج خبرة حقيقية.",
    },
    {
      alt: "مكتب عصري",
      caption: "مكان هادئ للمهنة والانتقال والقرارات.",
    },
    {
      alt: "رسوم على حاسوب محمول",
      caption: "التقييم والجدول — وضوح بلا غموض مصيري.",
    },
    {
      alt: "مسلك في الغابة بين أشجار عالية",
      caption:
        "سمِّ المسارات لا القلق فقط — التفرعات أوضح عندما تكون الخيارات مرئية.",
    },
    {
      alt: "حاسوب محمول وقهوة على مكتب خشبي",
      caption:
        "اكتب، أرِحْ نظرك، ثم أعد القراءة — الوضوح غالباً يأتي في النظرة الثانية.",
    },
  ],
  heroCarouselAriaLabel:
    "عرض شرائح للصور — مرّر بإصبعك يميناً أو يساراً على الصور لتغيير الشريحة، أو استخدم الأزرار بالأسفل.",
  productStripEyebrow: "لحظات",
  productStripAria: "رسوم لمسار المنتج",
  productStripAlts: [
    "طريق نحو الجبال",
    "فريق حول طاولة",
    "تخطيط في مكتب",
    "ورشة جماعية",
    "شارع مدينة مع ممر للمشاة",
    "غرفة معيشة فاتحة مع أريكة ونوافذ كبيرة",
  ],
};
