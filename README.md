# Vibe: od vibecodingu k řemeslu

České skilly pro lidi, kteří staví aplikace s AI a chtějí, aby to vydrželo.

Agent píše kód, testy i ověřování v prohlížeči. Ty rozhoduješ o tom, jak se má tvoje věc chovat a kdo k čemu smí. O technologii se nerozhoduješ.

```
/plugin marketplace add FilipObornik/pure-vibe
/plugin install vibe@filip-obornik
```

Pak v projektu jednou `/vibe:zaloz-projekt`. Když nevíš, co spustit, `/vibe:kudy`.

---

## Pro koho to je

Pro lidi mezi programátorem a čistým vibecoderem. Kód psát neumíš a nemusíš, ale terminálu se nebojíš a jsi ochotný si založit účet u dvou služeb.

**Řekněme si rovnou, co to obnáší.** Sada nestaví hračku, staví aplikaci, do které pustíš cizí lidi a jejich data. Z toho plyne:

- Agent bude spouštět testy, taky ty v prohlížeči. Někdy to trvá minuty a stojí to tokeny.
- Občas něco spadne na věci, která není v tvojí aplikaci, ale v nástroji kolem. Agent ti to má přeložit, ale trpělivost budeš potřebovat.
- Něco z toho jsou skutečné peníze. Databáze i provoz mají placené verze a agent sám taky není zadarmo.

Když hledáš "vyklop mi appku za odpoledne", tohle není ono. Když hledáš "ať to za měsíc pořád funguje a nevyteče mi z toho databáze", tak ano.

## Jak to jde po sobě

Jednou za projekt:

```
/vibe:zaloz-projekt
```

Pak dokola, pro každou věc, kterou chceš přidat:

```
/vibe:vyzpovidej    → co přesně má ta věc umět
/vibe:zadani        → sepíše, na čem jste se shodli
/vibe:rozsekej      → rozdělí to na kusy, které jdou ukázat po jednom
/vibe:postav        → postaví jeden kus, ověří ho a uloží
```

První tři drž v jednom sezení, ať na sebe navazují. Každý `/vibe:postav` naopak začni načisto.

Než to někomu ukážeš, `/vibe:najdi-slaba-mista`. Když to mají vidět skuteční lidé, `/vibe:pust-to-ven`.

Nemusíš si to pamatovat. Každý skill ti na konci řekne, co je další krok, a `/vibe:kudy` ti poradí, kdykoli se ztratíš.

## Na čem to stojí

**Rozhovor před stavbou.** Nejčastější důvod, proč výsledek neodpovídá představě, není hloupý agent, ale nedorozumění. `/vibe:vyzpovidej` se ptá v kolech, dokud není jasno, a nikdy se neptá na technické věci.

**Ověřování, ne ujišťování.** Agent se zastaví, když to *vypadá* hotově. `/vibe:zkontroluj` proto pouští skutečné testy a hodnotí je jiný agent, než ten, co to psal. Hotovo se dokládá výstupem, ne větou "funguje to".

**Tvoje oči na konci.** Testy píše agent a hodnotí je agent. To chytí hodně, ale ne všechno, a hlavně to nechytí "dělá to sice, co jsem řekl, ale ne to, co jsem chtěl". Proto ti `/vibe:zkontroluj` vždycky napíše pár kroků, které si máš proklikat sám. Nepřeskakuj je.

**Kdo vidí čí data.** Nejčastější díra v aplikacích stavěných s AI. `/vibe:kdo-vidi-co` se na to ptá otázkami, na které umíš odpovědět, a dělá z odpovědí testy, které běží pořád.

**Paměť mimo chat.** `KONTEXT.md` drží slovník projektu, složka `rozhodnuti/` drží věci, které se budou těžko vracet. Agent tak neztrácí souvislosti mezi sezeními.

## Dvě rychlosti ověřování

