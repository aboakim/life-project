import type { BlogBlock } from "@/lib/blog/posts";

/** Split article body after the 2nd h2 (or midpoint) for an in-content ad slot. */
export function splitBodyForAd(body: BlogBlock[]): {
  before: BlogBlock[];
  after: BlogBlock[];
} {
  let h2Count = 0;
  let splitAt = body.length;

  for (let i = 0; i < body.length; i++) {
    if (body[i]!.kind === "h2") {
      h2Count++;
      if (h2Count === 2) {
        splitAt = i;
        break;
      }
    }
  }

  if (splitAt === body.length && body.length > 4) {
    splitAt = Math.floor(body.length / 2);
  }

  return {
    before: body.slice(0, splitAt),
    after: body.slice(splitAt),
  };
}
