import type { DecisionAnalysis, SuggestedDirectoryRole } from "../types";
import type { AppLocale } from "./locale";

export type DemoAnalysisOptions = {
  stakesLevel?: number;
  context?: string;
  constraints?: string;
};

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

/** Picks 1 of 3 strings so parallel fields do not all pick the same index. */
function pickText(
  seed: number,
  salt: string,
  options: [string, string, string],
): string {
  return options[(seed ^ hashString(salt)) % 3];
}

/** Three short openers + one body → one picked string (per-field variety). */
function join3(
  seed: number,
  salt: string,
  prefixes: [string, string, string],
  body: string,
): string {
  return pickText(seed, salt, [
    prefixes[0] + body,
    prefixes[1] + body,
    prefixes[2] + body,
  ]);
}

function base(decision: string, seed: number) {
  const quote = decision.slice(0, 200) || "—";
  return { quote, score: clampScore(seed) };
}

function professionalDemo(
  locale: AppLocale,
  quote: string,
  seed: number,
): Pick<DecisionAnalysis, "professionalGuidance" | "suggestedDirectoryRole"> {
  const q = quote.slice(0, 100).trim() || "—";
  if (locale === "hy") {
    return {
      professionalGuidance: pickText(seed, "prof:hy", [
        `«${q}» հարցի բնույթից է կախված, թե ով կարող է օգնել՝ որակավորված հոգեբան/թերապիստ, իրավաբան, ֆինանսական խորհրդատու, career coach, միգրացիայի մասնագետ, կամ բժիշկ, եթե առողջական ռիսկ կա։ Software-ը ուրվագիծ է, ոչ փոխարինում լիցենզավորված մասնագետի ձեր երկրում։`,
        `Ձեր «${q}» նկարագրման հիման վրա արժե առանձնացնել՝ ոլորտներից ո՞րն է հիմնական ռիսկը (ֆինանս, իրավունք, հոգեբանական, միգրացիա)։ Գործիքը տալիս է ուրվագիծ, ոչ փոխարինում խորը խորհրդատվության, երբ ռիսկը բարձր է։`,
        `Եթե «${q}»-ում կան ռեգուլյարոված թեմաներ, աշխատեք համապատասխան մասնագետների հետ, ովքեր լիցենզավորված են ձեր երկրում։ Վերևի բլոքը աբստրակտ է, առանց ձեր իրավիճակի մանրամասների։`,
      ]),
      suggestedDirectoryRole: "UNSPECIFIED",
    };
  }
  return {
    professionalGuidance: pickText(seed, "prof:en", [
      `Given the themes in your note (starting «${q}…»), the right help depends on domain: licensed mental-health support for distress or relationship harm; a qualified attorney for legal exposure; a financial or tax adviser for money/contract trade-offs; immigration counsel for cross-border rules; a coach for career structure; a physician for health-related forks. This tool sketches trade-offs, not a substitute for regulated advice where you need it.`,
      `To match «${q}» to help: separate emotional load from material/legal facts—therapists and coaches for the human side; lawyers and planners for the structural side. This output does not know your jurisdiction; a local professional should review anything with serious downside.`,
      `Your text «${q}» is the anchor. If the fork involves binding contracts, taxes, visas, or medical risk, treat this as a planning sketch only, and confirm details with a licensed professional in that field.`,
    ]),
    suggestedDirectoryRole: "UNSPECIFIED" as SuggestedDirectoryRole,
  };
}

