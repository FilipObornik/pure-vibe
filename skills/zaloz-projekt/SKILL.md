---
name: zaloz-projekt
description: Připrav projekt pro ostatní skilly. Spusť jednou na začátku, nebo na existující aplikaci, kterou chceš dát do pořádku.
disable-model-invocation: true
---

Spouští se jednou za projekt. Funguje na prázdné složce i na aplikaci, která už existuje.

Nejdřív zjisti fakta sám: co ve složce je, jestli je to git repozitář, jestli existuje `package.json`, jaká je verze Node, jaké služby jsou napojené, jestli je nainstalované `gh` a jestli je uživatel přihlášený. Na nic z toho se neptej.

## 1. Vyzpovídej se na záměr

Zavolej skill "vyzpovidej". Ptáš se na **celý produkt, ne na první funkci**: jen na to, co mění tvar všeho, co se kdy postaví, a ze čeho vzniká `PRODUKT.md`, `KONTEXT.md` a `rozhodnuti/`. Jak přesně se která věc chová (co se stane při smazání, co vidí cizí člověk, jestli je to kopie nebo živý odkaz), se řeší až ve zpovídání na tu jednu věc před `/vibe:zadani`. Když se k takové otázce dostaneš, řekni "tohle probereme, až na to dojde", a jdi dál.

Ptej se jen na to, na co uživatel umí odpovědět z toho, jak má fungovat jeho produkt:

- Co ta aplikace má umět a komu slouží.
- **Co všechno to má umět**: seznam věcí, jednou větou každá, v pořadí, v jakém je chce mít. Bez detailu.
- Budou v ní účty více lidí a budou tam data, která nemá vidět nikdo další?
- Poteče přes ni platba?
- Jak se lidi budou přihlašovat?
- Kde chceš mít seznam úkolů: **(a)** přímo v projektu jako soubory, nic nenastavuješ, vidíš jen ty, nebo **(b)** na GitHubu jako issues, uvidí to i ostatní, ale potřebuješ účet a `gh`. Doporuč (a), pokud na tom nedělá s někým dalším.

Slovo **stavět** si drží skill "postav" a znamená řez funkčnosti. Tady nestavíš aplikaci, jen zakládáš základ, tak to tak i pojmenuj: po potvrzení shrnutí řekni, že teď **založíš základ projektu**, ne že to postavíš. Jinak uživatel čeká hotovou aplikaci a dostane prázdný projekt.

## 2. Rozhodni technické věci sám

Neptej se. Rozhodni a jednou větou zmiň důsledek.

Výchozí volba: **Next.js, Supabase, Vercel, Playwright na prohlížeč, Vitest na zbytek.** Když v projektu už něco běží, respektuj to, co tam je, a neměň to.

## 3. Založ paměť projektu

- `PRODUKT.md`, **krátký**, na jednu obrazovku: co to je a pro koho (dva odstavce), **Co bude umět** (číslovaný seznam věcí z rozhovoru, v pořadí, jednou větou každá), **Co do toho nepatří** (co uživatel vědomě odmítl), a věta, že detail každé věci vzniká až v jejím zadání a to, co se těžko vrací, je v `rozhodnuti/`. Není to zadání a nepíše se do něj, jak se věci chovají.
- `KONTEXT.md` se slovníkem z rozhovoru. Formát drží skill "slovnik".
- `rozhodnuti/` s prvním zápisem o zvoleném základu.
- `.ukoly/`, nebo nic, když si uživatel vybral GitHub. Do složky dej `README.md` s pravidly z odstavce níž a **jeden soubor na každou věc ze seznamu "Co bude umět"**: název `napad-<slug>.md`, uvnitř jedna dvě věty a řádek "Dospecifikuje `/vibe:vyzpovidej`". Uživatel tak od první minuty vidí, co je před ním, a nic z rozhovoru neleží jen v chatu.
- `prototypy/` a vyřaď ji z buildu, kontroly typů i testů. Je jen pro `/vibe:prototyp`.
- `scripts/screenshot.mjs` zkopíruj ze souboru `screenshot.mjs` ve složce tohohle skillu a přidej příkaz `npm run screenshot`. Pouští ho `postav`, když se dívá na hotovou obrazovku. Složku `screenshots/` dej do `.gitignore`.
- `AGENTS.md`, **krátký**, na jednu obrazovku. Patří do něj výslovná instrukce přečíst si `KONTEXT.md` kvůli slovníku a `rozhodnuti/` kvůli tomu, co už je rozhodnuté, výpis příkazů projektu s jednou větou u každého, k čemu je, pravidlo, že se hotovo dokládá výstupem, ne tvrzením, a pravidlo, že popis commitu je jedna věta česky. Ze zvyklostí sem piš jen ty, které se z projektu nedají vyčíst: kam se zakládá nový kód a podle čeho se věci jmenují. Co ve složkách je, si agent přečte sám, výpis složek sem nepatří.
- `CLAUDE.md`, který jen odkáže na `AGENTS.md`. Dva soubory se stejným obsahem se za měsíc rozejdou a jeden z nich začne lhát.

