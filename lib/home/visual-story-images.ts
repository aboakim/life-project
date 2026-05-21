/**
 * Self-hosted story + “What it fixes” card images (/public/home/).
 * Disjoint from hero slides, product strip, and thematic bands.
 */

/** Overview: focus, remote collaboration, big picture */
const overview = {
  src: [
    "/home/story-overview-0.jpg",
    "/home/story-overview-1.jpg",
    "/home/story-overview-2.jpg",
  ],
  alt: [
    "Person typing on a laptop on a light desk, neutral background",
    "Laptop on a call with a remote team, friendly collaboration",
    "Aerial view of a city on a clear day, sense of scale",
  ],
} as const;

/** Trust: calm nature, small rituals, space to think */
const trust = {
  src: [
    "/home/story-trust-0.jpg",
    "/home/story-trust-1.jpg",
    "/home/story-trust-2.jpg",
  ],
  alt: [
    "Calm water reflecting mountains under soft light",
    "Laptop and coffee cup on a wooden table, deep focus",
    "Open water meeting the horizon, gentle waves",
  ],
} as const;

/** How: data, long path, shared learning */
const how = {
  src: [
    "/home/story-how-0.jpg",
    "/home/story-how-1.jpg",
    "/home/story-how-2.jpg",
  ],
  alt: [
    "Laptop in a light-filled room, shopping or planning on screen",
    "Narrow path through a green forest with dappled sunlight",
    "Soft white clouds as seen from above the weather layer",
  ],
} as const;

const fixes = {
  src: [
    "/home/story-fixes-0.jpg",
    "/home/story-fixes-1.jpg",
    "/home/story-fixes-2.jpg",
  ],
  alt: [
    "Colleagues working on laptops in a bright open office",
    "Colorful markers and design materials spread on a table",
    "Spacious living area with a sofa, plants, and daylight",
  ],
} as const;

export type VisualStoryTone = "overview" | "trust" | "how";

const byTone: Record<
  VisualStoryTone,
  { src: readonly [string, string, string]; alt: readonly [string, string, string] }
> = {
  overview,
  trust,
  how,
};

export function getVisualStoryImage(
  tone: VisualStoryTone,
  index: number,
): { src: string; alt: string } {
  const pack = byTone[tone];
  const i = index % 3;
  return { src: pack.src[i]!, alt: pack.alt[i]! };
}

export function getWhatItFixesImage(
  index: number,
): { src: string; alt: string } {
  const i = index % 3;
  return { src: fixes.src[i]!, alt: fixes.alt[i]! };
}
