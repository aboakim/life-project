import type { DecisionAnalysis, SuggestedDirectoryRole } from "../types";
import type { AppLocale } from "./locale";

function clampScore(seed: number): number {
  return Math.min(92, Math.max(28, 38 + (seed % 55)));
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function base(decision: string, seed: number) {
  const quote = decision.slice(0, 200) || "—";
  return { quote, score: clampScore(seed) };
}

function professionalDemo(
  locale: AppLocale
): Pick<DecisionAnalysis, "professionalGuidance" | "suggestedDirectoryRole"> {
  if (locale === "hy") {
    return {
      professionalGuidance:
        "Այս հարցի շուրջ ավելի ճիշտ որոշման համար, կախված բնույթից, կարող են օգնել որակավորված հոգեբան/թերապевտ, իրավաբան, ֆինանսական խորհրդատու, աշխատանքի coach, միգրացիայի մասնագետ կամ, առողջական թվարկումների դեպքում, բժիշկ։ Software-ը աջակցություն է, ոչ փոխարեն մասնագետի. ընտրիր լիցենзіավորված մասնագետ ձեր երկրում։",
      suggestedDirectoryRole: "UNSPECIFIED",
    };
  }
  return {
    professionalGuidance:
      "For a decision at this level, the right help depends on the domain: a licensed mental-health professional for distress or relationship harm; a qualified attorney for legal exposure; a financial or tax adviser for real money/contract trade-offs; an immigration professional for visa or cross-border rules; a coach for career structure; a physician for health-related forks. This tool sketches trade-offs; it is not a substitute for regulated advice where your situation requires it.",
    suggestedDirectoryRole: "UNSPECIFIED" as SuggestedDirectoryRole,
  };
}

function demoEnglish(quote: string): Omit<DecisionAnalysis, "score" | "professionalGuidance" | "suggestedDirectoryRole"> {
  return {
    summary:
      "This is a structured preview analysis. Deeper AI insight returns shortly. Your question: «" +
      quote +
      "».",
    dimensions: {
      finances:
        "Finance needs concrete numbers—income, obligations, runway. Add them in Context for sharper output.",
      psychology:
        "Psychology ties to safety, fear of loss, and values. Note what you feel now and what you fear losing.",
      risks:
        "Risks span time, money, relationships, and health. Weigh them against your actual situation.",
      opportunities:
        "Upside appears when the move aligns with long-term goals and you have support.",
    },
    scenarios: {
      bestCase:
        "Best case: enough resources, stable support, and patience to adapt without demanding instant perfection.",
      worstCase:
        "Worst case: rushed choice, no plan B, or motivation is mainly escape rather than an active decision.",
      mostLikely:
        "Most likely is a middle path—manageable friction if you plan in steps and stay flexible.",
    },
    timeline: {
      months6:
        "After 6 months you usually see first signals—adjustment, stress level, practical progress.",
      years2:
        "After 2 years the decision typically stabilizes—either a new equilibrium or clarity about a correction.",
      years5:
        "After 5 years it often becomes a chapter of your story; growth matters as much as the outcome.",
    },
    scoreRationale:
      "Demo score—not medical or financial advice. A real score needs your numbers, values, and risk detail.",
    digitalTwinNote:
      "Full “digital twin” mode would compare patterns from your past decisions. Here it is conceptual only.",
  };
}

export function buildDemoAnalysis(
  decision: string,
  locale: AppLocale
): DecisionAnalysis {
  const seed = hashString(decision.trim() || "empty");
  const { quote, score } = base(decision, seed);

  const blocks: Record<
    AppLocale,
    Omit<
      DecisionAnalysis,
      "score" | "professionalGuidance" | "suggestedDirectoryRole"
    >
  > = {
    hy: {
      summary:
        "Սա կառուցվածքային նախնական վերլուծություն է։ Ավելի խորը AI վերլուծությունը շուտով կվերականգնվի։ Ձեր հարցը՝ «" +
        quote +
        "»։",
      dimensions: {
        finances:
          "Ֆինանսական հարթակը պահանջում է կոնկրետ թվեր (եկամուտ, պարտավորություններ, խնայողություններ)։ Ավելացրեք դրանք «Կոնտեքստ» դաշտում։",
        psychology:
          "Հոգեբանական կողմը կապված է անվտանգության զգացման և արժեքների հետ։ Նշեք՝ ինչ եք զգում և ինչից եք վախենում կորցնել։",
        risks:
          "Ռիսկերը ներառում են ժամանակի, գումարի, հարաբերությունների և առողջության անորոշություն։",
        opportunities:
          "Շանսերը բացվում են, երբ որոշումը համահունչ է երկարաժամկետ նպատակների հետ և ունեք աջակցություն։",
      },
      scenarios: {
        bestCase:
          "Լավագույն դեպքում ռեսուրսները բավարար են, աջակցությունը կայուն է, և տրվում է ժամանակ հարմարվելուն։",
        worstCase:
          "Վատագույն դեպքում որոշումը շտապ է, առանց պլանի B, կամ մոտիվը փախուստն է խնդրից։",
        mostLikely:
          "Ամենահավանականը միջին ուղին է՝ կառավարելի դժվարություններ, եթե պլանավորեք քայլ առ քայլ։",
      },
      timeline: {
        months6:
          "6 ամիս հետո երևում են առաջին ազդանշանները՝ հարմարում, սթրես, գործնական քայլեր։",
        years2:
          "2 տարի հետո որոշումը սովորաբար կայանում է՝ նոր հավասարակշռություն կամ պարզություն։",
        years5:
          "5 տարի հետո սա հաճախ դառնում է ձեր պատմության մի մասը՝ անկախ ելքից։",
      },
      scoreRationale:
        "Ցուցադրական միավոր է (ոչ բժշկական/ֆինանսական խորհուրդ)։ Իրական գնահատականը պահանջում է մանրամասն նկարագրություն։",
      digitalTwinNote:
        "Լիարժեք «թվային երկվորյակը» կհամեմատի նախկին որոշումների նախշերը։ Այստեղ՝ գաղափարական շերտ։",
    },
    en: demoEnglish(quote),
    "en-US": demoEnglish(quote),
    ru: {
      summary:
        "Это структурированный предварительный анализ. Полный AI-анализ скоро снова будет доступен. Ваш вопрос: «" +
        quote +
        "».",
      dimensions: {
        finances:
          "Финансы требуют конкретных цифр—доход, обязательства, запас прочности. Добавьте их в поле «Контекст».",
        psychology:
          "Психология связана с безопасностью, страхом потерь и ценностями. Опишите чувства и страхи.",
        risks:
          "Риски включают время, деньги, отношения и здоровье. Сопоставьте их с вашей реальностью.",
        opportunities:
          "Возможности открываются, когда шаг согласуется с долгими целями и есть поддержка.",
      },
      scenarios: {
        bestCase:
          "Лучший случай: достаточно ресурсов, устойчивая поддержка и терпение к адаптации.",
        worstCase:
          "Худший случай: поспешность, нет плана B или мотивация — в основном «сбежать», а не выбрать.",
        mostLikely:
          "Чаще всего — середина: терния, с которой можно справиться по шагам и с гибкостью.",
      },
      timeline: {
        months6:
          "Через 6 месяцев видны первые сигналы: адаптация, стресс, практические шаги.",
        years2:
          "Через 2 года решение обычно стабилизируется: новое равновесие или ясность про коррекцию.",
        years5:
          "Через 5 лет это часто становится частью истории; важен рост, а не только «да/нет».",
      },
      scoreRationale:
        "Демо-оценка—не медицинский и не финансовый совет. Реальная оценка требует деталей.",
      digitalTwinNote:
        "Полный «цифровой двойник» сравнил бы прошлые паттерны. Здесь это лишь концепция.",
    },
    de: {
      summary:
        "Dies ist eine strukturierte Vorschau-Analyse. Die vollständige KI-Analyse ist in Kürze wieder verfügbar. Deine Frage: «" +
        quote +
        "».",
      dimensions: {
        finances:
          "Finanzen brauchen konkrete Zahlen—Einkommen, Verpflichtungen, Puffer. Trage sie im Kontext ein.",
        psychology:
          "Psychologie hängt mit Sicherheit, Verlustangst und Werten zusammen. Beschreibe Gefühle und Ängste.",
        risks:
          "Risiken umfassen Zeit, Geld, Beziehungen und Gesundheit—im Vergleich zu deiner Realität abwägen.",
        opportunities:
          "Chancen entstehen, wenn der Schritt langfristigen Zielen entspricht und Unterstützung da ist.",
      },
      scenarios: {
        bestCase:
          "Bester Fall: genug Ressourcen, stabile Unterstützung, Geduld beim Ankommen.",
        worstCase:
          "Schlimmster Fall: Eile, kein Plan B oder Motivation vor allem als Flucht.",
        mostLikely:
          "Wahrscheinlich die Mitte—machbare Reibung mit Planung und Flexibilität.",
      },
      timeline: {
        months6:
          "Nach 6 Monaten siehst du erste Signale: Anpassung, Stress, praktische Fortschritte.",
        years2:
          "Nach 2 Jahren stabilisiert sich die Entscheidung oft—neues Gleichgewicht oder Klarheit.",
        years5:
          "Nach 5 Jahren wird es oft zu einem Kapitel; Wachstum zählt genauso wie das Ergebnis.",
      },
      scoreRationale:
        "Demo-Score—kein medizinischer oder finanzieller Rat. Echte Bewertung braucht Details.",
      digitalTwinNote:
        "Ein voller digitaler Zwilling würde frühere Muster vergleichen. Hier nur eine Idee.",
    },
    fr: {
      summary:
        "Ceci est une analyse structurée d’aperçu. L’analyse IA complète sera de nouveau disponible sous peu. Votre question : «" +
        quote +
        "».",
      dimensions: {
        finances:
          "Les finances exigent des chiffres concrets—revenus, obligations, coussin. Ajoutez-les au contexte.",
        psychology:
          "La psychologie relie sécurité, peur de perdre et valeurs. Décrivez ressentis et craintes.",
        risks:
          "Les risques couvrent le temps, l’argent, les relations et la santé—à pondérer avec votre réalité.",
        opportunities:
          "Les opportunités apparaissent quand le choix s’aligne sur vos objectifs long terme et le soutien.",
      },
      scenarios: {
        bestCase:
          "Meilleur cas : ressources suffisantes, soutien stable, patience pour s’adapter.",
        worstCase:
          "Pire cas : précipitation, pas de plan B, motivation surtout une fuite.",
        mostLikely:
          "Le plus souvent : un milieu de terrain—friction gérable avec étapes et souplesse.",
      },
      timeline: {
        months6:
          "Après 6 mois : premiers signaux—ajustement, stress, progrès concrets.",
        years2:
          "Après 2 ans : stabilisation—nouvel équilibre ou clarté pour corriger.",
        years5:
          "Après 5 ans : souvent un chapitre de votre histoire ; la croissance compte.",
      },
      scoreRationale:
        "Score démo—pas un avis médical ou financier. Un vrai score exige du détail.",
      digitalTwinNote:
        "Un jumeau numérique complet comparerait vos habitudes passées. Ici, concept seulement.",
    },
    es: {
      summary:
        "Este es un análisis preliminar estructurado. El análisis de IA completo volverá a estar disponible en breve. Tu pregunta: «" +
        quote +
        "».",
      dimensions: {
        finances:
          "Las finanzas necesitan cifras concretas—ingresos, obligaciones, colchón. Añádelas en Contexto.",
        psychology:
          "La psicología conecta seguridad, miedo a perder y valores. Describe emociones y temores.",
        risks:
          "Los riesgos incluyen tiempo, dinero, relaciones y salud—contrasta con tu situación real.",
        opportunities:
          "Las oportunidades aparecen cuando el paso encaja con metas largas y hay apoyo.",
      },
      scenarios: {
        bestCase:
          "Mejor caso: recursos suficientes, apoyo estable y paciencia para adaptarte.",
        worstCase:
          "Peor caso: prisa, sin plan B o motivación sobre todo de huir.",
        mostLikely:
          "Lo más frecuente es un término medio—fricción manejable con pasos y flexibilidad.",
      },
      timeline: {
        months6:
          "A los 6 meses ves primeras señales: ajuste, estrés, avances prácticos.",
        years2:
          "A los 2 años suele estabilizarse—nuevo equilibrio o claridad para corregir.",
        years5:
          "A los 5 años suele ser un capítulo; el crecimiento importa tanto como el resultado.",
      },
      scoreRationale:
        "Puntuación demo—no es consejo médico ni financiero. Hacen falta detalles reales.",
      digitalTwinNote:
        "Un gemelo digital completo compararía patrones pasados. Aquí solo es conceptual.",
    },
    ar: {
      summary:
        "هذا تحليل تمهيدي مُنظَّم. سيعود التحليل الكامل بالذكاء الاصطناعي للعمل قريبًا. سؤالك: «" +
        quote +
        "».",
      dimensions: {
        finances:
          "المالية تحتاج أرقامًا واضحة—الدخل، الالتزامات، الهامش. أضفها في حقل السياق.",
        psychology:
          "الجانب النفسي يرتبط بالأمان، الخوف من الخسارة، والقيم. صِف مشاعرك ومخاوفك.",
        risks:
          "المخاطر تشمل الوقت والمال والعلاقات والصحة—قارنها بواقعك.",
        opportunities:
          "تظهر الفرص عندما يتوافق القرار مع أهدافك طويلة الأجل وتتوفر الدعم.",
      },
      scenarios: {
        bestCase:
          "أفضل حالة: موارد كافية، دعم ثابت، وصبر على التأقلم دون مطالبة كمال فوري.",
        worstCase:
          "أسوأ حالة: عجلة، لا خطة بديلة، أو الدافع هروب أكثر من اختيار واعٍ.",
        mostLikely:
          "الأرجح مسارًا أوسطًا—احتكاك يمكن إدارته بخطوات ومرونة.",
      },
      timeline: {
        months6:
          "بعد 6 أشهر تظهر إشارات أولى: تكيف، ضغط، تقدم عملي.",
        years2:
          "بعد سنتين غالبًا يستقر القرار—توازن جديد أو وضوح للتصحيح.",
        years5:
          "بعد 5 سنوات يصبح غالبًا فصلًا من قصتك؛ النمو مهم مثل النتيجة.",
      },
      scoreRationale:
        "درجة تجريبية—ليست نصيحة طبية أو مالية. الدرجة الحقيقية تحتاج تفاصيل.",
      digitalTwinNote:
        "التوأم الرقمي الكامل يقارن أنماط ماضيك. هنا الطبقة مفاهيمية فقط.",
    },
    it: {
      summary:
        "Questa è un’analisi preliminare strutturata. L’analisi IA completa tornerà disponibile a breve. La tua domanda: «" +
        quote +
        "».",
      dimensions: {
        finances:
          "Servono numeri concreti—reddito, obblighi, riserva. Aggiungili nel contesto.",
        psychology:
          "La psicologia lega sicurezza, paura di perdere e valori. Descrivi emozioni e timori.",
        risks:
          "I rischi coprono tempo, denaro, relazioni e salute—confrontali con la tua realtà.",
        opportunities:
          "Le opportunità emergono quando il passo è allineato agli obiettivi lunghi e c’è supporto.",
      },
      scenarios: {
        bestCase:
          "Caso migliore: risorse sufficienti, supporto stabile, pazienza nell’adattarsi.",
        worstCase:
          "Caso peggiore: fretta, nessun piano B, motivazione soprattutto di fuga.",
        mostLikely:
          "Più spesso una via di mezzo—attrito gestibile con passi e flessibilità.",
      },
      timeline: {
        months6:
          "Dopo 6 mesi compaiono primi segnali: adattamento, stress, progressi pratici.",
        years2:
          "Dopo 2 anni la decisione si stabilizza spesso—nuovo equilibrio o chiarezza.",
        years5:
          "Dopo 5 anni diventa un capitolo; la crescita conta quanto l’esito.",
      },
      scoreRationale:
        "Punteggio demo—non consulenza medica o finanziaria. Servono dettagli veri.",
      digitalTwinNote:
        "Un gemello digitale completo confrontierebbe i pattern passati. Qui è solo concetto.",
    },
  };

  const b = blocks[locale];
  return { ...b, ...professionalDemo(locale), score };
}
