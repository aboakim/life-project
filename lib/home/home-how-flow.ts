import type { AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";

export type HowFlowStep = {
  title: string;
  body: string;
  /** Example prompt or output snippet */
  sample: string;
  /** Short “you get this” line */
  payoff: string;
  icon: string;
};

const INTRO: Partial<Record<AppLocale, string>> = {
  "en-US":
    "From “I can’t decide” to a structured report in minutes—not another endless chat thread.",
  en: "From “I can’t decide” to a structured report in minutes—not another endless chat thread.",
  hy: "«Չեմ կարող որոշել»-ից մինչև կառուցված հաշվետվություն՝ րոպեների մեջ, ոչ թե անվերջ chat։",
  ru: "От «не могу решить» до структурированного отчёта за минуты — не бесконечный чат.",
  de: "Von „ich komme nicht weiter“ zum strukturierten Bericht in Minuten — kein endloser Chat.",
  fr: "De « je n’arrive pas à trancher » à un rapport structuré en quelques minutes.",
  es: "De « no puedo decidir » a un informe estructurado en minutos — sin chat infinito.",
  it: "Da « non riesco a decidere » a un report strutturato in pochi minuti.",
  ar: "من «لا أستطيع أن أقرر» إلى تقرير منظم في دقائق — دون محادثة لا تنتهي.",
};

const PAYOFFS: Partial<Record<AppLocale, [string, string, string]>> = {
  "en-US": [
    "Your words stay private in this session.",
    "Three paths + four lenses on one screen.",
    "Copy, save, or bring it to an expert.",
  ],
  en: [
    "Your words stay private in this session.",
    "Three paths + four lenses on one screen.",
    "Copy, save, or bring it to an expert.",
  ],
  hy: [
    "Ձեր տեքստը մնում է այս սեսիայում։",
    "Երեք ուղի + չորս հարթակ մեկ էկրանին։",
    "Պատճենեք, պահեք կամ տարեք մասնագետին։",
  ],
  ru: [
    "Текст остаётся в этой сессии.",
    "Три пути и четыре оси на одном экране.",
    "Скопируйте или обсудите с профессионалом.",
  ],
};

export function getHowFlowIntro(locale: AppLocale): string {
  return (
    INTRO[locale] ??
    INTRO.en ??
    "From a stuck feeling to a structured report in minutes."
  );
}

export function getHowFlowSteps(locale: AppLocale): HowFlowStep[] {
  const t = getUi(locale);
  const payoffs =
    PAYOFFS[locale] ??
    PAYOFFS.en ??
    ([
      "Private session.",
      "Structured comparison.",
      "Actionable report.",
    ] as const);
  const samples = [
    t.homeDemoExample1,
    `${t.bentoCards[0]?.title ?? "Best"} · ${t.bentoCards[1]?.title ?? "Lenses"}`,
    `${t.bentoCards[2]?.title ?? "Timeline"} · 64% ${t.bentoCards[3]?.pill ?? "score"}`,
  ];
  const icons = ["✍️", "🔀", "📋"];

  return t.howSteps.map((step, i) => ({
    title: step.title,
    body: step.body,
    sample: samples[i] ?? "",
    payoff: payoffs[i] ?? "",
    icon: icons[i] ?? "•",
  }));
}
