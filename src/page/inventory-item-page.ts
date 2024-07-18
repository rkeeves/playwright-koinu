import { Page, expect } from '@playwright/test';
import { $ } from 'pw';

export const backToProducts = $.getByTestId('back-to-products');

export const $inventoryItem = $.getByTestId('inventory-item');

export const $name = $.getByTestId('inventory-item-name');

export const $price = $.getByTestId('inventory-item-price');

export const $description = $.getByTestId('inventory-item-desc');

export const $img = $.getByRole('img');

export const $add = $.getByText('Add to cart');

export const $remove = $.getByText('Remove');

export const tryGoto = async (id: number | string | null, p: Page) =>
  await p.goto(`/inventory-item.html?id=${id === null ? '' : id}`);

export const expectToBeOn = async (p: Page) => {
  await expect($inventoryItem(p)).toBeVisible();
  await expect(p).toHaveURL(new RegExp(`.*/inventory-item.html.*`));
};

export const goto = async (id: number | string | null, p: Page) => {
  await tryGoto(id, p);
  await expectToBeOn(p);
};
