import type { TrustPageCopy } from "../types";

export const cookiesEn: TrustPageCopy = {
  metaTitle: "Cookie Policy",
  metaDescription:
    "How Life Decision Engine uses cookies: essential, analytics (Google Analytics), and advertising (Google AdSense). Manage your choices.",
  eyebrow: "Legal",
  title: "Cookie Policy",
  subtitle:
    "Last updated May 2026. This page explains what cookies we set, why, and how to control non-essential cookies. For full privacy rights see {privacy}.",
  sections: [
    {
      heading: "What are cookies?",
      blocks: [
        {
          kind: "p",
          text: "Cookies are small text files stored in your browser. They help a site remember preferences, keep you signed in, measure traffic, or show relevant ads. Some cookies are set by us; others by partners such as Google when you accept advertising or analytics cookies.",
        },
      ],
    },
    {
      heading: "Essential cookies",
      blocks: [
        {
          kind: "p",
          text: "We use a locale preference cookie and local storage keys so the interface language and consent choice persist between visits. These are necessary for the product to function as you expect. They do not require consent under EU guidance because they are strictly functional.",
        },
      ],
    },
    {
      heading: "Analytics cookies (optional)",
      blocks: [
        {
          kind: "p",
          text: "With your permission we load Google Analytics 4 to understand which pages help readers and where the experience is slow. Analytics cookies stay off until you accept non-essential cookies in the banner. You can reject them and still use the analyzer.",
        },
      ],
    },
    {
      heading: "Advertising cookies (optional)",
      blocks: [
        {
          kind: "p",
          text: "We participate in Google AdSense. Ad cookies may deliver and measure ads, limit frequency, and — with consent — personalise ads. Our {adsTxt} file lists seller ID pub-3541461663112540. See {googleAdsCookies}.",
        },
      ],
    },
    {
      heading: "How to change your choice",
      blocks: [
        {
          kind: "p",
          text: "Use the consent banner when it appears, or clear site data for lifedecisions.space in your browser to reset the banner. Browser extensions can block third-party cookies globally.",
        },
      ],
    },
    {
      heading: "More information",
      blocks: [
        {
          kind: "ul",
          items: ["{privacy}", "{contentPolicy}", "{googleAdsCookies}"],
        },
      ],
    },
  ],
};
