# vibe-coding-base

Plugin `vibe` v marketplace `filip-obornik`. České skilly pro lidi, kteří staví s AI a nejsou programátoři.

## Zásady

- **Bez dlouhé pomlčky.** Jen krátký spojovník.
- Dokumenty a rozhovor s uživatelem česky, kód, názvy testů a názvy npm skriptů anglicky.
- **Odborný pojem, který nemá ustálený český překlad, piš anglicky** (*seam*, ne "šev"). Platí pro slovníky určené agentovi. Vymyšlený český název zní jako pojem, ale nedá se dohledat. Směrem k uživateli se odborný pojem nepoužívá vůbec, překládá se na důsledek přes `preklad-rozhodnuti`.
- Ověřovací příkazy jsou dva: `npm run check` (typy a rychlé testy, průběžně) a `npm run verify` (plná sada včetně prohlížeče, rozhoduje o hotovo). Skill, který pouští `verify`, je `/vibe:zkontroluj`.
- Skilly drž krátké a skládatelné. Vzor je `mattpocock/skills`.
- Uživatelský skill (`disable-model-invocation: true`) nikdy nevolá jiný uživatelský.
- **Když navrhuješ další krok, vždycky pojmenuj skill.** Ne "až budeš chtít stavět, řekni", ale "až budeš chtít stavět, řekni a spustím `/vibe:postav`". Uživatelské skilly si uživatel musí pustit sám, takže jediné, jak se o nich dozví, je že je vyslovíš. Platí pro texty skillů i pro rozhovor s uživatelem.
- Odkaz na vedlejší soubor piš jako výslovnou instrukci "přečti si soubor X", ne jako odkaz v textu. Cursor dokumentuje jako spolehlivý jen ten první způsob.
- Před psaním nebo úpravou skillu si přečti `.claude/skills/psani-skillu/SKILL.md` (není součástí pluginu, je jen pro tenhle repozitář).

Stav, nálezy a nedodělky patří do `.claude/notes.md`, ne sem. Sem jen to, co mění chování.
