---
name: pravidla-testu
description: Co je dobrý test, kam patří a jak se píšou testy oprávnění, integrační testy a testy v prohlížeči. Použij vždy, když píšeš nebo měníš test, nebo když navrhuješ, jak něco ověřit.
---

Test existuje proto, aby appku ověřil **agent sám, bez člověka**. Když ověření vyžaduje, aby se někdo podíval, není to test.

## Co je dobrý test

Dobrý test ověřuje **chování zvenčí**, ne vnitřek. Čte se jako věta ze zadání: "přihlášený zákazník vidí jen svoje objednávky". Kód uvnitř se může celý přepsat a test dál platí.

Názvy testů piš anglicky, stejně jako kód. Dokumenty a rozhovor s uživatelem jsou česky, kód ne.

## Čtyři vrstvy

Všechny běží pod jedním příkazem `npm run verify`.

**1. Kontrola typů.** Zdarma a okamžitá. Nic k rozhodování.

**2. Testy oprávnění.** Pro každou tabulku ověř, že uživatel B nedosáhne na data uživatele A: nepřečte je, nezmění, nesmaže, a to ani přímým dotazem mimo aplikaci. Tohle je nejdůležitější vrstva v celé sadě. Nejčastější díra ve vibecoded aplikacích vzniká tak, že nová funkce přidá tabulku a pravidlo se k ní nedoplní. Když každou tabulku hlídá test, taková díra neprojde.

Ke každé nové tabulce patří test oprávnění ve stejném řezu. Bez něj není řez hotový.

**3. Integrační testy akcí.** Jedna akce, kterou appka umí ("vytvoř objednávku", "zruš rezervaci"), včetně skutečné databáze. Tady leží těžiště, protože je to rychlé a chytí to většinu chyb.

**4. Testy v prohlížeči.** Jedna hlavní cesta na každou funkci, projitá tak, jak by ji prošel člověk. Chytají to, co ostatní vrstvy nevidí: rozbité tlačítko, nenačtenou stránku, formulář, co neodešle.

**Jednotkové testy** piš jen tam, kde je pravidlová logika: ceny, slevy, výpočty, přechody stavů. Nikde jinde.

## Dvě rychlosti

Kdyby se po každé změně pouštělo všechno včetně prohlížeče, čekání by bylo tak dlouhé, že by se ověřování začalo obcházet. Proto jsou příkazy dva.

**`npm run check`** je na průběžné psaní: kontrola typů a rychlé testy, tedy vrstvy 1 až 3 bez prohlížeče. Trvá sekundy a pouští se často.

**`npm run verify`** je na konec řezu a před ukázáním komukoli: všechny čtyři vrstvy, prohlížeč včetně.

Zelený `check` **není ověření**. Řez je hotový až po zeleném `verify`, a ten se dokládá vypsaným výstupem. Skill "zkontroluj" pouští vždycky `verify`, nikdy `check`.

Když vrstvy 2 a 3 narostou tak, že `check` přestane být otázkou sekund, pouštěj v něm jen testy dotčené změnou a celou sadu nech na `verify`.

## Izolace testovacích dat

Testy běží proti stejné databázi, ve které si uživatel klika. **Nikdy je nesmí poškodit.**

- **Nikdy nemaž tabulku a nesypej data znovu.** Žádné vyprázdnění, žádný reset databáze. Smazal bys uživateli jeho práci.
- **Každý test si vyrobí, co potřebuje.** Vlastní uživatele s náhodnými adresami, vlastní záznamy. Nic si nepůjčuje od jiného testu ani od uživatele.
- **Ukliď jen po sobě.** Na konci smaž to, co jsi vytvořil, a nic jiného.
- **Nikdy nepředpokládej prázdnou databázi.** Neověřuj "v seznamu jsou tři objednávky", ale "v seznamu jsou moje tři objednávky". Test, který spadne jen proto, že vedle leží cizí data, je špatně napsaný test.
- **Označ testovací data poznávací značkou.** Náhodné adresy a názvy začínající `test-`, ať se dá poznat, co po testech zbylo, když některý spadl uprostřed. Sběr zbytků podle té značky přidej do projektu jako samostatný příkaz.

Pravidla výš piš tak, aby platila vždycky: výchozí uspořádání je společná vývojová databáze, ne prázdná databáze jen pro tenhle běh.

## Pravidla pro prohlížeč

Agenti tady dělají čtyři chyby pořád dokola:

- **Hledej prvky podle role a popisku**, ne podle tříd a cest v HTML. Selektor postavený na vzhledu se rozbije, jakmile někdo změní styl. Když prvek nejde najít podle role ani popisku, přidej mu do kódu stabilní testovací značku.
- **Nikdy nečekej pevnou dobu.** Čekání na počet sekund je hlavní příčina testů, které jednou projdou a podruhé ne. Čekej na stav, ne na čas.
- **Nepřihlašuj se přes formulář v každém testu.** Přihlas se jednou a stav přihlášení znovu použij.
- **Data připrav přes rozhraní, ne proklikáním.** Test má ověřovat jednu věc, ne dvacet kroků příprav.

**Než napíšeš první test v projektu, přečti si soubor `priklady.md` ve složce tohohle skillu.** Jsou v něm konkrétní tvary všech tří vrstev, včetně toho, jak vypadají špatně, a pasti, na kterých se dá napsat test, co vypadá, že hlídá, a nehlídá nic.

## Antivzory

- **Přilepený na vnitřek.** Test podstrkuje falešné vnitřní součástky nebo se dívá do databáze místo přes rozhraní. Poznáš ho tak, že se rozbije při přepsání kódu, přestože se chování nezměnilo.

  **Výjimka: testy oprávnění.** Tam je obejití aplikace přesně to, co se testuje. Útočník se taky nebude proklikávat formulářem, ale sáhne na data přímo. Test oprávnění proto musí zkusit i přímý dotaz mimo aplikaci, a když projde, je to nález.
- **Kruhový.** Test počítá očekávanou hodnotu stejně jako kód, takže projde vždycky a nikdy nic nechytí. Očekávaná hodnota musí přijít odjinud: ze zadání, z ručně spočítaného příkladu, z konkrétního čísla.
- **Vodorovné krájení.** Napsat všechny testy dopředu a pak teprve kód. Takové testy ověřují vymyšlené chování. Piš je po jednom: jeden test, kus kódu, další test.

## Co podstrkovat falešné

Jen skutečnou hranici ven ze systému: cizí služby, čas, náhodu, odesílání mailů a plateb. **Nikdy nepodstrkuj vlastní kód.**
