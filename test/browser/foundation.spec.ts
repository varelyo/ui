import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

const phone = { width: 480, height: 900 };
const desktop = { width: 1280, height: 900 };

test('Stack applies [row, column] spacing on phones and a single gap from md', async ({ page }) => {
  await page.setViewportSize(phone);
  await page.goto('/?story=layout');
  const stack = page.getByTestId('stack');
  expect(await css(stack, 'flex-direction')).toBe('column');
  expect(await css(stack, 'row-gap')).toBe(rem(0.25));
  expect(await css(stack, 'column-gap')).toBe('0px');
  await page.setViewportSize(desktop);
  expect(await css(stack, 'flex-direction')).toBe('row');
  expect(await css(stack, 'row-gap')).toBe(rem(0.75));
  expect(await css(stack, 'column-gap')).toBe(rem(0.75));
  await expect(stack.locator('[data-icon="chevron-right"]')).toHaveCount(2);
});

test('padding shorthand sets top-only padding on phones and every side from sm', async ({
  page,
}) => {
  await page.setViewportSize(phone);
  await page.goto('/?story=layout');
  const padded = page.getByTestId('padded');
  expect(await css(padded, 'padding-top')).toBe(rem(0.75));
  for (const side of ['right', 'bottom', 'left'])
    expect(await css(padded, `padding-${side}`)).toBe('0px');
  await page.setViewportSize(desktop);
  for (const side of ['top', 'right', 'bottom', 'left'])
    expect(await css(padded, `padding-${side}`)).toBe(rem(1));
});

test('Grid shows two columns below md and three from md', async ({ page }) => {
  await page.setViewportSize(phone);
  await page.goto('/?story=layout');
  const grid = page.getByTestId('grid');
  const tracks = async () => (await css(grid, 'grid-template-columns')).split(' ').length;
  expect(await tracks()).toBe(2);
  await page.setViewportSize({ width: 900, height: 900 });
  expect(await tracks()).toBe(3);
});

test('display hides and shows elements per breakpoint', async ({ page }) => {
  await page.setViewportSize(phone);
  await page.goto('/?story=layout');
  await expect(page.getByTestId('desktop-only')).toBeHidden();
  await expect(page.getByTestId('phone-only')).toBeVisible();
  await page.setViewportSize(desktop);
  await expect(page.getByTestId('desktop-only')).toBeVisible();
  await expect(page.getByTestId('phone-only')).toBeHidden();
});

test('Container caps its width and keeps gutters from the padding scale', async ({ page }) => {
  await page.setViewportSize(phone);
  await page.goto('/?story=layout');
  const container = page.getByTestId('container');
  expect(await css(container, 'max-width')).toBe(rem(36));
  expect(await css(container, 'padding-left')).toBe(rem(1));
  await page.setViewportSize(desktop);
  expect(await css(container, 'padding-left')).toBe(rem(1.5));
  expect((await container.boundingBox())?.width).toBe(36 * 16);
});

test('Typography switches its composite at md', async ({ page }) => {
  await page.setViewportSize(phone);
  await page.goto('/?story=typography');
  const text = page.getByTestId('responsive-text');
  expect(await css(text, 'font-size')).toBe(rem(0.875));
  await page.setViewportSize(desktop);
  expect(await css(text, 'font-size')).toBe(rem(1.125));
  expect(await css(text, 'font-weight')).toBe('600');
  await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText(/display-lg/);
});

test('Icon is decorative unless it has a title', async ({ page }) => {
  await page.goto('/?story=icons');
  const decorative = page.locator('svg[data-icon="add"]');
  await expect(decorative).toHaveAttribute('aria-hidden', 'true');
  await expect(page.getByRole('img', { name: 'Notifications' })).toBeVisible();
  expect(await page.locator('svg[data-icon]').count()).toBeGreaterThanOrEqual(50);
});
