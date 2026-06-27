import type { TrustPageCopy } from "../types";
import { cookiesEn as cookies } from "../en/cookies";
import { contentPolicyEn as contentPolicy } from "../en/content-policy";
import { privacyEn as privacy } from "../en/privacy";
import {
  analyzeEducationEn as analyze,
  pricingEducationEn as pricing,
  homePublisherEn as home,
} from "../en/publisher";

const terms: TrustPageCopy = {
  metaTitle: "Terms of Service",
  metaDescription:
    "Terms for using Life Decision Engine: subscriptions, acceptable use, intellectual property, and limitation of liability.",
  eyebrow: "Legal",
  title: "Terms of Service",
  subtitle:
    "Last updated May 2026. By using Life Decision Engine you agree to these terms. See also {privacy} and {disclaimer}.",
  sections: [
    {
      heading: "The service",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine provides educational decision-analysis tools, editorial content, and optional links to third-party professionals. The service is provided “as is” and may change without prior notice.",
        },
      ],
    },
    {
      heading: "Accounts and subscriptions",
      blocks: [
        {
          kind: "p",
          text: "Premium features are billed through Stripe. Prices and billing cycles are shown on {pricing}. You are responsible for accurate account details and payments. Cancellations may be handled through the Stripe customer portal or via {contact}.",
        },
      ],
    },
    {
      heading: "Acceptable use",
      blocks: [
        {
          kind: "ul",
          items: [
            "Do not use the service for unlawful, harmful, or fraudulent purposes.",
            "Do not attempt to access systems without authorization, scrape data, or tamper with reports.",
            "Do not present analyzer output as medical, legal, or investment advice on behalf of others.",
            "Community posts must follow {communityGuidelines}.",
          ],
        },
      ],
    },
    {
      heading: "Intellectual property",
      blocks: [
        {
          kind: "p",
          text: "Site frameworks, design, and editorial copy are protected by copyright. You may print or share your personal reports, but you may not republish our articles or frameworks for commercial competition.",
        },
      ],
    },
    {
      heading: "Limitation of liability",
      blocks: [
        {
          kind: "p",
          text: "To the extent permitted by law, Life Decision Engine and its operators are not liable for indirect, incidental, or consequential damages arising from use of the service or reliance on reports. See {disclaimer} for full disclaimers.",
        },
      ],
    },
    {
      heading: "Termination and contact",
      blocks: [
        {
          kind: "p",
          text: "We may suspend or terminate access for breach of these terms. Questions: {contact}. Changes to these terms are posted on this page; continued use means acceptance.",
        },
      ],
    },
  ],
};

const disclaimer: TrustPageCopy = {
  metaTitle: "Disclaimer",
  metaDescription:
    "Life Decision Engine reports and articles are educational, not professional advice. Crisis resources and AI limitations.",
  eyebrow: "Legal",
  title: "Disclaimer",
  subtitle:
    "Please read this before making important life decisions. This site does not replace a licensed professional.",
  sections: [
    {
      heading: "Not professional advice",
      blocks: [
        {
          kind: "p",
          text: "Analyzer reports, {blog} articles, and community answers are educational — they help you structure thinking. They are not medical diagnosis, legal opinion, tax guidance, or investment advice.",
        },
      ],
    },
    {
      heading: "AI and errors",
      blocks: [
        {
          kind: "p",
          text: "Outputs may contain mistakes or omissions, especially with brief inputs. Human review does not guarantee completeness. See {howWeUseAi} and {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Third parties",
      blocks: [
        {
          kind: "p",
          text: "Links to {experts}, advertisers, or external sites are not endorsements. Any engagement with a listed professional is between you and them under their own terms.",
        },
      ],
    },
    {
      heading: "Crisis",
      blocks: [
        {
          kind: "p",
          text: "If you are in danger or considering self-harm, contact local emergency services. This tool is not monitored for urgent messages.",
        },
      ],
    },
    {
      heading: "No warranties",
      blocks: [
        {
          kind: "p",
          text: "The service is provided without express or implied warranties. Use is at your own risk. For legal questions see {terms} and {privacy}.",
        },
      ],
    },
  ],
};

const about: TrustPageCopy = {
  metaTitle: "About",
  metaDescription:
    "Life Decision Engine's mission: structured frameworks for big life decisions — career, relocation, relationships, and money.",
  eyebrow: "Publisher",
  title: "About",
  subtitle:
    "We help people think clearly and completely when a pros-and-cons list is not enough.",
  sections: [
    {
      heading: "Mission",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine exists for decisions that feel too large for one list — relocation, career, relationships, money. We offer scenarios, four lenses, and a timeline, not a single “right” answer.",
        },
      ],
    },
    {
      heading: "Founder",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine was founded and created by Albert Akimyan. He leads product direction, editorial frameworks, and the decision-analysis engine on lifedecisions.space.",
        },
      ],
    },
    {
      heading: "What we build",
      blocks: [
        {
          kind: "ul",
          items: [
            "Interactive {analyze} with personalised reports",
            "Original {blog} articles under {editorialStandards}",
            "Optional {experts} directory for human support",
          ],
        },
      ],
    },
    {
      heading: "What we are not",
      blocks: [
        {
          kind: "p",
          text: "We are not a social network, therapy service, or law firm. We do not sell your decision text and we do not guarantee outcomes from professionals.",
        },
      ],
    },
    {
      heading: "Funding",
      blocks: [
        {
          kind: "p",
          text: "The service is supported by {pricing} subscriptions, optional expert introductions, and — where enabled — advertising. Transparency: {monetize}.",
        },
      ],
    },
    {
      heading: "Team and contact",
      blocks: [
        {
          kind: "p",
          text: "Editorial work is led by the {editorialTeam}. Questions and corrections: {contact}.",
        },
      ],
    },
  ],
};

