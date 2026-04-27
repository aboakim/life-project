import type { AppLocale } from "@/lib/i18n/locale";
import { isEnglishAppLocale } from "@/lib/i18n/locale";

export type AmazonAffiliateUi = {
  eyebrow: string;
  headline: string;
  body: string;
  disclosure: string;
  cta: string;
};

const en: AmazonAffiliateUi = {
  eyebrow: "Amazon Associates",
  headline: "Support this site when you shop on Amazon",
  body: "If you already use Amazon, start from our link — same checkout and prices for you; we earn a small commission on qualifying purchases. It helps keep this engine running.",
  disclosure:
    "As an Amazon Associate, Life Decision Engine earns from qualifying purchases.",
  cta: "Shop on Amazon",
};

const hy: AmazonAffiliateUi = {
  eyebrow: "Amazon Associates",
  headline: "Աջակցեք այս նախագծին՝ Amazon-ով գնելիս",
  body: "Եթե արդեն գնումներ եք անում Amazon-ում, սկսեք այս հղումով․ նույն գները և checkout-ը ձեզ համար, իսկ մենք ստանում ենք փոքր միջնորդավար որակավորված գնումներից։ Սա օգնում է պահել հարթակը։",
  disclosure:
    "Amazon Associate — Life Decision Engine-ը ստանում է եկամուտ որակավորված գնումներից։",
  cta: "Գնել Amazon-ում",
};

const ru: AmazonAffiliateUi = {
  eyebrow: "Amazon Associates",
  headline: "Поддержите сайт, делая покупки на Amazon",
  body: "Если вы всё равно покупаете на Amazon, начните с нашей ссылки — те же цены и оформление для вас; мы получаем небольшую комиссию с подходящих покупок. Это помогает развивать проект.",
  disclosure:
    "Как участник Amazon Associates, Life Decision Engine получает вознаграждение за соответствующие покупки.",
  cta: "Перейти на Amazon",
};

/** Copy for affiliate CTA blocks (FTC-style disclosure included). */
export function getAmazonAffiliateUi(locale: AppLocale): AmazonAffiliateUi {
  if (locale === "hy") return hy;
  if (locale === "ru") return ru;
  if (isEnglishAppLocale(locale)) return en;
  return en;
}
