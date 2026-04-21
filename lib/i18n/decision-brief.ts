import type { AppLocale } from "./locale";

export type DecisionBriefCopy = {
  cardTitle: string;
  cardSubtitle: string;
  expand: string;
  collapse: string;
  l1: string;
  l2: string;
  l3: string;
  ph1: string;
  ph2: string;
  ph3: string;
  apply: string;
  sparkTitle: string;
  sparks: readonly [string, string, string, string];
};

const en: DecisionBriefCopy = {
  cardTitle: "60-second decision brief",
  cardSubtitle:
    "Three short prompts — we fill the three analyzer fields so the AI sees structure, not a blank page.",
  expand: "Open",
  collapse: "Hide",
  l1: "Your question in one sentence",
  l2: "What would “success” look like?",
  l3: "Red lines, fears, or deadlines",
  ph1: 'e.g. “Should I relocate for this role?”',
  ph2: "e.g. stable income + family time preserved",
  ph3: "e.g. won’t move before school year ends",
  apply: "Fill analyzer fields",
  sparkTitle: "Try an example",
  sparks: [
    "Should I accept a remote job abroad in 2026?",
    "Leave a stable job to join a friend’s startup?",
    "End a long relationship vs. couples therapy first?",
    "Buy a home now vs. rent another year?",
  ],
};

const hy: DecisionBriefCopy = {
  cardTitle: "60 վայրկյանային որոշման brief",
  cardSubtitle:
    "Երեք կարճ դաշտ — ավտոմատ լցնում ենք վերլուծիչի երեք դաշտերը, որ AI-ն տեսնի կառուցվածք, ոչ թե դատարկ էջ։",
  expand: "Բացել",
  collapse: "Թաքցնել",
  l1: "Քո հարցը մեկ նախադասությամբ",
  l2: "Ինչ կլինի «լավ» արդյունքը",
  l3: "Կարմիր գծեր, վախեր կամ ժամկետներ",
  ph1: "Օրինակ՝ «Արժե՞ տեղափոխվել այս աշխատանքի համար»",
  ph2: "Օրինակ՝ կայուն եկամուտ + ընտանիքի ժամանակ",
  ph3: "Օրինակ՝ չեմ տեղափոխվի մինչ դպրոցական տարին ավարտվի",
  apply: "Լցնել վերլուծիչը",
  sparkTitle: "Փորձել օրինակ",
  sparks: [
    "Արժե՞ 2026-ին ընդունել հեռավար աշխատանք արտերկրում։",
    "Թողնե՞լ կայուն աշխատանքը՝ startup-ի համար։",
    "Ավարտե՞լ երկար հարաբերությունը, թե նախ զույգային թերապիա։",
    "Տուն գնե՞լ հիմա, թե ևս մեկ տարի վարձով մնալ։",
  ],
};

const ru: DecisionBriefCopy = {
  cardTitle: "Краткий бриф за 60 секунд",
  cardSubtitle:
    "Три коротких поля — мы заполняем три поля анализатора, чтобы ИИ видел структуру, а не пустую страницу.",
  expand: "Открыть",
  collapse: "Скрыть",
  l1: "Ваш вопрос одним предложением",
  l2: "Как выглядел бы «успех»?",
  l3: "Красные линии, страхи или сроки",
  ph1: "Напр.: «Стоит ли переезжать из‑за этой роли?»",
  ph2: "Напр.: стабильный доход + время с семьёй",
  ph3: "Напр.: не перееду до конца учебного года",
  apply: "Заполнить поля анализатора",
  sparkTitle: "Пример",
  sparks: [
    "Принять удалённую работу за границей в 2026?",
    "Уйти со стабильной работы в стартап к другу?",
    "Завершить длительные отношения или сначала паратерапия?",
    "Купить жильё сейчас или ещё год аренды?",
  ],
};

const de: DecisionBriefCopy = {
  cardTitle: "60-Sekunden-Entscheidungsbrief",
  cardSubtitle:
    "Drei kurze Felder — wir füllen die drei Analyzer-Felder, damit die KI Struktur sieht, keine leere Seite.",
  expand: "Öffnen",
  collapse: "Ausblenden",
  l1: "Deine Frage in einem Satz",
  l2: "Wie sähe „Erfolg“ aus?",
  l3: "Rote Linien, Ängste oder Fristen",
  ph1: "z. B. „Soll ich wegen dieser Rolle umziehen?“",
  ph2: "z. B. stabiles Einkommen + Familienzeit",
  ph3: "z. B. erst nach Schuljahresende umziehen",
  apply: "Analyzer-Felder füllen",
  sparkTitle: "Beispiel probieren",
  sparks: [
    "Remote-Job im Ausland 2026 annehmen?",
    "Sicheren Job für Freundes-Startup verlassen?",
    "Lange Beziehung beenden vs. zuerst Paartherapie?",
    "Jetzt kaufen oder noch ein Jahr mieten?",
  ],
};

