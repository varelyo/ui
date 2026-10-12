import { expect, test } from '@playwright/test';
import raw from '../../src/generated/raw/neutral.light';
import { css } from './helpers';

type Dimension = { value: number; unit: string };
const values = raw as unknown as Record<string, unknown>;
const px = (id: string) => {
  const dimension = values[id] as Dimension | undefined;
  if (!dimension) throw new Error(`Missing ${id}`);
  return dimension.unit === 'rem' ? dimension.value * 16 : dimension.value;
};
const sizes = ['sm', 'md', 'lg'] as const;

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=icon-button');
});

test('a native icon button defaults to type=button, is named by aria-label and activates by click, Enter and Space', async ({
  page,
}) => {
  const counter = page.getByRole('button', { name: 'Add one', exact: true });
  const count = page.getByTestId('count');
  await expect(counter).toHaveAttribute('type', 'button');
  await expect(counter).toHaveAccessibleName('Add one');
  await counter.click();
  await expect(count).toHaveText('Activated 1');
  await counter.focus();
  await page.keyboard.press('Enter');
  await expect(count).toHaveText('Activated 2');
  await page.keyboard.press('Space');
  await expect(count).toHaveText('Activated 3');
});

test('aria-labelledby names the button and the icon stays out of the accessibility tree', async ({
  page,
}) => {
  const download = page.getByTestId('labelled-by');
  await expect(download).toHaveAccessibleName('Download report');
  const slot = download.locator('[data-slot="icon"]');
  await expect(slot).toHaveAttribute('aria-hidden', 'true');
  await expect(slot.locator('svg[data-icon="download"]')).toHaveCount(1);
});

test('every size is a centred square as tall as a Button of that size, with the icon size of its step', async ({
  page,
}) => {
  for (const size of sizes) {
    const iconButton = page.getByTestId(`icon-button-${size}`);
    const box = (await iconButton.boundingBox())!;
    expect(box.width).toBe(px(`semantic.controlHeight.${size}`));
    expect(box.height).toBe(px(`semantic.controlHeight.${size}`));
    expect((await page.getByTestId(`button-${size}`).boundingBox())!.height).toBe(box.height);
    const glyph = (await iconButton.locator('svg').boundingBox())!;
    expect(glyph.width).toBe(px(`semantic.iconSize.${size}`));
    expect(glyph.height).toBe(px(`semantic.iconSize.${size}`));
    expect(glyph.x - box.x).toBeCloseTo(box.x + box.width - (glyph.x + glyph.width), 2);
    expect(glyph.y - box.y).toBeCloseTo(box.y + box.height - (glyph.y + glyph.height), 2);
  }
});

test('size is responsive and the icon follows it', async ({ page }) => {
  const responsive = page.getByTestId('responsive');
  await page.setViewportSize({ width: 480, height: 900 });
  expect(await css(responsive, 'width')).toBe(`${px('semantic.controlHeight.sm')}px`);
  expect(await css(responsive.locator('svg'), 'width')).toBe(`${px('semantic.iconSize.sm')}px`);
  await page.setViewportSize({ width: 1280, height: 900 });
  expect(await css(responsive, 'width')).toBe(`${px('semantic.controlHeight.lg')}px`);
  expect(await css(responsive, 'height')).toBe(`${px('semantic.controlHeight.lg')}px`);
  expect(await css(responsive.locator('svg'), 'width')).toBe(`${px('semantic.iconSize.lg')}px`);
});

test('keyboard focus shows the shared focus ring', async ({ page }) => {
  const counter = page.getByTestId('counter');
  await counter.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(counter).toBeFocused();
  expect(await css(counter, 'outline-style')).toBe('solid');
  expect(await css(counter, 'outline-width')).toBe(`${px('semantic.borderWidth.md')}px`);
});

test('disabled and loading icon buttons block activation, and loading keeps the name and the square', async ({
  page,
}) => {
  const count = page.getByTestId('count');
  const disabled = page.getByTestId('disabled');
  await expect(disabled).toBeDisabled();
  await disabled.click({ force: true });
  const busy = page.getByRole('button', { name: 'Busy', exact: true });
  await expect(busy).toHaveAttribute('aria-busy', 'true');
  await expect(busy).toHaveAttribute('aria-disabled', 'true');
  await busy.click({ force: true });
  await busy.focus();
  await expect(busy).toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(count).toHaveText('Activated 0');
  await expect(busy.locator('[role="progressbar"]')).toHaveCount(1);
  await expect(busy.locator('svg[data-icon="add"]')).toHaveCount(0);
  for (const size of sizes) {
    const refreshing = page.getByRole('button', { name: `Refreshing, ${size}`, exact: true });
    const box = (await refreshing.boundingBox())!;
    expect(box.width).toBe(px(`semantic.controlHeight.${size}`));
    expect(box.height).toBe(box.width);
    const progress = (await refreshing.locator('[role="progressbar"]').boundingBox())!;
    expect(progress.width).toBe(px(`semantic.iconSize.${size}`));
  }
});