function demoEnglish(
  quote: string,
  seed: number,
): Omit<DecisionAnalysis, "score" | "professionalGuidance" | "suggestedDirectoryRole"> {
  const q = quote.slice(0, 120).trim() || "your question";
  return {
    summary: pickText(seed, "en:summary", [
      `Structured preview (demo/fallback) while live AI is unavailable. Centered on your wording: «${quote.slice(0, 220)}».`,
      `This block is a formatted placeholder tied to what you typed. Focus: «${quote.slice(0, 220)}». Add Context for tighter numbers or legal detail.`,
      `Preview analysis anchored to: «${quote.slice(0, 220)}». Sections below weave your snippet in so the page does not read like a generic template.`,
    ]),
    dimensions: {
      finances:
        pickText(seed, "en:df:l", [
          `On the money side of «${q}»: `,
          `For cashflow and trade-offs in «${q}»: `,
          `Stress-testing the financial angle of «${q}»: `,
        ]) +
        pickText(seed, "en:df:b", [
          "split one-time and recurring costs; add income and fixed obligations in Context so a later pass can be numeric.",
          "if your note hints at tax, debt, or contract terms, a planner needs those figures, not a mood score alone.",
          "runway and worst-month liquidity usually decide comfort—spell them out if you re-run in live mode.",
        ]),
      psychology:
        pickText(seed, "en:dp:l", [
          `Emotionally, reading your «${q}»: `,
          `On mindset around «${q}»: `,
          `The human layer of «${q}»: `,
        ]) +
        pickText(seed, "en:dp:b", [
          "name the fear under the decision—loss of status, love, or safety—so you do not choose only to numb it.",
          "separate what you can influence this month from what is legacy anxiety from older chapters.",
          "check whether motivation is approach (toward a life you want) or avoidance (fleeing discomfort); both are valid, different plans.",
        ]),
      risks:
        pickText(seed, "en:dr:l", [
          `Risks that touch «${q}» include: `,
          `A blunt risk scan for «${q}»: `,
          `If we stress «${q}» for downside: `,
        ]) +
        pickText(seed, "en:dr:b", [
          "time, money, relationships, and reputation; rank which you cannot afford to break.",
          "second-order effects (family reaction, tax years, health habits) not just the first obvious loss.",
          "reversibility: some doors close fast—note which are hard to undo.",
        ]),
      opportunities:
        pickText(seed, "en:do:l", [
          `Upside paths tied to «${q}»: `,
          `Opportunity angle on «${q}»: `,
          `If «${q}» goes well: `,
        ]) +
        pickText(seed, "en:do:b", [
          "clarity, skill growth, or alignment you could not get by staying in the same pattern.",
          "support networks or mentors that appear only if you make the more visible, scarier move.",
          "compounding: small wins in year one that matter more by year three.",
        ]),
    },
    scenarios: {
      bestCase: pickText(seed, "en:sb", [
        `Best realistic case: resources and support match what «${q}» demands, and you give the curve time to bend.`,
        `If things go right for «${q}», you have runway, a trusted person in your corner, and room to learn without faking instant mastery.`,
        `High-side outcome: the decision you describe in «${q}» unlocks a chapter you are proud to own, not just relief.`,
      ]),
      worstCase: pickText(seed, "en:sw", [
        `Hard downside: you rush «${q}» without a plan B, or the driver is pure escape, so the old problem follows you in a new shape.`,
        `Pessimistic but plausible: hidden costs, legal or health surprises, or isolation if you have not built support for «${q}».`,
        `Worst case is often neglect—stacking the decision on top of unaddressed burnout or money leaks mentioned around «${q}».`,
      ]),
      mostLikely: pickText(seed, "en:sm", [
        `Most likely: a workable middle for «${q}»—some friction, some wins; progress if you break it into small tracked steps rather than a single dramatic leap.`,
        `The center path: you muddle through «${q}» with a mix of stress and small proofs that you chose consciously.`,
        `Expect mixed signals in year one, then a clearer read by year two on whether the bet behind «${q}» is paying off.`,
      ]),
    },
    timeline: {
      months6: pickText(seed, "en:t6", [
        `In ~6 months after acting on «${q}», you usually see first signals: stress level, money rhythm, and whether the move feels sustainable.`,
        `Half a year out: early habits around «${q}» (communication, budget, or treatment) start to show in outcomes.`,
        `Six months: enough data to know if the pain you feared was accurate or if adjustment is faster than you assumed.`,
      ]),
      years2: pickText(seed, "en:t2", [
        `~2 years: «${q}» either stabilizes into a new normal or you have evidence you need a correction—not shame, data.`,
        `Two-year horizon: compounding of choices made in year one; relationships and finances from «${q}» are clearer.`,
        `By year two you often know if the values behind «${q}» are still the ones you want to fund with your life.`,
      ]),
      years5: pickText(seed, "en:t5", [
        `~5 years: «${q}» becomes a chapter; growth and trade-offs you accepted matter as much as the headline outcome.`,
        `Long arc: the story you tell about «${q}» is usually more nuanced than “success/fail.”`,
        `Five years out: the bet embedded in «${q}» has either paid in identity clarity or you have moved again—with less fog.`,
      ]),
    },
    scoreRationale: pickText(seed, "en:sc", [
      `Demo score only—not advice. It varies with your exact text; live mode would weigh numbers and constraints in «${q}».`,
      `Illustrative alignment score, anchored to the hash of your input, not a professional assessment of «${q}».`,
      `Placeholder 0–100; real scoring would need your metrics and deal-breakers around «${q}».`,
    ]),
    digitalTwinNote: pickText(seed, "en:dt", [
      `A “future you” looking back at «${q}» might care most about what you were avoiding naming fully—honesty beats velocity.`,
      `From later: the deciding factor about «${q}» was probably not the first fear you listed, but the support and cash details under it.`,
      `Retrospect voice: you would want «${q}» chosen with a written worst-case, not a midnight impulse.`,
    ]),
  };
}

