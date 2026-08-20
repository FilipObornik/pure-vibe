---
name: zadani
description: Z proběhlého rozhovoru udělej psané zadání a ulož ho.
disable-model-invocation: true
---

Vezmi to, co už zaznělo v tomhle rozhovoru, a sepiš z toho zadání. **Nezpovídej se znovu.** Jen sepiš, na čem jste se shodli.

Nejdřív se rozhlédni po kódu, pokud jsi to ještě neudělal. Používej slova z `KONTEXT.md` a respektuj, co je zapsané v `rozhodnuti/`.

Nepiš do zadání cesty k souborům ani ukázky kódu. Zastarají dřív než všechno ostatní.

## Šablona

```md
## Co je špatně

Problém očima člověka, který aplikaci používá.

## Co s tím uděláme

Řešení očima člověka, který aplikaci používá.

## Co má aplikace umět

Dlouhý číslovaný seznam. Každý bod ve tvaru:
"Jako <kdo> chci <co>, abych <proč>."
Buď vyčerpávající. Radši třicet bodů než pět.

## Kdo co smí

Pro každý typ záznamu, který v téhle práci vzniká nebo se mění:
kdo ho smí vidět, kdo měnit, kdo mazat. Když to není jasné, doptej se.

## Jak poznáme, že to funguje

Seznam vět, které půjde ověřit spuštěním, ne pohledem.
"Zákazník B nedosáhne na objednávku zákazníka A."
"Po zaplacení se objednávka překlopí do stavu zaplaceno i když uživatel zavře okno."

## Co do toho nepatří

Věci, které jsme vědomě odložili. Buď konkrétní, ať se to nevrátí zadními vrátky.

## Poznámky

Cokoli dalšího.
```

Zadání ulož podle nastavení projektu: buď jako soubor do `.ukoly/`, nebo jako issue na GitHubu.

Než ho uložíš, ukaž uživateli sekci **Jak poznáme, že to funguje** a nech si ji potvrdit. To je jediná část, kterou musí odsouhlasit, protože z ní vzniknou testy.

Po uložení řekni jednou větou, že další krok je `/vibe:rozsekej`, a taky ve stejném sezení.

Když v tomhle rozhovoru **žádné zpovídání neproběhlo**, není z čeho zadání psát. Nedomýšlej si ho: řekni to a pošli uživatele na `/vibe:vyzpovidej`.
