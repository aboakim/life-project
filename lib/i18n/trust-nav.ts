import type { AppLocale } from "./locale";

export type TrustNavCopy = {
  footerColProduct: string;
  footerColLearn: string;
  footerColLegal: string;
  footerTagline: string;
  footerDisclaimer: string;
  navFaq: string;
  navPlaybooks: string;
  navAbout: string;
  navContact: string;
  navEditorialTeam: string;
  navEditorialStandards: string;
  navPrivacy: string;
  navTerms: string;
  navDisclaimer: string;
  navCookies: string;
  navContentPolicy: string;
  navCommunityGuidelines: string;
  consentTitle: string;
  consentBody: string;
  consentPrivacyLink: string;
  consentReject: string;
  consentAccept: string;
};

const en: TrustNavCopy = {
  footerColProduct: "Product",
  footerColLearn: "Learn",
  footerColLegal: "Company & legal",
  footerTagline:
    "A structured workspace for big life decisions — scenarios, lenses, timelines, and a score. Built to help you think clearly, not to replace professionals.",
  footerDisclaimer: "Not medical, legal, or therapeutic advice.",
  navFaq: "FAQ",
  navPlaybooks: "Playbooks",
  navAbout: "About",
  navContact: "Contact",
  navEditorialTeam: "Editorial Team",
  navEditorialStandards: "Editorial Standards",
  navPrivacy: "Privacy Policy",
  navTerms: "Terms of Service",
  navDisclaimer: "Disclaimer",
  navCookies: "Cookie Policy",
  navContentPolicy: "Content Policy",
  navCommunityGuidelines: "Community guidelines",
  consentTitle: "Cookies and your privacy",
  consentBody:
    "We use essential cookies so the site works, and — with your permission — analytics and advertising cookies (Google Analytics, Google AdSense) to understand how the site is used and to keep it free. You can change your choice anytime.",
  consentPrivacyLink: "Read our privacy policy",
  consentReject: "Reject non-essential",
  consentAccept: "Accept all",
};

const hy: TrustNavCopy = {
  ...en,
  footerColProduct: "Արտադրանք",
  footerColLearn: "Ուսում",
  footerColLegal: "Ընկերություն և իրավական",
  footerTagline:
    "Կառուցվածքային աշխատանքային տարածք մեծ կյանքի որոշումների համար — սցենարներ, լինզաներ, ժամանակացույց և միավոր։",
  footerDisclaimer: "Բժշկական, իրավական կամ թերապևտիկ խորհուրդ չէ։",
  navFaq: "ՀՏՀ",
  navPlaybooks: "Ուղեցույցներ",
  navAbout: "Մեր մասին",
  navContact: "Կապ",
  navEditorialTeam: "Խմբագրական թիմ",
  navEditorialStandards: "Խմբագրական ստանդարտներ",
  navPrivacy: "Գաղտնիության քաղաքականություն",
  navTerms: "Օգտագործման պայմաններ",
  navDisclaimer: "Հրաժարակ",
  navCookies: "Cookie քաղաքականություն",
  navContentPolicy: "Բովանդակության քաղաքականություն",
  navCommunityGuidelines: "Համայնքի կանոններ",
  consentTitle: "Cookie-ներ և ձեր գաղտնիությունը",
  consentBody:
    "Մենք օգտագործում ենք անհրաժեշտ cookie-ներ, իսկ ձեր թույլտվությամբ՝ վերլուծության և գովազդի cookie-ներ (Google Analytics, Google AdSense)։",
  consentPrivacyLink: "Գաղտնիության քաղաքականությունը",
  consentReject: "Մերժել ոչ անհրաժեշտները",
  consentAccept: "Ընդունել բոլորը",
};

const ru: TrustNavCopy = {
  ...en,
  footerColProduct: "Продукт",
  footerColLearn: "Материалы",
  footerColLegal: "Компания и право",
  footerTagline:
    "Структурированное пространство для важных жизненных решений — сценарии, линзы, сроки и оценка.",
  footerDisclaimer: "Не заменяет врача, юриста или терапевта.",
  navFaq: "FAQ",
  navPlaybooks: "Сценарии",
  navAbout: "О нас",
  navContact: "Контакты",
  navEditorialTeam: "Редакция",
  navEditorialStandards: "Редакционные стандарты",
  navPrivacy: "Конфиденциальность",
  navTerms: "Условия",
  navDisclaimer: "Отказ от ответственности",
  navCookies: "Cookies",
  navContentPolicy: "Контент",
  navCommunityGuidelines: "Правила сообщества",
  consentTitle: "Cookies и конфиденциальность",
  consentBody:
    "Мы используем необходимые cookies, а с вашего разрешения — аналитику и рекламу (Google Analytics, Google AdSense).",
  consentPrivacyLink: "Политика конфиденциальности",
  consentReject: "Отклонить необязательные",
  consentAccept: "Принять все",
};

