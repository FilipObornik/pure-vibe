---
name: rozsekej
description: Rozsekej zadání na malé kusy, které jdou postavit a ukázat jeden po druhém.
disable-model-invocation: true
---

Rozsekej práci na **řezy**. Řez je malý, ale **úplný** kus: sahá skrz všechny vrstvy od databáze po obrazovku a po dostavění ho jde ukázat a vyzkoušet.

Vezmi zadání z `.ukoly/`, z GitHubu, nebo z toho, co zaznělo v rozhovoru.

**Pak se rozhlédni po aplikaci, ne po zadání.** Zadání popisuje cílový stav, ne ten výchozí. Zjisti, co z toho, co práce předpokládá jako hotové, v aplikaci opravdu **není**: přihlašování, účty, typ záznamu, na kterém to visí, platby. Chybějící základ je **vlastní řez zařazený před tím, co na něm stojí**, i když v zadání nestojí ani slovem. Na prázdném projektu je normální, že takhle vyjde jako první řez přihlašování.

Vypiš tyhle řezy uživateli **zvlášť** a řekni, proč tam jsou: nechtěl je, ale bez nich nejde postavit to, co chtěl. Ať se rozhodne, jestli je postaví, nebo tu práci zúží.

## Pravidla řezu

- Řez jde po dostavění **předvést** nebo ověřit spuštěním. Ne "hotová databáze", ale "jde založit objednávku a je vidět v seznamu".
- Řez se vejde do jednoho sezení s agentem. Když je větší, rozsekni ho.
- Řezy mají **pořadí**. Neřeš složité závislosti, stačí, že to jde odshora dolů a každý řez staví na hotových.
- Ke každému řezu, který přidává nová data, patří **test oprávnění**. Není to zvláštní řez, je to jeho součást.
- Když je potřeba nejdřív něco přerovnat, aby šla práce udělat snadno, dej to jako první řez.

## Ukaž to uživateli

Vypiš řezy jako číslovaný seznam. U každého jednu větu, **co po něm bude fungovat**, jazykem uživatele.

Zeptej se na dvě věci:

1. Je to takhle po správných kusech, nebo je to moc velké či moc drobené?
2. Sedí pořadí, nebo něco chceš dřív?

Uprav to a zeptej se znovu, dokud to neschválí.

## Ulož

Podle nastavení projektu buď po jednom souboru do `.ukoly/`, číslované od `01` v pořadí, nebo po jednom issue na GitHubu.

Šablona souboru:

```md
# 03: <Název řezu>

**Co po tomhle bude fungovat:** jedna dvě věty očima uživatele.

**Napřed musí být hotové:** čísla řezů, nebo "nic, může se začít". Vyplň to poctivě, `postav` se na to spoléhá a bez toho začne stavět na něčem, co neexistuje.

**Hotovo, když:**
- [ ] <ověřitelná podmínka>
- [ ] <ověřitelná podmínka>
```

Do souborů nepiš cesty ke kódu ani ukázky. Zastarají.

Nakonec řekni, že další krok je `/vibe:postav` na první řez, a že se **začíná načisto v novém sezení**. Tohle je jediné místo hlavní cesty, kde se kontext úmyslně zahazuje: zpovídání, zadání a sekání patří k sobě, stavění řezu ne.
