import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

test('breadcrumbs mark the current page and hide separators from assistive technology', async ({
  page,
}) => {
  await page.goto('/?story=breadcrumbs');
  const nav = page.getByTestId('breadcrumbs');
  await expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  const items = nav.locator('ol > li:not([aria-hidden])');
  await expect(items).toHaveCount(3);
  await expect(items.last()).toHaveAttribute('aria-current', 'page');
  await expect(items.first()).not.toHaveAttribute('aria-current');
  await expect(nav.locator('ol > li[aria-hidden="true"]')).toHaveCount(2);
});

test('a collapsed path expands through its named button and moves focus into the path', async ({
  page,
}) => {
  await page.goto('/?story=breadcrumbs');
  const nav = page.getByTestId('breadcrumbs-long');
  const items = nav.locator('ol > li:not([aria-hidden])');
  await expect(items).toHaveCount(4);
  const expand = nav.getByRole('button', { name: 'Show path' });
  await expand.focus();
  await page.keyboard.press('Enter');
  await expect(items).toHaveCount(6);
  await expect(nav.getByRole('button', { name: 'Show path' })).toHaveCount(0);
  await expect(nav.getByRole('link', { name: 'Projects' })).toBeFocused();
});

test('skeleton shapes take their token sizes and animations respect reduced motion', async ({
  page,
}) => {
  await page.goto('/?story=skeleton');
  const text = page.getByTestId('skeleton-text-md');
  await expect(text).toHaveAttribute('aria-hidden', 'true');
  expect((await text.boundingBox())!.height).toBe(Number.parseFloat(rem(0.75)));
  expect((await page.getByTestId('skeleton-rectangular-lg').boundingBox())!.height).toBe(
    Number.parseFloat(rem(2.25)),
  );
  const circle = await page.getByTestId('skeleton-circular-sm').boundingBox();
  expect([circle!.width, circle!.height]).toEqual([28, 28]);
  expect(await css(page.getByTestId('skeleton-pulse'), 'animation-name')).toBe('vy-pulse');
  expect(await css(page.getByTestId('skeleton-wave'), 'animation-name')).toBe('vy-wave');
  const wrapped = page.getByTestId('skeleton-children');
  const button = wrapped.locator('button');
  expect(Math.round((await wrapped.boundingBox())!.width)).toBe(
    Math.round((await button.boundingBox())!.width),
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await css(page.getByTestId('skeleton-pulse'), 'animation-name')).toBe('none');
});

test('a card lays out its header, content and actions with card tokens', async ({ page }) => {
  await page.goto('/?story=card');
  const card = page.getByTestId('card');
  expect(await card.evaluate((element) => element.tagName)).toBe('ARTICLE');
  await expect(page.getByRole('article', { name: 'Design review' })).toBeVisible();
  const header = page.getByTestId('card-header');
  expect(await css(header, 'padding-left')).toBe(rem(1));
  const [avatar, title, action] = await Promise.all([
    header.getByText('MH').boundingBox(),
    header.getByText('Design review').boundingBox(),
    header.getByRole('button', { name: 'More options' }).boundingBox(),
  ]);
  expect(avatar!.x).toBeLessThan(title!.x);
  expect(title!.x).toBeLessThan(action!.x);
  expect(await css(page.getByTestId('card-actions'), 'column-gap')).toBe(rem(0.5));
  expect(await css(page.getByTestId('card-outlined'), 'border-top-width')).toBe('1px');
});

test('avatars show the image, then children, then the person icon', async ({ page }) => {
  await page.goto('/?story=avatar');
  await expect(
    page.getByTestId('avatar-image').getByRole('img', { name: 'Mira Holt' }),
  ).toBeVisible();
  const broken = page.getByTestId('avatar-broken');
  await expect(broken).toHaveText('JR');
  await expect(broken.locator('img')).toHaveCount(0);
  await expect(page.getByTestId('avatar-icon').locator('svg[data-icon="user"]')).toHaveCount(1);
  await expect(page.getByTestId('avatar-empty').locator('svg[data-icon="user"]')).toHaveCount(1);
  const md = await page.getByTestId('avatar-circular-md').boundingBox();
  expect([md!.width, md!.height]).toEqual([32, 32]);
  expect(await css(page.getByTestId('avatar-square-md'), 'border-top-left-radius')).toBe('0px');
});

test('chips keep click and delete as separate buttons and delete once from the keyboard', async ({
  page,
}) => {
  await page.goto('/?story=chip');
  const clickable = page.getByTestId('chip-clickable');
  await clickable.getByRole('button', { name: 'Clickable' }).click();
  await expect(page.getByTestId('chip-clicks')).toHaveText('1');
  await page.getByTestId('chip-tag-Design').getByRole('button', { name: 'Remove Design' }).click();
  await expect(page.getByTestId('chip-tag-Design')).toHaveCount(0);
  await page.getByRole('button', { name: 'Remove Research' }).focus();
  await page.keyboard.press('Backspace');
  await expect(page.getByTestId('chip-tag-Research')).toHaveCount(0);
  await expect(page.getByTestId('chip-tag-Billing')).toHaveCount(1);
  const both = page.getByTestId('chip-both');
  await expect(both.locator('button button')).toHaveCount(0);
  await both.getByRole('button', { name: 'Clickable and deletable', exact: true }).click();
  await expect(page.getByTestId('chip-clicks')).toHaveText('2');
  await both.getByRole('button', { name: 'Remove Clickable and deletable' }).click();
  await expect(page.getByTestId('chip-clicks')).toHaveText('12');
  const disabled = page.getByRole('button', { name: 'disabled' }).first();
  await expect(disabled).toBeDisabled();
});
