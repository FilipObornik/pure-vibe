---
name: uklid
description: Projdi kód a najdi místa, kde se to začíná zadrhávat, dokud je to levné.
disable-model-invocation: true
---

Aplikace stavěné s agentem houstnou rychleji než ty psané ručně, protože se rychleji přidává. Tenhle skill se pouští **jednou za čas, když je klid**, ne až když je zle.

Je to průzkum, ne záchranka. Najde kandidáty, neuklidí za tebe.

## 1. Najdi horká místa

Zjisti si sám, kde se nejčastěji sahalo do kódu a kde se nejvíc opravovalo. Tam bývá potíž.

## 2. Hledej tyhle příznaky

- **Jedna změna, deset souborů.** Nejjasnější příznak. Věci, které se mění spolu, nebydlí spolu.
- **Jeden soubor, deset důvodů.** Do stejného místa se sahá kvůli nesouvisejícím věcem.
- **Dvakrát to samé.** Stejné pravidlo na víc místech, takže se opraví jen na jednom.
- **Slova, co si odporují.** Kód říká jinak než `KONTEXT.md`, nebo jedna věc má tři názvy.
- **Nejde to otestovat.** Chování, ke kterému se test nedostane jinak než přes vnitřek.
- **Mrtvé.** Nic to nevolá.
- **Nechráněná data.** Když na něco narazíš, není to úklid, ale poplach: zavolej skill "kdo-vidi-co".

## 3. Předlož to k výběru

Vypiš nejvýš pět nálezů. U každého tři věty: co se děje, co to bude stát, když se to nechá být, a jak velká je oprava. Bez žargonu.

Nech uživatele vybrat jeden. Pak si o něm popovídejte přes skill "vyzpovidej" a teprve potom to opravuj.

**Neopravuj všechno najednou.** Velký úklid bez zadání je způsob, jak rozbít funkční aplikaci.

## 4. Po opravě

`npm run verify` musí zůstat zelený. Když úklid změnil chování, nebyl to úklid.
