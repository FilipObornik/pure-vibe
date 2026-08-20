---
name: zaloz-projekt
description: Připrav projekt pro ostatní skilly. Spusť jednou na začátku, nebo na existující aplikaci, kterou chceš dát do pořádku.
disable-model-invocation: true
---

Spouští se jednou za projekt. Funguje na prázdné složce i na aplikaci, která už existuje.

Nejdřív zjisti fakta sám: co ve složce je, jestli je to git repozitář, jestli existuje `package.json`, jaká je verze Node, jaké služby jsou napojené, jestli je nainstalované `gh` a jestli je uživatel přihlášený. Na nic z toho se neptej.

## 1. Vyzpovídej se na záměr

Zavolej skill "vyzpovidej". Ptáš se na **celý produkt, ne na první funkci**: na věci, které platí napříč vším, co se kdy postaví, a ze kterých vzniká `KONTEXT.md` a `rozhodnuti/`. Co přesně má umět první kus, se řeší až v samostatném zpovídání před `/vibe:zadani`. Sem to netahej.

Ptej se jen na to, na co uživatel umí odpovědět z toho, jak má fungovat jeho produkt:

- Co ta aplikace má umět a komu slouží.
- Budou v ní účty více lidí a budou tam data, která nemá vidět nikdo další?
- Poteče přes ni platba?
- Jak se lidi budou přihlašovat?
- Kde chceš mít seznam úkolů: **(a)** přímo v projektu jako soubory, nic nenastavuješ, vidíš jen ty, nebo **(b)** na GitHubu jako issues, uvidí to i ostatní, ale potřebuješ účet a `gh`. Doporuč (a), pokud na tom nedělá s někým dalším.

Slovo **stavět** si drží skill "postav" a znamená řez funkčnosti. Tady nestavíš aplikaci, jen zakládáš základ, tak to tak i pojmenuj: po potvrzení shrnutí řekni, že teď **založíš základ projektu**, ne že to postavíš. Jinak uživatel čeká hotovou aplikaci a dostane prázdný projekt.

## 2. Rozhodni technické věci sám

Neptej se. Rozhodni a jednou větou zmiň důsledek.

Výchozí volba: **Next.js, Supabase, Vercel, Playwright na prohlížeč, Vitest na zbytek.** Když v projektu už něco běží, respektuj to, co tam je, a neměň to.

## 3. Založ paměť projektu

- `KONTEXT.md` se slovníkem z rozhovoru. Formát drží skill "slovnik".
- `rozhodnuti/` s prvním zápisem o zvoleném základu.
- `.ukoly/`, nebo nic, když si uživatel vybral GitHub.
- `prototypy/` a vyřaď ji z buildu, kontroly typů i testů.
- `AGENTS.md`, **krátký**, na jednu obrazovku. Patří do něj výslovná instrukce přečíst si `KONTEXT.md` kvůli slovníku a `rozhodnuti/` kvůli tomu, co už je rozhodnuté, výpis příkazů projektu s jednou větou u každého, k čemu je, a pravidlo, že se hotovo dokládá výstupem, ne tvrzením. Ze zvyklostí sem piš jen ty, které se z projektu nedají vyčíst: kam se zakládá nový kód a podle čeho se věci jmenují. Co ve složkách je, si agent přečte sám, výpis složek sem nepatří.
- `CLAUDE.md`, který jen odkáže na `AGENTS.md`. Dva soubory se stejným obsahem se za měsíc rozejdou a jeden z nich začne lhát.

Dlouhý soubor s pravidly způsobí, že se přestanou dodržovat i ta důležitá. Když `AGENTS.md` přeteče obrazovku, škrtej.

## 4. Postav ověřování

Vytvoř **dva** příkazy, protože ověřování má dvě rychlosti. Pravidla drží skill "pravidla-testu".

- **`npm run check`** na průběžné psaní: kontrola typů a rychlé testy, bez prohlížeče. Musí být otázkou sekund, jinak se přestane pouštět.
- **`npm run verify`** na konec řezu: kontrola typů, testy oprávnění, integrační testy a testy v prohlížeči.

`verify` skládej z menších skriptů, jeden na vrstvu. Když je něco červené, dá se pak pustit jen ta vrstva, místo celé sady dokola.

Uživateli to vysvětli jednou větou: **kratší běží pořád, delší rozhoduje o tom, jestli je hotovo.**

Doinstaluj prohlížeče pro testování (`npx playwright install`). Samotný balíček nestačí a chybová hláška, která z toho jinak vypadne, je pro uživatele nesrozumitelná.

**Testy oprávnění potřebují skutečnou databázi, a nikdy ne tu ostrou.**

