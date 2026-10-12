import { expect, test, type Page } from '@playwright/test';
import { css, rem } from './helpers';

const open = async (page: Page, trigger: string) => {
  await page.getByTestId(trigger).click();
};

test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: 0 });
  await page.goto('/?story=snackbar');
  await page.clock.pauseAt(60_000);
});

test('a snackbar speaks through a polite status region and hides after its dwell token', async ({
  page,
}) => {
  const region = page.getByRole('status').filter({ hasText: 'Project archived' });
  await expect(page.getByTestId('snackbar')).toHaveCount(0);
  await expect(page.getByRole('status')).toHaveCount(4);
  await expect(page.getByRole('alert')).toHaveCount(1);
  await open(page, 'snackbar-open');
  await expect(region).toBeVisible();
  const dwell = await page
    .getByTestId('snackbar')
    .evaluate((element) => getComputedStyle(element).getPropertyValue('--vy-dwell-short').trim());
  expect(dwell).toBe('4000ms');
  await page.clock.runFor(3900);
  await expect(page.getByTestId('snackbar-reason')).toHaveText('none');
  await page.clock.runFor(200);
  await expect(page.getByTestId('snackbar')).toHaveCount(0);
  await expect(page.getByTestId('snackbar-reason')).toHaveText('timeout');
});

test('hover and focus pause the dwell; leaving restarts it in full', async ({ page }) => {
  await open(page, 'snackbar-open');
  const snackbar = page.getByTestId('snackbar');
  const reason = page.getByTestId('snackbar-reason');
  await snackbar.hover();
  await page.clock.runFor(10000);
  await expect(reason).toHaveText('none');
  await page.mouse.move(640, 400);
  await page.clock.runFor(3900);
  await expect(reason).toHaveText('none');
  await page.getByTestId('snackbar-undo').focus();
  await page.clock.runFor(10000);
  await expect(reason).toHaveText('none');
  await page.getByTestId('snackbar-open').focus();
  await page.clock.runFor(4100);
  await expect(snackbar).toHaveCount(0);
  await expect(page.getByTestId('snackbar-reason')).toHaveText('timeout');
});

test('a hidden page pauses the dwell until it is visible again', async ({ page }) => {
  await open(page, 'snackbar-open');
  const visibility = (state: 'hidden' | 'visible') =>
    page.evaluate((value) => {
      Object.defineProperty(document, 'visibilityState', { value, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    }, state);
  await visibility('hidden');
  await page.clock.runFor(10000);
  await expect(page.getByTestId('snackbar-reason')).toHaveText('none');
  await visibility('visible');
  await page.clock.runFor(4100);
  await expect(page.getByTestId('snackbar')).toHaveCount(0);
});

test('closing early never reports a late timeout', async ({ page }) => {
  await open(page, 'snackbar-open');
  await page.getByTestId('snackbar-undo').click();
  await expect(page.getByTestId('snackbar')).toHaveCount(0);
  await expect(page.getByTestId('snackbar-reason')).toHaveText('undo');
  await page.clock.runFor(10000);
  await expect(page.getByTestId('snackbar-reason')).toHaveText('undo');
});

test('Escape closes the newest snackbar first and a click elsewhere closes none', async ({
  page,
}) => {
  await open(page, 'snackbar-top-open');
  await open(page, 'snackbar-right-open');
  await page.mouse.click(640, 500);
  await expect(page.getByTestId('snackbar-top')).toBeVisible();
  await expect(page.getByTestId('snackbar-right')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('snackbar-right')).toHaveCount(0);
  await expect(page.getByTestId('snackbar-top')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('snackbar-top')).toHaveCount(0);
});

const settledBox = async (page: Page, testId: string) => {
  const snackbar = page.getByTestId(testId);
  await expect.poll(() => css(snackbar, 'scale')).toBe('none');
  return (await snackbar.boundingBox())!;
};

test('anchor origins keep the viewport offset token from the edges', async ({ page }) => {
  await open(page, 'snackbar-top-open');
  await open(page, 'snackbar-right-open');
  const top = await settledBox(page, 'snackbar-top');
  expect(top.y).toBe(16);
  expect(Math.round(top.x + top.width / 2)).toBe(640);
  const right = await settledBox(page, 'snackbar-right');
  expect(right.x + right.width).toBe(1280 - 16);
  expect(right.y + right.height).toBe(900 - 16);
  const surface = page.getByTestId('snackbar-right');
  expect(await css(surface, 'min-width')).toBe(rem(20));
  expect(await css(surface, 'padding-left')).toBe(rem(1));
  expect(await css(surface, 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
});

test('an explicit alert role is used as given, and custom children replace the surface', async ({
  page,
}) => {
  await open(page, 'snackbar-alert-open');
  await expect(page.getByRole('alert')).toContainText('Connection lost');
  await open(page, 'snackbar-custom-open');
  const custom = page.getByTestId('snackbar-custom');
  await expect(custom).toContainText('Export finished');
  expect(await css(custom, 'background-color')).toBe('rgba(0, 0, 0, 0)');
  expect(await css(custom, 'padding-left')).toBe('0px');
});

test('on a phone the snackbar spans the width between the offsets', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 700 });
  await open(page, 'snackbar-right-open');
  const box = await settledBox(page, 'snackbar-right');
  expect(box.x).toBe(16);
  expect(box.width).toBe(360 - 32);
});
