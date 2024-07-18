import { saucedemoTest } from 'fixture';
import { Cookie } from 'state';

export const useAuthenticatedPage: Parameters<typeof saucedemoTest.use>[0] = {
  page: async ({ page, baseURL, username }, use) => {
    if (baseURL === undefined) {
      throw new Error(`'baseURL' must be defined`);
    }
    await page.goto('/robots.txt');
    await Cookie.setUsername({ value: username, baseURL }, page);
    await use(page);
  },
};
