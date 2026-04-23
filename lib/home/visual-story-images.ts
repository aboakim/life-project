/**
 * 12 unique Unsplash images for story + “What it fixes” cards.
 * IDs are disjoint from `HERO_SLIDE_IMAGE_URLS`, `PRODUCT_STRIP_IMAGE_URLS`,
 * and `thematic-banners` so the home page never repeats the same photo.
 * Query string matches the rest of the project (`hero-slide-images` style).
 */
const Q =
  "ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?${Q}`;

/** Overview: focus, remote collaboration, big picture */
const overview = {
  src: [
    u("1507679799987-c73779587ccf"),
    u("1600880292203-757bb62b4baf"),
    u("1449614115178-cb924f730780"),
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
    u("1454625233598-f29d597eea1e"),
    u("1416339306562-f3d12fefd36f"),
    u("1495978866932-92dbc079e62e"),
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
    u("1461988320302-91bde64fc8e4"),
    u("1479030574009-1e48577746e8"),
    u("1417325384643-aac51acc9e5d"),
  ],
  alt: [
    "Laptop in a light-filled room, shopping or planning on screen",
    "Narrow path through a green forest with dappled sunlight",
    "Soft white clouds as seen from above the weather layer",
  ],
} as const;

const fixes = {
  src: [
    u("1482938289607-e9573fc25ebb"),
    u("1449182325215-d517de72c42d"),
    u("1540538581514-1d465aaad58c"),
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