Výchozí uspořádání jsou **dva oddělené projekty u poskytovatele databáze**: jeden vývojový, na kterém se testuje a smí se rozbít, a jeden ostrý, kam přijdou skuteční lidé. Jiná adresa, jiné klíče, takže se z vývoje na ostrá data nedá dosáhnout ani omylem.

Ostrý projekt zakládej až v `/vibe:pust-to-ven`. Teď stačí vývojový.

### Proveď uživatele formulářem

Projekt zakládá **uživatel** v prohlížeči, ty ho jen navádíš. Nech si popsat, co na obrazovce je, a jdi shora dolů. U každé volby řekni důsledek, ne název:

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

Až projekt naběhne, **Project Settings → API keys**. Vyrob `.env.local` zkopírováním `.env.example` a dej do něj tři věci:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- publishable klíč (dřív `anon`) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- secret klíč (dřív `service_role`, schovaný pod Reveal) → `SUPABASE_SERVICE_ROLE_KEY`

Nové projekty ukazují `sb_publishable_...` a `sb_secret_...`; starší klíče `anon` a `service_role` Supabase vyřazuje do konce roku 2026. Jsou to tytéž dvě role.

`.env.local` patří do `.gitignore`. **Secret klíč obchází všechna pravidla přístupu.** Je jen na přípravu a úklid testovacích dat, nikdy nesmí skončit v kódu, který běží v prohlížeči, ani na localhostu, a nikam ho neposílej.

Na konci ověř, že se projekt k databázi opravdu připojí. Netvrď to, dolož to výstupem.

Uživateli řekni v důsledcích: kde se testuje, proč to není tam, kde budou skutečná data, a co ho to stojí.

Dvě věci, které mu řekni rovnou, ať ho nepřekvapí:

- **Zdarma jsou dva aktivní projekty**, a to dohromady, ne na organizaci. Dvojice vývojový a ostrý se do toho vejde přesně, ale na další aplikaci už místo nezbude.
- **Projekt zdarma se po týdnu bez provozu uspí.** Když se po delší pauze vrátí a testy padají na spojení, není to chyba v kódu, jen se projekt musí probudit v konzoli. Uspaný projekt se do limitu nepočítá.

Na prázdném projektu bude sada prázdná. To je v pořádku, naplní se s prvním řezem. Ale příkaz musí existovat a projít od první minuty.

## 5. Zapni pojistky

Nejdražší chyba není špatný kód, ale ztracená práce. Agent umí jedním příkazem zahodit den.

**Verzování od první minuty.** Když projekt není v gitu, založ ho a udělej první commit. Bez toho nemá smysl nic dalšího. Uživateli řekni jednou větou, co to pro něj znamená: **po každém hotovém kusu se dá kdykoli vrátit zpátky.**

**Zakázané příkazy.** Do nastavení oprávnění projektu přidej mezi zakázané ty, které nevratně mažou práci: tvrdý návrat na starší stav, mazání nesledovaných souborů, násilné přepsání vzdálené větve a mazání větví. Nejde o hook ani o skript, jen o seznam v nastavení. Když agent takový příkaz potřebuje, řekne si o to a rozhodne člověk.

**Checkpointy jako návyk.** Po každém hotovém a ověřeném řezu commit. Ne po každé změně, ale po každém kusu, který funguje. Vysvětli uživateli rozdíl: **vracení v aplikaci není záloha.** Vrací jen změny souborů, které dělal agent přes editaci, ne to, co se stalo příkazem nebo v databázi.

## 6. Když aplikace už existuje

Navíc: zmapuj, co v ní je, a **hned spusť skill "kdo-vidi-co"**. U aplikace, která vznikla vibecodingem, je pravděpodobné, že data nejsou chráněná. Zjisti to dřív, než na tom začneš stavět dál.

## Hotovo je, když

- `npm run verify` proběhne a skončí zeleně.
- `KONTEXT.md` obsahuje pojmy z rozhovoru, ne obecné fráze.
- Uživatel ví, kde má seznam úkolů a jak se spustí aplikace.
- Projekt je v gitu, nebezpečné příkazy jsou zakázané a uživatel vlastními slovy řekl, jak se vrátí o krok zpět.
- Řekl jsi jednou větou, na čem to stojí, bez seznamu technologií.
- Uživatel ví, že aplikace zatím neexistuje, a ví, že další krok je **`/vibe:vyzpovidej` v novém sezení** na tu jednu věc, kterou chce postavit první. Ne `/vibe:zadani`: to jen sepisuje, co už zaznělo, a po tomhle skillu zaznělo jen to projektové.
