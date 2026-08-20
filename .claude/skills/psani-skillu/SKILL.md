---
name: psani-skillu
description: Jak psát dokumenty, které čte agent: skilly, CLAUDE.md, AGENTS.md a soubory, na které něco odkazuje. Použij, když zakládáš nebo upravuješ skill, nebo měníš pravidla projektu.
---

Skill není návod pro člověka. Je to popis **postupu**, který agent projde pokaždé stejně, i když výsledek bude pokaždé jiný. Podle toho se píše.

## Popis rozhoduje o tom, kdy se skill spustí

Pole `description` je jediné, co je v kontextu pořád. Rozhoduje, jestli po skillu agent sáhne, a stojí tokeny při každém tahu.

- **Napřed to podstatné slovo.** Popis začíná tím, co skill dělá.
- **Jedna spouštěcí situace za každý případ, který skill řeší.** Synonyma nejsou další případy, jen to samé napsané dvakrát. Vyhoď je.
- **Neopakuj, co už je v názvu.**

Když se skill nespouští, kdy má, **nejdřív přepiš popis**, teprve pak obsah.

## Dvě třídy skillů

- **Uživatelské** mají `disable-model-invocation: true`. Spustí je jen člověk slashem. Řídí postup a mají následky.
- **Modelové** mají po nich sáhnout i agent sám. Drží znovupoužitelnou disciplínu a znalosti.

Uživatelský skill smí volat modelový. **Uživatelský nikdy nesmí volat jiný uživatelský**, protože ten se z principu spouští jen člověkem. Když ho potřebuješ, doporuč ho uživateli.

Volání se dělá nástrojem Skill a **jedním voláním jeden skill**. Krok, který potřebuje dva, jsou dvě volání.

## Dvě zátěže

Každý řádek utrácí jednu ze dvou věcí:

- **Zátěž kontextu**: co je v paměti pořád, ať se to použije, nebo ne.
- **Zátěž hlavy**: kolik toho musí držet v hlavě člověk, tedy které skilly existují a kdy který.

Ta druhá se **nemá minimalizovat**. Je to cena za to, že rozhoduje člověk. Utrácej ji tam, kde na lidském úsudku záleží, a šetři jinde.

## Co kam patří

Tři patra podle toho, jak naléhavě to agent potřebuje:

1. **Kroky v souboru.** Co se dělá a v jakém pořadí.
2. **Odkazová část v souboru.** Definice a pravidla, ke kterým se sahá podle potřeby.
3. **Vedlejší soubor za odkazem.** Načte se jen tehdy, když je potřeba.

Test je jednoduchý: **co potřebuje každá cesta, nech uvnitř; co potřebuje jen některá, dej za odkaz.** Když je v souboru s kroky moc odkazové látky, kroky se v ní ztratí a dodržování se stane loterií.

Nejčastější porucha je **rozvláčnost**: soubor je prostě moc dlouhý, i když je každý řádek pravdivý. Pozornost se rozředí.

## Konec kroku

Každý krok končí podmínkou, podle které agent pozná, že je hotový. Mlhavá podmínka svádí k tomu **skončit dřív**, protože zbylé kroky před očima táhnou k tomu být hotový.

- **Ostři podmínku**, ať jde poznat hotovo od nehotova. "Ukázal jsi výstup příkazu" je ostré, "je to ověřené" není.
- **Náročnost podmínky rozhoduje o tom, kolik práce se odvede.** "Každá tabulka má test" vynutí víc než "napiš nějaké testy".

## Piš pozitivně

Zákaz vtáhne zakázanou věc do pozornosti a udělá ji dostupnější, ne míň dostupnou. Řekni, **co se má dělat**, ať zakázaná varianta vůbec nezazní.

Zákaz nech jen tam, kde je to tvrdá pojistka, a i tam k němu připoj, co se má dělat místo toho.

## Prořezávání

- **Jedna věc na jednom místě.** Když je stejné pravidlo na dvou místech, změna se udělá jen na jednom a druhé začne lhát.
- **Prostředí je taky zdroj pravdy.** Skripty v projektu, konfigurace a struktura složek si agent přečte sám. Zapisuj to, co nejde nikde vyčíst: nepsanou zvyklost, důvod za rozhodnutím, past.
- **Vyhoď věty, které nic nemění.** Instrukce, kterou by agent dodržel i tak, stojí tokeny a nic nedělá. Když věta neprojde, smaž celou, neškrtej v ní slova.

## Česky

Dokumenty a rozhovor s uživatelem česky. Kód, názvy testů, názvy souborů v kódu a názvy skriptů v projektu anglicky. Názvy skillů česky, bez diakritiky.

Z toho plyne dvojice, která je záměrná: skill `/vibe:over` je česky, protože ho píše člověk, a spouští `npm run verify`, který je anglicky, protože je to kód.

Nepoužívej dlouhou pomlčku.
