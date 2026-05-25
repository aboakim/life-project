import type { AppLocale } from "../locale";
import type { PublisherEducationCopy } from "./types";

const expertsEducationEn: PublisherEducationCopy = {
  editorialOverviewLabel: "Editorial overview",
  introParagraphs: [
    "The Life Decision Engine experts directory is a curated index of independent professionals — psychologists, lawyers, financial planners, immigration counsel, physicians, and career coaches — who can review a major life decision with you in a private 30 to 60 minute conversation. The directory exists for the moments when a structured AI report has taken you as far as it can, and what you need next is a second pair of human eyes from someone with field accountability and professional liability.",
    "Every listing is added by the professional themselves through {expertsRegister}. We do not buy lead lists, scrape LinkedIn, or auto-generate profiles. Profiles include name, country and city, professional role, languages, a short bio in their own words, and an optional website. Engagement happens directly between you and the professional — Life Decision Engine does not take a commission on the first conversation, does not see the body of your message after you submit it, and does not store the contents of the request.",
  ],
  sections: [
    {
      heading: "Roles in this directory",
      blocks: [
        {
          kind: "ul",
          items: [
            "Psychologists & therapists — for grief in a separation, decision paralysis, anxiety around a relocation, or processing a job loss. Not a substitute for emergency mental-health care; if you are in crisis, contact local emergency services first.",
            "Lawyers — civil, family, employment, real-estate or contract questions. Especially helpful when an offer letter, custody agreement, or rental contract needs a careful second read.",
            "Financial planners & advisors — fee-only or commission-based; the listing notes which. Runway math before quitting, mortgage versus rent in a new country, taxes as a remote employee, or whether a side-business is worth the accounting overhead.",
            "Immigration & relocation counsel — visa categories, employer sponsorship, family reunification, residency timelines, and practical sequencing when moving with kids or a partner who needs work authorization.",
            "Physicians & medical advisors — second opinions on a diagnosis, treatment decisions in a country where you are new to the system, or specialist referrals. Not a replacement for primary care.",
            "Coaches — career and life coaching; useful when you have a decision in front of you and want regular accountability over four to twelve weeks rather than a one-off opinion.",
          ],
        },
      ],
    },
    {
      heading: "When to use a human expert vs. the analyzer",
      blocks: [
        {
          kind: "p",
          text: "The structured analyzer at {analyze} turns a vague feeling into named scenarios, weighted lenses, a timeline, and a score. That alone often unblocks people. Move to a human expert when the decision involves money you cannot afford to lose, legal exposure, a health question, a contract deadline, or when a second person's interests are tangled with yours. Bring the generated report into the conversation; it shortens intake by 15 to 25 minutes.",
        },
      ],
    },
    {
      heading: "How to contact a professional",
      blocks: [
        {
          kind: "ol",
          items: [
            "Filter by role, country, or keyword (for example employment lawyer · Yerevan · English).",
            "Open a profile, read the bio, check the languages they work in.",
            "Write a short message: your situation in two or three sentences, the question you want answered, and your timeline (this week / this month / no rush).",
            "Submit — the message goes directly to the professional's contact form. They reply on their own schedule and fee structure. We do not see the contents.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Are these professionals vetted?",
      a: "Each professional self-attests to their licence and country of practice when they register, and the listing is reviewed by an editor before it goes live. We do not perform a full background or licence-board verification — that responsibility sits with you. Always check public registration before paying for a long engagement.",
      plainAnswer:
        "Each professional self-attests to their licence when they register, and listings are editor-reviewed. We do not perform full licence-board verification — check registration yourself.",
    },
    {
      q: "Is there a fee to use the directory?",
      a: "There is no fee to browse or contact a professional through the form. Each professional sets their own fees for ongoing work and bills you directly. Life Decision Engine does not take a commission on these payments.",
      plainAnswer:
        "No fee to browse or contact. Professionals bill you directly for ongoing work.",
    },
    {
      q: "Can I list myself or my practice here?",
      a: "Yes — independent professionals can apply via {expertsRegister}. Listings are free for the first cohort. Lead-generation agencies and multi-level referral networks will be removed.",
      plainAnswer:
        "Yes — apply via the experts registration page. Listings are free for verified individuals.",
    },
    {
      q: "What about my privacy when I send a message?",
      a: "The professional sees your name, email, and message body. Life Decision Engine receives a record that contact happened (timestamp, target professional, your IP for abuse protection) but does not store message contents. See {privacy}.",
      plainAnswer:
        "The professional sees your message. We log that contact happened but do not store message contents. See the privacy page.",
    },
  ],
  footerParagraph:
    "Important: a directory is not legal, medical, or financial advice, and Life Decision Engine is not a regulated agency. The professional you choose is responsible for the advice they give. Always confirm credentials with the relevant licensing body before paying for an extended engagement.",
  lastReviewed: "May 25, 2026",
};

const expertsEducationHy: PublisherEducationCopy = {
  editorialOverviewLabel: "Խմբագրական ակնարկ",
  introParagraphs: [
    "Life Decision Engine մասնագետների գրացումը մասնագետների կազմած ցանկ է՝ հոգեբաններ, փաստաբաններ, ֆինանսական պլանավորողներ, ներգաղթային խորհրդատուներ, բժիշկներ և կարիերայի մարզիչներ, ովքեր կարող են 30–60 րոպեանո զրույցում քննարկել կյանքի մեծ որոշումը։ Գրացումը հարկավոր է, երբ AI հաշվետվությունն արդեն օգնել է, բայց հաջորդ քայլը մարդու պատասխանատվությունն ու փորձն է։",
    "Յուրաքանչյուր հայտարարություն ավելացնում է ինքը մասնագետը՝ {expertsRegister} էջով։ Մենք չենք գնում lead ցուցակներ և չենք ստեղծում ավտոմատ պրոֆիլներ։ Կապը ուղղակի է ձեզ և մասնագետի միջև — առաջին զրույցից հանձնաժողով չենք վերցնում, հաղորդագրության բովանդակությունը չենք պահում։",
  ],
  sections: [
    {
      heading: "Դերեր այս գրացումում",
      blocks: [
        {
          kind: "ul",
          items: [
            "Հոգեբաններ և թերապևտներ — բաժանման ցավ, որոշման պարալիզ, տեղափոխության անհանգստություն, աշխատանքից հեռացում։ Ճգնաշրջանում՝ տեղական արտակարգ ծառայություններ։",
            "Փաստաբաններ — քաղաքացիական, ընտանեկան, աշխատանքային, անշարժ գույք, պայմանագրեր։",
            "Ֆինանսական պլանավորողներ — վարձատրությունից առաջ runway, վարձակալություն vs հիփոթեկ, հեռակա աշխատանքի հարկեր։",
            "Ներգաղթային խորհրդատուներ — վիզաներ, աշխատանքի արտոնագրում, ընտանիքի վերամիավորում, տեղափոխման հերթականություն։",
            "Բժիշկներ — երկրորդ կարծիք ախտորոշման կամ բուժման մասին նոր երկրում։",
            "Մարզիչներ — կարիերայի և կյանքի մարզում, 4–12 շաբաթվա հաշվետվողականություն։",
          ],
        },
      ],
    },
    {
      heading: "Ե՞րբ մարդ մասնագետ, ե՞րբ վերլուծիչ",
      blocks: [
        {
          kind: "p",
          text: "{analyze} վերլուծիչը սցենարներ, լինզաներ, ժամանակացույց և միավոր է տալիս։ Անցեք մարդու մոտ, երբ կան իրավական ռիսկեր, առողջության հարց, պայմանագրի վերջնաժամկետ կամ մեծ գումար։ Բերեք հաշվետվությունը զրույց — intake-ը 15–25 րոպե կարճանում է։",
        },
      ],
    },
    {
      heading: "Ինչպես կապվել",
      blocks: [
        {
          kind: "ol",
          items: [
            "Զտեք դերով, երկրով կամ բանալի բառով։",
            "Բացեք պրոֆիլը, կարդացեք bio-ն և լեզուները։",
            "Գրեք 2–3 նախադասություն իրավիճակի, հարցի և ժամկետի մասին։",
            "Ուղարկեք — հաղորդագրությունը գնում է ուղղակի մասնագետին, մենք բովանդակությունը չենք տեսնում։",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Ստուգված՞ են մասնագետները։",
      a: "Գրանցման ժամանակ հայտարարում են արտոնագիրը, խմբագիրն ստուգում է հայտարարությունը։ Լիարժեք լիցենզիայի ստուգում չենք անում — ստուգեք հանրային գրանցումը։",
      plainAnswer: "Ինքնահայտարարում և խմբագրական ստուգում, ոչ լիարժեք licence-board audit։",
    },
    {
      q: "Վճարովի՞ է գրացումը։",
      a: "Ոչ — դիտելն ու կապվելն անվճար է։ Շարունակական աշխատանքի վճարումը ուղղակի մասնագետին է։",
      plainAnswer: "Դիտումն ու կապը անվճար, շարունակական աշխատանքը՝ ուղղակի մասնագետին։",
    },
    {
      q: "Կարո՞ղ եմ ինձ ավելացնել։",
      a: "Այո — {expertsRegister}։ Առաջին խմբի համար անվճար է։",
      plainAnswer: "Այո, գրանցման էջով, առաջին խմբին անվճար։",
    },
    {
      q: "Գաղտնիություն հաղորդագրության ժամանակ",
      a: "Մասնագետը տեսնում է անուն, email և տեքստ։ Մենք գրանցում ենք կապի փաստը, բայց բովանդակությունը չենք պահում։ Տես {privacy}։",
      plainAnswer: "Մասնագետը տեսնում է հաղորդագրությունը, մենք պահում ենք միայն կապի փաստը։",
    },
  ],
  footerParagraph:
    "Կարևոր՝ գրացումը խորհուրդ չէ և Life Decision Engine-ը կարգավորվող գործակալություն չէ։ Ստուգեք արտոնագիրը մինչև երկարաժամկետ վճարում։",
  lastReviewed: "25 մայիս, 2026",
};

const expertsEducationRu: PublisherEducationCopy = {
  editorialOverviewLabel: "Редакционный обзор",
  introParagraphs: [
    "Каталог экспертов Life Decision Engine — это курируемый список независимых специалистов: психологов, юристов, финансовых планировщиков, иммиграционных консультантов, врачей и коучей, готовых обсудить важное жизненное решение в частной беседе 30–60 минут. Каталог нужен, когда структурированный AI-отчёт уже помог, а дальше нужен живой специалист с профессиональной ответственностью.",
    "Каждая анкета добавляется самим специалистом через {expertsRegister}. Мы не покупаем лиды и не генерируем профили автоматически. Связь напрямую между вами и специалистом — без комиссии за первый разговор; текст сообщения мы не храним.",
  ],
  sections: [
    {
      heading: "Роли в каталоге",
      blocks: [
        {
          kind: "ul",
          items: [
            "Психологи и терапевты — горе при расставании, паралич выбора, тревога перед переездом, потеря работы. В кризисе — местные экстренные службы.",
            "Юристы — гражданское, семейное, трудовое, недвижимость, договоры.",
            "Финансовые планировщики — подушка перед увольнением, аренда vs ипотека, налоги удалённого сотрудника.",
            "Иммиграционные консультанты — визы, спонсорство работодателя, воссоединение семьи, сроки ВНЖ.",
            "Врачи — второе мнение по диагнозу или лечению в новой стране.",
            "Коучи — карьера и жизнь, регулярная отчётность 4–12 недель.",
          ],
        },
      ],
    },
    {
      heading: "Когда нужен человек, а когда анализатор",
      blocks: [
        {
          kind: "p",
          text: "Анализатор на {analyze} даёт сценарии, линзы, таймлайн и оценку. Переходите к эксперту при юридических рисках, здоровье, дедлайне договора или крупных деньгах. Принесите отчёт на встречу — intake сократится на 15–25 минут.",
        },
      ],
    },
    {
      heading: "Как связаться",
      blocks: [
        {
          kind: "ol",
          items: [
            "Фильтр по роли, стране или ключевым словам.",
            "Откройте профиль, прочитайте bio и языки.",
            "Кратко опишите ситуацию, вопрос и срок (на этой неделе / в этом месяце / без спешки).",
            "Отправьте — сообщение идёт напрямую специалисту, содержимое мы не видим.",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      q: "Проверены ли специалисты?",
      a: "При регистрации указывают лицензию, редактор проверяет анкету. Полной проверки реестра лицензий мы не делаем — проверьте сами.",
      plainAnswer: "Самодекларация и редакторская проверка, без полного аудита лицензии.",
    },
    {
      q: "Платно ли пользоваться каталогом?",
      a: "Просмотр и контакт бесплатны. Дальнейшая работа оплачивается напрямую специалисту.",
      plainAnswer: "Каталог бесплатен, дальнейшая работа — напрямую специалисту.",
    },
    {
      q: "Могу ли я добавить себя?",
      a: "Да — через {expertsRegister}. Для первой когорты бесплатно.",
      plainAnswer: "Да, через страницу регистрации, для первой когорты бесплатно.",
    },
    {
      q: "Конфиденциальность сообщения",
      a: "Специалист видит имя, email и текст. Мы фиксируем факт контакта, но не храним содержимое. См. {privacy}.",
      plainAnswer: "Специалист видит сообщение, мы храним только факт контакта.",
    },
  ],
  footerParagraph:
    "Важно: каталог не является юридической, медицинской или финансовой консультацией. Проверяйте лицензию до длительной оплаты.",
  lastReviewed: "25 мая 2026",
};

function expertsLocaleOverlay(
  base: PublisherEducationCopy,
  patch: Partial<PublisherEducationCopy>,
): PublisherEducationCopy {
  return { ...base, ...patch };
}

const expertsEducationDe = expertsLocaleOverlay(expertsEducationEn, {
  editorialOverviewLabel: "Redaktioneller Überblick",
  introParagraphs: [
    "Das Expertenverzeichnis von Life Decision Engine ist ein kuratierter Index unabhängiger Fachleute — Psychologen, Anwälte, Finanzplaner, Einwanderungsberater, Ärzte und Coaches — für ein privates 30–60‑Minuten‑Gespräch zu einer großen Lebensentscheidung.",
    "Jeder Eintrag wird vom Profi selbst über {expertsRegister} hinzugefügt. Keine gekauften Lead-Listen. Der Kontakt läuft direkt — ohne Provision auf das erste Gespräch; Nachrichteninhalte speichern wir nicht.",
  ],
  lastReviewed: "25. Mai 2026",
});

const expertsEducationFr = expertsLocaleOverlay(expertsEducationEn, {
  editorialOverviewLabel: "Aperçu éditorial",
  introParagraphs: [
    "L'annuaire d'experts Life Decision Engine répertorie des professionnels indépendants — psychologues, avocats, planificateurs financiers, conseillers en immigration, médecins et coaches — pour un échange privé de 30 à 60 minutes sur une grande décision de vie.",
    "Chaque fiche est ajoutée via {expertsRegister}. Pas de listes achetées. Contact direct — pas de commission sur le premier échange ; nous ne stockons pas le contenu des messages.",
  ],
  lastReviewed: "25 mai 2026",
});

const expertsEducationEs = expertsLocaleOverlay(expertsEducationEn, {
  editorialOverviewLabel: "Resumen editorial",
  introParagraphs: [
    "El directorio de expertos de Life Decision Engine reúne profesionales independientes — psicólogos, abogados, planificadores financieros, asesores de inmigración, médicos y coaches — para una conversación privada de 30 a 60 minutos sobre una gran decisión de vida.",
    "Cada ficha la añade el profesional en {expertsRegister}. Sin listas de leads. Contacto directo — sin comisión en la primera conversación; no guardamos el contenido del mensaje.",
  ],
  lastReviewed: "25 de mayo de 2026",
});

const expertsEducationIt = expertsLocaleOverlay(expertsEducationEn, {
  editorialOverviewLabel: "Panoramica editoriale",
  introParagraphs: [
    "L'elenco esperti di Life Decision Engine è un indice di professionisti indipendenti — psicologi, avvocati, pianificatori finanziari, consulenti immigrazione, medici e coach — per una conversazione privata di 30–60 minuti su una grande decisione di vita.",
    "Ogni scheda è aggiunta tramite {expertsRegister}. Nessuna lista acquistata. Contatto diretto — nessuna commissione sul primo colloquio; non conserviamo il testo del messaggio.",
  ],
  lastReviewed: "25 maggio 2026",
});

const expertsEducationAr = expertsLocaleOverlay(expertsEducationEn, {
  editorialOverviewLabel: "نظرة تحريرية",
  introParagraphs: [
    "دليل خبراء Life Decision Engine فهرس لمهنيين مستقلين — أطباء نفس، محامون، مخططون ماليون، مستشارو هجرة، أطباء ومدربون — لمراجعة قرار حياة كبير في محادثة خاصة من 30 إلى 60 دقيقة.",
    "كل إدراج يضيفه المختص عبر {expertsRegister}. لا قوائم مشتراة. التواصل مباشر — بلا عمولة على المحادثة الأولى؛ لا نخزّن نص الرسالة.",
  ],
  lastReviewed: "25 أيار 2026",
});

const BY_LOCALE: Partial<Record<AppLocale, PublisherEducationCopy>> = {
  "en-US": expertsEducationEn,
  en: expertsEducationEn,
  hy: expertsEducationHy,
  ru: expertsEducationRu,
  de: expertsEducationDe,
  fr: expertsEducationFr,
  es: expertsEducationEs,
  it: expertsEducationIt,
  ar: expertsEducationAr,
};

export function getExpertsEducationCopy(locale: AppLocale): PublisherEducationCopy {
  return BY_LOCALE[locale] ?? expertsEducationEn;
}
