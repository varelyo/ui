import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=button');
});

test('native buttons default to type=button and activate by click, Enter and Space', async ({
  page,
}) => {
  const counter = page.getByTestId('counter');
  await expect(counter).toHaveAttribute('type', 'button');
  await counter.click();
  await expect(counter).toHaveText('Clicked 1');
  await counter.focus();
  await page.keyboard.press('Enter');
  await expect(counter).toHaveText('Clicked 2');
  await page.keyboard.press('Space');
  await expect(counter).toHaveText('Clicked 3');
});

test('keyboard focus shows the shared focus ring', async ({ page }) => {
  const counter = page.getByTestId('counter');
  await counter.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(counter).toBeFocused();
  expect(await css(counter, 'outline-style')).toBe('solid');
  expect(await css(counter, 'outline-width')).toBe(rem(0.125));
});

test('disabled and loading buttons block activation', async ({ page }) => {
  const counter = page.getByTestId('counter');
  const disabled = page.getByTestId('disabled');
  await expect(disabled).toBeDisabled();
  await disabled.click({ force: true });
  const busy = page.getByRole('button', { name: 'Busy' });
  await expect(busy).toHaveAttribute('aria-busy', 'true');
  await expect(busy).toHaveAttribute('aria-disabled', 'true');
  await busy.click({ force: true });
  await busy.focus();
  await page.keyboard.press('Enter');
  await expect(counter).toHaveText('Clicked 0');
});

test('loading keeps the accessible name and shows one progress indicator', async ({ page }) => {
  const saving = page.getByRole('button', { name: 'Saving' });
  await expect(saving).toBeVisible();
  await expect(saving.locator('[role="progressbar"]')).toHaveCount(1);
  const uploading = page.getByRole('button', { name: 'Uploading' });
  await expect(uploading.locator('[role="progressbar"]')).toHaveCount(1);
  await expect(uploading.locator('svg[data-icon="upload"]')).toHaveCount(0);
});

test('href renders a link and a custom element becomes a keyboard button', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Documentation' });
  await expect(link).toHaveAttribute('href', '#docs');
  await link.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#docs$/);
  const custom = page.getByTestId('custom');
  await expect(custom).toHaveAttribute('role', 'button');
  await expect(custom).toHaveAttribute('tabindex', '0');
  await custom.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(page.getByTestId('counter')).toHaveText('Clicked 2');
});

test('size is responsive and colours come from the variant map', async ({ page }) => {
  const responsive = page.getByTestId('responsive-button');
  await page.setViewportSize({ width: 480, height: 900 });
  expect(await css(responsive, 'min-height')).toBe(rem(1.75));
  await page.setViewportSize({ width: 1280, height: 900 });
  expect(await css(responsive, 'min-height')).toBe(rem(2.25));
  const contained = page.getByRole('button', { name: 'primary' }).first();
  const outlined = page.getByRole('button', { name: 'primary' }).nth(1);
  expect(await css(contained, 'background-color')).not.toBe(
    await css(outlined, 'background-color'),
  );
  expect(await css(outlined, 'border-top-style')).toBe('solid');
});