function demoArmenian(
  quote: string,
  seed: number,
): Omit<DecisionAnalysis, "score" | "professionalGuidance" | "suggestedDirectoryRole"> {
  const q = quote.slice(0, 120).trim() || "ձեր հարցը";
  return {
    summary: pickText(seed, "hy:summary", [
      `Սա ցուցադրական կառուցվածքային վերլուծություն է (live AI-ի բացակայության դեպքում), կապակցված ձեր տեքստին՝ «${quote.slice(0, 220)}»։`,
      `Նախնական բլոկ, որը կառուցվում է ձեր արտահայտությունից. կենտրոնական տող՝ «${quote.slice(0, 220)}»։ Կոնտեքստ ավելացրեք մանրամասների համար։`,
      `Նախադիտում՝ հիմնված «${quote.slice(0, 220)}»-ի վրա։ Ստորև յուրաքանչյուր բաժին ձեր մեջբերումը հաշվի է առնում, որպեսզի արդյունքը չկրկնվի մեկ այլ օգտատիրոջը։`,
    ]),
    dimensions: {
      finances:
        pickText(seed, "hy:df:l", [
          `«${q}»-ի ֆինանսական հարթակ. `,
          `Գումարի կողմը «${q}»-ում. `,
          `Եթե «${q}»-ին նայենք ֆինանսներով. `,
        ]) +
        pickText(seed, "hy:df:b", [
          "առանձնացրեք մեկանգամյա և կրկնվող ծախսերը, ավելացրեք եկամուտը «Կոնտեքստ» դաշտում։",
          "հարկային կամ պարտավորության մանրամասրությունները չեն գուշակվում, պետք են թվեր։",
          "ամենավատ ամսվա լուծարությունը հաճախ ավելի կարևոր է, քան միջինը։",
        ]),
      psychology:
        pickText(seed, "hy:dp:l", [
          `Հոգեբանական շերտ «${q}»-ի շուրջ. `,
          `Զգացումների մասին «${q}»-ում. `,
          `Ի՞նչ վախ է թաքնված «${q}»-ի ետևում. `,
        ]) +
        pickText(seed, "hy:dp:b", [
          "անուն տվեք կորստից կամ ամոթից ծագող լարվածությանը, ոչ միայն արդյունքի արագ արագաչափին։",
          "ստուգեք՝ մոտիվը մոտենում է, թե միայն «փախնել» նախնական ցավից։",
          "պարզեք՝ ինչ աջակցություն է իրականում հասանելի, նախքան «այո» ասելը։",
        ]),
      risks:
        pickText(seed, "hy:dr:l", [
          `Ռիսկերի բաց սկան «${q}»-ի համար. `,
          `Ի՞նչ կարող է ձախով գնալ «${q}»-ում. `,
          `Եթե ճակատագրական սխալ «${q}»-ի պարագայում. `,
        ]) +
        pickText(seed, "hy:dr:b", [
          "ժամանակ, գումար, հարաբերություններ, առողջություն — դասավորեք ըստ անդառնալիության։",
          "երկրորդ կարգի հետևանքներ (ընտանիք, վիզա, աշխատանք) հաճախ մոռացվում են։",
          "ոչ բոլոր որոշումները հեշտությամբ հետ են կանչվում — նշեք որոնք «փակ դուռ» են։",
        ]),
      opportunities:
        pickText(seed, "hy:do:l", [
          `Հնարավոր շահեր «${q}»-ի պարագայում. `,
          `Բաց դրական հորիզոն «${q}»-ի համար. `,
          `Եթե «${q}»-ը աշխատի. `,
        ]) +
        pickText(seed, "hy:do:b", [
          "կարող է բացել հմտություն, հավատ կամ ցանց, որ չէիք ավելացնի, մնալով հին օրակարգում։",
          "փոքր հաղթող քայլեր, որոնք ավելի շատ են կշռում երրորդ տարում, քան առաջինում։",
          "հստակություն, թե արդյոք արժեքները, որ ձեզ տանում են այս որոշմանը, ձերն են, թե արտաքին սպասումներ։",
        ]),
    },
    scenarios: {
      bestCase: pickText(seed, "hy:sb", [
        `Լավագույն իրատեսական դեպքում «${q}»-ի պահանջներին համապատասխանում են ռեսուրսը և աջակցությունը, և ժամանակ՝ սովորելու համար։`,
        `Բարձր կողմ. «${q}»-ը ձեզ չի պահանջում արհեստական «կատարյալություն», այլ ազնիվ ռիթմ։`,
        `Եթե ամենը գնա լավ, «${q}»-ը հպարտության գոտի է, ոչ միայն ազատում նախնական ցավից։`,
      ]),
      worstCase: pickText(seed, "hy:sw", [
        `Դժվար դեպք. «${q}»-ը արագ, առանց ռեզերվ plan B, կամ մոտիվը մաքուր «փախնել» է, նույնը հետևում է։`,
        `Պեսիմիստական բայց հնարավոր. թաքնված արժեքներ, իրավական/առողջական անակնկալներ «${q}»-ի շուրջ։`,
        `Վատագույնը հաճախ անուշադրությունն է՝ «${q}»-ն կույր բերել այրվածքի կամ պարտքի մնացորդի վրա։`,
      ]),
      mostLikely: pickText(seed, "hy:sm", [
        `Ամենահավանականը միջին ուղին է «${q}»-ի համար՝ կառավարելի դժվարություններ, եթե պլանավորեք քայլ առ քայլ։`,
        `Կենտրոնական ուղի. «${q}»-ով անցնում եք սթրեսի և փոքր հաղթանակների խառնուրդով, բայց գիտակցված։`,
        `Տարվա ընթացքում խառն ազդանշաններ, երկրորդ տարում ավելի պարզ է՝ արդյոք «${q}»-ի վրա արված բետը աշխատում է։`,
      ]),
    },
    timeline: {
      months6: pickText(seed, "hy:t6", [
        `~6 ամիս «${q}»-ի վրա աշխատելուց հետո երևում են առաջին ազդանշանները՝ սթրես, գումարի ռիթմ, կայունություն։`,
        `Կես տարի. «${q}»-ի շուրջ նոր սովորությունները սկսում են երևալ արդյունքում։`,
        `Վեց ամիս՝ բավական է հասկանալու, թե արդյոց վախը իրատեսական էր, թե հարմարվումն ավելի արագ է։`,
      ]),
      years2: pickText(seed, "hy:t2", [
        `~2 տարի. «${q}»-ը կայանում է նոր նորմայի մեջ, կամ ունեք տվյալներ ուղղում անելու համար։`,
        `Երկու տարի. առաջին տարվա ընտրությունների կուտակումը երևում է հարաբերություններում և ֆինանսներում։`,
        `Տարիներ անց արդեն պարզ է՝ արդյոք «${q}»-ի արժեքները դեռ ձերն են։`,
      ]),
      years5: pickText(seed, "hy:t5", [
        `~5 տարի. «${q}»-ը դառնում է պատմության մի մասը, աճը նույնքան կարևոր է, որքան ելքը։`,
        `Երկար աղեղ. «${q}»-ի մասին պատմությունը սովորաբար ավելի բարդ է, քան «հաջողություն/ձախողություն»։`,
        `Հինգ տարի հետո՝ բետը կամ հստակություն է տվել, կամ նոր քայլ եք արել ավելի քիչ մառախուղով։`,
      ]),
    },
    scoreRationale: pickText(seed, "hy:sc", [
      `Ցուցադրական միավոր է (ոչ բժշկական/ֆինանսական խորհուրդ)։ Փոխվում է ձեր տեքստի hash-ով, ոչ մասնագիտական գնահատական «${q}»-ի համար։`,
      `Իլուստրատիվ 0–100, ոչ թե իրական գնահատական «${q}»-ի համար առանց թվերի և սահմանափակումների։`,
      `Տեղապահ միավոր. live ռեժիմում կկշռվեն ձեր մետրիկները «${q}»-ի շուրջ։`,
    ]),
    digitalTwinNote: pickText(seed, "hy:dt", [
      `«Ապագա դու»-ն, նայելով «${q}»-ին հետո, կարող է ամենից շատ նշել այն, ինչը չէիք ուզում անուն տալ՝ ազնություն արագությունից կարևոր է։`,
      `Հետահայաց աչքով՝ «${q}»-ի վճռական գործոնը հաճախ ոչ առաջին վախն է, այլ աջակցության և գումարի մանրամասները նրա տակ։`,
      `Ցանկալի է «${q}»-ը ընտրել գրավոր worst-case-ով, ոչ միջնագիշերային ազդեցությամբ։`,
    ]),
  };
}