test('href renders a link and a custom element becomes a keyboard button', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Settings', exact: true });
  await expect(link).toHaveAttribute('href', '#settings');
  await link.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#settings$/);
  const custom = page.getByTestId('custom');
  await expect(custom).toHaveAttribute('role', 'button');
  await expect(custom).toHaveAttribute('tabindex', '0');
  await expect(custom).toHaveAccessibleName('Custom element');
  await custom.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(page.getByTestId('count')).toHaveText('Activated 2');
});

test('as a row menu trigger it reports aria-expanded, names the menu and takes focus back', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'Actions for Ada Lovelace' });
  await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  await expect(menu).toHaveAccessibleName('Actions for Ada Lovelace');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(trigger).toHaveAttribute('aria-controls', 'member-menu');
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole('menuitem', { name: 'Remove from workspace' }).click();
  await expect(page.getByTestId('menu-action')).toHaveText('remove');
});

test('a Tooltip around an icon button shows its hint and the name stays the aria-label', async ({
  page,
}) => {
  const copy = page.getByTestId('copy');
  await copy.hover();
  await expect(page.getByRole('tooltip')).toHaveText('Copy link');
  await expect(copy).toHaveAccessibleName('Copy link');
});

test('contained and outlined icon buttons keep the centred square of their size, and only outlined draws an edge', async ({
  page,
}) => {
  for (const size of sizes) {
    for (const variant of ['outlined', 'contained'] as const) {
      const iconButton = page.getByTestId(`icon-button-${variant}-${size}`);
      const box = (await iconButton.boundingBox())!;
      expect(box.width).toBe(px(`semantic.controlHeight.${size}`));
      expect(box.height).toBe(box.width);
      const glyph = (await iconButton.locator('svg').boundingBox())!;
      expect(glyph.width).toBe(px(`semantic.iconSize.${size}`));
      expect(glyph.x - box.x).toBeCloseTo(box.x + box.width - (glyph.x + glyph.width), 2);
      expect(glyph.y - box.y).toBeCloseTo(box.y + box.height - (glyph.y + glyph.height), 2);
    }
    const outlined = page.getByTestId(`icon-button-outlined-${size}`);
    expect(await css(outlined, 'border-top-width')).toBe(`${px('semantic.borderWidth.sm')}px`);
    expect(await css(outlined, 'border-top-style')).toBe('solid');
    expect(await css(outlined, 'border-top-color')).not.toBe('rgba(0, 0, 0, 0)');
    for (const quiet of [`icon-button-${size}`, `icon-button-contained-${size}`])
      expect(await css(page.getByTestId(quiet), 'border-top-color')).toBe('rgba(0, 0, 0, 0)');
  }
});

test('an icon button without variant and colour is the text neutral icon button', async ({
  page,
}) => {
  const fallback = page.getByTestId('icon-button-md');
  const explicit = page.getByRole('button', { name: 'Settings, text neutral', exact: true });
  for (const property of ['color', 'background-color', 'border-top-color'])
    expect(await css(fallback, property)).toBe(await css(explicit, property));
  expect(await css(fallback, 'color')).not.toBe(
    await css(page.getByRole('button', { name: 'Settings, text primary', exact: true }), 'color'),
  );
});

test('a loading contained or outlined icon button shows one indicator and keeps its name and square', async ({
  page,
}) => {
  for (const name of ['Saving', 'Syncing']) {
    const busy = page.getByRole('button', { name, exact: true });
    await expect(busy).toHaveAttribute('aria-busy', 'true');
    await expect(busy.locator('[role="progressbar"]')).toHaveCount(1);
    await expect(busy.locator('svg[data-icon]')).toHaveCount(0);
    const box = (await busy.boundingBox())!;
    expect(box.width).toBe(px('semantic.controlHeight.md'));
    expect(box.height).toBe(box.width);
  }
});