Pravidla složky `.ukoly/`, která patří do jejího `README.md`: `napad-<slug>.md` je věc, která se ještě neprobírala. Jakmile se na ni dojde, `/vibe:zadani` z ní udělá složku `<slug>/` se souborem `zadani.md`, `/vibe:rozsekej` do ní přidá řezy `01-*.md`, `02-*.md`, a nápad smaže. `/vibe:postav` řezy uzavírá a hotovou složku přesune do `hotovo/`. Výpis `.ukoly/` je tak seznam toho, co je před námi, výpis `hotovo/` seznam toho, co už funguje.

Až jsou soubory na místě, commit s popisem česky. Paměť projektu se commituje hned, ne až s prvním kódem.

Dlouhý soubor s pravidly způsobí, že se přestanou dodržovat i ta důležitá. Když `AGENTS.md` přeteče obrazovku, škrtej.

Až to založíš, řekni uživateli, co mu v projektu přibylo, jednou větou u každé věci a jazykem důsledků. Uživatel ty soubory vidí, nezná je a bude se ptát, nebo si vedle nich začne zakládat vlastní:

- `PRODUKT.md`: na jednu obrazovku, co to je a co všechno bude umět. Když se ti změní představa, řekni to a přepíšeme ho.
- `KONTEXT.md`: slovník tvého projektu, aby agent říkal věcem stejně jako ty. Můžeš do něj sáhnout, když se ti nějaké slovo nelíbí.
- `rozhodnuti/`: co jsme si dohodli a co by se těžko vracelo. Ne každá dohoda, jen ty důležité.
- `.ukoly/`: co je před námi. Teď jsou tam nápady, jeden soubor na každou věc ze seznamu, a z každého bude složka se zadáním a kusy práce, až na něj dojde. Sem se budeš dívat nejčastěji.
- `AGENTS.md`: pravidla pro agenta, číst ho nemusíš.

A jednu větu navíc: **paměť projektu jsou tyhle soubory, ne chat.** Když se zavře okno nebo se pokračuje na jiném počítači, agent si to podstatné přečte odsud. Proto se nic důležitého nedomlouvá jen v rozhovoru.

## 4. Postav ověřování

Ověřování má tři rychlosti, protože testy databáze sahají do vývojového projektu na volném plánu a plná sada s prohlížečem trvá minuty. Pravidla drží skill "pravidla-testu".

- **`npm run check`** na průběžné psaní: kontrola typů a jednotkové testy. Do databáze nesahá, musí být otázkou sekund, jinak se přestane pouštět.
- **`npm run check:db`**: testy oprávnění a integrační dotčené neuloženou změnou (`vitest run tests/permissions tests/integration --changed --passWithNoTests`).
- **`npm run verify:rez`** uzavírá řez: jen testy dotčené změnou od posledního plného běhu a vybrané testy v prohlížeči. U rizikové změny (migrace, přihlášení, závislosti, nastavení testů) nebo po pěti commitech bez plného běhu se sám přepne na plnou sadu.
- **`npm run verify`**: plná sada, všechny vrstvy a všechny testy.

