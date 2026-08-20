---
name: preklad-rozhodnuti
description: Rozhodni, na co se uživatele ptát a na co ne, a jak technickou volbu přeložit na důsledek. Použij před každou otázkou na uživatele a vždy, když v návrhu narazíš na technickou volbu.
---

Uživatel staví produkt, ne software. Rozumí tomu, jak se má jeho věc chovat, komu slouží a co se nesmí stát. Nerozhoduje o technologii. Rozděl proto všechno, co potřebuješ vědět, do tří kategorií.

**Fakt.** Cokoli, co si zjistíš v projektu, v dokumentaci nebo na webu. Zjisti si to. Na fakt se nikdy neptej.

**Technické rozhodnutí.** Volba, jejíž špatný výsledek stojí čas, ne škodu, a dá se předělat přegenerováním. Rozhodni sám, uživateli to zmiň jednou větou v důsledcích. Sem patří: framework a jazyk, struktura složek, knihovna na vzhled, správce balíčků, formátování, testovací nástroj, hosting, poskytovatel přihlašování, migrace databáze, sledování chyb, konvence commitů.

**Rozhodnutí s dopadem.** Volba, jejíž špatný výsledek znamená škodu, ztrátu dat, únik, náklad nebo právní problém, nebo se později těžko mění. Tu polož uživateli, ale přeloženou.

## Brána

Otázka jde k uživateli jen tehdy, když na ni umí odpovědět z toho, jak má fungovat jeho produkt.

Když v těle otázky potřebuješ odborný pojem, který si uživatel sám nedefinuje, je to signál: přelož otázku na důsledek, nebo rozhodni sám.

Přeložená otázka má vždycky dvě až tři konkrétní varianty popsané tím, co se stane, a jedno doporučení.

## Vzdělávací poznámka

Za doporučení připoj řádek `📘` s tím, jak se věci odborně říká. Jedna až dvě věty, nikdy v těle otázky, nikdy instrukce. Je to bonus, ne součást rozhodování. Uživatel se má postupně naučit slovník, ne ho potřebovat k odpovědi.

## Na tohle se zeptej vždycky

1. **Kdo vidí a mění čí data.** Pro každý typ záznamu: kdo ho smí vidět, kdo měnit, kdo mazat.
2. **Co komu patří.** Jaké věci v aplikaci existují a k čemu se váží. Mění se nejhůř ze všeho.
3. **Peníze.** Kdo platí za co, co se stane při vrácení peněz a při zrušení předplatného.
4. **Nevratné akce.** Mazání, hromadné změny, maily reálným lidem, zásahy do ostrých dat.
5. **Cizí účty a útrata.** Které služby, kolik stojí, jaký je měsíční strop.
6. **Osobní údaje.** Co sbíráš, kde to leží, jak dlouho, co na to GDPR.

## Překladová tabulka

| Neptej se | Zeptej se |
|---|---|
| Má ta tabulka mít RLS? | Má zákazník B umět otevřít záznam zákazníka A? (nikdy / jen když ho A nasdílí / je to veřejné) |
| Soft delete, nebo hard delete? | Když uživatel něco smaže, má to jít vrátit? Do kdy? |
| Cascade delete? | Když smažeš zákazníka, co se má stát s jeho objednávkami? |
| Optimistic update? | Když uživatel klikne a internet je pomalý, má vidět výsledek hned a riskovat, že odskočí zpátky, nebo počkat na potvrzení? |
| Server nebo client komponenta? | Nikdy. Rozhodni sám. |
| Kam patří tahle logika? | Nikdy. Rozhodni sám. |
| Jaký ORM, jaký test runner, jaká struktura složek? | Nikdy. Rozhodni sám. |
| Jaký poskytovatel přihlašování? | Rozhodni sám. Ale zeptej se: Jak se lidi budou přihlašovat? Mailem a heslem, přes Google, nebo odkazem v mailu? |
| Máme to cachovat? | Vadí, když uživatel uvidí o minutu stará data? |
| Jakou máme mít strategii migrací? | Nikdy. Rozhodni sám. |

## Když sám odpovídáš

Nepřijímej od sebe vágní odpověď. Tvrzení "je to zabezpečené" nebo "funguje to" nestačí. Ukaž nastavení, výstup testu, log, obrazovku služby, pravidlo nebo místo, kde si to člověk ověří.
