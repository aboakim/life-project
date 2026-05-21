#!/usr/bin/env node
/**
 * One-time mirror of home-page Unsplash assets into /public/home/.
 * Run: node scripts/mirror-home-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "home");

const Q = "ixlib=rb-4.0.3&auto=format&fit=crop&w=960&q=80";

/** @type {{ file: string; photoId: string }[]} */
const assets = [
  // Product scene strip (6)
  { file: "product-0.jpg", photoId: "1454165804606-c3d57bc86b40" },
  { file: "product-1.jpg", photoId: "1522202176988-66273c2fd55f" },
  { file: "product-2.jpg", photoId: "1504384308090-c894fdcc538d" },
  { file: "product-3.jpg", photoId: "1552664730-d307ca884978" },
  { file: "product-4.jpg", photoId: "1449824913935-59a10b8d2000" },
  { file: "product-5.jpg", photoId: "1522708323590-d24dbb6b0267" },
  // Thematic bands (2)
  { file: "thematic-a.jpg", photoId: "1423784346385-c1d4dac9893a" },
  { file: "thematic-b.jpg", photoId: "1519681393784-d120267933ba" },
  // Visual story — overview
  { file: "story-overview-0.jpg", photoId: "1507679799987-c73779587ccf" },
  { file: "story-overview-1.jpg", photoId: "1600880292203-757bb62b4baf" },
  { file: "story-overview-2.jpg", photoId: "1449614115178-cb924f730780" },
  // trust
  { file: "story-trust-0.jpg", photoId: "1454625233598-f29d597eea1e" },
  { file: "story-trust-1.jpg", photoId: "1416339306562-f3d12fefd36f" },
  { file: "story-trust-2.jpg", photoId: "1495978866932-92dbc079e62e" },
  // how
  { file: "story-how-0.jpg", photoId: "1461988320302-91bde64fc8e4" },
  { file: "story-how-1.jpg", photoId: "1479030574009-1e48577746e8" },
  { file: "story-how-2.jpg", photoId: "1417325384643-aac51acc9e5d" },
  // what-it-fixes
  { file: "story-fixes-0.jpg", photoId: "1482938289607-e9573fc25ebb" },
  { file: "story-fixes-1.jpg", photoId: "1449182325215-d517de72c42d" },
  { file: "story-fixes-2.jpg", photoId: "1540538581514-1d465aaad58c" },
];

async function downloadOne({ file, photoId }) {
  const url = `https://images.unsplash.com/photo-${photoId}?${Q}`;
  const dest = join(outDir, file);
  const res = await fetch(url, {
    headers: { "User-Agent": "LifeDecisionEngine-mirror/1.0" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`${file}: HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`OK ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const asset of assets) {
    await downloadOne(asset);
  }
  console.log(`Done — ${assets.length} files in public/home/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