`scripts/verify.mjs` zkopíruj ze souboru `verify.mjs` ve složce tohohle skillu, `verify` je `node scripts/verify.mjs` a `verify:rez` je `node scripts/verify.mjs --rez`. Nahoře v něm je nastavení: vrstvy plné sady a cesty, na kterých stojí celá aplikace. Uprav je podle projektu. Plná sada volá menší skripty, jeden na vrstvu (`test:unit`, `test:permissions`, `test:integration`, `test:e2e`). Když je něco červené, dá se pak pustit jen ta vrstva, místo celé sady dokola.

Do nastavení testů rovnou dej, co volný plán databáze potřebuje. Jeho stroj má půl giga paměti a pod zátěží testů se umí na desítky sekund zastavit (skill "stack"):

- Vitest: `maxWorkers: 4` (víc souběžných souborů databázi přetíží a rychlejší to není), `testTimeout` a `hookTimeout` 60 s.
- Playwright: `timeout` 90 s a `expect: { timeout: 15_000 }`.

Testy nečekají pevnou dobu, delší strop jen určuje, kdy je čekání už chyba, ne zastavení databáze.

Uživateli to vysvětli jednou větou: **krátké běží pořád, ověření řezu pustí jen to, čeho se změna dotkla, a plná sada rozhoduje, když jde o hodně.**

Doinstaluj prohlížeče pro testování (`npx playwright install`). Samotný balíček nestačí a chybová hláška, která z toho jinak vypadne, je pro uživatele nesrozumitelná.

**Testy oprávnění potřebují skutečnou databázi, a nikdy ne tu ostrou.**

Výchozí uspořádání jsou **dva oddělené projekty u poskytovatele databáze**: jeden vývojový, na kterém se testuje a smí se rozbít, a jeden ostrý, kam přijdou skuteční lidé. Jiná adresa, jiné klíče, takže se z vývoje na ostrá data nedá dosáhnout ani omylem.

Ostrý projekt zakládej až v `/vibe:pust-to-ven`. Teď stačí vývojový.

### Založ vývojový projekt

Tenhle krok se **nedá přeskočit ani odložit na uživatele**. Skill pokračuje, až když se projekt k databázi připojí. Zbytek zakládání (základ, ověřování, pojistky) může být hotový dřív, ale skill nekončí bez databáze.

Nejdřív zjisti, jestli je `supabase` CLI přihlášené (`supabase projects list`). Pak vyber cestu:

**Cesta přes CLI, když je přihlášené.** Uživatel nic nekopíruje. Vypiš mu existující projekty a zeptej se, jestli má některý vývojový, který smí rozbít, nebo jestli založit nový (`supabase projects create <nazev>-dev --region eu-central-1`). Pak `supabase link` na vybraný projekt a klíče vezmi z `supabase projects api-keys`. Uživateli řekni jen, že jsi projekt propojil a kde ho uvidí v konzoli. Nastavení Security z formuláře níž u projektu založeného z CLI nejde nastavit, proto každá tabulka dostane ochranu i zpřístupnění v migraci, viz skill "stack".

**Cesta přes prohlížeč, když CLI přihlášené není.** Projekt zakládá uživatel, ty ho navádíš. Řekni mu, ať otevře supabase.com, klikne na New project, a **počkej, až řekne, že formulář vidí.** Pak jdi shora dolů, **jedna sekce na jednu zprávu**, nech si popsat, co na obrazovce je. U každé volby řekni důsledek, ne název:

