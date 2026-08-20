---
name: stack
description: Jak se věci dělají v tomhle stacku a kde jsou pasti. Použij, když píšeš kód, zakládáš tabulku, řešíš přístup k datům, nasazuješ, nebo když něco funguje lokálně a jinde ne.
---

Výchozí stack: **Next.js** na aplikaci, **Supabase** na databázi, přihlašování a soubory, **Vercel** na provoz, **Playwright** na testy v prohlížeči a **Vitest** na zbytek.

Tenhle dokument je **cache na to, co se z dokumentace nevyčte**: pasti a zvyklosti. Podrobnosti rozhraní si dohledej v aktuální dokumentaci, neopisuj je sem. Zastaraly by.

## Tři klienty a proč na tom záleží

Do databáze se dá sáhnout třemi způsoby a **pletou se nejčastěji ze všeho**:

- **Veřejný klient v prohlížeči.** Pravidla přístupu na něj platí. Jeho klíč je veřejný, počítej s tím, že ho každý vidí.
- **Serverový klient se session přihlášeného uživatele.** Pravidla platí taky, jen se běží na serveru.
- **Servisní klient.** Pravidla **obchází úplně**. Patří výhradně do serverového kódu, který dělá něco za všechny, třeba zpracování platby.

Servisní klíč nesmí nikdy skončit v prohlížeči a nikdy se s ním nesmí psát test oprávnění. Test se servisním klientem projde i na úplně otevřené tabulce.

## Pravidla přístupu k datům

- **Zapni ochranu při zakládání tabulky, ne potom.** Tabulka bez ochrany je s veřejným klíčem čitelná komukoli z internetu. Tohle je nejčastější díra v aplikacích stavěných s AI.
- **Nové tabulce vždy rovnou napiš pravidla** pro čtení, zápis, úpravu i mazání zvlášť. Výchozí stav je zákaz.
- **Zákaz se neprojeví jako chyba, ale jako prázdný výsledek.** U úprav a mazání volání projde a jen se nic nestane. Testy tomu musí odpovídat.
- **Soubory mají vlastní pravidla, oddělená od tabulek.** Zabezpečená tabulka neznamená zabezpečený soubor.
- Ke každé nové tabulce patří **test oprávnění ve stejném řezu**.

## Migrace

Struktura databáze vzniká migračním souborem v projektu. Ten je jediný zdroj pravdy a obě prostředí se z něj postaví stejně.

- **Změnu dělej novou migrací**, i když opravuješ včerejší. Hotová migrace už jinde proběhla, takže její přepsání se v druhém prostředí nikdy neprojeví.
- **Změny schématu dělej migrací, klikání v konzoli poskytovatele nech na prohlížení dat.** Co vzniklo klikáním, není v projektu a druhé prostředí o tom neví.
- **Vývojová databáze se musí dát postavit od nuly ze samotných migrací.** Pouštěj reset po každé změně schématu. Když projde jen na databázi, která už data měla, migrace nefungují a pozná se to až na ostré.
- **Po změně schématu přegeneruj typy** a ulož je společně s migrací. Rozejité typy vypadají jako chyba v kódu a hledá se dlouho.
- **Do ostré databáze jde struktura a pravidla, nikdy data.** Vývojová data patří do souboru s výchozím naplněním, který se pouští jen na vývoji.

## Proměnné prostředí

Cokoli s předponou `NEXT_PUBLIC_` se zabalí do kódu, který jde do prohlížeče. **Je to veřejné.** Servisní klíč, klíč k platbám ani nic podobného tam nesmí.

Když se tajný klíč jednou dostal do kódu nebo do historie verzí, **nestačí ho smazat.** Musí se změnit u té služby.

## Prostředí

Vývojová a ostrá databáze jsou **dva oddělené projekty**. Náhledová nasazení musí mířit na vývojovou, nikdy na ostrou. Tohle se snadno přehlédne a projeví se to tím, že si někdo na náhledu smaže skutečná data.

Projekt zdarma se **po týdnu bez provozu uspí**. Když testy najednou padají na spojení a v kódu se nic nezměnilo, je to tohle.

## Pasti, které stojí čas

- **Něco funguje lokálně a na Vercelu ne.** Skoro vždycky chybějící proměnná prostředí, nebo kód, který počítá s tím, že běží v prohlížeči, a spustí se na serveru.
- **Data jsou stará.** Next.js si stránky a dotazy drží v mezipaměti agresivněji, než člověk čeká. Když uživatel po uložení vidí starý stav, hledej tohle, ne chybu v ukládání.
- **Zpracování platby se dělá po návratu z platební brány.** Nikdy. Jistota o zaplacení pochází z oznámení od poskytovatele na server, uloženého tak, aby dvojí doručení nic nezkazilo. Návrat uživatele je jen obrazovka.
- **Placená služba se volá v cyklu.** Nejhorší faktury nevznikají z provozu, ale z jednoho dotazu, který se volá pořád dokola.

## Když si nejsi jistý rozhraním

Dohledej si to v aktuální dokumentaci. Ta se mění rychleji, než se stíhá přepisovat tenhle soubor.
