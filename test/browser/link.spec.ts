import { expect, test, type Locator } from '@playwright/test';
import { css, rem } from './helpers';

const typography = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'];
const transparent = 'rgba(0, 0, 0, 0)';

const box = async (link: Locator) => ({
  display: await css(link, 'display'),
  padding: await css(link, 'padding'),
  margin: await css(link, 'margin'),
  gap: await css(link, 'gap'),
  radius: await css(link, 'border-radius'),
  background: await css(link, 'background-color'),
  border: await css(link, 'border-top-width'),
});

test('a link takes the text style around it and draws no box', async ({ page }) => {
  await page.goto('/?story=link-compositions');
  for (const [parent, link] of [
    ['link-in-body', 'link-body'],
    ['link-in-title', 'link-title'],
  ] as const)
    for (const property of typography)
      expect(await css(page.getByTestId(link), property)).toBe(
        await css(page.getByTestId(parent), property),
      );
  const helper = page.getByTestId('link-helper');
  const helperText = helper.locator('xpath=..');
  expect(await helperText.evaluate((element) => element.tagName)).toBe('P');
  for (const property of typography)
    expect(await css(helper, property)).toBe(await css(helperText, property));
  const label = page.getByTestId('link-checkbox-terms');
  const labelText = label.locator('xpath=..');
  for (const property of typography)
    expect(await css(label, property)).toBe(await css(labelText, property));
  for (const testId of ['link-body', 'link-helper', 'link-checkbox-terms'])
    expect(await box(page.getByTestId(testId))).toEqual({
      display: 'inline',
      padding: '0px',
      margin: '0px',
      gap: 'normal',
      radius: '0px',
      background: transparent,
      border: '0px',
    });
});

test('a variant applies the kit text style only when it is set', async ({ page }) => {
  await page.goto('/?story=link');
  const plain = page.getByTestId('link-always-neutral');
  const parent = plain.locator('xpath=..');
  expect(await css(plain, 'font-size')).toBe(await css(parent, 'font-size'));
  const title = page.getByTestId('link-variant-title');
  expect(await css(title, 'font-size')).not.toBe(await css(parent, 'font-size'));
  expect(await title.evaluate((element) => element.tagName)).toBe('A');
  const responsive = page.getByTestId('link-variant-responsive');
  await page.setViewportSize({ width: 600, height: 900 });
  const small = await css(responsive, 'font-size');
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect.poll(() => css(responsive, 'font-size')).not.toBe(small);
});

test('underline always, on hover or never, and a thicker line under the pointer', async ({
  page,
}) => {
  await page.goto('/?story=link');
  const always = page.getByTestId('link-always-primary');
  const hover = page.getByTestId('link-hover-primary');
  const none = page.getByTestId('link-none-primary');
  for (const link of [always, hover, none])
    expect(await css(link, 'text-decoration-line')).toBe('underline');
  expect(await css(always, 'text-decoration-color')).toBe(await css(always, 'color'));
  expect(await css(always, 'text-decoration-thickness')).toBe('1px');
  expect(await css(always, 'text-underline-offset')).toBe(rem(0.125));
  expect(await css(hover, 'text-decoration-color')).toBe(transparent);
  expect(await css(none, 'text-decoration-color')).toBe(transparent);
  await always.hover();
  await expect.poll(() => css(always, 'text-decoration-thickness')).toBe('2px');
  await hover.hover();
  await expect.poll(() => css(hover, 'text-decoration-color')).not.toBe(transparent);
  await expect.poll(() => css(hover, 'text-decoration-thickness')).toBe('2px');
  await none.hover();
  await expect.poll(() => css(none, 'text-decoration-color')).toBe(transparent);
  await page.mouse.down();
  await expect.poll(() => css(none, 'text-decoration-color')).not.toBe(transparent);
  await page.mouse.up();
});