Během psaní běží `npm run check`: kontrola typů a rychlé testy, otázka sekund. Na konci řezu běží `npm run verify`: úplně všechno včetně prohlížeče.

Kdyby se po každé změně pouštělo všechno, čekal bys tak dlouho, že bys to začal obcházet. Proto ty dva příkazy. **Řez je hotový až po zeleném `npm run verify`**, `check` ho nenahradí.

## Technologický stack

Sada je postavená nad jedním stackem a nesnaží se být univerzální, právě kvůli odstínění uživatele od komplexity.

| | |
|---|---|
| **Next.js** | základní framework aplikace |
| **Supabase** | databáze, přihlašování a soubory, počítá se s Supabase Cloud |
| **Vercel** | hosting aplikace |
| **Playwright** a **Vitest** | testování aplikace |

## Přehled skillů

Tyhle spouštíš ty. Agent po nich sám nesáhne, aby ti nezačal dělat něco, o co jsi nežádal.

| Skill | K čemu je |
|---|---|
| `/vibe:zaloz-projekt` | Připraví projekt pro ostatní skilly. Jednou na začátku, nebo na aplikaci, kterou chceš dát do pořádku. |
| `/vibe:kudy` | Nevíš, co spustit? Zeptá se, kde jsi, a pošle tě dál. |
| `/vibe:vyzpovidej` | Zpovídá tě, dokud není jasno, co se má postavit. |
| `/vibe:zadani` | Z proběhlého rozhovoru udělá psané zadání a uloží ho. |
| `/vibe:rozsekej` | Rozdělí zadání na kusy, které jdou postavit a ukázat jeden po druhém. |
| `/vibe:prototyp` | Klikací náhled, který zodpoví jednu otázku o tom, jak to má vypadat. |
| `/vibe:postav` | Postaví jeden kus, ověří ho a uloží. |
| `/vibe:najdi-chybu` | Najde příčinu chyby, která se nedá vyřešit pohledem. |
| `/vibe:najdi-slaba-mista` | Najde v hotové práci místa, která kousnou později. Před tím, než to někdo uvidí. |
| `/vibe:uklid` | Projde kód a najde místa, kde se to začíná zadrhávat, dokud je to levné. |
| `/vibe:pust-to-ven` | Připraví aplikaci na první skutečné uživatele a nasadí ji. |

Po těchhle sáhne agent sám, když je potřeba. Napsat je můžeš taky.

| Skill | K čemu je |
|---|---|
| `/vibe:cesky-prosim` | Vysvětlí znovu a srozumitelně to, čemu jsi nerozuměl. |
| `/vibe:zkontroluj` | Ověří, že aplikace dělá to, co bylo v zadání, a doloží to výstupem testů. |
| `/vibe:kdo-vidi-co` | Šest věcí o datech, které musí rozhodnout člověk, a testy z nich. |
| `/vibe:predavka` | Pozná, že je sezení u konce, a zabalí, co je za vámi. |
| `/vibe:preklad-rozhodnuti` | Hlídá, aby se tě agent ptal na důsledky, ne na technologie. |
| `/vibe:pravidla-testu` | Co je dobrý test, kam patří a jak se píšou testy oprávnění. |
| `/vibe:navrh-kodu` | Zásady pro návrh kódu, který půjde udržovat. |
| `/vibe:slovnik` | Udržuje `KONTEXT.md` a deník rozhodnutí ve složce `rozhodnuti/`. |
| `/vibe:stack` | Jak se věci dělají v tomhle stacku a kde jsou pasti. |

`cesky-prosim` je ten, který budeš potřebovat nejdřív. Nemusíš si ho pamatovat: stačí napsat, že nerozumíš, a agent po něm sáhne sám.

## Poděkování

Stavba a členění vychází ze [Skills For Real Engineers](https://github.com/mattpocock/skills) od Matta Pococka (MIT). Tahle sada je jejich překlad a ohnutí pro lidi, kteří nejsou programátoři.

## Licence

MIT
