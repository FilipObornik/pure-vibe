#!/usr/bin/env node
// Ověření řezu. Dvě úrovně:
//
//   npm run verify                          plná sada, všechny vrstvy a všechny testy
//   npm run verify:rez -- e2e/<spec>.spec.ts [další spec...]
//                                           jen to, čeho se změna od posledního plného
//                                           ověření dotkla, a vybrané testy v prohlížeči
//   npm run verify:rez -- --bez-prohlizece  změna nemá co ukázat v prohlížeči
//
// Testy databáze sahají do vývojového projektu na volném plánu, proto se neběží všechno
// pořád. `verify:rez` se ale sám přepne na plnou sadu, když změna sáhne na něco, na čem
// stojí celá aplikace (migrace, přihlášení, nastavení testů), nebo když je poslední zelený
// plný běh moc starý. Zelený plný běh si pamatuje v .git/, mimo repo.
//
// Příkazy jdou přes shell, takže skript funguje i ve Windows.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";

// --- Nastavení projektu -------------------------------------------------------------

// Plná sada, vrstva po vrstvě. Zelený konec zapíše snímek, od kterého počítá verify:rez.
const PLNA_SADA = [
  ["Typy", "npm run typecheck"],
  ["Jednotkové testy", "npm run test:unit"],
  ["Testy oprávnění", "npm run test:permissions"],
  ["Integrační testy", "npm run test:integration"],
  ["Prohlížeč, všechny testy", "npm run test:e2e"],
];

// Co verify:rez pouští vždycky, protože je to rychlé a do databáze to nesahá.
const VZDYCKY = [
  ["Typy", "npm run typecheck"],
  ["Jednotkové testy", "npm run test:unit"],
];

// Testy v prohlížeči jen pro vybrané specy (za příkaz se připojí jejich seznam).
const PROHLIZEC = "npx playwright test";

// Po kolika commitech bez plného běhu se verify:rez přepne na plnou sadu.
const STROP_COMMITU = 5;

// Na tomhle stojí celá aplikace nebo celá sada, dotčené testy se z nich poznat nedají.
const RIZIKOVE = [
  /^supabase\//,
  /^(src\/)?(proxy|middleware)\.ts$/,
  /^(src\/)?lib\/supabase\//,
  /^(src\/)?app\/layout\.tsx$/,
  /^package(-lock)?\.json$/,
  /^next\.config\.\w+$/,
  /^playwright\.config\.\w+$/,
  /^vitest\.config\.\w+$/,
  /^tests\/(setup\.ts|helpers)/,
  /^tests\/permissions\/helpers\.ts$/,
  /^e2e\/(?!.*\.spec\.ts$).*\.ts$/,
  /^scripts\/verify\.mjs$/,
];

// Změna tady se dá ukázat v prohlížeči, verify:rez pak chce vybraný spec.
const OBRAZOVKA = /^(src\/)?(app|components)\//;

// Kód a testy, ke kterým Vitest najde dotčené testy (`vitest related`).
const KOD = /^(src\/|app\/|components\/|lib\/|tests\/).*\.(ts|tsx)$/;

// -------------------------------------------------------------------------------------

const args = process.argv.slice(2);
// Cesty Next.js jako app/(protected)/[id] by shell bez uvozovek rozbil.
const vUvozovkach = (cesty) => cesty.map((c) => `"${c}"`).join(" ");
const rez = args.includes("--rez");
const bezProhlizece = args.includes("--bez-prohlizece");
const vybraneSpecy = args.filter((a) => !a.startsWith("--"));

function git(parametry, env = {}) {
  const vysledek = spawnSync("git", parametry, { encoding: "utf8", env: { ...process.env, ...env } });
  return vysledek.status === 0 ? vysledek.stdout.trim() : null;
}

const zaznam = git(["rev-parse", "--git-path", "posledni-plny-verify"]);

function spust(popis, prikaz) {
  console.log(`\n=== ${popis}: ${prikaz}`);
  const vysledek = spawnSync(prikaz, { stdio: "inherit", shell: true });
  if (vysledek.status !== 0) {
    console.error(`\n✗ ${popis} je červené. Pusť znovu jen to, co spadlo (skill "pravidla-testu").`);
    process.exit(vysledek.status ?? 1);
  }
}

/**
 * Snímek pracovního stromu tak, jak ho plná sada ověřila, i s neuloženými a novými soubory.
 * Vzniká jako commit mimo větev přes dočasný index, na větev ani na index nesahá.
 */
function snimekStromu() {
  const index = git(["rev-parse", "--git-path", "verify-index"]);
  if (!index) return null;
  const env = { GIT_INDEX_FILE: index };
  try {
    if (git(["read-tree", "HEAD"], env) === null || git(["add", "-A"], env) === null) return null;
    const strom = git(["write-tree"], env);
    return strom && git(["commit-tree", strom, "-p", "HEAD", "-m", "stav ověřený plnou sadou"]);
  } finally {
    rmSync(index, { force: true });
  }
}

