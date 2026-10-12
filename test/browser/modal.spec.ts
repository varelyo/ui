import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

const visibleShadow = (value: string) =>
  value !== 'none' &&
  value.split(/,(?![^(]*\))/).some((layer) => {
    const alpha = /\/\s*([\d.]+)\)|rgba\([^)]*,\s*([\d.]+)\)/.exec(layer);
    const opacity = alpha ? Number(alpha[1] ?? alpha[2]) : 1;
    const lengths = [...layer.matchAll(/(-?[\d.]+)px/g)].map((match) => Number(match[1]));
    return opacity > 0 && lengths.some((length) => length !== 0);
  });

test('paper elevations cast token shadows; outlined draws a border instead', async ({ page }) => {
  await page.goto('/?story=paper');
  expect(visibleShadow(await css(page.getByTestId('paper-none'), 'box-shadow'))).toBe(false);
  expect(visibleShadow(await css(page.getByTestId('paper-md'), 'box-shadow'))).toBe(true);
  expect(await css(page.getByTestId('paper-md'), 'box-shadow')).not.toBe(
    await css(page.getByTestId('paper-3xl'), 'box-shadow'),
  );
  const outlined = page.getByTestId('paper-outlined');
  expect(visibleShadow(await css(outlined, 'box-shadow'))).toBe(false);
  expect(await css(outlined, 'border-top-width')).toBe('1px');
  expect(await css(outlined, 'border-top-color')).not.toBe('rgba(0, 0, 0, 0)');
  const square = page.getByTestId('paper-square');
  expect(await css(square, 'border-top-left-radius')).toBe('0px');
  expect(await square.evaluate((element) => element.tagName)).toBe('SECTION');
  expect(await css(page.getByTestId('paper-xs'), 'border-top-left-radius')).not.toBe('0px');
});

test('a backdrop covers the viewport, hides from assistive technology and fades away', async ({
  page,
}) => {
  await page.goto('/?story=backdrop');
  await page.getByTestId('backdrop-open').click();
  const backdrop = page.getByTestId('backdrop');
  await expect(backdrop).toBeVisible();
  await expect(backdrop).toHaveAttribute('aria-hidden', 'true');
  const box = await backdrop.boundingBox();
  expect(box).toEqual({ x: 0, y: 0, width: 1280, height: 900 });
  await backdrop.click();
  await expect(backdrop).toHaveCount(0);
});

