import { expect, test } from '@playwright/test';
import { css } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=text-field');
});

test('labels, helper text and errors are wired to the native control', async ({ page }) => {
  const search = page.getByLabel('Search');
  await expect(search).toHaveAttribute('placeholder', 'Search projects');
  const invalid = page.locator('input[aria-invalid="true"]');
  await expect(invalid).toHaveValue('hello@');
  const describedBy = await invalid.getAttribute('aria-describedby');
  expect(describedBy).toBeTruthy();
  await expect(page.locator(`[id="${describedBy}"]`)).toHaveText('Enter a complete address');
  const root = invalid.locator('xpath=ancestor::div[@data-error]');
  await expect(root).toHaveCount(1);
});

test('controlled value 0 is displayed and edits flow through onChange', async ({ page }) => {
  const amount = page.getByLabel('Amount');
  await expect(amount).toHaveValue('0');
  await expect(page.getByTestId('amount-echo')).toHaveText('Value: 0');
  await amount.fill('');
  await expect(page.getByTestId('amount-echo')).toHaveText('Value: ');
  await amount.fill('42');
  await expect(page.getByTestId('amount-echo')).toHaveText('Value: 42');
});

test('uncontrolled fields accept typing; read-only and disabled fields do not', async ({
  page,
}) => {
  const email = page.getByLabel('Email').first();
  await email.fill('team@example.com');
  await expect(email).toHaveValue('team@example.com');
  const readOnly = page.getByLabel('Read only');
  await readOnly.focus();
  await expect(readOnly).toBeFocused();
  await page.keyboard.type('x');
  await expect(readOnly).toHaveValue('REF-2048');
  await expect(page.getByLabel('Disabled')).toBeDisabled();
});

test('clicking the field box focuses the control', async ({ page }) => {
  const search = page.getByLabel('Search');
  const box = search.locator('xpath=ancestor::div[@data-slot="input"]');
  const bounds = await box.boundingBox();
  if (!bounds) throw new Error('Missing field box');
  await page.mouse.click(bounds.x + bounds.width - 4, bounds.y + bounds.height / 2);
  await expect(search).toBeFocused();
  expect(await css(box, 'outline-style')).toBe('solid');
});

test('multiline autosize grows with content and stops at maxRows', async ({ page }) => {
  const field = page.getByLabel('Autosize');
  const initial = (await field.boundingBox())?.height ?? 0;
  await field.fill('one\ntwo\nthree');
  const grown = (await field.boundingBox())?.height ?? 0;
  expect(grown).toBeGreaterThan(initial);
  await field.fill('1\n2\n3\n4\n5\n6\n7\n8\n9');
  const capped = (await field.boundingBox())?.height ?? 0;
  await field.fill('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11');
  expect((await field.boundingBox())?.height).toBe(capped);
  expect(await css(field, 'overflow-y')).toBe('auto');
});
