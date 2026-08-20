---
name: navrh-kodu
description: Slovník a zásady pro návrh kódu, který půjde udržovat a ve kterém se agent vyzná. Použij, když navrhuješ nebo předěláváš strukturu kódu, řešíš, kam co patří, nebo kde má být hranice.
---

Tenhle slovník je **pro tebe, ne pro uživatele.** Nikdy tyhle pojmy nepoužívej v rozhovoru s uživatelem. Když potřebuješ jeho rozhodnutí, přelož ho přes skill "preklad-rozhodnuti" na důsledek.

Pojmy, které nemají ustálený český překlad, drž **anglicky**. Vymyšlený český název zní jako pojem, ale nedá se dohledat a v hlavách si ho každý spojí s něčím jiným. Anglický originál je jedno slovo, ke kterému existuje literatura.

## Slovník

**Modul**: cokoli, co má rozhraní a vnitřek. Funkce, soubor, složka, celý kus aplikace.

**Rozhraní**: všechno, co musí volající vědět, aby modul použil správně. Nejen jména a typy, ale i pořadí kroků, chybové stavy a co se stane, když něco chybí.

**Hloubka** (*deep* a *shallow module*): kolik chování dostane volající za to, kolik se musí naučit. Modul je **hluboký**, když je za malým rozhraním hodně práce, a **mělký**, když je rozhraní skoro stejně složité jako vnitřek.

**Seam**: místo, kde jde chování vyměnit, aniž bys sahal dovnitř. Tam se testuje. Ustálený český překlad nemá, "šev" je slovníkově správně, ale jako termín se nepoužívá.

## Zásady

**Stav se za malé rozhraní.** Míň vstupních bodů, jednodušší parametry, víc složitosti schované uvnitř.

**Hloubka je vlastnost rozhraní, ne vnitřku.** Nafouknout vnitřek nikoho nezachrání.

**Test smazání.** Představ si, že modul zmizí. Když s ním zmizí i složitost, byl to jen průchoďák a patří pryč. Když se složitost objeví rozkopírovaná u všech volajících, vydělával si na sebe.

**Rozhraní je testovací plocha.** Když se modul těžko testuje, není to problém testu, ale rozhraní.

**Jeden seam je domněnka, dva jsou skutečnost.** Nedělej výměnná místa dopředu.

## Agentí kritérium navíc

Kód se v týdnu čte agentem mnohem častěji než člověkem. Preferuj proto uspořádání, kde **jedna změna znamená jeden soubor** a kde se dá věc najít podle jména z projektového slovníku v `KONTEXT.md`. Konzistentní pojmenování šetří víc než jakákoli chytrost.
