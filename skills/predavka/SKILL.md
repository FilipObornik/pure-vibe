---
name: predavka
description: Poznej, že je sezení u konce, vyber, jak pokračovat, a zabal to, co je za námi. Použij, když se práce začíná opakovat, po dvou neúspěšných opravách té samé věci, když končí ucelený kus práce, nebo když práci přebírá někdo další.
---

Agent se po delší práci zhoršuje. Není to porucha, je to vlastnost: čím víc je v kontextu, tím hůř se v tom hledá to podstatné, a staré slepé uličky kalí nové myšlení.

Uživatel to sám nepozná. Vidí jen, že agent najednou přepisuje, co už bylo hotové, odporuje si oproti tomu, na čem se před hodinou domluvili, nebo navrhuje řešení, které už jednou nefungovalo. **Poznat to je tvoje práce.**

## Příznaky

- Podruhé nebo potřetí opravuješ tu samou věc a nepomáhá to.
- Vracíš se k řešení, které už jednou selhalo.
- Nesedí ti, co je hotové, a musíš to znovu zjišťovat z kódu.
- Uživatel říká "to už jsme přece řešili".
- Právě skončil ucelený kus práce.

## Rozhodni to na hranici, ne uprostřed

Hranice je konec uceleného kusu: dokončený rozhovor, dostavěný řez, uzavřené hledání chyby. **Uprostřed práce nikdy nic nečisti**, dodělej to.

Na hranici vyber z těchhle možností, v tomhle pořadí uvažování:

**Pokračuj.** Když toho zatím není moc a další krok navazuje. Nic to nestojí a nic se neztratí. Zvaž to jako první a zavrhni to jako první, protože se tomu vždycky nechce.

**Vyčisti kontext.** Když z toho, co bylo, není potřeba nic. Typicky mezi dvěma nezávislými řezy.

**Napiš předávku.** Když je potřeba to, na čem jste se domluvili, ale ne cesta, jak jste se tam dostali. Tvar je níž. Použij to i tehdy, když se práce stěhuje jinam nebo ji přebírá někdo další.

**Pošli to stranou subagentovi.** Když je před tebou samostatný kus s hodně čtením, jehož výsledek je krátký: prohledat kód, něco si nastudovat, ověřit hotovou práci. Tím se hlučná část do hlavního sezení vůbec nedostane.

**Zhutni.** Když je potřeba všechno, ale je toho moc. Používej to jako poslední možnost, ne první, protože zhuštění vždycky něco ztratí a ty nevíš co.

## Kde hranice v běžné práci leží

- **Vyzpovídání, zadání a rozsekání drž v jednom nepřerušeném sezení.** Staví to na sobě a rozdělení tomu ublíží.
- **Před každým dalším řezem začni načisto.** Řez je psaný tak, aby stačil sám o sobě.
- **Po nalezení chyby vyčisti.** Sezení s laděním je plné slepých cest, které by kalily další práci.

## Tvar předávky

Napiš jeden soubor, který někdo přečte **bez znalosti tohohle rozhovoru**:

```md
# Předávka: <o co jde>

## Kam to spěje
Jedna dvě věty, co je cílem.

## Co je hotové
Co funguje a je ověřené. Bez detailů, které jsou v kódu.

## Kde to stojí
Přesně to místo, kde jsme skončili.

## Co jsme zkusili a nefungovalo
Aby to další nezkoušel znovu. Tohle je nejcennější část.

## Na čem jsme se domluvili
Rozhodnutí, která zatím nejsou v `rozhodnuti/`.

## Další krok
Jedna věta, co se má stát dál.
```

Pravidla:

- **Neopisuj, co už je jinde.** Když je něco v `KONTEXT.md`, `rozhodnuti/` nebo v úkolech, jen na to ukaž.
- **Žádná hesla ani klíče.** Místo hodnoty napiš `<SKRYTO>`.
- Ulož to k úkolu, kterého se to týká.

## Co říct uživateli

Neříkej mu "zaplnil se kontext". Řekni mu, co z toho plyne: "Tenhle kus je hotový. Doporučuju začít načisto, ať se mi to nemíchá s tím, co jsme zkoušeli a nefungovalo. Zapíšu, kde jsme skončili."