- **GitHub (optional)** - přeskočit. Připojení nechá Supabase samo nasazovat změny schématu z repozitáře. Migrace pouštíme z ruky a nechceš, aby ti do databáze něco sahalo dřív, než víš, co v ní je.
- **Project name** - s příponou `-dev`. Za měsíc bude vedle `-prod` a musí být na první pohled poznat, do kterého se dívá.
- **Database password** - hned Copy a uložit do správce hesel. Aplikace ho potřebovat nebude, ta jede na klíčích, ale bez něj se k databázi nedostane napřímo a znovu se nezobrazí.
- **Region** - nejbližší, z Česka Frankfurt (`eu-central-1`). Později se nedá změnit.
- **Postgres Type** v Advanced configuration - nechat `Postgres`. OrioleDB je alpha.

**Sekce Security je jediné místo formuláře, kde se rozhoduje o bezpečnosti, a dvě ze tří voleb jsou výchozí opačně, než je chceš.** Nehádej jejich stav, nech si přečíst, co je zaškrtnuté:

- ☑️ **Enable Data API** - nechat zaškrtnuté. Bez toho se aplikace k datům nedostane, `supabase-js` jede přes něj.
- ⬜️ **Automatically expose new tables** - **odškrtnout**, výchozí je zaškrtnuté. Supabase to sám v popisku doporučuje vypnout. Zaškrtnuté znamená, že nová tabulka je dosažitelná zvenku, jakmile vznikne, aniž by o tom kdokoli rozhodl. Odškrtnuté znamená, že se přístup musí ke každé tabulce napsat výslovně, a když se na to zapomene, aplikace spadne na `permission denied for table` i s návodem, co dopsat. To je ta chyba, kterou chceš. Opačně se nestane nic viditelného a data jsou venku.
- ☑️ **Enable automatic RLS** - **zaškrtnout**, výchozí je odškrtnuté. Založí pravidlo, které u každé nové tabulky zapne "dokud někdo výslovně neřekne, kdo sem smí, nesmí sem nikdo". Tohle je nejčastější díra ve vibecodovaných aplikacích: přibude funkce, přibude tabulka, pravidlo se k ní nedoplní. Tabulky naklikané v konzoli ochranu dostanou samy, ale my je zakládáme migracemi, a na ty to bez tohohle neplatí.

Uživateli to shrň jednou větou: jsou to dvě nezávislé pojistky a obě selhávají nahlas. Třetí jsou testy oprávnění v projektu.

Supabase výchozí hodnotu u expose postupně obrací, u nových projektů od dubna 2026 a u všech do konce října 2026. Když ji uživatel najde odškrtnutou rovnou, jen to potvrď a jdi dál.

### Vezmi si klíče

U cesty přes CLI si klíče vezmi sám a `.env.local` vyrob sám. U cesty přes prohlížeč počkej, až projekt naběhne, a proveď uživatele na **Project Settings → API keys**. Vyrob `.env.local` zkopírováním `.env.example` a dej do něj tři věci:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- publishable klíč (dřív `anon`) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- secret klíč (dřív `service_role`, schovaný pod Reveal) → `SUPABASE_SERVICE_ROLE_KEY`

Nové projekty ukazují `sb_publishable_...` a `sb_secret_...`; starší klíče `anon` a `service_role` Supabase vyřazuje do konce roku 2026. Jsou to tytéž dvě role. Klíč `sb_secret_...` vzatý z CLI u některých projektů vrací `Invalid API key`; když se to stane, vezmi `service_role` a ověř testem, který klíč funguje.

`.env.local` patří do `.gitignore`. **Secret klíč obchází všechna pravidla přístupu.** Je jen na přípravu a úklid testovacích dat, nikdy nesmí skončit v kódu, který běží v prohlížeči, ani na localhostu, a nikam ho neposílej.

Na konci spusť test spojení (`npm run test:permissions`) a vypiš výstup. Musí v něm být `passed`. Test, který se bez klíčů **přeskočí**, je v pořádku jako ochrana pro později, ale `skipped` není důkaz spojení. Dokud test nevypíše `passed`, databáze není napojená a skill neskončil.

