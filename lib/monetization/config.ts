/**
 * Monetization config — everything reads from env so the user can rotate
 * affiliate IDs, pause channels, or swap vendors without touching code.
 *
 * All links are declared as "public" because they're client-visible. No
 * secrets here — only referral IDs that are meant to be shared publicly.
 */

function env(key: string): string | undefined {
  const v = process.env[key];
  if (v == null) return undefined;
  const s = v.trim();
  return s.length === 0 ? undefined : s;
}

/** Buy Me a Coffee / Ko-fi support page (single link, optional). */
export function getSupportUrl(): string | undefined {
  return (
    env("NEXT_PUBLIC_BUYMEACOFFEE_URL") ??
    env("NEXT_PUBLIC_KOFI_URL") ??
    env("NEXT_PUBLIC_SUPPORT_URL")
  );
}

/** Label shown on the support button (override from env). */
export function getSupportLabel(): string {
  return env("NEXT_PUBLIC_SUPPORT_LABEL") ?? "Support this project";
}

export type AffiliateTopic =
  | "finance"
  | "relocation"
  | "career"
  | "housing"
  | "relationships"
  | "general";

export type AffiliateOffer = {
  id: string;
  title: string;
  blurb: string;
  cta: string;
  href: string;
  topic: AffiliateTopic[];
  badge?: string;
};

/**
 * Build the pool of affiliate offers from env vars. Any offer whose link
 * is unset is skipped silently — no broken CTAs in production.
 */
export function getAffiliateOffers(): AffiliateOffer[] {
  const offers: AffiliateOffer[] = [];

  const wise = env("NEXT_PUBLIC_WISE_AFFILIATE_URL");
  if (wise) {
    offers.push({
      id: "wise",
      title: "Wise — multi-currency account",
      blurb:
        "Send and hold money in 40+ currencies with the real exchange rate. Built for people living, working, or moving across borders.",
      cta: "Open a free Wise account",
      href: wise,
      topic: ["finance", "relocation", "career"],
      badge: "Recommended for movers",
    });
  }

  const revolut = env("NEXT_PUBLIC_REVOLUT_AFFILIATE_URL");
  if (revolut) {
    offers.push({
      id: "revolut",
      title: "Revolut — banking for modern life",
      blurb:
        "One app for multi-currency spending, budgeting, and savings. A solid second bank if you travel or plan to relocate.",
      cta: "Try Revolut free",
      href: revolut,
      topic: ["finance", "relocation"],
    });
  }

  const booking = env("NEXT_PUBLIC_BOOKING_AFFILIATE_URL");
  if (booking) {
    offers.push({
      id: "booking",
      title: "Booking.com — scout your next city",
      blurb:
        "Before you relocate, spend a week on the ground. Booking.com is still the widest net for short-term stays in unfamiliar cities.",
      cta: "Find stays on Booking.com",
      href: booking,
      topic: ["relocation", "housing"],
    });
  }

  const airbnb = env("NEXT_PUBLIC_AIRBNB_AFFILIATE_URL");
  if (airbnb) {
    offers.push({
      id: "airbnb",
      title: "Airbnb — stay like a local for a month",
      blurb:
        "For relocation scouting trips, 30-day Airbnb stays are often cheaper than hotels and let you test neighbourhoods properly.",
      cta: "Browse Airbnb monthly stays",
      href: airbnb,
      topic: ["relocation", "housing"],
    });
  }

  /** Amazon Associates — set NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG (e.g. lifedecisions-20). */
  const amazonTag = env("NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG");
  const amazonUrlOverride = env("NEXT_PUBLIC_AMAZON_AFFILIATE_URL");
  if (amazonUrlOverride) {
    offers.push({
      id: "amazon",
      title: "Amazon — books & gear for your next chapter",
      blurb:
        "Decision-making reads, travel basics, and home-office gear — same Amazon you already use, with no extra cost to you.",
      cta: "Shop on Amazon",
      href: amazonUrlOverride,
      topic: [
        "finance",
        "relocation",
        "career",
        "housing",
        "relationships",
        "general",
      ],
      badge: "Amazon Associates",
    });
  } else if (amazonTag) {
    const tag = encodeURIComponent(amazonTag);
    offers.push({
      id: "amazon",
      title: "Amazon — books & gear for your next chapter",
      blurb:
        "Decision-making reads, travel basics, and home-office gear — same Amazon you already use, with no extra cost to you.",
      cta: "Shop on Amazon",
      href: `https://www.amazon.com/?tag=${tag}`,
      topic: [
        "finance",
        "relocation",
        "career",
        "housing",
        "relationships",
        "general",
      ],
      badge: "Amazon Associates",
    });
  }

  return offers;
}

/** Pick up to N affiliate offers that match a set of post tags. */
export function pickOffersForTags(
  tags: string[],
  count = 1,
): AffiliateOffer[] {
  const pool = getAffiliateOffers();
  if (pool.length === 0) return [];

  const topicsFromTags: AffiliateTopic[] = [];
  const lc = new Set(tags.map((t) => t.toLowerCase()));
  if (
    lc.has("finance") ||
    lc.has("money") ||
    lc.has("investing") ||
    lc.has("fi")
  ) {
    topicsFromTags.push("finance");
  }
  if (lc.has("relocation") || lc.has("immigration") || lc.has("abroad")) {
    topicsFromTags.push("relocation");
  }
  if (lc.has("career") || lc.has("work") || lc.has("entrepreneurship")) {
    topicsFromTags.push("career");
  }
  if (lc.has("housing") || lc.has("home") || lc.has("real-estate")) {
    topicsFromTags.push("housing");
  }
  if (lc.has("relationships") || lc.has("family")) {
    topicsFromTags.push("relationships");
  }
  topicsFromTags.push("general");

  const matches = pool.filter((o) =>
    o.topic.some((t) => topicsFromTags.includes(t)),
  );
  const finalList = matches.length > 0 ? matches : pool;

  return finalList.slice(0, Math.max(1, Math.min(count, finalList.length)));
}

/**
 * Direct advertiser slot — a single self-managed sponsor shown on article
 * pages when configured. Future work: rotate between 3+ sponsors via a
 * small admin panel.
 */
export type DirectSponsor = {
  name: string;
  title: string;
  blurb: string;
  cta: string;
  href: string;
  logoUrl?: string;
};

export function getDirectSponsor(): DirectSponsor | undefined {
  const name = env("NEXT_PUBLIC_SPONSOR_NAME");
  const title = env("NEXT_PUBLIC_SPONSOR_TITLE");
  const blurb = env("NEXT_PUBLIC_SPONSOR_BLURB");
  const href = env("NEXT_PUBLIC_SPONSOR_URL");
  if (!name || !title || !blurb || !href) return undefined;
  return {
    name,
    title,
    blurb,
    cta: env("NEXT_PUBLIC_SPONSOR_CTA") ?? "Learn more",
    href,
    logoUrl: env("NEXT_PUBLIC_SPONSOR_LOGO_URL"),
  };
}
