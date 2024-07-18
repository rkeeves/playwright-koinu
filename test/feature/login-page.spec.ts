import { saucedemoTest as test } from '../../src/fixture';
import { InventoryPage, LoginPage } from '../../src/page';
import { expect } from '@playwright/test';

test.describe('Login page', () => {
  test('goes to Inventory page', { tag: ['@smoke'] }, async ({ page, username, password }) => {
    await LoginPage.goto(page);
    await LoginPage.$username(page).fill(username);
    await LoginPage.$password(page).fill(password);
    await LoginPage.$loginButton(page).click();
    await InventoryPage.expectToBeOn(page);
  });

  test('password cannot be incorrect', { tag: ['@smoke'] }, async ({ page, username }) => {
    await LoginPage.goto(page);
    await LoginPage.$username(page).fill(username);
    await LoginPage.$password(page).fill('bad_password');
    await LoginPage.$loginButton(page).click();
    await expect(LoginPage.$error(page)).toHaveText(/Username and password do not match any user in this service/);
  });

  test('username cannot be empty', async ({ page, password }) => {
    await LoginPage.goto(page);
    await LoginPage.$password(page).fill(password);
    await LoginPage.$loginButton(page).click();
    await expect(LoginPage.$error(page)).toHaveText(/Username is required/);
  });

  test('password cannot be empty', async ({ page, username }) => {
    await LoginPage.goto(page);
    await LoginPage.$username(page).fill(username);
    await LoginPage.$loginButton(page).click();
    await expect(LoginPage.$error(page)).toHaveText(/Password is required/);
  });

  test('user must exist', async ({ page, password }) => {
    await LoginPage.goto(page);
    await LoginPage.$username(page).fill('unknown_user');
    await LoginPage.$password(page).fill(password);
    await LoginPage.$loginButton(page).click();
    await expect(LoginPage.$error(page)).toHaveText(/Username and password do not match any user in this service/);
  });
});
