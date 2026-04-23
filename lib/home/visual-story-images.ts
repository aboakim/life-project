/**
 * Unsplash art for `VisualStoryCard` (overview, trust, how).
 * Dark overlays in the component keep white text legible.
 */
export type VisualStoryTone = "overview" | "trust" | "how";

const overview = {
  src: [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
  ],
  alt: [
    "Open notebook and plans on a desk, structured work",
    "Colleagues collaborating at a laptop in daylight",
    "Professional listening in a calm office setting",
  ],
} as const;

const trust = {
  src: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
  ],
  alt: [
    "Mountain path above the clouds, sense of direction",
    "Laptop in a private quiet space",
    "Diverse team collaborating around a table with laptops",
  ],
} as const;

const how = {
  src: [
    "https://images.unsplash.com/photo-1455390582262-044c7de49b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
  ],
  alt: [
    "Writing ideas in a notebook with a pen",
    "Analytics and charts on a screen",
    "Business professional in a dark suit, composed posture",
  ],
} as const;

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

/** “What it fixes” strip — 3 images, same overlay pattern as `VisualStoryCard`. */
const fixes = {
  src: [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=86",
  ],
  alt: [
    "Laptop, coffee, and notes — late focus",
    "Handshake between two people, agreement",
    "Team working together at laptops",
  ],
} as const;

export function getWhatItFixesImage(
  index: number,
): { src: string; alt: string } {
  const i = index % 3;
  return { src: fixes.src[i]!, alt: fixes.alt[i]! };
}
