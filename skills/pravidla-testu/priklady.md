# Ukázky testů

Konkrétní tvary, ze kterých vycházej. Kód a názvy testů anglicky, komentáře podle projektu.

## Test oprávnění

Tenhle tvar je nejdůležitější v celé sadě. Ověřuje, že se uživatel B nedostane k datům uživatele A, a to i tehdy, když obejde aplikaci.

```ts
// tests/permissions/orders.test.ts
import { afterEach, describe, expect, it } from "vitest";
import { clientFor, createTestUser, deleteTestUser } from "./helpers";

describe("orders row access", () => {
  const cleanup: string[] = [];
  afterEach(async () => {
    for (const id of cleanup) await deleteTestUser(id);
    cleanup.length = 0;
  });

  it("hides an order from a different user", async () => {
    const alice = await createTestUser();
    const bob = await createTestUser();
    cleanup.push(alice.id, bob.id);

    const { data: order } = await clientFor(alice)
      .from("orders")
      .insert({ total: 100 })
      .select()
      .single();

    const { data } = await clientFor(bob)
      .from("orders")
      .select()
      .eq("id", order.id);

    expect(data).toEqual([]);
  });

  it("does not let a different user change an order", async () => {
    const alice = await createTestUser();
    const bob = await createTestUser();
    cleanup.push(alice.id, bob.id);

    const { data: order } = await clientFor(alice)
      .from("orders")
      .insert({ total: 100 })
      .select()
      .single();

    await clientFor(bob).from("orders").update({ total: 1 }).eq("id", order.id);

    const { data: after } = await clientFor(alice)
      .from("orders")
      .select()
      .eq("id", order.id)
      .single();

    expect(after.total).toBe(100);
  });
});
```

Čtyři věci, které ten tvar drží: dva skuteční uživatelé, zápis pod prvním, čtení a zápis pod druhým, a úklid jen po sobě.

### Špatně: klient, na kterého pravidla neplatí

```ts
// ŠPATNĚ: servisní klíč obchází všechna pravidla,
// takže tenhle test projde i na úplně otevřené tabulce
const db = createClient(url, SERVICE_ROLE_KEY);
const { data } = await db.from("orders").select().eq("id", id);
expect(data).toEqual([]);
```

Tohle je nejnebezpečnější test v celé sadě, protože **vypadá, že něco hlídá, a nehlídá nic.** Falešná zelená je horší než žádný test.

### Špatně: kontroluje se vzhled, ne data

```ts
// ŠPATNĚ: ověřuje jen, že se tlačítko nezobrazilo
await expect(page.getByRole("button", { name: "Smazat" })).toBeHidden();
```

Schované tlačítko není ochrana. Data musí být nedostupná i pro toho, kdo se na stránku nikdy nepodívá.

### Past, na kterou narazíš

Když pravidlo přístup zakáže, **nepřijde chyba, ale prázdný výsledek.** U mazání a úprav projde volání bez chyby a jen se nic nestane.

```ts
// ŠPATNĚ: tohle spadne i na správně zabezpečené tabulce
const { error } = await clientFor(bob).from("orders").select().eq("id", id);
expect(error).toBeTruthy();

// SPRÁVNĚ: kontroluj výsledek, ne chybu
expect(data).toEqual([]);
```

U úprav a mazání se proto **ověřuje následek**: přečti záznam znovu pod jeho vlastníkem a zkontroluj, že se nezměnil.

## Integrační test akce

Jedna věc, kterou aplikace umí, včetně skutečné databáze.

```ts
// tests/orders/create-order.test.ts
it("creates an order the customer can then see", async () => {
  const alice = await createTestUser();
  cleanup.push(alice.id);

  const order = await createOrder(alice, { items: [{ sku: "A1", price: 250 }] });
  const mine = await listOrders(alice);

  expect(mine.map((o) => o.id)).toContain(order.id);
});
```

Ověřuje se **přes rozhraní aplikace**, ne dotazem do databáze. Výjimka jsou testy oprávnění výš, kde je obcházení aplikace smyslem testu.

### Špatně: předpokládá prázdnou databázi

```ts
// ŠPATNĚ: spadne, jakmile si někdo vedle klikne do aplikace
expect(mine).toHaveLength(1);

// SPRÁVNĚ: ptej se jen na svoje
expect(mine.map((o) => o.id)).toContain(order.id);
```

### Špatně: očekávaná hodnota se počítá stejně jako v kódu

```ts
// ŠPATNĚ: projde vždycky, i když je vzorec špatně
const expected = items.reduce((sum, i) => sum + i.price, 0);
expect(totalFor(items)).toBe(expected);

// SPRÁVNĚ: konkrétní číslo spočítané ručně
expect(totalFor([{ price: 250 }, { price: 100 }])).toBe(350);
```

## Test v prohlížeči

Jedna hlavní cesta, projitá tak, jak by ji prošel člověk.

```ts
// e2e/create-order.spec.ts
import { expect, test } from "@playwright/test";

test.use({ storageState: "e2e/.auth/customer.json" });

test("customer creates an order and sees it in the list", async ({ page }) => {
  await page.goto("/orders/new");

  await page.getByLabel("Název položky").fill("Test kytka");
  await page.getByLabel("Cena").fill("250");
  await page.getByRole("button", { name: "Vytvořit objednávku" }).click();

  await expect(page.getByRole("heading", { name: "Objednávka vytvořena" })).toBeVisible();
  await expect(page.getByRole("listitem").filter({ hasText: "Test kytka" })).toBeVisible();
});
```

Přihlášení je připravené dopředu a znovu použité, hledá se podle role a popisku, a čeká se na stav.

### Špatně

```ts
// ŠPATNĚ: čeká na čas, ne na stav. Hlavní příčina testů, co jednou projdou a podruhé ne.
await page.waitForTimeout(2000);

// ŠPATNĚ: selektor podle vzhledu. Rozbije se při první změně stylu.
await page.click("div.card > button.btn-primary");

// ŠPATNĚ: přihlašování formulářem v každém testu. Pomalé a křehké.
await page.getByLabel("E-mail").fill("test@example.com");
```

Když prvek nejde najít podle role ani podle popisku, **přidej mu v kódu stabilní testovací značku** a hledej podle ní. Nikdy nesahej po třídách.
