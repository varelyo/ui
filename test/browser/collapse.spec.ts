import { expect, test } from '@playwright/test';
import { rem } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=collapse');
});

test('a collapse opens to its content height and unmounts the content after closing', async ({
  page,
}) => {
  const collapse = page.getByTestId('collapse');
  const toggle = page.getByTestId('collapse-toggle');
  expect((await collapse.boundingBox())!.height).toBe(0);
  await expect(page.getByTestId('collapse-inner')).toHaveCount(0);
  await toggle.click();
  const inner = page.getByTestId('collapse-inner');
  await expect(inner).toBeVisible();
  await expect.poll(async () => (await collapse.boundingBox())!.height).toBeGreaterThan(60);
  await inner.focus();
  await expect(inner).toBeFocused();
  await toggle.click();
  await expect.poll(async () => (await collapse.boundingBox())!.height).toBe(0);
  await expect(page.getByTestId('collapse-inner')).toHaveCount(0);
});

test('a collapsed size keeps a token-sized preview and the content stays reachable', async ({
  page,
}) => {
  const preview = page.getByTestId('collapse-preview');
  expect((await preview.boundingBox())!.height).toBe(Number.parseFloat(rem(3)));
  expect(await preview.locator(':scope > div').getAttribute('inert')).toBeNull();
  await page.getByTestId('collapse-preview-toggle').click();
  await expect
    .poll(async () => (await preview.boundingBox())!.height)
    .toBeGreaterThan(Number.parseFloat(rem(3)));
});

test('a horizontal collapse animates its width and closed content is inert', async ({ page }) => {
  const horizontal = page.getByTestId('collapse-horizontal');
  const open = (await horizontal.boundingBox())!.width;
  expect(open).toBeGreaterThan(40);
  await page.getByTestId('collapse-horizontal-toggle').click();
  await expect.poll(async () => (await horizontal.boundingBox())!.width).toBe(0);
  expect(await horizontal.locator(':scope > div').getAttribute('inert')).toBe('');
});
