import { test as base } from '@playwright/test';

export type SaucedemoWorkerArgs = { username: string; password: string };

export const DEFAULT_SAUCEDEMO_USERNAME = 'standard_user';

export const DEFAULT_SAUCEDEMO_PASSWORD = 'secret_sauce';

export const saucedemoTest = base.extend<{}, SaucedemoWorkerArgs>({
  username: ['standard_user', { option: true, scope: 'worker' }],
  password: ['secret_sauce', { option: true, scope: 'worker' }],
});
