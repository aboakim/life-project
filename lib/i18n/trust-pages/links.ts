import type { TrustLinkKey } from "./types";

const HREF: Record<TrustLinkKey, string> = {
  privacy: "/privacy",
  cookies: "/cookies",
  contentPolicy: "/content-policy",
  terms: "/terms",
  disclaimer: "/disclaimer",
  contact: "/contact",
  about: "/about",
  blog: "/blog",
  experts: "/experts",
  expertsRegister: "/experts/register",
  analyze: "/analyze",
  pricing: "/pricing",
  faq: "/faq",
  editorialTeam: "/editorial-team",
  editorialStandards: "/editorial-standards",
  howWeUseAi: "/how-we-use-ai",
  monetize: "/monetize",
  community: "/community",
  communityGuidelines: "/community/guidelines",
  home: "/",
  adsTxt: "/ads.txt",
  googleAdsCookies: "https://policies.google.com/technologies/ads",
};

export function getTrustLinkHref(key: TrustLinkKey): string {
  return HREF[key];
}

/** Default English labels for placeholders (overridden per locale). */
export const TRUST_LINK_LABELS_EN: Record<TrustLinkKey, string> = {
  privacy: "Privacy Policy",
  cookies: "Cookie Policy",
  contentPolicy: "Content Policy",
  terms: "Terms of Service",
  disclaimer: "Disclaimer",
  contact: "Contact",
  about: "About",
  blog: "blog",
  experts: "experts directory",
  expertsRegister: "expert registration",
  analyze: "analyzer",
  pricing: "pricing",
  faq: "FAQ",
  editorialTeam: "editorial team",
  editorialStandards: "editorial standards",
  howWeUseAi: "How we use AI",
  monetize: "how we earn",
  community: "community board",
  communityGuidelines: "community guidelines",
  home: "home page",
  adsTxt: "ads.txt",
  googleAdsCookies: "How Google uses cookies in advertising",
};