const contact: TrustPageCopy = {
  metaTitle: "Contact",
  metaDescription:
    "Reach Life Decision Engine for editorial, support, privacy, and press inquiries.",
  eyebrow: "Publisher",
  title: "Contact",
  subtitle:
    "We aim to respond within five business days. For emergencies, contact local emergency services — not this page.",
  sections: [
    {
      heading: "Email",
      blocks: [
        {
          kind: "p",
          text: "hello@lifedecisions.space — general questions, corrections, policy, and press.",
        },
      ],
    },
    {
      heading: "What to include",
      blocks: [
        {
          kind: "ul",
          items: [
            "Article URL and specific clarification when requesting a correction",
            "Account email for Stripe billing questions",
            "Screenshot for moderation appeals (no sensitive personal data)",
          ],
        },
      ],
    },
    {
      heading: "Expert registration",
      blocks: [
        {
          kind: "p",
          text: "Professionals submit profiles via {expertsRegister}. Spam or false credentials are removed.",
        },
      ],
    },
    {
      heading: "Privacy requests",
      blocks: [
        {
          kind: "p",
          text: "For GDPR/CCPA requests, use subject line “Privacy request” and describe the action needed. See {privacy}.",
        },
      ],
    },
  ],
};

const faq: TrustPageCopy = {
  metaTitle: "FAQ",
  metaDescription:
    "Answers about the Life Decision Engine analyzer, privacy, payments, experts directory, and editorial policies.",
  eyebrow: "Help",
  title: "Frequently asked questions",
  subtitle:
    "Short answers about how the site works. Full legal text: {privacy}, {terms}, {disclaimer}.",
  sections: [
    {
      heading: "What this site is",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine publishes original decision frameworks on {blog} and runs a structured {analyze} tool. When a licensed human is appropriate, browse {experts}. We are a publisher and toolmaker — not a social network or emergency service.",
        },
      ],
    },
    {
      heading: "Privacy and data",
      blocks: [
        {
          kind: "p",
          text: "We do not publish or sell your decision text. Analyzer briefs are processed under zero-retention API settings where available. Details: {privacy} and {cookies}.",
        },
      ],
    },
    {
      heading: "Payments and ads",
      blocks: [
        {
          kind: "p",
          text: "The free tier delivers a complete structured report. Premium adds history and deeper runs — see {pricing}. Display ads, when enabled, follow Consent Mode and are documented in {monetize}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Is the analyzer professional advice?",
      a: "No. It is an educational tool that structures scenarios and trade-offs. It does not diagnose medical, legal, or financial conditions. Always confirm high-stakes decisions with a licensed professional.",
    },
    {
      q: "Can I share my report with a therapist or lawyer?",
      a: "Yes. The scenario summary often helps sessions focus on the real fork in the road. You control what you share.",
    },
    {
      q: "Will my analyzer brief train an AI model?",
      a: "No. Briefs are sent to the model provider in zero-retention mode where available. See {howWeUseAi} for the full disclosure.",
    },
    {
      q: "How do experts listings work?",
      a: "The {experts} directory lists third-party professionals you contact directly. We do not guarantee outcomes or set fees. Apply at {expertsRegister}.",
    },
    {
      q: "Who writes the blog articles?",
      a: "Articles are drafted with AI assistance and reviewed by the {editorialTeam} under {editorialStandards} before publishing.",
    },
    {
      q: "How do I request a correction?",
      a: "Write {contact} with the page URL and the error. We aim to respond within five business days.",
    },
    {
      q: "Is community Q&A moderated?",
      a: "Yes. {community} posts are rate-limited and reviewed for spam and policy violations. See {communityGuidelines}.",
    },
    {
      q: "Did not find your answer?",
      a: "Email hello@lifedecisions.space or use {contact}. For company background, see {about}.",
    },
  ],
};

