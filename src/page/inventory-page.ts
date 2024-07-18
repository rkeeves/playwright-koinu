import { Locator, Page, expect } from '@playwright/test';
import { $ } from 'pw';

export const $inventoryList = $.getByTestId('inventory-list');

export const $titleLink = $.locator(`*[data-test$='-title-link']`);

export const $inventoryItem = $.getByTestId('inventory-item');

export const $name = $.getByTestId('inventory-item-name');

export const $price = $.getByTestId('inventory-item-price');

export const $description = $.getByTestId('inventory-item-desc');

export const $img = $.getByRole('img');

export const $add = $.getByText('Add to cart');

export const $remove = $.getByText('Remove');

export const $item = $inventoryItem.as(($: Locator) => ({
  titleLink: $titleLink($),
  name: $name($),
  price: $price($),
  description: $description($),
  img: $img($),
  add: $add($),
  remove: $remove($),
  data: async () => ({
    name: await $name($)
      .textContent()
      .then(s => s ?? ''),
    price: await $price($)
      .textContent()
      .then(s => s ?? ''),
    description: await $description($)
      .textContent()
      .then(s => s ?? ''),
  }),
}));

export const tryGoto = async (p: Page) => await p.goto('/inventory.html');

export const expectToBeOn = async (p: Page) => await expect($inventoryList(p)).toBeVisible();

export const goto = async (p: Page) => {
  await tryGoto(p);
  await expectToBeOn(p);
};

export type SortKind = 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)';

export const sortBy = async (sortKind: SortKind, p: Page) =>
  await p.getByTestId('product-sort-container').selectOption({ label: sortKind });
