---
name: kudy
description: Nevíš, co spustit? Zeptej se a poradím, kde jsi a co dál.
disable-model-invocation: true
---

Nikdo si nepamatuje dvacet skillů. Zjisti, kde uživatel je, a pošli ho dál.

Neptej se ho, který skill chce. Zeptej se, **v jaké je situaci**, a vyber za něj.

Příkazy se píšou s předponou pluginu, tedy `/vibe:vyzpovidej`. V textu níž je pro přehlednost bez ní.

## Hlavní cesta: nápad až ven

1. **`/vyzpovidej`** vždycky první, a to **na jednu konkrétní věc**, kterou chce uživatel postavit, ne na celý produkt. Ten se probral v `/zaloz-projekt`. Dokud není jasno, nemá smysl stavět. Když je otázka spíš "jak to má vypadat", odboč na **`/prototyp`** a vrať se.
2. **`/zadani`** sepíše to, na čem jste se shodli.
3. **`/rozsekej`** to rozdělí na kusy, které jde ukázat po jednom.
4. **`/postav`** postaví jeden kus. Pak vyčistit kontext a další. Uvnitř si sám volá **`/zkontroluj`**.
5. **`/najdi-slaba-mista`** před tím, než to někomu ukážeš.
6. **`/pust-to-ven`**, když to mají vidět skuteční lidé.

Kroky 1 až 3 drž v jednom nepřerušeném sezení, ať na sebe navazují. Každý `/postav` naopak začni načisto.

## Podle situace

| Uživatel říká | Pošli ho na |
|---|---|
| "Nevím, co vlastně chci" | `/vyzpovidej` |
| "Nevím, jak to má vypadat" | `/prototyp` |
| "Chci to začít" | `/zaloz-projekt` |
| "Projekt je založený, co teď" | `/vyzpovidej` na první věc, pak `/zadani` |
| "Chci přidat další funkci" | `/vyzpovidej` na ni, pak `/zadani` |
| "Mám hotovou appku a nevím, jestli je v pořádku" | `/zaloz-projekt`, pak `/kdo-vidi-co` |
| "Něco nefunguje" | `/najdi-chybu` |
| "Opravuju to potřetí a nic" | `/najdi-chybu` |
| "Funguje to?" | `/zkontroluj` |
| "Chci to ukázat lidem" | `/najdi-slaba-mista`, pak `/pust-to-ven` |
| "Nerozumím tomu, co píšeš" | `/cesky-prosim` |
| "Je toho moc, agent se plete" | `/predavka` |
| "Začíná to být nepřehledné" | `/uklid` |
| "Kdo se k tomu dostane?" | `/kdo-vidi-co` |

## Co spustit, i když si o to neřekne

- **`/kdo-vidi-co`** po každé nové funkci, která přidává data. Tady vznikají díry nenápadně.
- **`/predavka`**, když sezení běží dlouho a začínáš se opakovat.
- **`/uklid`** jednou za čas, když je klid.
