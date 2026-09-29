---
name: pravidla-testu
description: Co je dobrý test, kam patří a jak se píšou testy oprávnění, integrační testy a testy v prohlížeči. Použij vždy, když píšeš nebo měníš test, nebo když navrhuješ, jak něco ověřit.
---

Test existuje proto, aby appku ověřil **agent sám, bez člověka**. Když ověření vyžaduje, aby se někdo podíval, není to test.

## Co je dobrý test

Dobrý test ověřuje **chování zvenčí**, ne vnitřek. Čte se jako věta ze zadání: "přihlášený zákazník vidí jen svoje objednávky". Kód uvnitř se může celý přepsat a test dál platí.

Názvy testů piš anglicky, stejně jako kód. Dokumenty a rozhovor s uživatelem jsou česky, kód ne.

## Čtyři vrstvy

Všechny běží pod jedním příkazem `npm run verify`, dotčené z nich pod `npm run verify:rez`.

**1. Kontrola typů.** Zdarma a okamžitá. Nic k rozhodování.

**2. Testy oprávnění.** Pro každou tabulku ověř, že uživatel B nedosáhne na data uživatele A: nepřečte je, nezmění, nesmaže, a to ani přímým dotazem mimo aplikaci. Tohle je nejdůležitější vrstva v celé sadě. Nejčastější díra ve vibecoded aplikacích vzniká tak, že nová funkce přidá tabulku a pravidlo se k ní nedoplní. Když každou tabulku hlídá test, taková díra neprojde.

Ke každé nové tabulce patří test oprávnění ve stejném řezu. Bez něj není řez hotový.

**3. Integrační testy akcí.** Jedna akce, kterou appka umí ("vytvoř objednávku", "zruš rezervaci"), včetně skutečné databáze. Tady leží těžiště, protože je to rychlé a chytí to většinu chyb.

**4. Testy v prohlížeči.** Jedna hlavní cesta na každou funkci, projitá tak, jak by ji prošel člověk. Chytají to, co ostatní vrstvy nevidí: rozbité tlačítko, nenačtenou stránku, formulář, co neodešle.

**Jednotkové testy** piš jen tam, kde je pravidlová logika: ceny, slevy, výpočty, přechody stavů. Nikde jinde.

## Každá podmínka na nejnižší vrstvě, která ji ověří

Test v prohlížeči je nejpomalejší a nejvíc zatěžuje databázi: každý si vyrábí lidi, přihlašuje je a načítá stránky s obrázky. Proto se podmínka ověřuje **na nejnižší vrstvě, která ji dokáže ověřit**:

- Výpočet, tvar slova, řazení, převod data: **jednotkový test**.
- "Cizí to nepřečte, nezmění, nesmaže": **test oprávnění**.
- Co akce udělá s daty, okrajové případy (stažená věc, prázdný seznam, druhé kliknutí, cizí účet): **integrační test**.
- Že to člověk projde na obrazovce od začátku do konce: **prohlížeč**.
- Jak to vypadá a jestli je text srozumitelný: **screenshot a proklik člověka**, ne test.

**Strop: řez přidá nejvýš dva testy v prohlížeči.** Jeden na hlavní cestu a nejvýš jeden na cestu, která se na obrazovce opravdu chová jinak (třeba nepřihlášený skončí na přihlášení). Když tě láká napsat třetí, patří ta podmínka o vrstvu níž. Test v prohlížeči neověřuje vzhled (barvy, rozestupy, třídy), na to je screenshot.

## Tři úrovně ověření

Každý test sahá do vývojového projektu Supabase na volném plánu. Kdyby se po každé změně pouštělo všechno, čekalo by se dlouho, přetěžovala by se databáze a ověřování by se začalo obcházet. Proto jsou úrovně tři:

**`npm run check`** je na průběžné psaní: kontrola typů a jednotkové testy. Do databáze nesahá, trvá sekundy a pouští se často. **`npm run check:db`** k tomu pustí testy oprávnění a integrační testy dotčené neuloženou změnou. Pouštěj ho, když píšeš akci nebo pravidlo přístupu, ne po každém řádku.

