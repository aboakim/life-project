import type { AppLocale } from "../locale";

export type TrustPageId =
  | "cookies"
  | "content-policy"
  | "privacy"
  | "terms"
  | "disclaimer"
  | "contact"
  | "about"
  | "faq"
  | "editorial-team"
  | "editorial-standards";

export type TrustBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

export type TrustSection = {
  heading: string;
  blocks: TrustBlock[];
};

/** Inline link placeholders in text: `{privacy}`, `{cookies}`, etc. */
export type TrustLinkKey =
  | "privacy"
  | "cookies"
  | "contentPolicy"
  | "terms"
  | "disclaimer"
  | "contact"
  | "about"
  | "blog"
  | "experts"
  | "expertsRegister"
  | "analyze"
  | "pricing"
  | "faq"
  | "editorialTeam"
  | "editorialStandards"
  | "howWeUseAi"
  | "monetize"
  | "community"
  | "communityGuidelines"
  | "home"
  | "adsTxt"
  | "googleAdsCookies";

export type TrustPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: TrustSection[];
  backHome?: string;
};

export type PublisherEducationCopy = {
  introParagraphs: string[];
  sections: TrustSection[];
  faq?: { q: string; a: string; plainAnswer?: string }[];
  footerParagraph?: string;
  lastReviewed: string;
  editorialOverviewLabel?: string;
  faqHeading?: string;
};

export type TrustCopyGetter = (locale: AppLocale) => TrustPageCopy;
export type PublisherCopyGetter = (locale: AppLocale) => PublisherEducationCopy;
