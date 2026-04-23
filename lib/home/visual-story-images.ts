/**
 * 12 unique Unsplash images (all verified 200) — no duplicate photo IDs.
 * Query string matches the rest of the project (`hero-slide-images` style).
 */
const Q =
  "ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=85";

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?${Q}`;

/** Overview: desk / people / structure */
const overview = {
  src: [
    u("1454165804606-c3d57bc86b40"),
    u("1504384308090-c894fdcc538d"),
    u("1503387762-592deb58ef4e"),
  ],
  alt: [
    "Business planning: papers and pen on a wooden desk",
    "Team of three collaborating at a laptop in an office",
    "Architectural blueprints and drawings spread on a table",
  ],
} as const;

/** Trust: horizon, team, office calm */
const trust = {
  src: [
    u("1506905925346-21bda4d32df4"),
    u("1522071820081-009f0129c71c"),
    u("1524758631624-e2822e304c36"),
  ],
  alt: [
    "Layered mountain ridges above a sea of clouds at sunrise",
    "Team sitting around a table in a modern workspace",
    "Bright minimal workspace with desk, chairs, and soft daylight",
  ],
} as const;

/** How: metrics, nature path, workshop */
const how = {
  src: [
    u("1551288049-bebda4e38f71"),
    u("1441974231531-c6227db76b6e"),
    u("1522202176988-66273c2fd55f"),
  ],
  alt: [
    "Laptop screen showing analytics charts and graphs",
    "A forest path with tall green trees and sunlight",
    "People learning together in a training session",
  ],
} as const;

const fixes = {
  src: [
    u("1552664730-d307ca884978"),
    u("1449824913935-59a10b8d2000"),
    u("1522708323590-d24dbb6b0267"),
  ],
  alt: [
    "Leaders in a modern office celebrating or presenting",
    "Wide city crosswalk with people and light traffic at dusk",
    "Bright home interior with a sofa and large windows",
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