const fr: DecisionBriefCopy = {
  cardTitle: "Brief décisionnel en 60 secondes",
  cardSubtitle:
    "Trois champs courts — nous remplissons les trois champs de l’analyseur pour que l’IA voie une structure, pas une page vide.",
  expand: "Ouvrir",
  collapse: "Masquer",
  l1: "Votre question en une phrase",
  l2: "À quoi ressemblerait la « réussite » ?",
  l3: "Lignes rouges, peurs ou échéances",
  ph1: "ex. « Dois-je déménager pour ce poste ? »",
  ph2: "ex. revenu stable + temps en famille",
  ph3: "ex. pas de déménagement avant la fin de l’année scolaire",
  apply: "Remplir les champs de l’analyseur",
  sparkTitle: "Essayer un exemple",
  sparks: [
    "Accepter un télétravail à l’étranger en 2026 ?",
    "Quitter un emploi stable pour la startup d’un ami ?",
    "Finir une longue relation ou thérapie de couple d’abord ?",
    "Acheter maintenant ou louer encore un an ?",
  ],
};

const es: DecisionBriefCopy = {
  cardTitle: "Brief de decisión en 60 segundos",
  cardSubtitle:
    "Tres campos breves — rellenamos los tres campos del analizador para que la IA vea estructura, no una página en blanco.",
  expand: "Abrir",
  collapse: "Ocultar",
  l1: "Tu pregunta en una frase",
  l2: "¿Cómo sería el «éxito»?",
  l3: "Líneas rojas, miedos o plazos",
  ph1: "p. ej. «¿Mudarme por este puesto?»",
  ph2: "p. ej. ingreso estable + tiempo en familia",
  ph3: "p. ej. no mudarme hasta fin de curso",
  apply: "Rellenar campos del analizador",
  sparkTitle: "Probar un ejemplo",
  sparks: [
    "¿Aceptar un trabajo remoto en el extranjero en 2026?",
    "¿Dejar un trabajo estable por la startup de un amigo?",
    "¿Terminar una relación larga o terapia de pareja primero?",
    "¿Comprar vivienda ahora o alquilar un año más?",
  ],
};

const it: DecisionBriefCopy = {
  cardTitle: "Brief decisionale in 60 secondi",
  cardSubtitle:
    "Tre campi brevi — compiliamo i tre campi dell’analizzatore così l’IA vede struttura, non una pagina vuota.",
  expand: "Apri",
  collapse: "Nascondi",
  l1: "La tua domanda in una frase",
  l2: "Come sarebbe il «successo»?",
  l3: "Linee rosse, paure o scadenze",
  ph1: "es. «Trasferirmi per questa posizione?»",
  ph2: "es. reddito stabile + tempo in famiglia",
  ph3: "es. niente trasferimento prima della fine dell’anno scolastico",
  apply: "Compila i campi dell’analizzatore",
  sparkTitle: "Prova un esempio",
  sparks: [
    "Accettare un remoto all’estero nel 2026?",
    "Lasciare un lavoro stabile per la startup di un amico?",
    "Chiudere una relazione lunga o terapia di coppia prima?",
    "Comprare casa ora o affittare un altro anno?",
  ],
};

const ar: DecisionBriefCopy = {
  cardTitle: "ملخص قرار في 60 ثانية",
  cardSubtitle:
    "ثلاثة حقول قصيرة — نملأ الحقول الثلاثة للمحلّل حتى يرى الذكاء الاصطناعي هيكلاً لا صفحة فارغة.",
  expand: "فتح",
  collapse: "إخفاء",
  l1: "سؤالك في جملة واحدة",
  l2: "كيف يبدو «النجاح»؟",
  l3: "خطوط حمراء أو مخاوف أو مواعيد",
  ph1: "مثال: «هل أنتقل من أجل هذا الدور؟»",
  ph2: "مثال: دخل ثابت + وقت للعائلة",
  ph3: "مثال: لا انتقال قبل نهاية العام الدراسي",
  apply: "تعبئة حقول المحلّل",
  sparkTitle: "جرّب مثالاً",
  sparks: [
    "أقبل وظيفة عن بُعد في الخارج في 2026؟",
    "أترك وظيفة ثابتة لشركة صديق ناشئة؟",
    "أنهي علاقة طويلة أم العلاج الزوجي أولاً؟",
    "أشتري منزلاً الآن أم أستأجر سنة أخرى؟",
  ],
};

const table: Record<AppLocale, DecisionBriefCopy> = {
  "en-US": en,
  en,
  hy,
  ru,
  de,
  fr,
  es,
  ar,
  it,
};

export function getDecisionBriefCopy(locale: AppLocale): DecisionBriefCopy {
  return table[locale] ?? en;
}
