/**
 * Records a real browser session of the live site → single WebM video.
 * Not static Unsplash images — actual https://lifedecisions.space (or PROMO_SITE_URL).
 *
 * Setup (once):
 *   npm install
 *   npx playwright install chromium
 *
 * Run:
 *   npm run video:record-site
 *
 * Output: ad-creative/output/<auto-name>.webm
 * YouTube accepts WebM; or convert with: ffmpeg -i input.webm -c:v libx264 -crf 18 out.mp4
 */

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BASE = (process.env.PROMO_SITE_URL || "https://lifedecisions.space").replace(
  /\/$/,
  "",
);
const OUT = path.join(__dirname, "..", "ad-creative", "output");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: OUT,
      size: { width: 1280, height: 720 },
    },
    // Sensible defaults for a “promo” capture
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();
  page.setDefaultTimeout(90_000);

  try {
    console.log("Opening home…", BASE);
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    await sleep(2500);

    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: "instant" }),
    );
    await sleep(800);
    await page.evaluate(() =>
      window.scrollTo({ top: 900, behavior: "smooth" }),
    );
    await sleep(2200);
    await page.evaluate(() =>
      window.scrollTo({ top: 2200, behavior: "smooth" }),
    );
    await sleep(2500);

    const workspace = page.locator("#section-workspace");
    if ((await workspace.count()) > 0) {
      await workspace.scrollIntoViewIfNeeded();
      await sleep(3200);
    }

    console.log("Opening /analyze …");
    await page.goto(`${BASE}/analyze`, { waitUntil: "domcontentloaded" });
    await sleep(3500);

    console.log("Opening /experts …");
    await page.goto(`${BASE}/experts`, { waitUntil: "domcontentloaded" });
    await sleep(3000);

    console.log("Back to home …");
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    await sleep(2000);
  } finally {
    await context.close();
    await browser.close();
  }

  const files = fs
    .readdirSync(OUT)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => {
      const full = path.join(OUT, f);
      return { f, full, mtime: fs.statSync(full).mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime);

  const latest = files[0];
  if (latest) {
    console.log("");
    console.log("Done. Latest recording:");
    console.log("  ", latest.full);
    console.log("");
    console.log("Upload this .webm to YouTube Studio, or convert to MP4:");
    console.log(
      '  ffmpeg -i "' +
        latest.full.replace(/\\/g, "/") +
        '" -c:v libx264 -crf 20 -c:a aac promo.mp4',
    );
  } else {
    console.log("No .webm found in", OUT);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
