---
name: zkontroluj
description: Ověř, že aplikace dělá to, co bylo v zadání, a dolož to výstupem testů. Použij po dostavění kusu práce, před ukázáním komukoli a vždycky, když si nejsi jistý.
---

Ověření dělá **jiný agent, než ten, co to psal.** Kdo práci napsal, ten ji nehodnotí: vidí, co chtěl napsat, ne co tam je.

Tenhle skill pouští **plnou sadu**. Rychlá kontrola během psaní je `npm run check` a ověření nenahrazuje.

## Postup

1. Spusť `npm run verify` a **vypiš skutečný výstup**, ne jeho shrnutí.

2. Pošli subagenta s čistým kontextem. Dej mu jen dvě věci: **zadání nebo řez** a **výstup příkazu**. Ať odpoví na tři otázky:
   - Dělá to všechno, co v zadání stálo? Co chybí?
   - Je tam něco navíc, co nikdo nechtěl?
   - Sedí sekce "Jak poznáme, že to funguje" se skutečnými testy, nebo jsou testy měkčí, než zadání slibovalo?

3. Když je něco červené, **nepokračuj a neomlouvej to.** Oprav, spusť znovu.

4. Když je všechno zelené, napiš tři odstavce: co se ověřilo, co se **neověřilo** a co si má uživatel proklikat sám.

## Přiznej, kde je hranice ověření

Testy psal agent a hodnotil je agent. To chytí hodně, ale je to uzavřený kruh: zelená znamená "chová se to tak, jak jsem pochopil zadání", ne "je to, co jsi chtěl".

**Tuhle větu uživateli řekni**, když je řez větší nebo když sis zadáním nebyl jistý. Ne pokaždé a ne jako omluvu. Je to informace o tom, co má sám zkontrolovat, ne alibi.

## Kroky pro uživatele nejsou přívažek

Testy nepoznají, jestli je to hezké, srozumitelné, jestli text dává smysl a jestli to řeší ten problém, kvůli kterému to vzniklo. Tohle pozná jen člověk.

Napiš mu proto vždycky **konkrétní kroky**, ne obecné "zkontroluj si to":

- Kudy má jít, na co kliknout a co má vidět.
- Aspoň jeden krok, kde se to má chovat **jinak**: prázdný seznam, cizí účet, zrušení uprostřed.
- Když řez sahá na data více lidí, patří sem proklik ze dvou účtů.

Tři až pět kroků. Když jich je patnáct, je řez moc velký.

## Pravidlo

Nikdy neříkej "hotovo" bez vypsaného výstupu. Když příkaz neproběhl, práce není ověřená, i kdyby vypadala hotově.
