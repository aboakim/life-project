/** Deterministic “signature” from brief text — decorative only */

function djb2(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(33, h) ^ str.charCodeAt(i);
  }
  return h >>> 0;
}

export function briefSignaturePalette(text: string): string[] {
  const seed = djb2(text.trim() || "\u200b");
  const colors: string[] = [];
  for (let i = 0; i < 5; i++) {
    const mixed = Math.imul(seed, i + 1) ^ (seed >>> (i * 3));
    const hue = mixed % 360;
    const sat = 48 + (mixed % 22);
    const light = 40 + (mixed % 20);
    colors.push(`hsl(${hue}deg ${sat}% ${light}%)`);
  }
  return colors;
}

export function briefMoodIndex(text: string, moodsLength: number): number {
  if (moodsLength <= 0) return 0;
  return djb2(text.trim() || "\u200b") % moodsLength;
}
