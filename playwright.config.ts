import { defineConfig, devices } from '@playwright/test';
import { SaucedemoWorkerArgs, DEFAULT_SAUCEDEMO_USERNAME, DEFAULT_SAUCEDEMO_PASSWORD } from './src/fixture';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<{}, SaucedemoWorkerArgs>({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env['CI'],
  /* Retry on CI only */
  retries: process.env['CI'] ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env['CI'] ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    baseURL: process.env['SAUCEDEMO_URL'] ?? 'https://www.saucedemo.com',
    username: process.env['SAUCEDEMO_USERNAME'] ?? DEFAULT_SAUCEDEMO_USERNAME,
    password: process.env['SAUCEDEMO_PASSWORD'] ?? DEFAULT_SAUCEDEMO_PASSWORD,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      testDir: './test',
      use: {
        ...devices['Desktop Chrome'],
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        testIdAttribute: 'data-test',
      },
    },
  ],
});
