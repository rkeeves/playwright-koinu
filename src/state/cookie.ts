import { Page } from '@playwright/test';

const COOKIE_NAME_USERNAME = 'session-username';

export const setUsername = async ({ value, baseURL }: { value: string; baseURL: string }, page: Page) =>
  page.context().addCookies([{ name: COOKIE_NAME_USERNAME, value, url: baseURL }]);

export const clearUsername = async (page: Page) => page.context().clearCookies({ name: COOKIE_NAME_USERNAME });

export const getUsername = async (page: Page) =>
  page
    .context()
    .cookies()
    .then(cs => cs.find(c => c.name === COOKIE_NAME_USERNAME)?.value);
