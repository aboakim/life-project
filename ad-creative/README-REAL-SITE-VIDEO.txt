================================================================================
REAL SITE VIDEO (NO STOCK IMAGES) — WHAT WE HAVE IN THIS REPO
================================================================================
We did NOT find any file or folder named "youtube" inside the Life project on
your PC. If you have a separate YouTube tool elsewhere, use it together with
the files below.

This repo CAN record the **actual website in a real browser** as a video file.

================================================================================
1) ONE-COMMAND RECORDING (Playwright)
================================================================================
Prerequisites (once per machine):
  npm install
  npx playwright install chromium

Record (default URL: https://lifedecisions.space):
  npm run video:record-site

Optional — other URL (e.g. local dev):
  set PROMO_SITE_URL=http://localhost:3000&& npm run video:record-site
  (PowerShell: $env:PROMO_SITE_URL="http://localhost:3000"; npm run video:record-site)

Output folder (git-ignored, on your disk only):
  ad-creative/output/<something>.webm

YouTube Studio → Upload → supports .webm directly.

================================================================================
2) ADD VOICE + EDIT
================================================================================
The recording is **silent** (browser only). To match your promo:
  • import the .webm into CapCut / DaVinci / Premiere
  • add the English voiceover from:
      SITE-PROMO-VOICEOVER-AND-MP4-EXPORT.txt
  • export final MP4 for Instagram, TikTok, etc.

================================================================================
3) CONVERT WebM → MP4 (if a platform requires MP4)
================================================================================
  ffmpeg -i "path\\to\\file.webm" -c:v libx264 -crf 20 -c:a aac promo.mp4

================================================================================
