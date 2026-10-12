import { expect, test } from '@playwright/test';
import { fileTransfer } from './helpers';

test('form reset restores uncontrolled controls and preserves controlled props across renders', async ({
  page,
}) => {
  await page.goto('/?story=interaction-regressions');
  const checkbox = page.getByRole('checkbox', { name: 'Reset checkbox', exact: true });
  const control = page.getByRole('switch', { name: 'Reset switch', exact: true });
  const initial = page.getByRole('checkbox', { name: 'Initially checked', exact: true });
  await checkbox.check();
  await control.focus();
  await page.keyboard.press('Space');
  await initial.uncheck();
  await page.getByRole('combobox', { name: 'Reset select', exact: true }).click();
  await page.getByRole('option', { name: 'Beta', exact: true }).click();
  await page.getByRole('combobox', { name: 'Reset multiple', exact: true }).click();
  await page.getByRole('option', { name: 'Beta', exact: true }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Reset form', exact: true }).click();
  await page.getByRole('button', { name: 'Rerender 0', exact: true }).click();
  await expect(checkbox).not.toBeChecked();
  await expect(control).not.toBeChecked();
  await expect(initial).toBeChecked();
  await expect(
    page.getByRole('checkbox', { name: 'Controlled checkbox', exact: true }),
  ).toBeChecked();
  await expect(page.getByRole('switch', { name: 'Controlled switch', exact: true })).toBeChecked();
  const data = await page
    .getByTestId('reset-form')
    .evaluate((form) => Object.fromEntries(new FormData(form as HTMLFormElement)));
  expect(data).toEqual({ initial: 'on', controlled: 'on', select: 'alpha', multiple: 'alpha' });
});

test('canceling a form reset leaves the controls unchanged', async ({ page }) => {
  await page.goto('/?story=interaction-regressions');
  const checkbox = page.getByRole('checkbox', { name: 'Reset checkbox', exact: true });
  await checkbox.check();
  await page.getByRole('combobox', { name: 'Reset select', exact: true }).click();
  await page.getByRole('option', { name: 'Beta', exact: true }).click();
  await page.getByRole('button', { name: 'Toggle reset cancellation' }).click();
  await page.getByRole('button', { name: 'Reset form', exact: true }).click();
  await page.getByRole('button', { name: 'Rerender 0', exact: true }).click();
  await expect(checkbox).toBeChecked();
  await expect(
    page.getByRole('combobox', { name: 'Reset select', exact: true }).locator('input'),
  ).toHaveValue('beta');
});

test('a canceled option click does not change the selection or close the popup', async ({
  page,
}) => {
  await page.goto('/?story=interaction-regressions');
  const select = page.getByRole('combobox', { name: 'Cancelable select' });
  await select.click();
  await page.getByRole('option', { name: 'Beta', exact: true }).click();
  await expect(select.locator('input')).toHaveValue('alpha');
  await expect(page.getByRole('listbox')).toBeVisible();
});

test('disabling an open select closes it and re-enabling preserves its value', async ({ page }) => {
  await page.goto('/?story=interaction-regressions');
  const select = page.getByRole('combobox', { name: 'Dynamic select' });
  await select.click();
  await page.getByTestId('toggle-disabled').evaluate((button) => button.click());
  await expect(select).toHaveAttribute('aria-disabled', 'true');
  await expect(page.getByRole('listbox')).toHaveCount(0);
  await expect(select.locator('input')).toHaveValue('alpha');
  await page.getByTestId('toggle-disabled').click();
  await expect(select).toHaveAttribute('aria-expanded', 'false');
  await select.click();
  await page.getByRole('option', { name: 'Beta', exact: true }).click();
  await expect(select.locator('input')).toHaveValue('beta');
});

test('an external label names both the select trigger and its listbox', async ({ page }) => {
  await page.goto('/?story=interaction-regressions');
  const select = page.getByRole('combobox', { name: 'External select label' });
  await expect(select).toHaveAttribute('aria-labelledby', 'external-select-label');
  await select.click();
  await expect(page.getByRole('listbox', { name: 'External select label' })).toBeVisible();
});

test('an unselected tab list starts at its first enabled tab', async ({ page }) => {
  await page.goto('/?story=interaction-regressions');
  await page.getByTestId('before-tabs').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tab', { name: 'Enabled second' })).toBeFocused();
  await expect(page.getByRole('tab', { name: 'Disabled first' })).toHaveAttribute('tabindex', '-1');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Enabled last' })).toBeFocused();
});

test('RTL tabs reverse horizontal arrows and recover when the selected tab becomes disabled', async ({
  page,
}) => {
  await page.goto('/?story=interaction-regressions');
  await page.getByRole('tab', { name: 'RTL Alpha' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'RTL Gamma' })).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: 'RTL Alpha' })).toBeFocused();
  await page.getByTestId('toggle-disabled').click();
  await expect(page.getByRole('tab', { name: 'RTL Alpha' })).toHaveAttribute('tabindex', '-1');
  await expect(page.getByRole('tab', { name: 'RTL Beta' })).toHaveAttribute('tabindex', '0');
});

