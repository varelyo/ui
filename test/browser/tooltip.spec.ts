import { expect, test } from '@playwright/test';
import neutralDark from '../../src/generated/raw/neutral.dark';
import neutralLight from '../../src/generated/raw/neutral.light';
import { css, rem, rgb, settled, type DtcgColor } from './helpers';

const themes = { 'neutral.light': neutralLight, 'neutral.dark': neutralDark } as const;
const colour = (theme: keyof typeof themes, id: string) =>
  rgb((themes[theme] as Record<string, unknown>)[id] as DtcgColor);

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=tooltip');
});

test('hover opens a tooltip that describes its trigger and leaving removes it', async ({
  page,
}) => {
  const trigger = page.getByTestId('trigger-top');
  await trigger.hover();
  const tooltip = page.getByRole('tooltip', { name: 'Opens top' });
  await expect(tooltip).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-describedby', (await tooltip.getAttribute('id'))!);
  await expect(trigger).not.toHaveAttribute('title');
  await settled(tooltip);
  const [triggerBox, tooltipBox] = await Promise.all([
    trigger.boundingBox(),
    tooltip.boundingBox(),
  ]);
  expect(Math.round(triggerBox!.y - (tooltipBox!.y + tooltipBox!.height))).toBe(4);
  expect(await css(tooltip, 'z-index')).toBe('60');
  await page.mouse.move(0, 0);
  await expect(page.getByRole('tooltip', { name: 'Opens top' })).toHaveCount(0);
  await expect(trigger).not.toHaveAttribute('aria-describedby');
});

test('keyboard focus opens a tooltip and Escape closes it', async ({ page }) => {
  await page.getByTestId('trigger-right').focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  const tooltip = page.getByRole('tooltip', { name: 'Opens right' });
  await expect(tooltip).toBeVisible();
  await settled(tooltip);
  const [triggerBox, tooltipBox] = await Promise.all([
    page.getByTestId('trigger-right').boundingBox(),
    tooltip.boundingBox(),
  ]);
  expect(Math.round(tooltipBox!.x - (triggerBox!.x + triggerBox!.width))).toBe(4);
  await page.keyboard.press('Escape');
  await expect(tooltip).toHaveCount(0);
});

test('open and close are reported once each', async ({ page }) => {
  await page.getByTestId('trigger-counted').hover();
  await expect(page.getByRole('tooltip', { name: 'Counted' })).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(page.getByRole('tooltip', { name: 'Counted' })).toHaveCount(0);
  await expect(page.getByTestId('tooltip-events')).toHaveText('open close');
});

test('an empty title never opens and a disabled control is reached through its wrapper', async ({
  page,
}) => {
  await page.getByTestId('trigger-empty').hover();
  await page.getByTestId('trigger-disabled').hover();
  await expect(page.getByRole('tooltip', { name: 'You need edit access' })).toBeVisible();
  await expect(page.getByTestId('empty-tooltip')).toHaveCount(0);
});

test('the surface reads its tokens and wraps at the tooltip width', async ({ page }) => {
  const tooltip = page.getByTestId('open-tooltip');
  await expect(tooltip).toBeVisible();
  expect(await css(tooltip, 'padding-left')).toBe(rem(0.5));
  expect(await css(tooltip, 'padding-top')).toBe(rem(0.25));
  const long = page.getByTestId('long-tooltip');
  expect((await long.boundingBox())!.width).toBeLessThanOrEqual(320);
  expect((await long.boundingBox())!.height).toBeGreaterThan((await tooltip.boundingBox())!.height);
});

test('a tooltip opened in a dark scope inverts that scope through its portal', async ({ page }) => {
  const dark = page.getByTestId('dark-tooltip');
  await expect(dark).toBeVisible();
  expect(
    await dark.evaluate((element) => Boolean(element.closest('[data-testid="dark-scope"]'))),
  ).toBe(false);
  expect(await dark.getAttribute('data-vy-mode')).toBe('inverse');
  expect(
    await dark.evaluate((element) =>
      element.parentElement?.closest('[data-vy-mode]')?.getAttribute('data-vy-mode'),
    ),
  ).toBe('dark');
  expect(await css(dark, 'background-color')).toBe(
    colour('neutral.light', 'semantic.surfaceContainerHighest.default'),
  );
  expect(await css(page.getByTestId('open-tooltip'), 'background-color')).toBe(
    colour('neutral.dark', 'semantic.surfaceContainerHighest.default'),
  );
});
