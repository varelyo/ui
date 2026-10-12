import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

test('a popover takes focus, reports Escape and returns focus to its anchor', async ({ page }) => {
  await page.goto('/?story=popover');
  const trigger = page.getByTestId('popover-open');
  await trigger.click();
  const popover = page.getByRole('dialog', { name: 'Filter projects' });
  await expect(popover).toBeVisible();
  await expect(popover).not.toHaveAttribute('aria-modal');
  await expect(page.getByLabel('Owner')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(popover).toHaveCount(0);
  await expect(page.getByTestId('popover-reason')).toHaveText('escapeKeyDown');
  await expect(trigger).toBeFocused();
});

test('an outside press and tabbing away close the popover with their reasons', async ({ page }) => {
  await page.goto('/?story=popover');
  const trigger = page.getByTestId('popover-open');
  const popover = page.getByRole('dialog', { name: 'Filter projects' });
  await trigger.click();
  await expect(popover).toBeVisible();
  await page.mouse.click(1200, 860);
  await expect(popover).toHaveCount(0);
  await expect(page.getByTestId('popover-reason')).toHaveText('backdropClick');
  await trigger.click();
  await expect(page.getByLabel('Owner')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('popover-apply')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(popover).toHaveCount(0);
  await expect(page.getByTestId('popover-reason')).toHaveText('tabKeyDown');
  await expect(page.getByTestId('popover-after')).toBeFocused();
});

test('a popover sits under its anchor on an elevated surface and wraps at the reading measure', async ({
  page,
}) => {
  await page.goto('/?story=popover');
  const anchor = page.getByTestId('popover-about-open');
  await anchor.click();
  const paper = page.getByTestId('popover-about');
  await expect(paper).toBeVisible();
  const [anchorBox, paperBox] = await Promise.all([anchor.boundingBox(), paper.boundingBox()]);
  expect(Math.round(paperBox!.y - (anchorBox!.y + anchorBox!.height))).toBe(4);
  expect(Math.round(paperBox!.x)).toBe(Math.round(anchorBox!.x));
  expect(await css(paper, 'max-width')).toBe(rem(42));
  expect(paperBox!.width).toBe(672);
  expect(await css(paper, 'box-shadow')).not.toBe('none');
});

test('a kept-mounted popover hides on close and still returns focus to its anchor', async ({
  page,
}) => {
  await page.goto('/?story=popover');
  const anchor = page.getByTestId('popover-about-open');
  const paper = page.getByRole('dialog', { name: 'About sharing', includeHidden: true });
  await expect(paper).toHaveCount(1);
  await expect(paper).toBeHidden();
  const settings = page.getByTestId('popover-about-settings');
  await anchor.click();
  await expect(paper).toBeVisible();
  await expect(settings).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(paper).toBeHidden();
  await expect(paper).toHaveCount(1);
  await expect(anchor).toBeFocused();
  await anchor.click();
  await expect(paper).toBeVisible();
  await expect(settings).toBeFocused();
});

test('a popover never grows past a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 700 });
  await page.goto('/?story=popover');
  await page.getByTestId('popover-about-open').click();
  const paper = page.getByTestId('popover-about');
  await expect(paper).toBeVisible();
  await expect
    .poll(async () => {
      const box = await paper.boundingBox();
      return box && { left: box.x >= 8, right: box.x + box.width <= 360 - 8 };
    })
    .toEqual({ left: true, right: true });
});