function preRu(q: string): [string, string, string] {
  const qs = q.slice(0, 100).trim() || "…";
  return [
    `Учитывая «${qs}», `,
    `Если разложить «${qs}» на части, `,
    `В рамках вашего вопроса «${qs}», `,
  ];
}
function preDe(q: string): [string, string, string] {
  const qs = q.slice(0, 100).trim() || "…";
  return [
    `Bezogen auf «${qs}»: `,
    `Wenn man «${qs}» auseinandernimmt: `,
    `Im Kontext von «${qs}»: `,
  ];
}
function preFr(q: string): [string, string, string] {
  const qs = q.slice(0, 100).trim() || "…";
  return [
    `Au regard de «${qs}», `,
    `Si l’on détaille «${qs}», `,
    `Dans le cadre de «${qs}», `,
  ];
}
function preEs(q: string): [string, string, string] {
  const qs = q.slice(0, 100).trim() || "…";
  return [
    `En el marco de «${qs}», `,
    `Si desglosas «${qs}», `,
    `Pensando en «${qs}», `,
  ];
}
function preAr(q: string): [string, string, string] {
  const qs = q.slice(0, 100).trim() || "…";
  return [
    `في ضوء «${qs}»، `,
    `إذا فصّلنا «${qs}»، `,
    `في إطار سؤالك «${qs}»، `,
  ];
}
function preIt(q: string): [string, string, string] {
  const qs = q.slice(0, 100).trim() || "…";
  return [
    `Guardando «${qs}», `,
    `Se scomponi «${qs}», `,
    `Nel contesto di «${qs}», `,
  ];
}