test('the modal core traps focus, reports Escape and the backdrop and restores focus', async ({
  page,
}) => {
  await page.goto('/?story=modal');
  const trigger = page.getByTestId('modal-open');
  await trigger.click();
  const modal = page.getByRole('dialog', { name: 'Core modal' });
  await expect(modal).toBeVisible();
  await expect(page.getByTestId('modal-first')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('modal-done')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('modal-first')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(modal).toHaveCount(0);
  await expect(page.getByTestId('modal-reason')).toHaveText('escapeKeyDown');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Core modal' })).toBeVisible();
  await page.mouse.click(10, 890);
  await expect(page.getByRole('dialog', { name: 'Core modal' })).toHaveCount(0);
  await expect(page.getByTestId('modal-reason')).toHaveText('backdropClick');
});

test('a kept-mounted modal hides on close, releases the page and restores focus', async ({
  page,
}) => {
  await page.goto('/?story=modal');
  const trigger = page.getByTestId('modal-kept-open');
  const modal = page.getByRole('dialog', { name: 'Kept modal', includeHidden: true });
  await expect(modal).toBeHidden();
  await trigger.click();
  await expect(modal).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(modal).toHaveCount(1);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden');
  await expect(page.getByTestId('modal-open')).not.toHaveAttribute('aria-hidden');
  await trigger.click();
  await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
});

test('a dialog is labelled by its title, locks scrolling and closes with its reasons', async ({
  page,
}) => {
  await page.goto('/?story=dialog');
  await page.getByTestId('dialog-open').click();
  const dialog = page.getByRole('dialog', { name: 'Delete this project?' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-describedby', 'delete-description');
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden');
  const paper = page.getByTestId('dialog');
  expect(await paper.evaluate((element) => element.getAttributeNames())).not.toContain('maxwidth');
  expect(await css(paper, 'max-width')).toBe(rem(36));
  await page.getByTestId('dialog-confirm').click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('dialog-reason')).toHaveText('confirm');
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden');
});

test('Escape closes a tooltip inside a dialog before the dialog itself', async ({ page }) => {
  await page.goto('/?story=dialog');
  await page.getByTestId('dialog-open').focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Delete this project?' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByTestId('dialog-cancel')).toBeFocused();
  const tooltip = page.getByRole('tooltip', { name: 'Keeps the project' });
  await expect(tooltip).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(tooltip).toHaveCount(0);
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page.getByTestId('dialog-reason')).toHaveText('escapeKeyDown');
  await expect(page.getByTestId('dialog-open')).toBeFocused();
});

test('long dialog content scrolls inside the paper, which stays in the viewport', async ({
  page,
}) => {
  await page.goto('/?story=dialog');
  await page.getByTestId('dialog-long-open').click();
  const paper = page.getByTestId('dialog-long');
  await expect(paper).toBeVisible();
  const box = await paper.boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(24);
  expect(box!.y + box!.height).toBeLessThanOrEqual(900 - 24);
  expect(box!.width).toBe(832);
  const content = page.getByTestId('dialog-long-content');
  expect(await content.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(
    true,
  );
  expect(await css(content, 'padding-left')).toBe(rem(1.5));
});

test('a dialog without a title is labelled by aria-label', async ({ page }) => {
  await page.goto('/?story=dialog');
  await page.getByTestId('dialog-label-open').click();
  const dialog = page.getByRole('dialog', { name: 'Rename project' });
  await expect(dialog).toBeVisible();
  await expect(dialog).not.toHaveAttribute('aria-labelledby');
  await expect(page.getByLabel('Project name')).toBeFocused();
});

test('temporary drawers slide from each edge with the token width and close on Escape', async ({
  page,
}) => {
  await page.goto('/?story=drawer');
  const expected = {
    left: (box: { x: number; y: number; width: number; height: number }) =>
      box.x === 0 && box.width === 320 && box.height === 900,
    right: (box: { x: number; y: number; width: number; height: number }) =>
      box.x + box.width === 1280 && box.width === 320,
    top: (box: { x: number; y: number; width: number; height: number }) =>
      box.y === 0 && box.width === 1280,
    bottom: (box: { x: number; y: number; width: number; height: number }) =>
      box.y + box.height === 900 && box.width === 1280,
  };
  for (const [anchor, check] of Object.entries(expected)) {
    await page.getByTestId(`drawer-open-${anchor}`).click();
    const dialog = page.getByRole('dialog', { name: 'Workspace navigation' });
    await expect(dialog).toBeVisible();
    const panel = page.getByTestId('drawer-temporary');
    await expect.poll(async () => check((await panel.boundingBox())!), anchor).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  }
});

test('a persistent drawer leaves and returns in the layout; a permanent one stays', async ({
  page,
}) => {
  await page.goto('/?story=drawer');
  const persistent = page.getByTestId('drawer-persistent');
  await expect(persistent).toBeVisible();
  expect(await css(persistent, 'border-right-width')).toBe('1px');
  expect(await css(persistent, 'border-left-width')).toBe('0px');
  expect(Math.round((await persistent.boundingBox())!.width)).toBe(320);
  await page.getByTestId('drawer-toggle').click();
  await expect(persistent).toHaveCount(0);
  await page.getByTestId('drawer-toggle').click();
  await expect(page.getByTestId('drawer-persistent')).toBeVisible();
  const permanent = page.getByTestId('drawer-permanent');
  await expect(permanent).toBeVisible();
  expect(await css(permanent, 'border-left-width')).toBe('1px');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('dialog parts carry their own tokens outside a dialog', async ({ page }) => {
  await page.goto('/?story=dialog-actions');
  const actions = page.getByTestId('dialog-actions-part');
  expect(await css(actions, 'column-gap')).toBe(rem(0.5));
  expect(await css(actions, 'padding-left')).toBe(rem(1));
  expect(await css(actions, 'justify-content')).toBe('flex-end');
  await page.goto('/?story=dialog-title');
  const title = page.getByTestId('dialog-title-part');
  expect(await css(title, 'padding-left')).toBe(rem(1.5));
  expect(await title.evaluate((element) => element.tagName)).toBe('H2');
});

test('dialog and drawer props stay off the DOM', async ({ page }) => {
  const props = [
    'maxwidth',
    'fullwidth',
    'keepmounted',
    'disableescapekeydown',
    'anchor',
    'variant',
  ];
  const leaked = async () =>
    page.evaluate(
      (names) =>
        [...document.querySelectorAll('[role="dialog"], [role="dialog"] *')].flatMap((element) =>
          element.getAttributeNames().filter((name) => names.includes(name)),
        ),
      props,
    );
  await page.goto('/?story=dialog');
  await page.getByTestId('dialog-long-open').click();
  await page.getByRole('dialog').waitFor();
  expect(await leaked()).toEqual([]);
  await page.goto('/?story=drawer');
  await page.getByTestId('drawer-open-right').click();
  await page.getByRole('dialog').waitFor();
  expect(await leaked()).toEqual([]);
});
