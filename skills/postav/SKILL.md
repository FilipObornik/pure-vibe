---
name: postav
description: Postav jeden řez, ověř ho a ulož.
disable-model-invocation: true
---

Postav **jeden řez**, ne víc. Když jich uživatel zadá víc, postav první a řekni, že další se dělá načisto v novém sezení.

Než začneš, přečti `KONTEXT.md` kvůli slovníku a `rozhodnuti/` kvůli tomu, co už je rozhodnuté v oblasti, kam saháš. Slovník na návrh drží skill "navrh-kodu", pravidla testů skill "pravidla-testu".

## Postup

1. **Přečti řez** a vypiš jednou větou, co po něm bude fungovat. Když ti něco chybí, zeptej se teď, ne v půlce.

2. **Ověř, že na tomhle řezu jde vůbec začít.** Podívej se do aplikace, co řez předpokládá jako hotové: přihlášeného uživatele, typ záznamu, na kterém visí, cizí službu. Nespoléhej jen na pole "Napřed musí být hotové", řez sem mohl přijít i bez `rozsekej`. **Když něco z toho není, nestav a nedomýšlej si náhradu.** Řekni uživateli, co chybí, a nabídni to jako řez, který jde napřed. Provizorní účet nebo natvrdo napsaný uživatel je nejdražší věc, co v projektu vznikne: testy oprávnění na něm projdou nazeleno a díru najde až někdo cizí.

3. **Zjisti, kdo co smí.** Když řez přidává nebo mění data, musí být jasné, kdo je smí vidět, měnit a mazat. Když to v zadání není, doptej se přes skill "preklad-rozhodnuti". Nedomýšlej si to.

4. **Piš po jednom.** Jeden test, k němu nejmenší kus kódu, který ho rozsvítí, a další. Nikdy nepiš všechny testy dopředu.

5. **Test napřed a viz ho spadnout.** Test, který jsi neviděl spadnout, nic neověřuje.

6. **Průběžně pouštěj `npm run check`.** Kontrola typů a rychlé testy, otázka sekund. Celou sadu včetně prohlížeče až na konci, ta se pouští jednou.

7. **Podívej se na to.** Spusť aplikaci a otevři stránku, které ses dotkl. Udělej screenshot a přečti chyby v konzoli. **Prázdná stránka, chyba v konzoli nebo rozsypaný obsah jsou nález, i když jsou testy zelené**, protože test ověří jen to, co jsi mu nadiktoval. Stačí na to Playwright, který v projektu už je, žádný další nástroj k tomu nepotřebuješ. Server po sobě zase zhasni, jinak zůstane viset na portu a příští spuštění spadne na něčem, co s prací nesouvisí. Tohle není ověření, to je krok 8.

8. **Ověř.** Zavolej skill "zkontroluj".

9. **Ulož checkpoint.** Commit na aktuální větev, v popisu jednou větou česky, co teď funguje.

## Kdy je řez hotový

Řez je hotový, když jsi **ukázal výstup příkazu `npm run verify`** a je zelený. Zelený `npm run check` to nenahrazuje, ten prohlížeč nespouští.

Tvrzení "funguje to", "mělo by to fungovat" nebo "testy procházejí" není důkaz. Důkaz je vypsaný výstup.

Dokud je předchozí řez červený, další nezačínej.

## Co dál

Po hotovém řezu řekni, který je na řadě další, a že se pouští **v novém sezení**. Když jsou hotové všechny, pošli uživatele na `/vibe:najdi-slaba-mista`, dřív než to někomu ukáže.

## Když se to zadrhne

Když třikrát po sobě opravuješ tu samou věc a nepomáhá to, přestaň hádat a řekni uživateli, ať spustí `/vibe:najdi-chybu`.
