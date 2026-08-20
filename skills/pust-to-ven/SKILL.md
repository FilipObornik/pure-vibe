---
name: pust-to-ven
description: Připrav aplikaci na první skutečné uživatele a nasaď ji.
disable-model-invocation: true
---

Nasazení není poslední commit. Je to okamžik, kdy se z chyb stanou cizí data, cizí peníze a tvoje faktury.

Projdi to po řadě a **u každého bodu ukaž důkaz**, ne ujištění.

## 1. Ostré a zkušební odděleně

Ostrá data a data, na kterých si hraješ, musí být **dvě různá místa**, ne dvě tabulky vedle sebe. Agent, který se splete, ať se splete tam, kde to nevadí.

Tady se zakládá **ostrý projekt** u poskytovatele databáze. Vývojový už existuje ze zakládání projektu. Přenes do ostrého strukturu a pravidla, nikdy ne data.

Ověř, že vývojové prostředí nemá přístup k ostrým datům a že ostré klíče nikde neleží vedle vývojových. Když má nebo leží, není to hotové.

## 2. Kdo co smí

Zavolej skill "kdo-vidi-co" a projdi ho celý. Tohle je poslední chvíle, kdy je to zadarmo.

Pusť ruční zkoušku se dvěma účty osobně. Ne test, ale klikáním.

## 3. Tajemství ven z kódu

Žádný klíč, heslo ani token v kódu ani v historii. Když tam někdy byl, **nestačí ho smazat**, musí se změnit u služby.

## 4. Strop na útratu

Pro každou placenou službu nastav měsíční strop a upozornění. Teď, ne po prvním nárazu. Nejhorší účty nevznikají z provozu, ale z jedné neefektivní věci, která se volá pořád dokola.

Uživateli řekni v korunách, kolik ho to bude stát při provozu, jaký čeká, a kolik při desetinásobku.

## 5. Testovací data pryč

Zkušební uživatelé, falešné objednávky, ukázkové texty. A pozor na maily: ověř, že se z ostrého prostředí neodešle nic na adresy, které jsi vymyslel při testování.

## 6. Poznáš, že je zle

Aplikace musí umět nahlásit, že spadla, aniž by ti to napsal uživatel. Nastav sledování chyb a ověř to tím, že jednu chybu schválně vyvoláš.

## 7. Cesta zpátky

Napiš uživateli jednou větou, **jak to vrátit**, když se nové nasazení ukáže jako špatné. Když to nejde jedním krokem, není to hotové.

## 8. Osobní údaje

Co sbíráš, kde to leží, jak dlouho a kdo se k tomu dostane. Když jsou uživatelé z Evropy, patří k tomu i zásady zpracování a možnost výmazu.

## Na konec

`npm run verify` naposledy, se skutečným výstupem. Pak nasaď a **proklikej ostrou verzi**, ne jen tu svoji.

Napiš uživateli tři řádky: co je nasazené, co si má sám ohlídat první týden, a kolik ho to měsíčně stojí.
