import { expect, test, type Page } from '@playwright/test';
import { css, rem, settled } from './helpers';

const openActions = async (page: Page) => {
  await page.goto('/?story=menu');
  await page.getByTestId('menu-open').click();
  const menu = page.getByRole('menu', { name: 'Actions' });
  await expect(menu).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Rename', exact: true })).toBeFocused();
  return menu;
};

const item = (page: Page, name: string) => page.getByRole('menuitem', { name, exact: true });

test('a menu focuses its first item and moves with arrows, Home and End past disabled items', async ({
  page,
}) => {
  const menu = await openActions(page);
  await expect(menu).toHaveAttribute('id', 'actions-menu');
  await expect(menu).toHaveAttribute('aria-orientation', 'vertical');
  await expect(item(page, 'Rename')).toBeFocused();
  await expect(item(page, 'Rename')).toHaveAttribute('tabindex', '0');
  await expect(item(page, 'Duplicate')).toHaveAttribute('tabindex', '-1');
  await page.keyboard.press('ArrowDown');
  await expect(item(page, 'Duplicate')).toBeFocused();
  await expect(item(page, 'Duplicate')).toHaveAttribute('tabindex', '0');
  await expect(item(page, 'Rename')).toHaveAttribute('tabindex', '-1');
  await page.keyboard.press('ArrowDown');
  await expect(item(page, 'Download')).toBeFocused();
  await page.keyboard.press('End');
  await expect(item(page, 'Delete')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(item(page, 'Rename')).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(item(page, 'Delete')).toBeFocused();
  await page.keyboard.press('Home');
  await expect(item(page, 'Rename')).toBeFocused();
  await page.keyboard.type('dow');
  await expect(item(page, 'Download')).toBeFocused();
});

test('Enter activates the focused item and focus returns to the trigger', async ({ page }) => {
  const menu = await openActions(page);
  await page.keyboard.press('ArrowDown');
  await expect(item(page, 'Duplicate')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveCount(0);
  await expect(page.getByTestId('menu-action')).toHaveText('duplicate');
  await expect(page.getByTestId('menu-open')).toBeFocused();
});

test('a disabled item is announced, skipped and never activated', async ({ page }) => {
  const menu = await openActions(page);
  const share = item(page, 'Share');
  await expect(share).toBeDisabled();
  await share.click({ force: true });
  await expect(menu).toBeVisible();
  await expect(page.getByTestId('menu-action')).toHaveText('none');
});

test('pointing at an item focuses it and a click activates it', async ({ page }) => {
  await openActions(page);
  await item(page, 'Download').hover();
  await expect(item(page, 'Download')).toBeFocused();
  await item(page, 'Delete').click();
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(page.getByTestId('menu-action')).toHaveText('delete');
});

test('Escape, an outside press and Tab close the menu with their reasons', async ({ page }) => {
  const trigger = page.getByTestId('menu-open');
  await openActions(page);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(page.getByTestId('menu-reason')).toHaveText('escapeKeyDown');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(item(page, 'Rename')).toBeFocused();
  await page.mouse.click(1200, 860);
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(page.getByTestId('menu-reason')).toHaveText('backdropClick');
  await trigger.click();
  await expect(item(page, 'Rename')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(page.getByTestId('menu-reason')).toHaveText('tabKeyDown');
  await expect(page.getByTestId('menu-after')).toBeFocused();
});

test('the selected item takes focus when the menu opens', async ({ page }) => {
  await page.goto('/?story=menu');
  await page.getByTestId('sort-open').click();
  const updated = item(page, 'Updated');
  await expect(updated).toBeFocused();
  await expect(updated).toHaveAttribute('data-selected', '');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('sort-open')).toHaveText('Sort by size');
  await page.getByTestId('sort-open').click();
  await expect(item(page, 'Size')).toBeFocused();
  expect(await css(item(page, 'Size'), 'background-color')).not.toBe(
    await css(item(page, 'Name'), 'background-color'),
  );
});

test('menu spacing, item height and separators come from the menu tokens', async ({ page }) => {
  const menu = await openActions(page);
  expect(await css(menu, 'padding-top')).toBe(rem(0.25));
  expect(await css(menu, 'padding-left')).toBe(rem(0.25));
  const rename = item(page, 'Rename');
  await settled(menu);
  expect(await css(rename, 'min-height')).toBe(rem(2));
  expect((await rename.boundingBox())!.height).toBe(32);
  expect(await css(rename, 'padding-left')).toBe(rem(0.5));
  const separator = page.getByTestId('menu-separator');
  await expect(separator).toHaveAttribute('role', 'separator');
  expect(await css(separator, 'padding-top')).toBe(rem(0.25));
  expect(await css(separator, 'padding-bottom')).toBe(rem(0.25));
  const icon = await rename.locator('svg').boundingBox();
  expect(icon!.width).toBe(16);
  expect(icon!.height).toBe(16);
});

test('menu items render links and truncate long labels inside a narrow viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 700 });
  await page.goto('/?story=menu-item');
  const menu = page.getByRole('menu', { name: 'Account' });
  await expect(menu).toBeVisible();
  await expect(item(page, 'Preferences')).toBeFocused();
  const billing = item(page, 'Billing');
  expect(await billing.evaluate((element) => element.tagName)).toBe('A');
  await expect(billing).toHaveAttribute('href', '#billing');
  await page.keyboard.press('ArrowDown');
  await expect(billing).toBeFocused();
  await settled(menu);
  const box = await menu.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(8);
  expect(box!.x + box!.width).toBeLessThanOrEqual(360 - 8);
  const label = page
    .getByRole('menuitem', { name: /^Notifications for every project/ })
    .locator('span')
    .last();
  expect(await label.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  expect(await css(label, 'text-overflow')).toBe('ellipsis');
});