U cesty přes prohlížeč ještě projekt propoj: řekni uživateli, ať napíše `! supabase login` a dokončí přihlášení v prohlížeči, pak udělej `supabase link`. Bez propojení nejdou pouštět migrace a první řez s tabulkou se zasekne.

Uživateli řekni v důsledcích: kde se testuje, proč to není tam, kde budou skutečná data, a co ho to stojí.

Dvě věci, které mu řekni rovnou, ať ho nepřekvapí:

- **Zdarma jsou dva aktivní projekty**, a to dohromady, ne na organizaci. Dvojice vývojový a ostrý se do toho vejde přesně, ale na další aplikaci už místo nezbude.
- **Projekt zdarma se po týdnu bez provozu uspí.** Když se po delší pauze vrátí a testy padají na spojení, není to chyba v kódu, jen se projekt musí probudit v konzoli. Uspaný projekt se do limitu nepočítá.

Na prázdném projektu bude sada prázdná. To je v pořádku, naplní se s prvním řezem. Ale příkaz musí existovat a projít od první minuty.

## 5. Zapni pojistky

Nejdražší chyba není špatný kód, ale ztracená práce. Agent umí jedním příkazem zahodit den.

**Verzování od první minuty.** Když projekt není v gitu, založ ho a udělej první commit. Bez toho nemá smysl nic dalšího. Uživateli řekni jednou větou, co to pro něj znamená: **po každém hotovém kusu se dá kdykoli vrátit zpátky.**

**Zakázané příkazy.** Do nastavení oprávnění projektu přidej mezi zakázané ty, které nevratně mažou práci: tvrdý návrat na starší stav, mazání nesledovaných souborů, násilné přepsání vzdálené větve, mazání větví a reset propojené databáze (`supabase db reset --linked`). Nejde o hook ani o skript, jen o seznam v nastavení. Když agent takový příkaz potřebuje, řekne si o to a rozhodne člověk. Když zápis do nastavení neprojde, zkus to znovu později v tomhle sezení; uživateli řekni, co se zapisuje a proč, a nech to na sobě, ne na něm.

**Checkpointy jako návyk.** Po každém hotovém a ověřeném řezu commit. Ne po každé změně, ale po každém kusu, který funguje. Vysvětli uživateli rozdíl: **vracení v aplikaci není záloha.** Vrací jen změny souborů, které dělal agent přes editaci, ne to, co se stalo příkazem nebo v databázi.

## 6. Když aplikace už existuje

Navíc: zmapuj, co v ní je, a **hned spusť skill "kdo-vidi-co"**. U aplikace, která vznikla vibecodingem, je pravděpodobné, že data nejsou chráněná. Zjisti to dřív, než na tom začneš stavět dál.

## Hotovo je, když

- `npm run verify` proběhne a skončí zeleně a test spojení s databází v něm vypsal `passed`, ne `skipped`.
- Projekt je propojený přes `supabase link`, aby šly pouštět migrace.
- `KONTEXT.md` obsahuje pojmy z rozhovoru, ne obecné fráze. `PRODUKT.md` má seznam věcí z rozhovoru a v `.ukoly/` je na každou z nich nápad.
- Uživatel ví, kde má seznam úkolů a jak se spustí aplikace.
- Uživatel ví, k čemu jsou `PRODUKT.md`, `KONTEXT.md`, `rozhodnuti/` a `AGENTS.md`, a slyšel, že paměť projektu jsou soubory, ne chat.
- Paměť projektu je commitnutá.
- Projekt je v gitu, nebezpečné příkazy jsou zakázané a uživatel vlastními slovy řekl, jak se vrátí o krok zpět.
- Řekl jsi jednou větou, na čem to stojí, bez seznamu technologií.
- Uživatel ví, že aplikace zatím neexistuje, a ví, že další krok je **`/vibe:vyzpovidej` v novém sezení** na tu jednu věc, kterou chce postavit první. Ne `/vibe:zadani`: to jen sepisuje, co už zaznělo, a po tomhle skillu zaznělo jen to projektové.
