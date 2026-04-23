/**
 * Records a real browser session of the live site → WebM, then (optional) English TTS
 * + H.264 MP4 for Windows/Photos-friendly playback.
 *
 * The welcome modal and cookie bar are pre-dismissed via localStorage (init script)
 * so the recording shows the real page.
 *
 * Setup (once):
 *   npm install
 *   npx playwright install chromium
 *
 * Run:
 *   npm run video:record-site
 *
 * Output:
 *   ad-creative/output/<auto>.webm
 *   ad-creative/output/site-promo-narration.wav  (if TTS on Windows)
 *   ad-creative/output/site-promo-latest.mp4
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync, execSync, spawnSync } = require("child_process");
const { chromium } = require("playwright");

const BASE = (process.env.PROMO_SITE_URL || "https://lifedecisions.space").replace(
  /\/$/,
  "",
);
const OUT = path.join(__dirname, "..", "ad-creative", "output");

/** Section B (short) from SITE-PROMO-VOICEOVER-AND-MP4-EXPORT.txt — plain ASCII for SAPI. */
const NARRATION_EN = [
  "Life Decision Engine, at life decisions dot space, is a site for people facing big life decisions,",
  "a job, a move, or a hard relationship choice.",
  "It is built to give you structure, not random chat, but a clear report.",
  "You enter your question. You get several scenarios, a money and mind look at the trade offs,",
  "a timeline from a few months to a few years, and a score with an explanation.",
  "There is also a community, a blog, and a list of real experts when you want a human, not a screen.",
  "The tool is for thinking in order. It does not replace a therapist or a lawyer.",
  "Try the free flow at life decisions dot space.",
].join(" ");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function findBundledFfmpeg() {
  const home = os.homedir();
  const base =
    process.platform === "win32"
      ? path.join(home, "AppData", "Local", "ms-playwright")
      : path.join(home, ".cache", "ms-playwright");
  if (!fs.existsSync(base)) return null;
  const dirs = fs
    .readdirSync(base)
    .filter((d) => d.startsWith("ffmpeg-"));
  for (const d of dirs) {
    if (process.platform === "win32") {
      const w = path.join(base, d, "ffmpeg-win64", "ffmpeg.exe");
      if (fs.existsSync(w)) return w;
    } else {
      const l = path.join(base, d, "ffmpeg-linux", "ffmpeg");
      if (fs.existsSync(l)) return l;
      const m = path.join(base, d, "ffmpeg-mac", "ffmpeg");
      if (fs.existsSync(m)) return m;
    }
  }
  return null;
}

function findFfmpeg() {
  const bundled = findBundledFfmpeg();
  if (bundled) return bundled;
  try {
    if (process.platform === "win32") {
      const out = execSync("where.exe ffmpeg", { encoding: "utf8", windowsHide: true });
      const first = out.split(/\r?\n/)[0]?.trim();
      if (first && fs.existsSync(first)) return first;
    } else {
      const w = execFileSync("which", ["ffmpeg"], { encoding: "utf8" }).trim();
      return w || null;
    }
  } catch {
    /* empty */
  }
  return null;
}

function getDurationSec(mediaPath) {
  const ff = findFfmpeg();
  if (!ff || !fs.existsSync(mediaPath)) return null;
  const r = spawnSync(ff, ["-i", mediaPath], { encoding: "utf8" });
  const m = r.stderr && /Duration:\s*(\d+):(\d+):(\d+\.\d+)/.exec(r.stderr);
  if (!m) return null;
  return (
    parseInt(m[1], 10) * 3600 +
    parseInt(m[2], 10) * 60 +
    parseFloat(m[3], 10)
  );
}

function trySynthesizeWindowsSapiWav(outWav) {
  if (process.platform !== "win32") {
    return false;
  }
  const narrPath = path.join(OUT, "promo-narration-text.txt");
  fs.writeFileSync(narrPath, NARRATION_EN, "utf8");
  const pNarr = narrPath.replace(/'/g, "''");
  const pWav = outWav.replace(/'/g, "''");
  const r = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-Command",
      `Add-Type -AssemblyName System.Speech; $t = Get-Content -Raw -Path '${pNarr}' -Encoding UTF8; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; $s.Rate = -1; $s.SetOutputToWaveFile('${pWav}'); $s.Speak($t); $s.Dispose()`,
    ],
    { encoding: "utf8", windowsHide: true },
  );
  if (r.status !== 0) {
    console.error("SAPI TTS failed:", r.stderr || r.stdout);
    return false;
  }
  return fs.existsSync(outWav);
}

/**
 * Mux WebM + WAV → H.264/AAC MP4. Pads video (hold last frame) or audio (silence)
 * so the shorter side matches the longer.
 */
