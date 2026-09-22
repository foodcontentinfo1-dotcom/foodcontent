import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    // En este entorno se usa el Chromium preinstalado; en tu Mac basta con `npx playwright install chromium`.
    launchOptions: process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {},
  },
  webServer: { command: 'npm run preview -- --port 4173', port: 4173, reuseExistingServer: true },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'movil', use: { ...devices['iPhone 13'], browserName: 'chromium' } },
  ],
});
