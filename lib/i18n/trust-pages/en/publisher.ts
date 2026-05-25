import type { PublisherEducationCopy } from "../types";

export const analyzeEducationEn: PublisherEducationCopy = {
  editorialOverviewLabel: "Editorial overview",
  introParagraphs: [
    "The Life Decision Engine analyzer is a structured workspace for decisions that feel too big for a pros-and-cons list. You describe your situation in plain language — what you are deciding, the context, and constraints you will not move (money, geography, family, ethics). The engine produces a private report: scenarios (best, worst, likely), four lenses (finances, psychology, risks, opportunities), a timeline, and a score.",
    "This is not a chatbot that improvises advice. The output follows a fixed editorial framework we maintain and review. It helps you think clearly — not replace a therapist, lawyer, or financial planner. For regulated topics we link to the {experts} and {blog} articles on when to involve a professional.",
  ],
  sections: [
    {
      heading: "What you get in a report",
      blocks: [
        {
          kind: "ul",
          items: [
            "Scenarios — three concrete futures to compare side by side.",
            "Four lenses — money, emotional load, downside risk, and upside you may discount.",
            "Timeline — what tends to change at six months, two years, and five years.",
            "Score — a comparative signal, not a verdict. Use it to notice trade-offs.",
          ],
        },
      ],
    },
    {
      heading: "Free vs Premium",
      blocks: [
        {
          kind: "p",
          text: "The free tier runs the full framework with fair-use limits. Premium adds deeper runs, history, and reminders — see {pricing}. Payments use Stripe; we never store card numbers.",
        },
      ],
    },
    {
      heading: "Privacy and data use",
      blocks: [
        {
          kind: "p",
          text: "Your decision text is sent to our servers only when you run an analysis. We do not publish your questions or sell them. See {privacy} and {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "This page vs the home analyzer",
      blocks: [
        {
          kind: "p",
          text: "The same engine powers the workspace on the {home}. This URL lets you bookmark the tool or land from search. Standards match {editorialStandards}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Is this medical, legal, or financial advice?",
      a: "No. It is educational software. For diagnosis, contracts, tax, or investments with real money at stake, consult a licensed professional.",
      plainAnswer:
        "No. It is educational software. For diagnosis, contracts, tax, or investments with real money at stake, consult a licensed professional.",
    },
    {
      q: "Can I use the report with my therapist or lawyer?",
      a: "Yes — many readers paste the scenario summary so sessions focus on the real fork in the road.",
      plainAnswer:
        "Yes — many readers paste the scenario summary so sessions focus on the real fork in the road.",
    },
    {
      q: "Who maintains the frameworks?",
      a: "The Life Decision Engine editorial team. See {editorialTeam}.",
      plainAnswer: "The Life Decision Engine editorial team.",
    },
  ],
  footerParagraph:
    "In a crisis, contact local emergency services — this tool is not monitored for urgent messages. See {disclaimer}.",
  lastReviewed: "May 25, 2026",
};

export const pricingEducationEn: PublisherEducationCopy = {
  introParagraphs: [
    "Life Decision Engine is funded so the core analyzer can stay useful without paywalls on thinking. The free plan includes scenarios, four lenses, timeline, and score with fair-use limits. Premium is for people who run many decisions per month and want history, reminders, and deeper passes.",
    "We are transparent about money: subscriptions, optional expert introductions (professionals bill you directly), and — where enabled — Google AdSense. We do not sell your decision text. See {monetize}.",
  ],
  sections: [
    {
      heading: "What Premium adds",
      blocks: [
        {
          kind: "ul",
          items: [
            "More frequent or deeper analysis when working through multi-step decisions.",
            "Saved history and reminders after a cooling-off period.",
            "Early access to new framework updates.",
          ],
        },
      ],
    },
    {
      heading: "Billing and refunds",
      blocks: [
        {
          kind: "p",
          text: "Checkout is handled by Stripe. Subscription terms are in {terms}. Billing help: {contact}.",
        },
      ],
    },
    {
      heading: "Advertising on free pages",
      blocks: [
        {
          kind: "p",
          text: "We may show AdSense on pages with substantial editorial content. We follow Google program policies and EU consent rules. See {privacy} and {contentPolicy}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Do I need Premium for a useful report?",
      a: "No. Free tier produces a complete structured report for a typical life decision.",
      plainAnswer:
        "No. Free tier produces a complete structured report for a typical life decision.",
    },
    {
      q: "Does Premium remove ads?",
      a: "Premium focuses on features. Some informational pages may still show ads depending on configuration.",
      plainAnswer:
        "Premium focuses on features. Some informational pages may still show ads depending on configuration.",
    },
  ],
  lastReviewed: "May 25, 2026",
};

export const homePublisherEn: PublisherEducationCopy = {
  editorialOverviewLabel: "Publisher overview",
  introParagraphs: [
    "Life Decision Engine publishes original frameworks on this site and in our {blog} — career, relocation, relationships, money, and psychology of large choices. Every article is reviewed by our {editorialTeam} under {editorialStandards}.",
    "The interactive analyzer below turns your question into scenarios, four lenses, a timeline, and a score — also on {analyze}. When a human professional is appropriate, browse {experts} or read {faq}. We are not a social network.",
  ],
  sections: [
    {
      heading: "Policies and contact",
      blocks: [
        {
          kind: "ul",
          items: [
            "{privacy} — cookies, AdSense, GDPR/CCPA",
            "{terms} — subscriptions, acceptable use",
            "{contentPolicy} — what we publish and moderate",
            "{contact} — editorial, press, support",
          ],
        },
      ],
    },
  ],
  lastReviewed: "May 25, 2026",
};
