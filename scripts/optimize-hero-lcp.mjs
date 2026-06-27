#!/usr/bin/env node
/**
 * Smaller LCP assets for the server-rendered home hero.
 * Run: node scripts/optimize-hero-lcp.mjs
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "hero", "slide-0.jpg");
const jpegDest = join(root, "public", "hero", "slide-0-lcp.jpg");
const webpDest = join(root, "public", "hero", "slide-0-lcp.webp");

const base = sharp(src)
  .rotate()
  .resize(840, 1050, { fit: "inside", withoutEnlargement: true });

const jpegBuf = await base
  .clone()
  .jpeg({ quality: 72, mozjpeg: true })
  .toBuffer();
await sharp(jpegBuf).toFile(jpegDest);
console.log(`Wrote slide-0-lcp.jpg (${(jpegBuf.length / 1024).toFixed(0)} KB)`);

const webpBuf = await base
  .clone()
  .webp({ quality: 74, effort: 4 })
  .toBuffer();
await sharp(webpBuf).toFile(webpDest);
console.log(`Wrote slide-0-lcp.webp (${(webpBuf.length / 1024).toFixed(0)} KB)`);
