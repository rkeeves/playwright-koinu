import { Page, expect } from '@playwright/test';
import { $ } from '../../lib/pw';

export const $loginContainer = $.getByTestId('login-container');

export const $username = $.getByTestId('username');

export const $password = $.getByTestId('password');

export const $loginButton = $.getByTestId('login-button');

export const $error = $.getByTestId('error');

export const $errorButton = $.getByTestId('error-button');

export const tryGoto = async (p: Page) => await p.goto('/');

export const expectToBeOn = async (p: Page) => await expect($loginContainer(p)).toBeVisible();

export const goto = async (p: Page) => {
  await tryGoto(p);
  await expectToBeOn(p);
};
