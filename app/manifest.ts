import type { MetadataRoute } from "next";

/**
 * Web app manifest. Google uses this for PWA install prompts, theme colour
 * in browser UI, and as a brand-identity signal during crawl. Keep the
 * theme_color in sync with CSS --surface to avoid flash of unstyled chrome.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Life Decision Engine",
    short_name: "Decision Engine",
    description:
      "Structured AI analysis for big life decisions — scenarios, lenses, timelines, and a decision score.",
    start_url: "/",
    display: "standalone",
    background_color: "#201c3a",
    theme_color: "#201c3a",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png", purpose: "any" },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["lifestyle", "productivity", "education", "finance"],
    lang: "en-US",
  };
}
