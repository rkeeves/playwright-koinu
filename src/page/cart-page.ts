import { expect, Page } from '@playwright/test';
import { $ } from 'pw';

export const $container = $.getByTestId('cart-contents-container');

export const tryGoto = async (p: Page) => await p.goto('/cart.html');

export const expectToBeOn = async (p: Page) => await expect($container(p)).toBeVisible();

export const goto = async (p: Page) => {
  await tryGoto(p);
  await expectToBeOn(p);
};