function plnaSada(duvod) {
  console.log(`\nPlná sada: ${duvod}`);
  for (const [popis, prikaz] of PLNA_SADA) spust(popis, prikaz);
  const hlava = git(["rev-parse", "HEAD"]);
  const snimek = snimekStromu();
  if (zaznam && hlava && snimek) writeFileSync(zaznam, `${snimek} ${hlava}\n`);
  console.log("\n✓ Plná sada je zelená.");
}

if (!rez) {
  plnaSada("npm run verify");
  process.exit(0);
}

// --- verify:rez ---

// Záznam nese snímek ověřeného stromu (od něj se počítají změny) a tehdejší commit
// větve (od něj se počítají commity).
const [posledni, tehdejsiHlava] =
  zaznam && existsSync(zaznam) ? readFileSync(zaznam, "utf8").trim().split(" ") : [];
if (
  !posledni ||
  !tehdejsiHlava ||
  git(["cat-file", "-e", `${posledni}^{commit}`]) === null ||
  git(["merge-base", "--is-ancestor", tehdejsiHlava, "HEAD"]) === null
) {
  plnaSada("není zelený plný běh, od kterého by šlo na téhle větvi počítat změny");
  process.exit(0);
}

const commitu = Number(git(["rev-list", "--count", `${tehdejsiHlava}..HEAD`]) ?? STROP_COMMITU);
if (commitu >= STROP_COMMITU) {
  plnaSada(`od posledního zeleného plného běhu je ${commitu} commitů (strop ${STROP_COMMITU})`);
  process.exit(0);
}

// Git u souboru, který ve snímku je, ale větev ho nesleduje, hlásí změnu i beze změny.
// Rozhoduje proto obsah: soubor se počítá, když ve snímku není, chybí, nebo je jiný.
const kandidati = [
  ...(git(["diff", "--name-only", posledni]) ?? "").split("\n"),
  ...(git(["ls-files", "--others", "--exclude-standard"]) ?? "").split("\n"),
].filter(Boolean);
const zmenene = [...new Set(kandidati)].filter(
  (soubor) =>
    !existsSync(soubor) || git(["rev-parse", `${posledni}:${soubor}`]) !== git(["hash-object", soubor]),
);

const rizikove = zmenene.filter((soubor) => RIZIKOVE.some((vzor) => vzor.test(soubor)));
if (rizikove.length > 0) {
  plnaSada(`změna sahá na ${rizikove.join(", ")}`);
  process.exit(0);
}

const zmeneneSpecy = zmenene.filter((s) => /^e2e\/.*\.spec\.ts$/.test(s) && existsSync(s));
const specy = [...new Set([...vybraneSpecy, ...zmeneneSpecy])];
const saholNaObrazovku = zmenene.some((s) => OBRAZOVKA.test(s));

if (specy.length === 0 && saholNaObrazovku && !bezProhlizece) {
  console.error(
    "\n✗ Změna sahá na stránky nebo komponenty, ale není vybraný žádný test v prohlížeči.\n" +
      "  Vyber spec řezu a specy stránek, kterých ses dotkl: npm run verify:rez -- e2e/<spec>.spec.ts\n" +
      "  Když změna v prohlížeči opravdu nemá co ukázat: npm run verify:rez -- --bez-prohlizece",
  );
  process.exit(1);
}

console.log(`\nOvěření řezu: ${zmenene.length} změněných souborů od ${posledni.slice(0, 7)} (${commitu} commitů zpět).`);
for (const [popis, prikaz] of VZDYCKY) spust(popis, prikaz);

// Testy, které změněné soubory importují, nebo jsou mezi nimi. `vitest --changed` se snímkem
// nepočítá (porovnává po svém a pustí všechno), proto dostane seznam od nás.
const kodAtesty = zmenene.filter((s) => KOD.test(s) && existsSync(s));
if (kodAtesty.length > 0) {
  spust("Dotčené testy (i oprávnění a integrační)", `npx vitest related --run --passWithNoTests ${vUvozovkach(kodAtesty)}`);
} else {
  console.log("\n=== Dotčené testy oprávnění a integrační: změna nesahá na kód ani testy, nic k puštění.");
}
if (specy.length > 0) spust("Prohlížeč, vybrané testy", `${PROHLIZEC} ${vUvozovkach(specy)}`);

console.log(
  `\n✓ Řez je zelený na úrovni řezu. Prohlížeč: ${specy.length > 0 ? specy.join(", ") : "nespuštěn, změna nemá co ukázat"}.` +
    `\n  Plná sada přijde nejpozději za ${STROP_COMMITU - commitu} commitů, nebo ji pusť sám: npm run verify.`,
);
