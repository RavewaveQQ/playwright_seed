import { defineConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

if (!process.env.CI) {
  dotenv.config({ path: path.resolve('./src/common/config/envs/.env'), quiet: true });
}

export default defineConfig({
  testDir: './tests',
  expect: { timeout: 30_000, toPass: { timeout: 30_000, intervals: Array(6).fill(5_000) } },
  timeout: 2 * 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.RETRY ? Number(process.env.RETRY) : 3,
  workers: process.env.CI ? 3 : 3,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'playwright-report/doc/report.xml' }],
    ['json', { outputFile: 'playwright-report/doc/results.json' }],
    ['html', { outputFolder: 'playwright-report/html' }],
  ],
  use: {
    launchOptions: {
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    },
    actionTimeout: 15_000,
    navigationTimeout: 60_000,
    ignoreHTTPSErrors: true,
    javaScriptEnabled: true,
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'setup', testDir: './tests/setup', testMatch: '*.login.setup.ts' },
    {
      name: 'api',
      testDir: './tests/api',
      dependencies: ['setup'],
      use: { storageState: 'storage/user.json' },
      grep: process.env.TAGS ? new RegExp(process.env.TAGS) : undefined,
      grepInvert: process.env.EXCLUDE_TAGS ? new RegExp(process.env.EXCLUDE_TAGS) : undefined,
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      grep: process.env.TAGS ? new RegExp(process.env.TAGS) : undefined,
      grepInvert: process.env.EXCLUDE_TAGS ? new RegExp(process.env.EXCLUDE_TAGS) : undefined,
      use: {
        baseURL: 'https://practicesoftwaretesting.com',
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
