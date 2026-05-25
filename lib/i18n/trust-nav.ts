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
  consentTitle: "Cookies и конфиденциальность",
  consentBody:
    "Мы используем необходимые cookies, а с вашего разрешения — аналитику и рекламу (Google Analytics, Google AdSense).",
  consentPrivacyLink: "Политика конфиденциальности",
  consentReject: "Отклонить необязательные",
  consentAccept: "Принять все",
};

const de: TrustNavCopy = { ...en, footerColProduct: "Produkt", footerColLearn: "Lernen", footerColLegal: "Rechtliches", navAbout: "Über uns", navContact: "Kontakt", navPrivacy: "Datenschutz", navTerms: "AGB", navCookies: "Cookies", navContentPolicy: "Inhalte" };
const fr: TrustNavCopy = { ...en, footerColProduct: "Produit", footerColLearn: "Apprendre", footerColLegal: "Légal", navAbout: "À propos", navContact: "Contact", navPrivacy: "Confidentialité", navTerms: "Conditions", navCookies: "Cookies", navContentPolicy: "Contenu" };
const es: TrustNavCopy = { ...en, footerColProduct: "Producto", footerColLearn: "Aprender", footerColLegal: "Legal", navAbout: "Acerca de", navContact: "Contacto", navPrivacy: "Privacidad", navTerms: "Términos", navCookies: "Cookies", navContentPolicy: "Contenido" };
const it: TrustNavCopy = { ...en, footerColProduct: "Prodotto", footerColLearn: "Impara", footerColLegal: "Legale", navAbout: "Chi siamo", navContact: "Contatto", navPrivacy: "Privacy", navTerms: "Termini", navCookies: "Cookie", navContentPolicy: "Contenuti" };
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
  consentTitle: "ملفات تعريف الارتباط والخصوصية",
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
