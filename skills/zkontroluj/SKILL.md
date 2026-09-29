---
name: zkontroluj
description: Ověř, že aplikace dělá to, co bylo v zadání, a dolož to výstupem testů. Použij po dostavění kusu práce, před ukázáním komukoli a vždycky, když si nejsi jistý.
---

Ověření dělá **jiný agent, než ten, co to psal.** Kdo práci napsal, ten ji nehodnotí: vidí, co chtěl napsat, ne co tam je.

Tenhle skill pouští **ověření řezu** (`npm run verify:rez`), které se u rizikových změn samo přepne na plnou sadu. Rychlá kontrola během psaní je `npm run check` a ověření nenahrazuje.

## Postup

1. Vyber testy v prohlížeči: spec řezu a specy stránek, na které změna sáhla (hledej cestu stránky nebo text z ní v `e2e/`). Spusť `npm run verify:rez -- <specy>` a **vypiš skutečný výstup**, ne jeho shrnutí. Před ukázáním aplikace komukoli cizímu pusť místo toho plné `npm run verify`. **Ověření se pouští jednou.** Když ho v tomhle sezení už zeleně doběhl `postav` a od té doby se kód ani testy nezměnily, použij ten výstup a nepouštěj ho znovu.

2. Pošli subagenta s čistým kontextem. Dej mu jen dvě věci: **zadání nebo řez** a **výstup příkazu**. Ať odpoví na tři otázky:
   - Dělá to všechno, co v zadání stálo? Co chybí?
   - Je tam něco navíc, co nikdo nechtěl?
   - Sedí sekce "Jak poznáme, že to funguje" se skutečnými testy, nebo jsou testy měkčí, než zadání slibovalo?

3. Když je něco červené, **nepokračuj a neomlouvej to.** Oprav a pusť znovu jen to, co spadlo (skill "pravidla-testu"), ne celou sadu.

4. Když je všechno zelené, napiš tři odstavce: co se ověřilo, co se **neověřilo** a co si má uživatel proklikat sám. Do "neověřilo" patří i to, co `verify:rez` nepustil: testy v prohlížeči mimo vybrané specy a nedotčené testy databáze.

## Přiznej, kde je hranice ověření

Testy psal agent a hodnotil je agent. To chytí hodně, ale je to uzavřený kruh: zelená znamená "chová se to tak, jak jsem pochopil zadání", ne "je to, co jsi chtěl".

**Tuhle větu uživateli řekni**, když je řez větší nebo když sis zadáním nebyl jistý. Ne pokaždé a ne jako omluvu. Je to informace o tom, co má sám zkontrolovat, ne alibi.

## Kroky pro uživatele nejsou přívažek

Testy nepoznají, jestli je to hezké, srozumitelné, jestli text dává smysl a jestli to řeší ten problém, kvůli kterému to vzniklo. Tohle pozná jen člověk.

Napiš mu proto vždycky **konkrétní kroky**, ne obecné "zkontroluj si to":

- Kudy má jít, na co kliknout a co má vidět.
- Aspoň jeden krok, kde se to má chovat **jinak**: prázdný seznam, cizí účet, zrušení uprostřed.
- Když řez sahá na data více lidí, patří sem proklik ze dvou účtů.
- Když řez sahá na přihlášení nebo na maily, je **první krok skutečný mail**: uživatel si ho pošle na svou adresu a odkaz otevře na jiném zařízení, než ze kterého o něj žádal. Testy mail neposílají, tohle je jediné místo, kde se ověří.
- Když řez potřebuje nastavení v konzoli cizí služby, dej to jako samostatný krok před ostatní, napiš přesně kam kliknout a co vložit, a jednou větou, proč to nejde udělat z projektu.

Tři až pět kroků. Když jich je patnáct, je řez moc velký.

## Pravidlo

Nikdy neříkej "hotovo" bez vypsaného výstupu. Když příkaz neproběhl, práce není ověřená, i kdyby vypadala hotově.
