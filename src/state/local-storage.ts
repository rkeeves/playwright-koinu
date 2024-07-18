import { expect, Page } from '@playwright/test';

const LOCAL_STORAGE_CART_CONTENTS = 'cart-contents';

export const setItems = async (cartItems: ReadonlyArray<number>, page: Page) =>
  await page.evaluate(({ name, value }) => window.localStorage.setItem(name, value), {
    name: LOCAL_STORAGE_CART_CONTENTS,
    value: JSON.stringify(cartItems),
  });

export const clearItems = async (page: Page) =>
  page.evaluate(key => window.localStorage.removeItem(key), LOCAL_STORAGE_CART_CONTENTS);

export const getItems = async (page: Page) =>
  page.evaluate(key => window.localStorage.getItem(key), LOCAL_STORAGE_CART_CONTENTS);

export const expectItems = async (expected: number[], page: Page) =>
  expect(await page.evaluate(key => window.localStorage.getItem(key), LOCAL_STORAGE_CART_CONTENTS)).toEqual(
    JSON.stringify(expected),
  );