const de: TrustNavCopy = {
  ...en,
  footerColProduct: "Produkt",
  footerColLearn: "Lernen",
  footerColLegal: "Rechtliches",
  footerTagline:
    "Strukturierter Raum für große Lebensentscheidungen — Szenarien, Linsen, Zeitachsen und eine Bewertung.",
  footerDisclaimer: "Kein medizinischer, rechtlicher oder therapeutischer Rat.",
  navFaq: "FAQ",
  navPlaybooks: "Leitfäden",
  navAbout: "Über uns",
  navContact: "Kontakt",
  navEditorialTeam: "Redaktion",
  navEditorialStandards: "Redaktionsstandards",
  navPrivacy: "Datenschutz",
  navTerms: "AGB",
  navDisclaimer: "Haftungsausschluss",
  navCookies: "Cookies",
  navContentPolicy: "Inhaltsrichtlinie",
  navCommunityGuidelines: "Community-Richtlinien",
  consentTitle: "Cookies und Ihre Privatsphäre",
  consentBody:
    "Wir verwenden notwendige Cookies; mit Ihrer Erlaubnis Analytics und Werbung (Google Analytics, Google AdSense).",
  consentPrivacyLink: "Datenschutzerklärung",
  consentReject: "Nicht erforderliche ablehnen",
  consentAccept: "Alle akzeptieren",
};
const fr: TrustNavCopy = {
  ...en,
  footerColProduct: "Produit",
  footerColLearn: "Apprendre",
  footerColLegal: "Légal",
  footerTagline:
    "Espace structuré pour les grandes décisions — scénarios, lentilles, chronologie et score.",
  footerDisclaimer: "Pas un avis médical, juridique ou thérapeutique.",
  navFaq: "FAQ",
  navPlaybooks: "Guides",
  navAbout: "À propos",
  navContact: "Contact",
  navEditorialTeam: "Équipe éditoriale",
  navEditorialStandards: "Normes éditoriales",
  navPrivacy: "Confidentialité",
  navTerms: "Conditions",
  navDisclaimer: "Avertissement",
  navCookies: "Cookies",
  navContentPolicy: "Politique de contenu",
  navCommunityGuidelines: "Règles de la communauté",
  consentTitle: "Cookies et confidentialité",
  consentBody:
    "Cookies essentiels ; avec votre accord, analytics et publicité (Google Analytics, Google AdSense).",
  consentPrivacyLink: "Politique de confidentialité",
  consentReject: "Refuser les non essentiels",
  consentAccept: "Tout accepter",
};
const es: TrustNavCopy = {
  ...en,
  footerColProduct: "Producto",
  footerColLearn: "Aprender",
  footerColLegal: "Legal",
  footerTagline:
    "Espacio estructurado para grandes decisiones — escenarios, lentes, cronología y puntuación.",
  footerDisclaimer: "No es asesoramiento médico, legal ni terapéutico.",
  navFaq: "FAQ",
  navPlaybooks: "Guías",
  navAbout: "Acerca de",
  navContact: "Contacto",
  navEditorialTeam: "Equipo editorial",
  navEditorialStandards: "Estándares editoriales",
  navPrivacy: "Privacidad",
  navTerms: "Términos",
  navDisclaimer: "Aviso legal",
  navCookies: "Cookies",
  navContentPolicy: "Política de contenido",
  navCommunityGuidelines: "Normas de la comunidad",
  consentTitle: "Cookies y privacidad",
  consentBody:
    "Cookies esenciales; con su permiso, analítica y publicidad (Google Analytics, Google AdSense).",
  consentPrivacyLink: "Política de privacidad",
  consentReject: "Rechazar no esenciales",
  consentAccept: "Aceptar todo",
};
const it: TrustNavCopy = {
  ...en,
  footerColProduct: "Prodotto",
  footerColLearn: "Impara",
  footerColLegal: "Legale",
  footerTagline:
    "Spazio strutturato per grandi decisioni — scenari, lenti, cronologia e punteggio.",
  footerDisclaimer: "Non è consulenza medica, legale o terapeutica.",
  navFaq: "FAQ",
  navPlaybooks: "Guide",
  navAbout: "Chi siamo",
  navContact: "Contatto",
  navEditorialTeam: "Team editoriale",
  navEditorialStandards: "Standard editoriali",
  navPrivacy: "Privacy",
  navTerms: "Termini",
  navDisclaimer: "Disclaimer",
  navCookies: "Cookie",
  navContentPolicy: "Politica dei contenuti",
  navCommunityGuidelines: "Linee guida community",
  consentTitle: "Cookie e privacy",
  consentBody:
    "Cookie essenziali; con il tuo consenso, analytics e pubblicità (Google Analytics, Google AdSense).",
  consentPrivacyLink: "Informativa privacy",
  consentReject: "Rifiuta non essenziali",
  consentAccept: "Accetta tutto",
};
const ar: TrustNavCopy = {
  ...en,
  footerColProduct: "المنتج",
  footerColLearn: "تعلّم",
  footerColLegal: "قانوني",
  navAbout: "من نحن",
  navContact: "اتصل",
  navPrivacy: "الخصوصية",
  navTerms: "الشروط",
  navCookies: "ملفات تعريف الارتباط",
  navContentPolicy: "سياسة المحتوى",
  navCommunityGuidelines: "إرشادات المجتمع",
  consentTitle: "ملفات تعريف الارتباط والخصوصية",
  consentBody:
    "نستخدم ملفات تعريف ارتباط أساسية؛ وبإذنك — التحليلات والإعلانات (Google Analytics وGoogle AdSense).",
  consentPrivacyLink: "سياسة الخصوصية",
  consentReject: "رفض غير الضروري",
  consentAccept: "قبول الكل",
};

const table: Record<AppLocale, TrustNavCopy> = {
  en: en,
  "en-US": en,
  hy,
  ru,
  de,
  fr,
  es,
  it,
  ar,
};

export function getTrustNav(locale: AppLocale): TrustNavCopy {
  return table[locale] ?? en;
}
