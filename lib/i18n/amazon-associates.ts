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
  headline: "Go through this Amazon link",
  body: "Go through this link to Amazon and you will find what you want to buy right now.",
  disclosure:
    "As an Amazon Associate, Life Decision Engine earns from qualifying purchases.",
  cta: "Shop on Amazon",
};

const hy: AmazonAffiliateUi = {
  eyebrow: "Amazon Associates",
  headline: "Գնա այս Amazon հղումով",
  body: "Գնա այս լինկով Amazon և կգտնես այն, ինչ հիմա ուզում ես ձեռք բերել։",
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