function tryMuxToMp4(webmPath, wavPath) {
  const outMp4 = path.join(OUT, "site-promo-latest.mp4");
  const ff = findFfmpeg();
  if (!ff) {
    console.log("");
    console.log(
      "FFmpeg not found. Install: winget install ffmpeg  OR  open .webm with Edge / Chrome / VLC.",
    );
    return;
  }

  const dV = getDurationSec(webmPath) || 0;
  const dA = wavPath && fs.existsSync(wavPath) ? getDurationSec(wavPath) || 0 : 0;

  const enc = [
    "-c:v",
    "libx264",
    "-crf",
    "20",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
  ];

  if (dA <= 0) {
    const r = spawnSync(
      ff,
      [
        "-y",
        "-i",
        webmPath,
        "-c:v",
        "libx264",
        "-crf",
        "20",
        "-pix_fmt",
        "yuv420p",
        "-an",
        "-movflags",
        "+faststart",
        outMp4,
      ],
      { stdio: "inherit" },
    );
    if (r.status === 0) {
      console.log("");
      console.log("MP4 (no narration — TTS not available on this OS or failed):");
      console.log("  ", outMp4);
    }
    return;
  }

  const eps = 0.08;
  let filter;
  if (dV < dA - eps) {
    const padV = dA - dV;
    filter = `[0:v]tpad=stop_mode=clone:stop_duration=${padV.toFixed(3)}[vout]`;
  } else if (dA < dV - eps) {
    const padA = dV - dA;
    filter = `[1:a]apad=pad_dur=${padA.toFixed(3)}[aout]`;
  } else {
    filter = null;
  }

  if (filter) {
    if (filter.startsWith("[0:v]")) {
      const r = spawnSync(
        ff,
        [
          "-y",
          "-i",
          webmPath,
          "-i",
          wavPath,
          "-filter_complex",
          filter,
          "-map",
          "[vout]",
          "-map",
          "1:a",
          ...enc,
          outMp4,
        ],
        { stdio: "inherit" },
      );
      if (r.status === 0) {
        console.log("");
        console.log("MP4 with English voiceover (video padded to match audio):");
        console.log("  ", outMp4);
        return;
      }
    } else {
      const r = spawnSync(
        ff,
        [
          "-y",
          "-i",
          webmPath,
          "-i",
          wavPath,
          "-filter_complex",
          filter,
          "-map",
          "0:v",
          "-map",
          "[aout]",
          ...enc,
          outMp4,
        ],
        { stdio: "inherit" },
      );
      if (r.status === 0) {
        console.log("");
        console.log("MP4 with English voiceover (audio padded to match video):");
        console.log("  ", outMp4);
        return;
      }
    }
  } else {
    const r = spawnSync(
      ff,
      ["-y", "-i", webmPath, "-i", wavPath, ...enc, outMp4],
      { stdio: "inherit" },
    );
    if (r.status === 0) {
      console.log("");
      console.log("MP4 with English voiceover:");
      console.log("  ", outMp4);
      return;
    }
  }

  console.error("FFmpeg mux failed. WebM and WAV are still in ad-creative/output.");
}

async function runTour(page, minSec) {
  const t0 = Date.now();

  console.log("Opening home…", BASE);
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await sleep(3000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await sleep(1000);
  for (const top of [800, 1600, 2400, 1200, 0]) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "smooth" }),
      top,
    );
    await sleep(3500);
  }
  const workspace = page.locator("#section-workspace");
  if ((await workspace.count()) > 0) {
    await workspace.scrollIntoViewIfNeeded();
    await sleep(4000);
  }

  console.log("Opening /analyze …");
  await page.goto(`${BASE}/analyze`, { waitUntil: "domcontentloaded" });
  await sleep(1000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await sleep(2000);
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: "smooth" }));
  await sleep(5000);

  console.log("Opening /experts …");
  await page.goto(`${BASE}/experts`, { waitUntil: "domcontentloaded" });
  await sleep(2000);
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "smooth" }));
  await sleep(5000);

  if (minSec < 30) {
    console.log("Opening /pricing …");
    await page.goto(`${BASE}/pricing`, { waitUntil: "domcontentloaded" });
    await sleep(5000);
  }

  console.log("Back to home …");
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await sleep(3000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await sleep(2000);

  const elapsed = (Date.now() - t0) / 1000;
  const need = minSec - elapsed;
  if (need > 0.5) {
    console.log(`Holding last frame to match voiceover (+${need.toFixed(1)}s)…`);
    await sleep(need * 1000);
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const wavPath = path.join(OUT, "site-promo-narration.wav");

  let minTourSec = 50;
  if (trySynthesizeWindowsSapiWav(wavPath)) {
    const dA = getDurationSec(wavPath);
    if (dA) {
      minTourSec = dA + 1.5;
      console.log(`Narration length ~${dA.toFixed(1)}s — tour will run at least that long.`);
    }
  } else if (process.platform !== "win32") {
    console.log("");
    console.log(
      "Note: automatic English TTS is supported on Windows (SAPI). On this OS, add voice in an editor, or use the WAV/MP4 from a Windows run.",
    );
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: OUT,
      size: { width: 1280, height: 720 },
    },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });

  await context.addInitScript(() => {
    try {
      localStorage.setItem("lde-welcome-dismissed-v1", "1");
      localStorage.setItem("lde.consent.v1", "accepted");
    } catch {
      /* empty */
    }
  });

  const page = await context.newPage();
  page.setDefaultTimeout(90_000);

  try {
    await runTour(page, minTourSec);
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
    console.log("Done. Latest WebM recording:");
    console.log("  ", latest.full);
    console.log("");
    console.log("Building MP4 (H.264 + voice when available)…");
    if (fs.existsSync(wavPath)) {
      tryMuxToMp4(latest.full, wavPath);
    } else {
      tryMuxToMp4(latest.full, null);
    }
    if (!fs.existsSync(path.join(OUT, "site-promo-latest.mp4"))) {
      console.log("");
      console.log(
        "To open the WebM: right-click, Open with → Chrome, Edge, or VLC (videolan.org).",
      );
    }
  } else {
    console.log("No .webm found in", OUT);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
