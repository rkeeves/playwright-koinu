import { expect, Page } from '@playwright/test';

export const click = async (p: Page) => await p.getByTestId('shopping-cart-link').click();

export const expectItemCount = async (n: number, p: Page) =>
  await expect(p.getByTestId('shopping-cart-badge')).toHaveText(`${n}`);
