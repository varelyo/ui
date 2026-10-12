import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

test('a portal renders at the end of the document inside the scope it opened from', async ({
  page,
}) => {
  await page.goto('/?story=portal');
  const content = page.getByTestId('portal-content');
  await expect(content).toBeVisible();
  const boundary = await content.evaluate((element) => {
    const scope = element.parentElement;
    return {
      insideSource: Boolean(element.closest('[data-testid="portal-source"]')),
      brand: scope?.getAttribute('data-vy-brand'),
      mode: scope?.getAttribute('data-vy-mode'),
      display: scope ? getComputedStyle(scope).display : null,
    };
  });
  expect(boundary).toEqual({
    insideSource: false,
    brand: 'slate',
    mode: 'dark',
    display: 'contents',
  });
  const [source, portalled] = await Promise.all([
    css(page.getByTestId('portal-source'), 'color'),
    css(content, 'color'),
  ]);
  expect(portalled).toBe(source);
  const inline = page.getByTestId('portal-inline');
  expect(await inline.evaluate((element) => element.parentElement?.dataset.testid ?? null)).toBe(
    'portal-inline-parent',
  );
});

test('the popper core positions content under its anchor and draws nothing itself', async ({
  page,
}) => {
  await page.goto('/?story=popper');
  const anchor = page.getByTestId('popper-anchor');
  await expect(page.getByTestId('popper')).toHaveCount(0);
  await anchor.click();
  const popper = page.getByTestId('popper');
  await expect(popper).toBeVisible();
  const [anchorBox, popperBox] = await Promise.all([anchor.boundingBox(), popper.boundingBox()]);
  expect(Math.round(popperBox!.y - (anchorBox!.y + anchorBox!.height))).toBe(8);
  expect(Math.round(popperBox!.x)).toBe(Math.round(anchorBox!.x));
  expect(await css(popper, 'background-color')).toBe('rgba(0, 0, 0, 0)');
  expect(await css(popper, 'z-index')).toBe('20');
  expect(await css(popper, 'padding-top')).toBe('0px');
  await anchor.click();
  await expect(popper).toHaveCount(0);
});

test('the popper stays inside the viewport with the collision padding', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 700 });
  await page.goto('/?story=tooltip');
  const tooltip = page.getByTestId('long-tooltip');
  await expect(tooltip).toBeVisible();
  const box = await tooltip.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(360 - 8);
  expect(await css(tooltip, 'max-width')).toBe(rem(20));
});
