/**
 * Easy Selenium smoke checks against the live site (or local dev).
 *
 * Requires: Chrome installed. selenium-webdriver uses Selenium Manager for chromedriver.
 *
 * Run (visible browser):
 *   npm run test:selenium
 *
 * Run (headless):
 *   set SELENIUM_HEADLESS=1 && npm run test:selenium
 *
 * Against local dev (app must be running):
 *   set BASE_URL=http://localhost:3000 && set SELENIUM_HEADLESS=1 && npm run test:selenium
 */

"use strict";

const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const BASE = (process.env.BASE_URL || "https://lifedecisions.space").replace(
  /\/$/,
  "",
);

async function run() {
  const options = new chrome.Options();
  if (process.env.SELENIUM_HEADLESS === "1") {
    options.addArguments(
      "--headless=new",
      "--disable-gpu",
      "--window-size=1280,900",
    );
  }

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  const failures = [];

  try {
    await driver.get(`${BASE}/`);
    const title = await driver.getTitle();
    if (!title.includes("Life Decision Engine")) {
      failures.push(
        `home title: expected "Life Decision Engine"; got ${JSON.stringify(title)}`,
      );
    } else {
      console.log("PASS: home title");
    }

    await driver.wait(until.elementLocated(By.css("body")), 20000);
    const body = await driver.findElement(By.css("body"));
    const homeText = await body.getText();
    if (homeText.length < 80) {
      failures.push(
        `home body: expected visible text (>=80 chars); got ${homeText.length}`,
      );
    } else {
      console.log("PASS: home body has text");
    }

    await driver.get(`${BASE}/faq`);
    await driver.wait(until.elementLocated(By.css("body")), 20000);
    const faqUrl = await driver.getCurrentUrl();
    if (!/\/faq/.test(faqUrl)) {
      failures.push(`faq url: expected segment /faq; got ${faqUrl}`);
    } else {
      console.log("PASS: /faq opens");
    }

    await driver.get(`${BASE}/pricing`);
    await driver.wait(until.elementLocated(By.css("body")), 20000);
    const pricingUrl = await driver.getCurrentUrl();
    if (!/\/pricing/.test(pricingUrl)) {
      failures.push(`pricing url: expected /pricing; got ${pricingUrl}`);
    } else {
      console.log("PASS: /pricing opens");
    }

    await driver.get(`${BASE}/ads.txt`);
    await driver.wait(until.elementLocated(By.css("body")), 20000);
    const adsSource = await driver.getPageSource();
    if (!adsSource.includes("google.com") && !adsSource.includes("pub-")) {
      failures.push("ads.txt: expected google.com or pub- in page");
    } else {
      console.log("PASS: /ads.txt mentions AdSense");
    }
  } finally {
    await driver.quit();
  }

  if (failures.length) {
    for (const line of failures) console.error("FAIL:", line);
    console.error(`\n${failures.length} check(s) failed.`);
    process.exitCode = 1;
  } else {
    console.log("\nAll Selenium smoke checks passed.");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
