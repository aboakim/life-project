/**
 * Rasterize public/favicon.svg into PNGs (for Google Search favicon; ≥48px).
 * Run: npm run favicons
 * Requires: devDependency `sharp`.
 * To refresh public/favicon.ico after changing the SVG, temporarily add `to-ico`
 * or convert favicon-48x48.png with an external tool.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "favicon.svg");

const buf48 = await sharp(svgPath).resize(48, 48).png().toBuffer();
const buf32 = await sharp(svgPath).resize(32, 32).png().toBuffer();

fs.writeFileSync(path.join(root, "public", "favicon-48x48.png"), buf48);
fs.writeFileSync(path.join(root, "public", "favicon-32x32.png"), buf32);

console.log("Wrote public/favicon-48x48.png, public/favicon-32x32.png");
