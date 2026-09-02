#!/usr/bin/env node
// Podívej se na stránku očima člověka: obrázek pro mobil i počítač,
// chyby z konzole a padlé požadavky. Nic neověřuje, jen ukazuje.
//
//   npm run screenshot -- /recepty/novy /recepty
//   npm run screenshot -- / --storage e2e/.auth/user.json
//   npm run screenshot -- / --base http://localhost:3100
//
// Obrázky končí ve složce screenshots/ (je v .gitignore).
// Server musí už běžet, skript ho nespouští ani nezhasíná.

import { chromium, devices } from "@playwright/test";
import { mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const paths = [];
let storageState;
let baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--storage") storageState = args[++i];
  else if (args[i] === "--base") baseURL = args[++i];
  else paths.push(args[i]);
}

if (paths.length === 0) {
  console.error("Zadej aspoň jednu cestu, třeba: npm run screenshot -- /");
  process.exit(1);
}

const viewports = [
  { name: "mobil", options: { ...devices["Pixel 7"] } },
  { name: "pocitac", options: { viewport: { width: 1280, height: 800 } } },
];

mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
let problems = 0;

for (const path of paths) {
  for (const viewport of viewports) {
    const context = await browser.newContext({ ...viewport.options, storageState });
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(String(error)));
    page.on("response", (response) => {
      if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
    });

    const response = await page.goto(baseURL + path, { waitUntil: "networkidle" });
    const slug = path === "/" ? "uvod" : path.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-");
    const file = `screenshots/${slug}-${viewport.name}.png`;
    await page.screenshot({ path: file, fullPage: true });

    console.log(`\n${path} (${viewport.name}) -> ${file}`);
    console.log(`  stav stránky: ${response?.status() ?? "bez odpovědi"}, titulek: "${await page.title()}"`);
    if (consoleErrors.length === 0 && failedRequests.length === 0) {
      console.log("  konzole čistá, žádný padlý požadavek");
    }
    for (const error of consoleErrors) {
      problems++;
      console.log(`  CHYBA V KONZOLI: ${error}`);
    }
    for (const request of failedRequests) {
      problems++;
      console.log(`  PADLÝ POŽADAVEK: ${request}`);
    }

    await context.close();
  }
}

await browser.close();
console.log(problems === 0 ? "\nBez nálezu. Teď si obrázky přečti." : `\nNálezů: ${problems}. Přečti si je i obrázky.`);
