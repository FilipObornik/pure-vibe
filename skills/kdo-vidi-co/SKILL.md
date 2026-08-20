---
name: kdo-vidi-co
description: Projdi šest věcí, které o aplikaci musí rozhodnout člověk, a udělej z nich testy. Spusť před prvním ostrým uživatelem a znovu po každé nové funkci, která přidává data.
---

Nejčastější díra v aplikacích postavených s AI není ošklivý kód, ale **nechráněná data**. Vzniká nenápadně: přidá se funkce, s ní tabulka, a pravidlo, kdo do ní smí, se k ní nedoplní. Aplikace, která byla včera v pořádku, je dnes otevřená.

Proto se tenhle skill spouští **opakovaně**, ne jednou.

## 1. Zjisti si stav sám

Vypiš všechna místa, kde se drží data, a u každého zjisti, jestli je chráněné. Na nic z toho se neptej, je to fakt.

Zvlášť vypiš to, co je **bez ochrany**. To je seznam děr.

## 2. Projdi šest okruhů

Ptej se přes skill "preklad-rozhodnuti". Nikdy technicky.

1. **Kdo vidí a mění čí data.** Pro každý typ záznamu zvlášť. Vzor otázky: "Má zákazník B umět otevřít záznam zákazníka A? Nikdy / jen když ho A nasdílí / je to veřejné."
2. **Co komu patří.** Ke komu se který záznam váže a co se s ním stane, když ten člověk zmizí.
3. **Peníze.** Odkud se bere jistota, že někdo zaplatil. Co se stane při vrácení peněz a při zrušení.
4. **Nevratné akce.** Co jde smazat, jde to vrátit, a do kdy. Kdo smí hromadné akce a rozesílku.
5. **Cizí účty a útrata.** Které placené služby to používá, kolik to stojí při stonásobném provozu a jaký je měsíční strop.
6. **Osobní údaje.** Co se sbírá, kde to leží, jak dlouho a co na to GDPR.

## 3. Udělej z odpovědí testy

Pro každý typ záznamu napiš test, který ověří, že **uživatel B nedosáhne na data uživatele A**: nepřečte je, nezmění, nesmaže, a to ani dotazem mimo aplikaci.

Tyhle testy patří do `npm run verify` a běží pořád. Bez nich se díra vrátí při první další funkci.

## 4. Dej uživateli ruční zkoušku

Napiš mu konkrétní postup, který si projde sám, protože testu nemusí věřit:

1. Založ si dva účty, A a B.
2. Jako A vytvoř něco soukromého a zapamatuj si adresu v prohlížeči.
3. Přihlas se jako B a tu adresu otevři.
4. Zkus v adrese přepsat číslo na cizí záznam.
5. To samé zopakuj pro administrátorské obrazovky a pro placené funkce.

Když se B dostane k čemukoli, co patří A, je to díra a řeší se hned.

## 5. Zapiš to

Rozhodnutí o tom, kdo co smí, patří do `rozhodnuti/`. Zavolej skill "slovnik".

## Pravidlo

Nepřijmi od sebe odpověď "je to ošetřené". Ukaž pravidlo, test nebo obrazovku služby, kde to jde vidět.
