# Vibe: od vibecodingu k řemeslu

České skilly pro lidi, kteří staví aplikace s AI a chtějí, aby to vydrželo.

Agent píše kód, testy i ověřování v prohlížeči. Ty rozhoduješ o tom, jak se má tvoje věc chovat a kdo k čemu smí. O technologii se nerozhoduješ.

## Pro koho to je

Pro lidi mezi programátorem a čistým vibecoderem. Kód psát neumíš a nemusíš, ale terminálu se nebojíš a jsi ochotný si založit účet u dvou služeb.

**Řekněme si rovnou, co to obnáší.** Sada nestaví hračku, staví aplikaci, do které pustíš cizí lidi a jejich data. Z toho plyne:

- Agent bude spouštět testy, taky ty v prohlížeči. Někdy to trvá minuty a stojí to tokeny.
- Občas něco spadne na věci, která není v tvojí aplikaci, ale v nástroji kolem. Agent ti to má přeložit, ale trpělivost budeš potřebovat.
- Něco z toho jsou skutečné peníze. Databáze i provoz mají placené verze a agent sám taky není zadarmo.

Když hledáš "vyklop mi appku za odpoledne", tohle není ono. Když hledáš "ať to za měsíc pořád funguje a nevyteče mi z toho databáze", tak ano.

## Technologický stack

Sada je postavená nad jedním stackem a nesnaží se být univerzální, právě kvůli odstnínění uživatele od komplexity:

-  **Next.js** - základní framework aplikace
- **Supabase** - databáze, přihlašování a soubory - počítá se s Supabase Cloud
- **Vercel** - hosting aplikace
- **Playwright** a **Vitest** - testování aplikace

## Instalace

```
/plugin marketplace add FilipObornik/pure-vibe
/plugin install vibe@filip-obornik
```

Pak v projektu jednou:

```
/vibe:zaloz-projekt
```

Když nevíš, co spustit, zeptej se: `/vibe:kudy`

## Na čem to stojí

**Rozhovor před stavbou.** Nejčastější důvod, proč výsledek neodpovídá představě, není hloupý agent, ale nedorozumění. `/vyzpovidej` se ptá v kolech, dokud není jasno, a nikdy se neptá na technické věci.

**Ověřování, ne ujišťování.** Agent se zastaví, když to *vypadá* hotově. `/zkontroluj` proto pouští skutečné testy a hodnotí je jiný agent, než ten, co to psal. Hotovo se dokládá výstupem, ne větou "funguje to".

**Tvoje oči na konci.** Testy píše agent a hodnotí je agent. To chytí hodně, ale ne všechno, a hlavně to nechytí "dělá to sice, co jsem řekl, ale ne to, co jsem chtěl". Proto ti `/zkontroluj` vždycky napíše pár kroků, které si máš proklikat sám. Nepřeskakuj je.

**Kdo vidí čí data.** Nejčastější díra v aplikacích stavěných s AI. `/kdo-vidi-co` se na to ptá otázkami, na které umíš odpovědět, a dělá z odpovědí testy, které běží pořád.

**Paměť mimo chat.** `KONTEXT.md` drží slovník projektu, složka `rozhodnuti/` drží věci, které se budou těžko vracet. Agent tak neztrácí souvislosti mezi sezeními.

## Dvě rychlosti ověřování

Během psaní běží `npm run check`: kontrola typů a rychlé testy, otázka sekund. Na konci řezu běží `npm run verify`: úplně všechno včetně prohlížeče.

Kdyby se po každé změně pouštělo všechno, čekal bys tak dlouho, že bys to začal obcházet. Proto ty dva příkazy. **Řez je hotový až po zeleném `npm run verify`**, `check` ho nenahradí.

## Skilly

Píšeš je ty: `zaloz-projekt`, `kudy`, `vyzpovidej`, `zadani`, `rozsekej`, `prototyp`, `postav`, `najdi-slaba-mista`, `najdi-chybu`, `uklid`, `pust-to-ven`.

Sahá po nich agent sám, napsat je můžeš taky: `zkontroluj`, `kdo-vidi-co`, `cesky-prosim`, `predavka`, `preklad-rozhodnuti`, `pravidla-testu`, `navrh-kodu`, `slovnik`, `stack`.

`cesky-prosim` je ten, který budeš potřebovat nejdřív. Nemusíš si ho pamatovat: stačí napsat, že nerozumíš, a agent po něm sáhne sám.

## Poděkování

Stavba a členění vychází ze [Skills For Real Engineers](https://github.com/mattpocock/skills) od Matta Pococka (MIT). Tahle sada je jejich překlad a ohnutí pro lidi, kteří nejsou programátoři.

MIT