**`npm run verify:rez -- e2e/<spec>.spec.ts`** uzavírá řez: typy, jednotkové testy, testy oprávnění a integrační testy dotčené změnou od posledního plného běhu, sestavení a **jen vybrané testy v prohlížeči**. Vybírá se spec řezu a specy stránek, na které změna sáhla (najdeš je hledáním cesty stránky nebo textu z ní v `e2e/`). Změněné specy přidá skript sám. Když změna v prohlížeči nemá co ukázat, spustí se s `--bez-prohlizece`.

**`npm run verify`** je plná sada: všechny vrstvy, všechny testy. `verify:rez` se na ni **přepne sám**, když změna sáhne na migrace, přihlášení, proxy, závislosti nebo nastavení testů, nebo když od posledního zeleného plného běhu uběhlo pět commitů. Pouštěj ji ručně před tím, než aplikaci někdo uvidí (`najdi-slaba-mista`, `pust-to-ven`), a když si nejsi jistý, jestli změna nesahá dál, než vypadá.

Zelený `check` **není ověření**. Řez je hotový až po zeleném `verify:rez` nebo `verify`, a ten se dokládá vypsaným výstupem. Výstup `verify:rez` vždycky vypíše, co pustil a co ne. Tu větu předej dál, nezamlčuj ji.

## Když něco spadne

Pusť **jen to, co spadlo**: `npx playwright test --last-failed`, u Vitestu ten jeden soubor. Celou úroveň znovu nepouštěj. Opakovat celou sadu po každém pokusu je nejrychlejší cesta k "Too many connections" a v minulých sezeních to byla polovina času řezu.

- **Soubor, který sám projde, spadl na zátěži, ne na kódu.** Zapiš do shrnutí, který test a s jakou hláškou, a pokračuj. Celou sadu kvůli tomu znovu nepouštěj.
- **Soubor, který spadne i sám, je chyba.** Oprav ji, i když vypadá jako zátěž, a pusť zase jen ten soubor.
- **Nikdy nečekej přes `sleep`, až se limity obnoví.** Čekání minutami nic neověří a zátěž se jím nesníží. Když padá i jednotlivý soubor na "rate limit" nebo 429, řekni to uživateli a nepokračuj naslepo.

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
- **Lidi vyráběj jednou na soubor, ne v každém testu.** Každý vyrobený člověk je volání přihlašování a úložiště Supabase. Když testy v souboru potřebují stejné role (majitelka, zájemce), vyrob je v `beforeAll` a smaž v `afterAll`. Vlastního člověka dostane jen test, který mu mění data, na kterých stojí ostatní testy.

**Než napíšeš první test v projektu, přečti si soubor `priklady.md` ve složce tohohle skillu.** Jsou v něm konkrétní tvary všech tří vrstev, včetně toho, jak vypadají špatně, a pasti, na kterých se dá napsat test, co vypadá, že hlídá, a nehlídá nic.

## Antivzory

- **Přilepený na vnitřek.** Test podstrkuje falešné vnitřní součástky nebo se dívá do databáze místo přes rozhraní. Poznáš ho tak, že se rozbije při přepsání kódu, přestože se chování nezměnilo.

  **Výjimka: testy oprávnění.** Tam je obejití aplikace přesně to, co se testuje. Útočník se taky nebude proklikávat formulářem, ale sáhne na data přímo. Test oprávnění proto musí zkusit i přímý dotaz mimo aplikaci, a když projde, je to nález.
- **Kruhový.** Test počítá očekávanou hodnotu stejně jako kód, takže projde vždycky a nikdy nic nechytí. Očekávaná hodnota musí přijít odjinud: ze zadání, z ručně spočítaného příkladu, z konkrétního čísla.
- **Vodorovné krájení.** Napsat všechny testy dopředu a pak teprve kód. Takové testy ověřují vymyšlené chování. Piš je po jednom: jeden test, kus kódu, další test.

## Co podstrkovat falešné

Jen skutečnou hranici ven ze systému: cizí služby, čas, náhodu, odesílání mailů a plateb. **Nikdy nepodstrkuj vlastní kód.**
