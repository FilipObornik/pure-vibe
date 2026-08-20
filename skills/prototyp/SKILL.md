---
name: prototyp
description: Vyrob klikací náhled, který zodpoví jednu otázku o tom, jak to má vypadat nebo se chovat.
disable-model-invocation: true
---

Prototyp je **jeden samostatný HTML soubor**, který uživatel otevře dvojklikem. Odpovídá na jednu otázku, kterou nejde vyřešit povídáním.

Dvě otázky, na které se hodí:

- **Jak to má vypadat a jak se to proklikává?** Udělej dvě až čtyři **výrazně odlišné** varianty obrazovky, přepínatelné tlačítky nahoře. Ne tři odstíny stejného. Uživatel si má vybrat směr, ne barvu.
- **Chová se to tak, jak čekám?** Nasimuluj pravidla a stavy tlačítky, ať si uživatel proklikne i případy, které se špatně vymýšlejí v hlavě: prázdný seznam, vypršelá platnost, dvojité kliknutí, zrušení uprostřed.

## Pravidla

1. **Do složky `prototypy/`.** Nic z aplikace ho neimportuje, nic na něj neodkazuje, je vyřazený z buildu, kontroly typů i testů. Nikdy se nestane součástí aplikace.
2. **Jeden soubor, žádné závislosti.** Otevře se dvojklikem, bez spouštění čehokoli.
3. **Nahoře nápis, že je to prototyp** a jakou otázku zodpovídá.
4. **Nic se neukládá.** Stav žije v paměti stránky. Ukládání je právě to, co prototyp zkoumá, ne to, na čem má stát.
5. **Žádné testy, žádné ošetřování chyb, žádná krása.** Cílem je se rychle něco dozvědět.
6. **Ukazuj stav.** Po každém kliknutí vypiš dole, co se stalo a v jakém stavu to teď je.

## Když je odpověď venku

Řekni nahlas, co z toho vyplynulo. Když je to rozhodnutí, které se bude těžko vracet, zavolej skill "slovnik" a zapiš ho do `rozhodnuti/`.

Soubor můžeš nechat ležet. Nikomu nevadí a příště se hodí.

**Prototyp není hotová práce.** Nikdy z něj nekopíruj kód do aplikace. Rozhodnutí se do aplikace přenáší postavením načisto přes `/vibe:postav`.
