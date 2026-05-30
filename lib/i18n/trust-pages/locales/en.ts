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
    "Answers about the Life Decision Engine analyzer, privacy, payments, and experts directory.",
  eyebrow: "Help",
  title: "Frequently asked questions",
  subtitle:
    "Short answers. Full legal text: {privacy}, {terms}, {disclaimer}.",
  sections: [
    {
      heading: "Analyzer",
      blocks: [
        {
          kind: "p",
          text: "Is this professional advice? No — it is an educational tool. Can I share a report with my therapist or lawyer? Yes; the scenario summary often helps sessions focus on the real fork in the road.",
        },
      ],
    },
    {
      heading: "Privacy",
      blocks: [
        {
          kind: "p",
          text: "We do not publish or sell your decision text. Details: {privacy} and {cookies}.",
        },
      ],
    },
    {
      heading: "Payments",
      blocks: [
        {
          kind: "p",
          text: "The free tier delivers a complete structured report. Premium adds history and deeper runs — see {pricing}.",
        },
      ],
    },
    {
      heading: "Experts",
      blocks: [
        {
          kind: "p",
          text: "The directory lists third-party professionals you contact directly. We do not guarantee outcomes. {experts} and {expertsRegister}.",
        },
      ],
    },
    {
      heading: "Editorial",
      blocks: [
        {
          kind: "p",
          text: "Articles are written by the {editorialTeam} under {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Other questions",
      blocks: [
        {
          kind: "p",
          text: "Did not find an answer? Write {contact} or see {about}.",
        },
      ],
    },
  ],
};

const editorialTeam: TrustPageCopy = {
  metaTitle: "Editorial Team",
  metaDescription:
    "Who maintains Life Decision Engine decision frameworks and {blog} content.",
  eyebrow: "Publisher",
  title: "Editorial Team",
  subtitle:
    "The people who design, review, and update frameworks and articles.",
  sections: [
    {
      heading: "Role",
      blocks: [
        {
          kind: "p",
          text: "The editorial team defines analyzer structure, writes and reviews {blog} articles, and works to {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Independence",
      blocks: [
        {
          kind: "p",
          text: "Advertisers and {experts} listings do not control editorial conclusions. Articles are labelled when a commercial relationship exists.",
        },
      ],
    },
    {
      heading: "Review",
      blocks: [
        {
          kind: "p",
          text: "New frameworks pass internal review and are updated when law, markets, or research change.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [
        {
          kind: "p",
          text: "Corrections and press: {contact}.",
        },
      ],
    },
  ],
};

const editorialStandards: TrustPageCopy = {
  metaTitle: "Editorial Standards",
  metaDescription:
    "Accuracy, updates, AI disclosure, and correction standards for Life Decision Engine.",
  eyebrow: "Publisher",
  title: "Editorial Standards",
  subtitle:
    "How we maintain trust for readers and advertising partners.",
  sections: [
    {
      heading: "Accuracy",
      blocks: [
        {
          kind: "p",
          text: "Articles rely on verified sources and editorial experience. Factual errors are corrected promptly and noted when the change is material.",
        },
      ],
    },
    {
      heading: "Updates",
      blocks: [
        {
          kind: "p",
          text: "Major decision frameworks are reviewed at least annually, or sooner when rules or data change.",
        },
      ],
    },
    {
      heading: "AI disclosure",
      blocks: [
        {
          kind: "p",
          text: "When AI assists drafting or reports, that is documented on {howWeUseAi}. A human editor reviews structure and safety boundaries.",
        },
      ],
    },
    {
      heading: "Content policy",
      blocks: [
        {
          kind: "p",
          text: "Community, advertising, and tools follow {contentPolicy}.",
        },
      ],
    },
    {
      heading: "Corrections",
      blocks: [
        {
          kind: "p",
          text: "Report errors via {contact} or hello@lifedecisions.space. We aim to respond within five business days.",
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