test('tabs track independent disabled changes and unmounts of child tabs', async ({ page }) => {
  await page.goto('/?story=interaction-regressions');
  const alpha = page.getByRole('tab', { name: 'Independent Alpha' });
  const beta = page.getByRole('tab', { name: 'Independent Beta' });
  await expect(alpha).toHaveAttribute('tabindex', '0');
  await page.getByRole('button', { name: 'Toggle independent tab' }).click();
  await expect(alpha).toHaveAttribute('tabindex', '-1');
  await expect(beta).toHaveAttribute('tabindex', '0');
  await page.getByRole('button', { name: 'Toggle independent tab' }).click();
  await expect(alpha).toHaveAttribute('tabindex', '0');
  await page.getByRole('button', { name: 'Toggle tab presence' }).click();
  await expect(alpha).toHaveCount(0);
  await expect(beta).toHaveAttribute('tabindex', '0');
  await page.getByRole('button', { name: 'Toggle tab presence' }).click();
  await expect(alpha).toHaveAttribute('tabindex', '0');
  await expect(beta).toHaveAttribute('tabindex', '-1');
});

test('a controlled tooltip can reject a close request and accept the next one', async ({
  page,
}) => {
  await page.goto('/?story=interaction-regressions');
  const tooltip = page.getByRole('tooltip', { name: 'Controlled hint' });
  await expect(tooltip).toBeVisible();
  await page.getByRole('button', { name: 'Controlled tooltip trigger' }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('tooltip-close-count')).toHaveText('1');
  await expect(tooltip).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('tooltip-close-count')).toHaveText('2');
  await expect(tooltip).toHaveCount(0);
});

test('a controlled tooltip can reject an open request and accept the next one', async ({
  page,
}) => {
  await page.goto('/?story=interaction-regressions');
  const trigger = page.getByRole('button', { name: 'Controlled opening trigger' });
  const tooltip = page.getByRole('tooltip', { name: 'Controlled opening hint' });
  await trigger.focus();
  await expect(page.getByTestId('tooltip-open-count')).toHaveText('1');
  await expect(tooltip).toHaveCount(0);
  await page.getByRole('button', { name: 'Controlled tooltip trigger' }).focus();
  await trigger.focus();
  await expect(page.getByTestId('tooltip-open-count')).toHaveText('2');
  await expect(tooltip).toBeVisible();
});

test('a tooltip stays open while crossing the gap and hovering its content, then closes outside', async ({
  page,
}) => {
  await page.goto('/?story=tooltip');
  await page.getByTestId('trigger-top').hover();
  const tooltip = page.getByRole('tooltip', { name: 'Opens top' });
  await expect(tooltip).toBeVisible();
  const box = await tooltip.boundingBox();
  if (!box) throw new Error('Missing tooltip box');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
  await expect(tooltip).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(tooltip).toHaveCount(0);
});

test('autosize follows viewport width changes without edits or ResizeObserver errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/?story=interaction-regressions');
  const textarea = page.getByRole('textbox', { name: 'Resize autosize' });
  await textarea.fill(
    'A long sentence that wraps into more lines as the viewport becomes narrower. '.repeat(3),
  );
  const initial = (await textarea.boundingBox())!.height;
  await page.setViewportSize({ width: 360, height: 800 });
  await expect.poll(async () => (await textarea.boundingBox())!.height).toBeGreaterThan(initial);
  await expect
    .poll(() => textarea.evaluate((node) => getComputedStyle(node).overflowY))
    .toBe('hidden');
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect.poll(async () => (await textarea.boundingBox())!.height).toBe(initial);
  expect(errors).toEqual([]);
});

test('dragging between dropzone children keeps the verdict until leaving the area', async ({
  page,
}) => {
  await page.goto('/?story=dropzone');
  const zone = page.getByTestId('dropzone-notes');
  const transfer = await fileTransfer(page, [{ name: 'test.txt', type: 'text/plain' }]);
  await zone.dispatchEvent('dragenter', { dataTransfer: transfer });
  const child = zone.locator('span').first();
  await child.dispatchEvent('dragenter', { dataTransfer: transfer });
  await zone.dispatchEvent('dragleave', { dataTransfer: transfer });
  await expect(zone).toHaveAttribute('data-drag-accept', '');
  await child.dispatchEvent('dragleave', { dataTransfer: transfer });
  await expect(zone).not.toHaveAttribute('data-drag-accept');
  await transfer.dispose();
});
