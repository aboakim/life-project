import type { TrustPageCopy } from "../types";

export const contentPolicyEn: TrustPageCopy = {
  metaTitle: "Content Policy",
  metaDescription:
    "What Life Decision Engine publishes: editorial articles, AI-assisted tools, expert directory listings, and community Q&A. Quality standards and moderation.",
  eyebrow: "Publisher",
  title: "Content Policy",
  subtitle:
    "This policy describes what appears on lifedecisions.space, who creates it, and how we keep quality high for readers and advertising partners.",
  sections: [
    {
      heading: "Original editorial content",
      blocks: [
        {
          kind: "p",
          text: "Our primary value is original long-form articles in the {blog}: decision frameworks for career, relocation, relationships, and money. Articles are drafted by the {editorialTeam}, reviewed against {editorialStandards}, and updated when facts change. We do not scrape third-party articles or publish auto-generated filler pages.",
        },
      ],
    },
    {
      heading: "Tools and generated reports",
      blocks: [
        {
          kind: "p",
          text: "The analyzer produces personalised text from your inputs using structured templates and AI assistance documented on {howWeUseAi}. Generated reports are private to your session unless you share them. They are educational, not professional advice.",
        },
      ],
    },
    {
      heading: "Expert directory listings",
      blocks: [
        {
          kind: "p",
          text: "Professionals submit profiles via {expertsRegister}. We review listings before publication and remove misleading or spam entries. We do not guarantee outcomes from any professional relationship.",
        },
      ],
    },
    {
      heading: "Community Q&A",
      blocks: [
        {
          kind: "p",
          text: "The {community} allows text Q&A subject to {communityGuidelines}. Posts may be removed for abuse, spam, definitive medical or legal advice, or dangerous content. Community content is moderated and does not represent the editorial team.",
        },
      ],
    },
    {
      heading: "Advertising",
      blocks: [
        {
          kind: "p",
          text: "We may display Google AdSense ads on pages with substantial publisher-written content. Ads are labelled and separated from editorial copy. See {monetize}.",
        },
      ],
    },
    {
      heading: "Report a problem",
      blocks: [
        {
          kind: "p",
          text: "For corrections, takedown requests, or policy questions, email hello@lifedecisions.space or use {contact}. We aim to respond within five business days.",
        },
      ],
    },
  ],
};
