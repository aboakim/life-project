import type { TrustPageCopy } from "../types";

export const privacyEn: TrustPageCopy = {
  metaTitle: "Privacy Policy",
  metaDescription:
    "How Life Decision Engine handles your data, cookies, ads (Google AdSense), and third-party services. GDPR and CCPA rights.",
  eyebrow: "Legal",
  title: "Privacy Policy",
  subtitle:
    "Last updated April 2026. Transparency for visitors and ad programs (including Google AdSense). Not legal advice.",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine provides structured decision analysis (including optional AI) and links to third-party professionals, as described on {home}.",
        },
      ],
    },
    {
      heading: "Information you provide",
      blocks: [
        {
          kind: "p",
          text: "When you use the analyzer or forms you may enter personal situations. That content generates your session results. Do not submit what you are uncomfortable processing. This is decision-support, not medical, legal, or therapeutic service.",
        },
      ],
    },
    {
      heading: "Cookies & advertising",
      blocks: [
        {
          kind: "p",
          text: "See {cookies}. We may display ads through Google AdSense. Google and partners may use cookies per your region and choices. See {googleAdsCookies}. We use a GDPR-compatible consent banner where required.",
        },
      ],
    },
    {
      heading: "AI providers",
      blocks: [
        {
          kind: "p",
          text: "If live AI analysis is enabled, prompt text may be sent to an AI provider solely to generate a response, governed by the provider's policies. Details: {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Payments",
      blocks: [
        {
          kind: "p",
          text: "Paid features may be processed by Stripe. We do not store full card numbers; Stripe handles payment data.",
        },
      ],
    },
    {
      heading: "Data retention",
      blocks: [
        {
          kind: "ul",
          items: [
            "Analyzer inputs: processed for your session; error logs up to 30 days then deleted or anonymised.",
            "Contact and expert registrations: kept to respond and maintain listings; deletion on request.",
            "Billing: minimal records via Stripe per tax law; no full card data stored by us.",
            "Ad cookies: retention per Google policies.",
          ],
        },
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        {
          kind: "p",
          text: "Depending on your region you may have rights to access, correct, delete, or restrict processing, and to object to certain uses. Contact us via {contact}. EU/UK: you may complain to your supervisory authority.",
        },
      ],
    },
    {
      heading: "Children",
      blocks: [
        {
          kind: "p",
          text: "The service is not directed at children under 16. We do not knowingly collect their data.",
        },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          kind: "p",
          text: "We may update this policy; the date above reflects the latest version. Continued use after changes means acceptance of the updated policy.",
        },
      ],
    },
  ],
};
