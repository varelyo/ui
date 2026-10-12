import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

test('a checkbox toggles once from its label or Space and submits its value', async ({ page }) => {
  await page.goto('/?story=checkbox');
  const terms = page.getByRole('checkbox', { name: 'I accept the terms' });
  await expect(terms).not.toBeChecked();
  await page.getByText('I accept the terms').click();
  await expect(terms).toBeChecked();
  await expect(page.getByTestId('checkbox-terms-state')).toHaveText('accepted');
  await terms.focus();
  await page.keyboard.press('Space');
  await expect(terms).not.toBeChecked();
  await page.keyboard.press('Space');
  await expect(terms).toBeChecked();
  await expect(terms).toHaveAttribute('required');
  const data = await page
    .getByTestId('checkbox-form')
    .evaluate((form) => Object.fromEntries(new FormData(form as HTMLFormElement)));
  expect(data).toEqual({ terms: 'accepted' });
});

test('an indeterminate parent reflects its children and sets them all', async ({ page }) => {
  await page.goto('/?story=checkbox');
  const parent = page.getByRole('checkbox', { name: 'All notifications' });
  await expect(parent).toBeChecked({ indeterminate: true });
  await parent.click();
  await expect(page.getByRole('checkbox', { name: 'Email' })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Push' })).toBeChecked();
  await expect(parent).toBeChecked();
  await page.getByRole('checkbox', { name: 'Push' }).click();
  await expect(parent).toBeChecked({ indeterminate: true });
});

test('a disabled checkbox does not change and checked boxes take the intent colour', async ({
  page,
}) => {
  await page.goto('/?story=checkbox');
  const disabled = page.getByRole('checkbox', { name: 'Disabled', exact: true });
  await expect(disabled).toBeDisabled();
  await page.getByText('Disabled', { exact: true }).click({ force: true });
  await expect(disabled).not.toBeChecked();
  const indicator = (name: string) =>
    page.getByRole('checkbox', { name, exact: true }).locator('xpath=following-sibling::span');
  expect(await css(indicator('Size md'), 'background-color')).not.toBe(
    await css(indicator('Size sm'), 'background-color'),
  );
  await page.getByRole('checkbox', { name: 'Size sm' }).focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  expect(await css(indicator('Size sm'), 'outline-style')).toBe('solid');
});

test('a switch is a switch that slides its thumb by exactly one thumb width', async ({ page }) => {
  await page.goto('/?story=switch');
  const control = page.getByRole('switch', { name: 'Size md' });
  const thumb = page.getByTestId('switch-md').locator('[data-slot="thumb"]');
  const before = (await thumb.boundingBox())!;
  expect(before.width).toBe(Number.parseFloat(rem(1)));
  await control.focus();
  await page.keyboard.press('Space');
  await expect(control).toBeChecked();
  await expect.poll(async () => (await thumb.boundingBox())!.x - before.x).toBe(before.width);
  const wifi = page.getByRole('switch', { name: 'Wi-Fi' });
  await expect(wifi).toBeChecked();
  await page.getByText('Wi-Fi').click();
  await expect(wifi).not.toBeChecked();
  await expect(page.getByTestId('switch-wifi-state')).toHaveText('off');
  await expect(page.getByRole('switch', { name: 'Disabled', exact: true })).toBeDisabled();
});

test('tables use header cells, align numbers and select rows', async ({ page }) => {
  await page.goto('/?story=table');
  const table = page.getByTestId('table');
  const headers = table.getByRole('columnheader');
  await expect(headers).toHaveCount(4);
  await expect(headers.first()).toHaveAttribute('scope', 'col');
  expect(await css(headers.last(), 'text-align')).toBe('right');
  const selected = page.getByTestId('row-INV-202');
  await expect(selected).toHaveAttribute('aria-selected', 'true');
  const other = page.getByTestId('row-INV-201');
  const idle = await css(other, 'background-color');
  await other.click();
  await expect(other).toHaveAttribute('aria-selected', 'true');
  await expect(selected).not.toHaveAttribute('aria-selected');
  await page.mouse.move(0, 0);
  await expect.poll(() => css(other, 'background-color')).not.toBe(idle);
  const padding = (size: string) =>
    css(page.getByTestId(`table-${size}`).getByRole('cell').first(), 'padding-top');
  expect([await padding('sm'), await padding('md'), await padding('lg')]).toEqual([
    rem(0.25),
    rem(0.5),
    rem(0.75),
  ]);
});

test('a sticky header stays at the top while the page scrolls past its rows', async ({ page }) => {
  await page.goto('/?story=table');
  const sticky = page.getByTestId('table-sticky');
  const header = sticky.getByRole('columnheader').first();
  await sticky.getByRole('cell', { name: 'ROW-20' }).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 200));
  const box = await header.boundingBox();
  expect(Math.round(box!.y)).toBe(0);
});