const editorialTeam: TrustPageCopy = {
  metaTitle: "Editorial Team",
  metaDescription:
    "Who maintains Life Decision Engine decision frameworks, blog articles, and review standards.",
  eyebrow: "Publisher",
  title: "Editorial Team",
  subtitle:
    "The people who design, review, and update frameworks and articles on lifedecisions.space.",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine is edited by Albert Akimyan (founder) and a small editorial group that maintains the {analyze} structure, {blog} articles, {community} guidelines, and {experts} directory standards.",
        },
      ],
    },
    {
      heading: "What the team does",
      blocks: [
        {
          kind: "ul",
          items: [
            "Defines analyzer prompt templates and safety boundaries ({howWeUseAi}).",
            "Reviews AI-drafted articles for factual accuracy, tone, and YMYL sensitivity before publishing.",
            "Updates decision frameworks when law, markets, or research materially change.",
            "Moderates community posts and expert listings within five business days.",
          ],
        },
      ],
    },
    {
      heading: "Independence",
      blocks: [
        {
          kind: "p",
          text: "Advertisers, affiliate partners, and {experts} listings do not control editorial conclusions. Sponsored placements are labelled. Revenue transparency: {monetize}.",
        },
      ],
    },
    {
      heading: "Corrections and contact",
      blocks: [
        {
          kind: "p",
          text: "Report factual errors via {contact} or hello@lifedecisions.space. Material corrections are noted on the article. Full process: {editorialStandards}.",
        },
      ],
    },
  ],
};

const editorialStandards: TrustPageCopy = {
  metaTitle: "Editorial Standards",
  metaDescription:
    "Accuracy, updates, AI disclosure, moderation, and correction standards for Life Decision Engine.",
  eyebrow: "Publisher",
  title: "Editorial Standards",
  subtitle:
    "How we maintain trust for readers, experts, and advertising partners.",
  sections: [
    {
      heading: "Accuracy and sourcing",
      blocks: [
        {
          kind: "p",
          text: "Articles rely on verified sources, named frameworks, and editorial experience — not hype or anonymous anecdotes. Factual errors are corrected promptly; material changes are noted at the bottom of the article.",
        },
      ],
    },
    {
      heading: "Review cadence",
      blocks: [
        {
          kind: "ul",
          items: [
            "Major decision frameworks: reviewed at least annually.",
            "Blog posts in active playbooks: re-read within 90 days.",
            "Analyzer prompt templates: reviewed quarterly.",
            "Trust and legal pages: reviewed when policy or law changes.",
          ],
        },
      ],
    },
    {
      heading: "AI disclosure",
      blocks: [
        {
          kind: "p",
          text: "When AI assists drafting or analyzer output, that is documented on {howWeUseAi}. A human editor reviews structure, claims, and safety boundaries before publishing. We do not present AI output as licensed professional advice.",
        },
      ],
    },
    {
      heading: "Community and listings",
      blocks: [
        {
          kind: "p",
          text: "Community posts and expert applications follow {contentPolicy} and {communityGuidelines}. Spam, harassment, and certainty-style medical/legal/financial advice are removed.",
        },
      ],
    },
    {
      heading: "Advertising standards",
      blocks: [
        {
          kind: "p",
          text: "Display ads are labelled, consent-gated, and separated from editorial content. Affiliate links include disclosure. Details: {monetize}, {privacy}, {cookies}.",
        },
      ],
    },
    {
      heading: "Corrections",
      blocks: [
        {
          kind: "p",
          text: "Report errors via {contact} or hello@lifedecisions.space. We aim to respond within five business days and update both the live page and the underlying prompt or checklist when the error is systemic.",
        },
      ],
    },
  ],
};

export const trustPagesEn = {
  cookies,
  "content-policy": contentPolicy,
  privacy,
  terms,
  disclaimer,
  about,
  contact,
  faq,
  "editorial-team": editorialTeam,
  "editorial-standards": editorialStandards,
  publisher: { analyze, pricing, home },
};
