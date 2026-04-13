/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), ".next");
try {
  fs.rmSync(dir, { recursive: true, force: true });
  process.stderr.write("Removed .next\n");
} catch (e) {
  if (e && e.code !== "ENOENT") throw e;
}
