import type { Metadata } from "next";

/** Shared Open Graph + Twitter for indexable marketing/tool pages. */
export function toolPageMetadata(input: {
  title: string;
  description: string;
  canonical: string;
}): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      type: "website",
      url: input.canonical,
    },
    twitter: {
      card: "summary",
      title: input.title,
      description: input.description,
    },
  };
}