export function buildDemoAnalysis(
  decision: string,
  locale: AppLocale,
  options?: DemoAnalysisOptions,
): DecisionAnalysis {
  const material = [
    decision.trim(),
    options?.context?.trim() ?? "",
    options?.constraints?.trim() ?? "",
  ]
    .filter(Boolean)
    .join("\n---\n");
  const seed = hashString(material || "empty");
  const { quote, score } = base(decision, seed);

  const ruP = preRu(quote);
  const deP = preDe(quote);
  const frP = preFr(quote);
  const esP = preEs(quote);
  const arP = preAr(quote);
  const itP = preIt(quote);

  const blocks: Record<
    AppLocale,
    Omit<
      DecisionAnalysis,
      "score" | "professionalGuidance" | "suggestedDirectoryRole"
    >
  > = {
    hy: demoArmenian(quote, seed),
    en: demoEnglish(quote, seed),
    "en-US": demoEnglish(quote, seed),
    ru: {
      summary: pickText(seed, "ru:sum", [
        `Это структурированный предварительный анализ (демо/резерв). В фокусе ваш текст: «${quote.slice(0, 220)}».`,
        `Предпросмотр, привязанный к формулировке: «${quote.slice(0, 220)}». Добавьте цифры и детали в Контекст.`,
        `Демо-блок, чтобы страница не выглядела одинаково для разных вопросов. Ваш фрагмент: «${quote.slice(0, 220)}».`,
      ]),
      dimensions: {
        finances: join3(
          seed,
          "ru:df",
          ruP,
          "Финансы требуют конкретных цифр—доход, обязательства, запас прочности. Добавьте их в поле «Контекст».",
        ),
        psychology: join3(
          seed,
          "ru:dp",
          ruP,
          "Психология связана с безопасностью, страхом потерь и ценностями. Опишите чувства и страхи.",
        ),
        risks: join3(
          seed,
          "ru:dr",
          ruP,
          "Риски включают время, деньги, отношения и здоровье. Сопоставьте их с вашей реальностью.",
        ),
        opportunities: join3(
          seed,
          "ru:do",
          ruP,
          "Возможности открываются, когда шаг согласуется с долгими целями и есть поддержка.",
        ),
      },
      scenarios: {
        bestCase: join3(
          seed,
          "ru:sb",
          ruP,
          "Лучший случай: достаточно ресурсов, устойчивая поддержка и терпение к адаптации.",
        ),
        worstCase: join3(
          seed,
          "ru:sw",
          ruP,
          "Худший случай: поспешность, нет плана B или мотивация — в основном «сбежать», а не выбрать.",
        ),
        mostLikely: join3(
          seed,
          "ru:sm",
          ruP,
          "Чаще всего — середина: терния, с которой можно справиться по шагам и с гибкостью.",
        ),
      },
      timeline: {
        months6: join3(
          seed,
          "ru:t6",
          ruP,
          "Через 6 месяцев видны первые сигналы: адаптация, стресс, практические шаги.",
        ),
        years2: join3(
          seed,
          "ru:t2",
          ruP,
          "Через 2 года решение обычно стабилизируется: новое равновесие или ясность про коррекцию.",
        ),
        years5: join3(
          seed,
          "ru:t5",
          ruP,
          "Через 5 лет это часто становится частью истории; важен рост, а не только «да/нет».",
        ),
      },
      scoreRationale: join3(
        seed,
        "ru:sc",
        ruP,
        "Демо-оценка—не медицинский и не финансовый совет. Реальная оценка требует деталей.",
      ),
      digitalTwinNote: join3(
        seed,
        "ru:dt",
        ruP,
        "Полный «цифровой двойник» сравнил бы прошлые паттерны. Здесь это лишь концепция.",
      ),
    },
    de: {
      summary: pickText(seed, "de:sum", [
        `Strukturierte Vorschau (Demo/Fallback). Im Mittelpunkt steht Ihr Text: «${quote.slice(0, 220)}».`,
        `Vorschau, gebunden an: «${quote.slice(0, 220)}». Tragen Sie Zahlen und Details im Kontext ein.`,
        `Demo-Block, damit die Seite nicht für jeden identisch wirkt. Ihr Ausschnitt: «${quote.slice(0, 220)}».`,
      ]),
      dimensions: {
        finances: join3(
          seed,
          "de:df",
          deP,
          "Finanzen brauchen konkrete Zahlen—Einkommen, Verpflichtungen, Puffer. Trage sie im Kontext ein.",
        ),
        psychology: join3(
          seed,
          "de:dp",
          deP,
          "Psychologie hängt mit Sicherheit, Verlustangst und Werten zusammen. Beschreibe Gefühle und Ängste.",
        ),
        risks: join3(
          seed,
          "de:dr",
          deP,
          "Risiken umfassen Zeit, Geld, Beziehungen und Gesundheit—im Vergleich zu deiner Realität abwägen.",
        ),
        opportunities: join3(
          seed,
          "de:do",
          deP,
          "Chancen entstehen, wenn der Schritt langfristigen Zielen entspricht und Unterstützung da ist.",
        ),
      },
      scenarios: {
        bestCase: join3(
          seed,
          "de:sb",
          deP,
          "Bester Fall: genug Ressourcen, stabile Unterstützung, Geduld beim Ankommen.",
        ),
        worstCase: join3(
          seed,
          "de:sw",
          deP,
          "Schlimmster Fall: Eile, kein Plan B oder Motivation vor allem als Flucht.",
        ),
        mostLikely: join3(
          seed,
          "de:sm",
          deP,
          "Wahrscheinlich die Mitte—machbare Reibung mit Planung und Flexibilität.",
        ),
      },
      timeline: {
        months6: join3(
          seed,
          "de:t6",
          deP,
          "Nach 6 Monaten siehst du erste Signale: Anpassung, Stress, praktische Fortschritte.",
        ),
        years2: join3(
          seed,
          "de:t2",
          deP,
          "Nach 2 Jahren stabilisiert sich die Entscheidung oft—neues Gleichgewicht oder Klarheit.",
        ),
        years5: join3(
          seed,
          "de:t5",
          deP,
          "Nach 5 Jahren wird es oft zu einem Kapitel; Wachstum zählt genauso wie das Ergebnis.",
        ),
      },
      scoreRationale: join3(
        seed,
        "de:sc",
        deP,
        "Demo-Score—kein medizinischer oder finanzieller Rat. Echte Bewertung braucht Details.",
      ),
      digitalTwinNote: join3(
        seed,
        "de:dt",
        deP,
        "Ein voller digitaler Zwilling würde frühere Muster vergleichen. Hier nur eine Idee.",
      ),
    },
    fr: {
      summary: pickText(seed, "fr:sum", [
        `Aperçu structuré (démo/secours). Au centre : «${quote.slice(0, 220)}».`,
        `Prévisualisation liée à : «${quote.slice(0, 220)}». Ajoutez des chiffres et du contexte.`,
        `Bloc démo pour éviter une page identique pour chaque question. Extrait : «${quote.slice(0, 220)}».`,
      ]),
      dimensions: {
        finances: join3(
          seed,
          "fr:df",
          frP,
          "Les finances exigent des chiffres concrets—revenus, obligations, coussin. Ajoutez-les au contexte.",
        ),
        psychology: join3(
          seed,
          "fr:dp",
          frP,
          "La psychologie relie sécurité, peur de perdre et valeurs. Décrivez ressentis et craintes.",
        ),
        risks: join3(
          seed,
          "fr:dr",
          frP,
          "Les risques couvrent le temps, l’argent, les relations et la santé—à pondérer avec votre réalité.",
        ),
        opportunities: join3(
          seed,
          "fr:do",
          frP,
          "Les opportunités apparaissent quand le choix s’aligne sur vos objectifs long terme et le soutien.",
        ),
      },
      scenarios: {
        bestCase: join3(
          seed,
          "fr:sb",
          frP,
          "Meilleur cas : ressources suffisantes, soutien stable, patience pour s’adapter.",
        ),
        worstCase: join3(
          seed,
          "fr:sw",
          frP,
          "Pire cas : précipitation, pas de plan B, motivation surtout une fuite.",
        ),
        mostLikely: join3(
          seed,
          "fr:sm",
          frP,
          "Le plus souvent : un milieu de terrain—friction gérable avec étapes et souplesse.",
        ),
      },
      timeline: {
        months6: join3(
          seed,
          "fr:t6",
          frP,
          "Après 6 mois : premiers signaux—ajustement, stress, progrès concrets.",
        ),
        years2: join3(
          seed,
          "fr:t2",
          frP,
          "Après 2 ans : stabilisation—nouvel équilibre ou clarté pour corriger.",
        ),
        years5: join3(
          seed,
          "fr:t5",
          frP,
          "Après 5 ans : souvent un chapitre de votre histoire ; la croissance compte.",
        ),
      },
      scoreRationale: join3(
        seed,
        "fr:sc",
        frP,
        "Score démo—pas un avis médical ou financier. Un vrai score exige du détail.",
      ),
      digitalTwinNote: join3(
        seed,
        "fr:dt",
        frP,
        "Un jumeau numérique complet comparerait vos habitudes passées. Ici, concept seulement.",
      ),
    },
    es: {
      summary: pickText(seed, "es:sum", [
        `Vista previa estructurada (demo/respaldo). En el centro: «${quote.slice(0, 220)}».`,
        `Previsualización ligada a: «${quote.slice(0, 220)}». Añade cifras y contexto.`,
        `Bloque demo para que la página no sea idéntica para cada pregunta. Extracto: «${quote.slice(0, 220)}».`,
      ]),
      dimensions: {
        finances: join3(
          seed,
          "es:df",
          esP,
          "Las finanzas necesitan cifras concretas—ingresos, obligaciones, colchón. Añádelas en Contexto.",
        ),
        psychology: join3(
          seed,
          "es:dp",
          esP,
          "La psicología conecta seguridad, miedo a perder y valores. Describe emociones y temores.",
        ),
        risks: join3(
          seed,
          "es:dr",
          esP,
          "Los riesgos incluyen tiempo, dinero, relaciones y salud—contrasta con tu situación real.",
        ),
        opportunities: join3(
          seed,
          "es:do",
          esP,
          "Las oportunidades aparecen cuando el paso encaja con metas largas y hay apoyo.",
        ),
      },
      scenarios: {
        bestCase: join3(
          seed,
          "es:sb",
          esP,
          "Mejor caso: recursos suficientes, apoyo estable y paciencia para adaptarte.",
        ),
        worstCase: join3(
          seed,
          "es:sw",
          esP,
          "Peor caso: prisa, sin plan B o motivación sobre todo de huir.",
        ),
        mostLikely: join3(
          seed,
          "es:sm",
          esP,
          "Lo más frecuente es un término medio—fricción manejable con pasos y flexibilidad.",
        ),
      },
      timeline: {
        months6: join3(
          seed,
          "es:t6",
          esP,
          "A los 6 meses ves primeras señales: ajuste, estrés, avances prácticos.",
        ),
        years2: join3(
          seed,
          "es:t2",
          esP,
          "A los 2 años suele estabilizarse—nuevo equilibrio o claridad para corregir.",
        ),
        years5: join3(
          seed,
          "es:t5",
          esP,
          "A los 5 años suele ser un capítulo; el crecimiento importa tanto como el resultado.",
        ),
      },
      scoreRationale: join3(
        seed,
        "es:sc",
        esP,
        "Puntuación demo—no es consejo médico ni financiero. Hacen falta detalles reales.",
      ),
      digitalTwinNote: join3(
        seed,
        "es:dt",
        esP,
        "Un gemelo digital completo compararía patrones pasados. Aquí solo es conceptual.",
      ),
    },
    ar: {
      summary: pickText(seed, "ar:sum", [
        `معاينة منظّمة (تجريبي/احتياطي). في المركز: «${quote.slice(0, 220)}».`,
        `معاينة مرتبطة بـ: «${quote.slice(0, 220)}». أضف أرقامًا وسياقًا.`,
        `كتلة تجريبية حتى لا تبدو الصفحة متطابقة لكل سؤال. مقتطف: «${quote.slice(0, 220)}».`,
      ]),
      dimensions: {
        finances: join3(
          seed,
          "ar:df",
          arP,
          "المالية تحتاج أرقامًا واضحة—الدخل، الالتزامات، الهامش. أضفها في حقل السياق.",
        ),
        psychology: join3(
          seed,
          "ar:dp",
          arP,
          "الجانب النفسي يرتبط بالأمان، الخوف من الخسارة، والقيم. صِف مشاعرك ومخاوفك.",
        ),
        risks: join3(
          seed,
          "ar:dr",
          arP,
          "المخاطر تشمل الوقت والمال والعلاقات والصحة—قارنها بواقعك.",
        ),
        opportunities: join3(
          seed,
          "ar:do",
          arP,
          "تظهر الفرص عندما يتوافق القرار مع أهدافك طويلة الأجل وتتوفر الدعم.",
        ),
      },
      scenarios: {
        bestCase: join3(
          seed,
          "ar:sb",
          arP,
          "أفضل حالة: موارد كافية، دعم ثابت، وصبر على التأقلم دون مطالبة كمال فوري.",
        ),
        worstCase: join3(
          seed,
          "ar:sw",
          arP,
          "أسوأ حالة: عجلة، لا خطة بديلة، أو الدافع هروب أكثر من اختيار واعٍ.",
        ),
        mostLikely: join3(
          seed,
          "ar:sm",
          arP,
          "الأرجح مسارًا أوسطًا—احتكاك يمكن إدارته بخطوات ومرونة.",
        ),
      },
      timeline: {
        months6: join3(
          seed,
          "ar:t6",
          arP,
          "بعد 6 أشهر تظهر إشارات أولى: تكيف، ضغط، تقدم عملي.",
        ),
        years2: join3(
          seed,
          "ar:t2",
          arP,
          "بعد سنتين غالبًا يستقر القرار—توازن جديد أو وضوح للتصحيح.",
        ),
        years5: join3(
          seed,
          "ar:t5",
          arP,
          "بعد 5 سنوات يصبح غالبًا فصلًا من قصتك؛ النمو مهم مثل النتيجة.",
        ),
      },
      scoreRationale: join3(
        seed,
        "ar:sc",
        arP,
        "درجة تجريبية—ليست نصيحة طبية أو مالية. الدرجة الحقيقية تحتاج تفاصيل.",
      ),
      digitalTwinNote: join3(
        seed,
        "ar:dt",
        arP,
        "التوأم الرقمي الكامل يقارن أنماط ماضيك. هنا الطبقة مفاهيمية فقط.",
      ),
    },
    it: {
      summary: pickText(seed, "it:sum", [
        `Anteprima strutturata (demo/fallback). Al centro: «${quote.slice(0, 220)}».`,
        `Anteprima legata a: «${quote.slice(0, 220)}». Aggiungi numeri e contesto.`,
        `Blocco demo così la pagina non risulta identica per ogni domanda. Estratto: «${quote.slice(0, 220)}».`,
      ]),
      dimensions: {
        finances: join3(
          seed,
          "it:df",
          itP,
          "Servono numeri concreti—reddito, obblighi, riserva. Aggiungili nel contesto.",
        ),
        psychology: join3(
          seed,
          "it:dp",
          itP,
          "La psicologia lega sicurezza, paura di perdere e valori. Descrivi emozioni e timori.",
        ),
        risks: join3(
          seed,
          "it:dr",
          itP,
          "I rischi coprono tempo, denaro, relazioni e salute—confrontali con la tua realtà.",
        ),
        opportunities: join3(
          seed,
          "it:do",
          itP,
          "Le opportunità emergono quando il passo è allineato agli obiettivi lunghi e c’è supporto.",
        ),
      },
      scenarios: {
        bestCase: join3(
          seed,
          "it:sb",
          itP,
          "Caso migliore: risorse sufficienti, supporto stabile, pazienza nell’adattarsi.",
        ),
        worstCase: join3(
          seed,
          "it:sw",
          itP,
          "Caso peggiore: fretta, nessun piano B, motivazione soprattutto di fuga.",
        ),
        mostLikely: join3(
          seed,
          "it:sm",
          itP,
          "Più spesso una via di mezzo—attrito gestibile con passi e flessibilità.",
        ),
      },
      timeline: {
        months6: join3(
          seed,
          "it:t6",
          itP,
          "Dopo 6 mesi compaiono primi segnali: adattamento, stress, progressi pratici.",
        ),
        years2: join3(
          seed,
          "it:t2",
          itP,
          "Dopo 2 anni la decisione si stabilizza spesso—nuovo equilibrio o chiarezza.",
        ),
        years5: join3(
          seed,
          "it:t5",
          itP,
          "Dopo 5 anni diventa un capitolo; la crescita conta quanto l’esito.",
        ),
      },
      scoreRationale: join3(
        seed,
        "it:sc",
        itP,
        "Punteggio demo—non consulenza medica o finanziaria. Servono dettagli veri.",
      ),
      digitalTwinNote: join3(
        seed,
        "it:dt",
        itP,
        "Un gemello digitale completo confrontierebbe i pattern passati. Qui è solo concetto.",
      ),
    },
  };

  const b = blocks[locale] ?? blocks["en-US"];
  const merged: DecisionAnalysis = {
    ...b,
    ...professionalDemo(locale, quote, seed),
    score,
  };
  const w = options?.stakesLevel;
  if (typeof w === "number" && w >= 1 && w <= 10) {
    const tag =
      locale === "hy"
        ? `\n\n[Զգացողական ծանրություն՝ ${w}/10]`
        : `\n\n[Rated decision weight: ${w}/10]`;
    const base =
      typeof merged.summary === "string" ? merged.summary : "";
    merged.summary = base + tag;
  }
  return merged;
}