test('every state of a link has its own look', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?story=link-states');
  const look = async (link: Locator) =>
    [
      await css(link, 'color'),
      await css(link, 'text-decoration-color'),
      await css(link, 'text-decoration-thickness'),
      await css(link, 'outline-style'),
    ].join(' ');
  for (const underline of ['always', 'hover', 'none'])
    for (const color of ['neutral', 'primary', 'secondary']) {
      const link = page.getByTestId(`link-state-${underline}-${color}-rest`);
      await page.mouse.move(0, 0);
      const rest = await look(link);
      await link.hover();
      await expect.poll(() => look(link)).not.toBe(rest);
      const hovered = await look(link);
      await page.mouse.down();
      await expect.poll(() => look(link)).not.toBe(hovered);
      const pressed = await look(link);
      expect(pressed).not.toBe(rest);
      await page.mouse.up();
      await page.mouse.move(0, 0);
      await link.focus();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();
      await expect.poll(() => css(link, 'outline-style')).toBe('solid');
      const focused = await look(link);
      expect(new Set([rest, hovered, pressed, focused]).size).toBe(4);
      const disabled = await look(page.getByTestId(`link-state-${underline}-${color}-disabled`));
      expect([rest, hovered, pressed, focused]).not.toContain(disabled);
    }
});

test('keyboard focus draws the one focus ring and colours fade over a motion token', async ({
  page,
}) => {
  await page.goto('/?story=link-compositions');
  const link = page.getByTestId('link-body');
  await expect(link).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(link).toBeFocused();
  expect(await css(link, 'outline-style')).toBe('solid');
  expect(await css(link, 'outline-width')).toBe(rem(0.125));
  await expect.poll(() => css(link, 'outline-offset')).toBe(rem(0.125));
  expect(await css(link, 'transition-duration')).not.toBe('0s');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => css(link, 'transition-property')).toBe('none');
});

test('a disabled link cannot be followed, focused or clicked', async ({ page }) => {
  await page.goto('/?story=link');
  const disabled = page.getByTestId('link-always-disabled');
  await expect(disabled).not.toHaveAttribute('href');
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  await expect(disabled).toHaveAttribute('tabindex', '-1');
  await expect(page.getByRole('link', { name: 'disabled' }).first()).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  expect(await css(disabled, 'cursor')).toBe('default');
  await disabled.click({ force: true });
  expect(new URL(page.url()).hash).toBe('');
  await page.goto('/?story=link-compositions');
  const button = page.getByTestId('link-button-disabled');
  await expect(button).toBeDisabled();
  await expect(button).not.toHaveAttribute('aria-disabled');
});

test('a link as a button activates by click and keyboard', async ({ page }) => {
  await page.goto('/?story=link-compositions');
  const button = page.getByTestId('link-button');
  await expect(button).toHaveAttribute('type', 'button');
  await expect(button).toHaveText('Resend code (0)');
  await button.click();
  await expect(button).toHaveText('Resend code (1)');
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveText('Resend code (2)');
  await page.keyboard.press('Space');
  await expect(button).toHaveText('Resend code (3)');
  expect(await css(button, 'background-color')).toBe(transparent);
  expect(await css(button, 'padding')).toBe('0px');
});

test('a link inside a checkbox label follows the link and leaves the box unchecked', async ({
  page,
}) => {
  await page.goto('/?story=link-compositions');
  const box = page.getByRole('checkbox', { name: 'I agree to the terms' });
  await page.getByTestId('link-checkbox-terms').click();
  await expect(page).toHaveURL(/#terms$/);
  await expect(box).not.toBeChecked();
  await page.getByText('I agree to the').click({ position: { x: 4, y: 4 } });
  await expect(box).toBeChecked();
});

test('a link navigates, keeps native attributes and never leaks its own props', async ({
  page,
}) => {
  await page.goto('/?story=link-compositions');
  const external = page.getByTestId('link-external');
  await expect(external).toHaveAttribute('target', '_blank');
  await expect(external).toHaveAttribute('rel', 'noreferrer');
  await expect(external).toHaveAttribute('href', 'https://example.com');
  for (const name of ['underline', 'color', 'variant', 'disabled'])
    await expect(page.getByTestId('link-standalone')).not.toHaveAttribute(name);
  await page.getByTestId('link-standalone').click();
  await expect(page).toHaveURL(/#all$/);
});
