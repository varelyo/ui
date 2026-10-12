import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=divider');
});

const borders = (locator: Parameters<typeof css>[0]) =>
  Promise.all(
    ['top', 'right', 'bottom', 'left'].map((side) => css(locator, `border-${side}-width`)),
  );

test('a horizontal divider is a separator drawn by one border line', async ({ page }) => {
  const divider = page.getByTestId('divider-fullWidth');
  await expect(divider).toHaveAttribute('role', 'separator');
  await expect(divider).not.toHaveAttribute('aria-orientation');
  const lines = divider.locator('[data-slot="line"]');
  await expect(lines).toHaveCount(1);
  await expect(lines).toHaveAttribute('aria-hidden', 'true');
  expect(await borders(lines)).toEqual(['1px', '0px', '0px', '0px']);
  const [line, root] = await Promise.all([lines.boundingBox(), divider.boundingBox()]);
  expect(line?.width).toBe(root?.width);
  expect(root?.height).toBe(1);
});

test('inset and middle move the line in from the edges with padding tokens', async ({ page }) => {
  const inset = page.getByTestId('divider-inset');
  expect(await css(inset, 'padding-inline-start')).toBe(rem(3));
  expect(await css(inset, 'padding-inline-end')).toBe('0px');
  const middle = page.getByTestId('divider-middle');
  expect(await css(middle, 'padding-inline-start')).toBe(rem(1));
  expect(await css(middle, 'padding-inline-end')).toBe(rem(1));
  const [root, line] = await Promise.all([
    inset.boundingBox(),
    inset.locator('[data-slot="line"]').boundingBox(),
  ]);
  expect(line!.x - root!.x).toBe(48);
});

test('a label sits between two lines centred on it', async ({ page }) => {
  const divider = page.getByTestId('divider-label');
  const lines = divider.locator('[data-slot="line"]');
  await expect(lines).toHaveCount(2);
  const label = divider.locator('[data-slot="label"]');
  await expect(label).toHaveText('or');
  const [first, text, second] = await Promise.all([
    lines.nth(0).boundingBox(),
    label.boundingBox(),
    lines.nth(1).boundingBox(),
  ]);
  const centre = text!.y + text!.height / 2;
  expect(Math.abs(first!.y - centre)).toBeLessThanOrEqual(1);
  expect(Math.abs(second!.y - centre)).toBeLessThanOrEqual(1);
  expect(first!.x + first!.width).toBeLessThan(text!.x);
  expect(second!.x).toBeGreaterThan(text!.x + text!.width);
});

test('a vertical divider stretches with its flex row and says so', async ({ page }) => {
  const divider = page.getByTestId('divider-vertical');
  await expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  const line = divider.locator('[data-slot="line"]');
  expect(await borders(line)).toEqual(['0px', '0px', '0px', '1px']);
  const [box, row] = await Promise.all([
    divider.boundingBox(),
    divider.locator('xpath=..').boundingBox(),
  ]);
  expect(box?.height).toBe(row?.height);
  expect(box?.width).toBe(1);
});

test('a list divider keeps its element and a decorative one can drop the role', async ({
  page,
}) => {
  const item = page.getByTestId('divider-li');
  expect(await item.evaluate((element) => element.tagName)).toBe('LI');
  await expect(item).toHaveAttribute('role', 'separator');
  await expect(page.getByTestId('divider-decorative')).toHaveAttribute('role', 'presentation');
});

test('a labelled vertical divider keeps a line above and below its label', async ({ page }) => {
  const divider = page.getByTestId('divider-vertical-label');
  const lines = divider.locator('[data-slot="line"]');
  const [above, label, below] = await Promise.all([
    lines.nth(0).boundingBox(),
    divider.locator('[data-slot="label"]').boundingBox(),
    lines.nth(1).boundingBox(),
  ]);
  expect(above!.height).toBeGreaterThan(8);
  expect(below!.height).toBeGreaterThan(8);
  expect(above!.y + above!.height).toBeLessThan(label!.y);
  expect(below!.y).toBeGreaterThan(label!.y + label!.height);
  expect(Math.abs(above!.x - (label!.x + label!.width / 2))).toBeLessThanOrEqual(1);
});
