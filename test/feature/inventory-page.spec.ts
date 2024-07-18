import { saucedemoTest as test } from 'fixture';
import { useAuthenticatedPage } from 'use';
import { CartBadge, CartPage, InventoryItemPage, InventoryPage } from 'page';
import { Arrays, Strings, Nums, Pairs } from 'base';
import { expect } from '@playwright/test';

test.describe('Inventory page', () => {
  test.use(useAuthenticatedPage);

  test(`shows the item datas from the snapshot`, { tag: ['@smoke'] }, async ({ page }) => {
    await InventoryPage.goto(page);
    const items = await InventoryPage.$item(page).all();
    const xs = [];
    for (const item of items) {
      xs.push(await item.data());
    }
    expect(JSON.stringify(xs, null, 2)).toMatchSnapshot('item-data-list.json');
  });

  test(`goes to cart page`, { tag: ['@smoke'] }, async ({ page }) => {
    await InventoryPage.goto(page);
    await CartBadge.click(page);
    await CartPage.expectToBeOn(page);
  });

  test(`goes to Item page`, { tag: ['@smoke'] }, async ({ page }) => {
    await InventoryPage.goto(page);
    const fst = InventoryPage.$item(page).first();
    const expected = await fst.data();
    await fst.titleLink.click();
    await InventoryItemPage.expectToBeOn(page);
    expect(InventoryItemPage.$name(page)).toHaveText(expected.name);
    expect(InventoryItemPage.$description(page)).toHaveText(expected.description);
    expect(InventoryItemPage.$price(page)).toHaveText(expected.price);
  });

  test('adds some items', { tag: ['@smoke'] }, async ({ page }) => {
    const all = await test.step(`Given the page loads`, async () => {
      await InventoryPage.goto(page);
      return await InventoryPage.$item(page).all().then(Arrays.withIndex);
    });
    const [addeds, initials] = Arrays.halves(all);
    await test.step(`And only (${initials.map(Pairs.fst)}) are in the cart`, async () => {
      for (const [_, x] of initials) {
        await x.add.click();
      }
      await page.reload();
      await CartBadge.expectItemCount(initials.length, page);
    });
    await test.step(`When some are added (${addeds.map(Pairs.fst)})`, async () => {
      for (const [_, x] of addeds) {
        await x.add.click();
      }
    });
    await test.step(`Then there will be ${all.length} items in the cart`, async () => {
      await CartBadge.expectItemCount(all.length, page);
    });
  });

  test('removes some items', { tag: ['@smoke'] }, async ({ page }) => {
    const all = await test.step(`Given the page loads`, async () => {
      await InventoryPage.goto(page);
      return await InventoryPage.$item(page).all().then(Arrays.withIndex);
    });
    const [removeds, remaining] = Arrays.halves(all);
    await test.step(`And all (${all.map(Pairs.fst)}) are in the cart`, async () => {
      for (const [_, x] of all) {
        await x.add.click();
      }
      await page.reload();
      await CartBadge.expectItemCount(all.length, page);
    });
    await test.step(`When some are removed (${removeds.map(Pairs.fst)})`, async () => {
      for (const [_, x] of removeds) {
        await x.remove.click();
      }
    });
    await test.step(`Then there will be ${remaining.length} items in the cart`, async () => {
      await CartBadge.expectItemCount(remaining.length, page);
    });
  });

  test.describe('sorts items', () => {
    test('by name A to Z', async ({ page }) => {
      await InventoryPage.goto(page);
      await InventoryPage.sortBy('Name (A to Z)', page);
      const names = InventoryPage.$name(page);
      const texts = await names.allTextContents();
      expect(names).toHaveText(Arrays.sorted(texts, Strings.ascending));
    });

    test('by name Z to A', async ({ page }) => {
      await InventoryPage.goto(page);
      await InventoryPage.sortBy('Name (Z to A)', page);
      const names = InventoryPage.$name(page);
      const texts = await names.allTextContents();
      expect(names).toHaveText(Arrays.sorted(texts, Strings.descending));
    });

    test('by price lowest to highest', async ({ page }) => {
      await InventoryPage.goto(page);
      await InventoryPage.sortBy('Price (low to high)', page);
      const prices = InventoryPage.$price(page);
      const texts = await prices.allTextContents().then(xs => xs.map(s => parseFloat(s.replace('$', ''))));
      expect(prices).toHaveText(Arrays.sorted(texts, Nums.ascending).map(x => `$${x}`));
    });

    test('by price highest to lowest', async ({ page }) => {
      await InventoryPage.goto(page);
      await InventoryPage.sortBy('Price (high to low)', page);
      const prices = InventoryPage.$price(page);
      const texts = await prices.allTextContents().then(xs => xs.map(s => parseFloat(s.replace('$', ''))));
      expect(prices).toHaveText(Arrays.sorted(texts, Nums.descending).map(x => `$${x}`));
    });
  });
});
