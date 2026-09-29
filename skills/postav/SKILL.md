---
name: postav
description: Postav jeden řez, ověř ho a ulož.
disable-model-invocation: true
---

Postav **jeden řez**, ne víc. Když jich uživatel zadá víc, postav první a řekni, že další se dělá načisto v novém sezení.

Než začneš, přečti `KONTEXT.md` kvůli slovníku, `rozhodnuti/` kvůli tomu, co už je rozhodnuté v oblasti, kam saháš, a `zadani.md` ve složce řezu kvůli tomu, co má celá věc umět. Slovník na návrh drží skill "navrh-kodu", pravidla testů skill "pravidla-testu".

## Postup

1. **Přečti řez** a vypiš jednou větou, co po něm bude fungovat. Když ti něco chybí, zeptej se teď, ne v půlce.

2. **Ověř, že na tomhle řezu jde vůbec začít.** Podívej se do aplikace, co řez předpokládá jako hotové: přihlášeného uživatele, typ záznamu, na kterém visí, cizí službu. Nespoléhej jen na pole "Napřed musí být hotové", řez sem mohl přijít i bez `rozsekej`. **Když něco z toho není, nestav a nedomýšlej si náhradu.** Řekni uživateli, co chybí, a nabídni to jako řez, který jde napřed. Provizorní účet nebo natvrdo napsaný uživatel je nejdražší věc, co v projektu vznikne: testy oprávnění na něm projdou nazeleno a díru najde až někdo cizí.

3. **Zjisti, kdo co smí.** Když řez přidává nebo mění data, musí být jasné, kdo je smí vidět, měnit a mazat. Když to v zadání není, doptej se přes skill "preklad-rozhodnuti". Nedomýšlej si to.

4. **Piš po jednom.** Jeden test, k němu nejmenší kus kódu, který ho rozsvítí, a další. Nikdy nepiš všechny testy dopředu. Každou podmínku ověř na nejnižší vrstvě, která to dokáže (skill "pravidla-testu"). V prohlížeči nejvýš dva testy na řez, a píšou se, až když obrazovka stojí.

5. **Test napřed a viz ho spadnout.** Test, který jsi neviděl spadnout, nic neověřuje. Pouštěj přitom jen ten jeden test, ne celou vrstvu.

6. **Průběžně pouštěj `npm run check`.** Kontrola typů a jednotkové testy, do databáze nesahá. Když píšeš akci nebo pravidlo přístupu, přidej `npm run check:db`. Test v prohlížeči pouštěj po jednom (`npm run test:e2e -- e2e/<spec>.spec.ts`), celé ověření řezu až na konci, jednou.

7. **Podívej se na to.** Spusť aplikaci a pusť `npm run screenshot -- <cesta>` na každou stránku, které ses dotkl. Udělá obrázek pro mobil i počítač a vypíše chyby z konzole a padlé požadavky. Obrázky si přečti. **Prázdná stránka, chyba v konzoli nebo rozsypaný obsah jsou nález, i když jsou testy zelené**, protože test ověří jen to, co jsi mu nadiktoval. Když stránka potřebuje přihlášení, dej skriptu stav přihlášení z testů (`--storage`), nepiš si vlastní skript. Server po sobě zase zhasni, jinak zůstane viset na portu a příští spuštění spadne na něčem, co s prací nesouvisí. Tohle není ověření, to je krok 8.

8. **Ověř.** Zavolej skill "zkontroluj". Ten pouští `verify:rez` a jeho výstup je zároveň důkaz, že je řez hotový; před commitem ho znovu nepouštěj, pokud ses od té doby kódu nedotkl.

9. **Ulož checkpoint.** Commit na aktuální větev, v popisu jednou větou česky, co teď funguje. Pomocné soubory, které jsi cestou vyrobil, před commitem smaž. `prototypy/` jsou jen pro `/vibe:prototyp`, ne pro tvoje nástroje.

10. **Uzavři řez.** V souboru řezu zaškrtni splněné podmínky. Nesplněnou nech nezaškrtnutou a připiš k ní jednou větou proč. Co se dozvěděl tenhle řez a další řez to potřebuje vědět (sdílený testovací účet, past, na kterou jsi narazil), zapiš do jeho pole "Poznámky pro stavbu", ne do chatu. Když byl tenhle řez ve složce poslední, přesuň celou složku do `.ukoly/hotovo/`. Commit.

## Co zůstává uživateli

Pracuješ v kódu a ve vývojové databázi. Všechno za touhle hranicí dělá uživatel:

- **Skutečný mail ověřuje uživatel.** Odkaz z mailu, potvrzovací kód, cokoli, co přijde do schránky. Zapiš to jako první krok do "proklikej sám" ve skillu "zkontroluj". Testy se přihlašují tokenem přes servisní klíč, mail se při nich neposílá.
- **Klikání v konzoli cizí služby dělá uživatel.** Šablona mailu, povolené adresy, cokoli, co nejde zapsat migrací. Napiš mu přesný postup do "proklikej sám" a zapiš ho i do `rozhodnuti/`, aby se při zakládání ostrého projektu zopakoval.

Tvrdá pojistka: **maily na skutečné adresy neposíláš a schránku uživatele nečteš**, ani přes MCP, ani přes CLI. Uživatel neví, kam všude dosáhneš, a nedal ti k tomu svolení.

## Kdy je řez hotový

Řez je hotový, když jsi **ukázal výstup příkazu `npm run verify:rez`** se specem řezu a specy stránek, kterých ses dotkl, a je zelený. Když se skript sám přepnul na plnou sadu, platí její výstup. Zelený `npm run check` to nenahrazuje, ten do databáze ani do prohlížeče nesahá.

Plnou sadu `npm run verify` pusť sám navíc, když řez mění něco, co používají i jiné stránky (sdílenou komponentu, hlavičku, výpočet, na kterém stojí víc obrazovek) a nejsi si jistý, že jsi vybral všechny dotčené specy.

Tvrzení "funguje to", "mělo by to fungovat" nebo "testy procházejí" není důkaz. Důkaz je vypsaný výstup.

Dokud je předchozí řez červený, další nezačínej.

## Co dál

Po hotovém řezu řekni, který je na řadě další, a že se pouští **v novém sezení**. Když jsou hotové všechny, pošli uživatele na `/vibe:najdi-slaba-mista`, dřív než to někomu ukáže.

## Když se to zadrhne

Když třikrát po sobě opravuješ tu samou věc a nepomáhá to, přestaň hádat a řekni uživateli, ať spustí `/vibe:najdi-chybu`.
