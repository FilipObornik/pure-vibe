---
name: slovnik
description: Udržuj projektový slovník v KONTEXT.md a deník rozhodnutí ve složce rozhodnuti/. Použij, když se ustálí nějaký pojem, když uživatel použije slovo nejednoznačně, nebo když padne rozhodnutí, které se bude těžko měnit.
---

Projekt má dvě paměti mimo tvoje kontextové okno. Udržuj obě průběžně, ne na konci.

## KONTEXT.md: jeden soubor, jen slovník

Struktura:

```md
# <Název projektu>

<Jedna dvě věty, co to je a proč to existuje.>

## Slovník

**Objednávka**:
<Jedna dvě věty, co to je.>
_Neříkej_: nákup, transakce

**Zákazník**:
<Jedna dvě věty.>
_Neříkej_: klient, uživatel, účet
```

Pravidla:

- **Buď rozhodný.** Když na jednu věc existuje víc slov, vyber jedno a ostatní dej pod `_Neříkej_`.
- **Definice krátké.** Jedna dvě věty. Popiš, co ta věc **je**, ne co dělá.
- **Jen pojmy z tohohle projektu.** Obecné programátorské pojmy do slovníku nepatří, ani když je projekt používá.
- **`KONTEXT.md` neobsahuje implementaci.** Není to zadání, není to poznámkový blok. Je to slovník a nic víc.

Během práce dělej tohle:

- Když uživatel použije slovo, které si odporuje se slovníkem, řekni to hned. "Ve slovníku máš zrušení jako X, ale teď mluvíš o Y. Co z toho platí?"
- Když použije mlhavé slovo, nabídni přesné. "Říkáš účet. Myslíš zákazníka, nebo přihlášeného uživatele? To jsou dvě různé věci."
- Když tvrdí, jak něco funguje, ověř to v kódu. Když si to odporuje, řekni to.
- Jakmile se pojem ustálí, **zapiš ho hned.** Nesbírej to na konec.

## rozhodnuti/: složka, jeden soubor na rozhodnutí

Název souboru je pořadové číslo a popisný český slug, takže výpis složky sám funguje jako obsah:

```
rozhodnuti/
├── 0001-uzivatel-vidi-jen-svoje-objednavky.md
├── 0002-mazani-jde-vratit-30-dni.md
└── 0003-platby-pres-stripe-webhook.md
```

Obsah souboru jsou tři odstavce: **co jsme rozhodli**, **proč**, a **co by stálo to změnit**.

Zapiš rozhodnutí jen tehdy, když platí všechny tři podmínky zároveň:

1. **Těžko se to vrací.** Změnit názor později něco stojí.
2. **Bez vysvětlení to překvapí.** Někdo se za půl roku bude ptát, proč je to takhle.
3. **Byl to skutečný kompromis.** Existovaly jiné možnosti a tahle vyhrála z konkrétních důvodů.

Když kterákoli chybí, nezapisuj nic. Bez tohohle filtru se ze složky stane smetiště a přestane se číst.
