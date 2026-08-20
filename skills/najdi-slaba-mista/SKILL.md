---
name: najdi-slaba-mista
description: Najdi v hotové a fungující práci místa, která kousnou později: nechráněná data, klíče v kódu, nevratné akce, služby bez stropu, duplicity a nastavěná obecnost. Použij před tím, než appku někdo uvidí, ne po každém řezu.
disable-model-invocation: true
---

Tenhle skill **předpokládá, že appka funguje**, a hledá to, co ji kousne později. Jestli dělá, co se chtělo, řeší skill "zkontroluj" po každém řezu. Tady to neopakuj, jinak se ta samá práce dělá dvakrát a pokaždé jinak.

Slabá místa jsou dvojího druhu a hledej obojí:

- **Co uživatele poškodí.** Nechráněná data, klíč v kódu, nevratná akce, služba bez stropu. Tohle je vážnější půlka.
- **Co ho bude zpomalovat.** Matoucí názvy, duplicity, provázanost, obecnost navíc, mrtvý kód.

Vezmi změny od posledního checkpointu, nebo od bodu, který uživatel určí. Když neurčí, nabídni poslední commit a zeptej se.

## Nejdřív ověření

Než začneš, spusť skill "zkontroluj" a **vypiš jeho výstup**. Když je červený, nemá smysl řešit udržitelnost. Oprav a teprve pak pokračuj.

## Prohlídka

Pošli subagenta s čistým kontextem. Dej mu změny a tenhle seznam. Ať u každého bodu řekne, jestli je čistý, nebo kde ne:

- **Chybí ochrana dat.** Nová tabulka nebo nová cesta k datům bez pravidla, kdo tam smí.
- **Tajný klíč v kódu.** Cokoli, co vypadá jako heslo, token nebo klíč mimo proměnné prostředí.
- **Nevratná akce bez pojistky.** Mazání a hromadné změny bez potvrzení nebo bez možnosti vrátit.
- **Cizí služba bez stropu.** Volání placené služby, které při nárůstu provozu nikdo nebrzdí.
- **Matoucí název.** Věc pojmenovaná tak, že z názvu nepoznáš, co dělá, nebo v rozporu s `KONTEXT.md`.
- **Dvakrát to samé.** Stejná logika na dvou místech.
- **Jedna změna, deset souborů.** Jednoduchá změna si vynutí zásahy všude.
- **Nastavěno dopředu.** Obecnost a přepínače pro potřebu, kterou zadání nemá.
- **Mrtvý kód.** Nic to nevolá.

Každý nález je **návrh k posouzení, ne rozsudek**. Co už hlídá nástroj, přeskoč.

## Výstup

Vypiš nálezy tak, jak přišly, a **seřaď je podle toho, co se stane, když se to neopraví**. Nahoru patří nechráněná data, klíče a nevratné akce, dolů pojmenování a duplicity.

Na konec jeden řádek: kolik nálezů celkem a který je nejhorší. Pak se zeptej, co z toho má opravit teď a co počká.
