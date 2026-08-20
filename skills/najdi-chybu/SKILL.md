---
name: najdi-chybu
description: Najdi příčinu chyby, která se nedá vyřešit pohledem. Použij, když něco padá, chová se divně, je pomalé, nebo když jsi to už dvakrát opravoval a nepomohlo to.
disable-model-invocation: true
---

Na chyby, které odolaly prvnímu pohledu. Fáze přeskakuj jen tehdy, když řekneš proč.

Než začneš ukazovat výstupy, **schovej hesla a klíče**. Místo hodnoty napiš `<SKRYTO>`.

## Fáze 1: Postav si smyčku, která spadne

**Tohle je celý ten skill.** Zbytek je mechanika. Když máš jeden příkaz, který **na téhle chybě spolehlivě spadne**, příčinu najdeš. Když ho nemáš, koukání do kódu tě nezachrání.

Věnuj tomu nepřiměřeně mnoho úsilí. Buď vynalézavý a nevzdávej to.

Možnosti, zhruba v tomhle pořadí: padající test na nejbližší úrovni, volání rozhraní proti běžící aplikaci, skript v prohlížeči, který proklikne a ověří, přehrání uloženého požadavku, malá jednoúčelová obalovka kolem podezřelého kusu, tisíc náhodných vstupů, když je chyba občasná, nebo porovnání staré a nové verze na stejném vstupu.

Pak smyčku **utáhni**: rychlejší, přesnější, spolehlivější. Smyčka, co běží třicet sekund a jednou z pěti lže, je skoro k ničemu. Dvousekundová a spolehlivá je zbraň.

U občasných chyb nejde o čistý postup, ale o **vyšší četnost**. Padá to v jednom z padesáti pokusů? Pusť to stokrát, přidej zátěž, zúžit časová okna. Padesátiprocentní chyba se ladí, jednoprocentní ne.

**Fáze 1 je hotová, když můžeš pojmenovat jeden příkaz, který jsi už aspoň jednou spustil, který spadne přesně na tom, co hlásí uživatel, dopadne stejně pokaždé, trvá sekundy a nepotřebuje u toho člověka.**

Když se přistihneš, že si stavíš teorii dřív, než ten příkaz existuje: **zastav se.** Přesně tomuhle tenhle skill předchází.

Když smyčku opravdu nejde postavit, řekni to nahlas, vypiš, co jsi zkusil, a řekni si uživateli o přístup, o uložený záznam chyby, nebo o svolení dočasně něco doměřit. Nezačínej hádat.

## Fáze 2: Zmenši to

Pusť smyčku a dívej se, jak spadne. Ověř, že padá na tom, co hlásil uživatel, ne na něčem podobném vedle.

Pak škrtej: vstupy, kroky, nastavení, data. **Po jednom** a po každém škrtnutí pusť smyčku znovu. Hotovo, když je každý zbylý kus nosný, tedy když odstranění čehokoli dalšího chybu zhasne.

## Fáze 3: Tři až pět dohadů

Vymysli **tři až pět** možných příčin, seřazených, **než začneš kteroukoli zkoušet**. Jeden dohad tě přilepí na první nápad.

Každý musí jít vyvrátit: "Když je příčina X, tak po změně Y chyba zmizí."

Když nedokážeš říct, co ta příčina předpovídá, není to dohad, je to pocit. Zahoď ho, nebo doostři.

Seznam ukaž uživateli. Často to přeskládá jednou větou ("tohle jsme minulý týden nasazovali"). Neblokuj se tím, když není u počítače.

## Fáze 4: Oprav a zamkni

Nejdřív test, který chybu chytá, pak oprava. Uvidíš test spadnout, opravíš, uvidíš ho projít, a nakonec pustíš původní smyčku na celém neošetřeném případu.

Když chybu nejde rozumně zamknout testem, **je to samo o sobě nález**. Řekni to a doporuč uživateli `/vibe:uklid`.

Na konec ukliď: pryč s dočasným vypisováním, pryč s pokusnými soubory, a do popisu commitu napiš jednou větou, co bylo skutečnou příčinou.
