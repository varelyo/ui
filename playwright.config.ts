import { existsSync } from 'node:fs';
import { chromium, defineConfig } from '@playwright/test';

const port = Number(process.env.VARELYO_PLAYGROUND_PORT ?? 5198);
const channel =
  process.env.VARELYO_BROWSER_CHANNEL ??
  (existsSync(chromium.executablePath()) ? undefined : 'chrome');

export default defineConfig({
  testDir: 'test/browser',
  fullyParallel: true,
  forbidOnly: true,
  reporter: [['list']],
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixels: 0, animations: 'disabled', caret: 'hide' } },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...(channel ? { channel } : {}),
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: `pnpm exec vite --config playground/vite.config.ts --port ${port} --strictPort --host 127.0.0.1`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
  projects: [
    { name: 'behavior', testIgnore: /visual\.spec\.ts/ },
    { name: 'visual', testMatch: /visual\.spec\.ts/ },
  ],
});
