#!/usr/bin/env node
/**
 * Smaller LCP asset for the server-rendered home hero.
 * Run: node scripts/optimize-hero-lcp.mjs
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "hero", "slide-0.jpg");
const dest = join(root, "public", "hero", "slide-0-lcp.jpg");

const buf = await sharp(src)
  .rotate()
  .resize(840, 1050, { fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 72, mozjpeg: true })
  .toBuffer();

await sharp(buf).toFile(dest);
console.log(`Wrote slide-0-lcp.jpg (${(buf.length / 1024).toFixed(0)} KB)`);
