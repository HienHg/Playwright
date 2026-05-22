import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 
    [
      ["html", { open: "never" }],
      ['junit', { outputFile: 'test-results/test-results.xml' }],
    ],

  use: {
    testIdAttribute: 'data-qa',
    trace: 'on-first-retry',
    baseURL: 'https://unsplash.com/',
    headless: false,
    screenshot: "on",
    browserName: "chromium",
    actionTimeout: 12 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
