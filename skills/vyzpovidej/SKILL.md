---
name: vyzpovidej
description: Zpovídej uživatele o tom, co staví, dokud není jasno. Použij před stavbou, když si uživatel chce ujasnit záměr, nebo řekne "vyzpovídej mě", "proberme to", "chci si to ujasnit".
---

Zpovídej uživatele, dokud nedojdete ke sdílenému pochopení. Drž si to jako **strom rozhodnutí**: každé rozhodnutí větví na rozhodnutí, která na něm visí.

**Nejdřív si ujasni, na jaké úrovni se ptáš.** Když `KONTEXT.md` ještě neexistuje, zpovídáš se na **celý produkt**. Když už existuje, projektová rozhodnutí padla, tak je znovu neotvírej: přečti si `KONTEXT.md` a `rozhodnuti/` a zpovídej se **na tu jednu věc, kterou chce uživatel postavit teď**. Na začátku mu jednou větou řekni, co z toho dvojího děláš, ať ví, proč se ptáš zrovna takhle podrobně.

U zpovídání na jednu věc jdi do detailu, který by u celého produktu nedával smysl: co přesně se na obrazovce stane, co se stane při chybě, co uvidí někdo cizí, co se má stát s daty, když se to smaže. Z tohohle vzniká `/vibe:zadani`, a co se nezeptáš, to si agent domyslí sám.

Pracuj v **kolech**. **Hranice** je každé rozhodnutí, jehož předpoklady už jsou vyřešené: otázky, na které se můžeš zeptat teď, aniž bys hádal odpovědi, které jsi ještě neslyšel. Zeptej se na celou hranici v jednom kole, nejvýš však na čtyři otázky. Očísluj je, ke každé přidej doporučenou odpověď, a počkej.

Formát každé otázky:

```
❓ **Q1 - <název>**: <otázka, klidně na víc odstavců, včetně variant>

➡️ <tvoje doporučení a jednou větou proč>

📘 <volitelně: jak se té věci odborně říká, jedna věta>
```

Než otázku vypustíš, prožeň ji skillem "preklad-rozhodnuti". Otázka, na kterou uživatel neumí odpovědět z toho, jak má fungovat jeho produkt, do kola nepatří: buď ji přelož na důsledek, nebo rozhodni sám a zapiš to.

Každé kolo odpovědí přetvaruje strom: vyřešená rozhodnutí posunou hranici dál a odemknou otázky, které na nich visely. Přepočítej hranici a zeptej se na další kolo. Otázka, jejíž odpověď závisí na jiné otázce otevřené v tomhle kole, patří do **pozdějšího** kola, ne do tohohle.

Kol může být klidně deset. Radši víc krátkých kol než jedno dlouhé.

**Fakta si zjisti sám, nikdy se na ně neptej.** Když otázka na hranici potřebuje fakt z prostředí (soubory v projektu, dokumentace služby, ceník, jestli je něco nainstalované), pošli subagenta. Neblokuj se tím: běžící hledání je nevyřešený předpoklad, takže na něj čekají jen otázky pod ním. Na zbytek hranice se zeptej hned. **Rozhodnutí jsou uživatelova**: polož mu je a počkej.

Hotovo je, když je hranice prázdná: každá větev navštívená, nic tiše předpokládaného.

Pak shrň v pěti až deseti bodech a v uživatelových slovech, na čem jste se shodli, a nech si to potvrdit. Do té doby nestav.

Nakonec zavolej skill "slovnik": pojmy, které se v rozhovoru ustálily, patří do `KONTEXT.md`, a rozhodnutí, která se budou těžko měnit, do `rozhodnuti/`.

Když jsi se zpovídal **na jednu věc**, řekni na závěr jednou větou, že další krok je `/vibe:zadani`, a že se má udělat teď, v tomhle sezení, dokud je rozhovor po ruce. Když to bylo zpovídání **na celý produkt** uvnitř zakládání projektu, nikam uživatele neposílej, pokračuje skill, který tě zavolal.
