import { saucedemoTest as test } from '../../src/fixture';
import { CartBadge, CartPage, InventoryItemPage, InventoryPage, LoginPage } from '../../src/page';

test.describe('Login page', () => {
  test('Derpy Dan struggles to put together an order', { tag: ['@smoke'] }, async ({ page, username, password }) => {
    const [apple, banana, cherry, date] = [0, 2, 4, 1];
    await test.step('Derpy Dan logs in', async () => {
      await LoginPage.goto(page);
      await LoginPage.$username(page).fill(username);
      await LoginPage.$password(page).fill(password);
      await LoginPage.$loginButton(page).click();
      await InventoryPage.expectToBeOn(page);
    });
    await test.step(`From the inventory, he puts ${apple} and ${banana} into the cart`, async () => {
      await InventoryPage.$item(page).nth(apple).add.click();
      await CartBadge.expectItemCount(1, page);
      await InventoryPage.$item(page).nth(banana).add.click();
      await CartBadge.expectItemCount(2, page);
    });
    await test.step(`Oh no, ${banana} was a mistake, so Dan yanks it from the cart`, async () => {
      await InventoryPage.$item(page).nth(banana).remove.click();
      await CartBadge.expectItemCount(1, page);
    });
    await test.step(`Dan visits the page for ${cherry} and puts it into the cart`, async () => {
      await InventoryPage.$item(page).nth(cherry).titleLink.click();
      await InventoryItemPage.expectToBeOn(page);
      await InventoryItemPage.$add(page).click();
      await CartBadge.expectItemCount(2, page);
    });
    await test.step(`Dan comes back to inventory`, async () => {
      await InventoryItemPage.backToProducts(page).click();
      await InventoryPage.expectToBeOn(page);
    });
    await test.step(`Dan visits the page for ${date} and puts it into the cart`, async () => {
      await InventoryPage.$item(page).nth(date).titleLink.click();
      await InventoryItemPage.expectToBeOn(page);
      await InventoryItemPage.$add(page).click();
      await CartBadge.expectItemCount(3, page);
    });
    await test.step(`Dan comes back to inventory`, async () => {
      await InventoryItemPage.backToProducts(page).click();
      await InventoryPage.expectToBeOn(page);
    });
    await test.step(`Well ${date} was a mistake again, so Dan removes it`, async () => {
      await InventoryPage.$item(page).nth(date).titleLink.click();
      await InventoryItemPage.expectToBeOn(page);
      await InventoryItemPage.$remove(page).click();
      await CartBadge.expectItemCount(2, page);
    });
    await test.step(`Now, Dan is kind of ready so he goes to the cart`, async () => {
      await CartBadge.click(page);
      await CartPage.expectToBeOn(page);
    });
  });
});
