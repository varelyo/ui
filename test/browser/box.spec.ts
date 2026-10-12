import { expect, test } from '@playwright/test';
import { css } from './helpers';

const phone = { width: 480, height: 900 };
const desktop = { width: 1280, height: 900 };

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=box');
});

test('a Box with flexGrow takes the rest of its row, and the text inside it truncates', async ({
  page,
}) => {
  const row = page.getByTestId('member-row');
  const grow = page.getByTestId('grow-row');
  expect(await css(grow, 'flex-grow')).toBe('1');
  expect(await css(grow, 'min-width')).toBe('0px');
  const rowBox = (await row.boundingBox())!;
  const growBox = (await grow.boundingBox())!;
  const actions = (await page.getByTestId('member-actions').boundingBox())!;
  const gap = Number.parseFloat(await css(row, 'column-gap'));
  expect(growBox.x + growBox.width + gap).toBeCloseTo(actions.x, 1);
  expect(actions.x + actions.width).toBeCloseTo(rowBox.x + rowBox.width, 1);
  const email = page.getByTestId('member-email');
  expect(await email.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  expect(await css(email, 'text-overflow')).toBe('ellipsis');
});

test('a Box with flexGrow takes the rest of its column', async ({ page }) => {
  const plans = (await page.getByTestId('plans').boundingBox())!;
  const column = (await page.getByTestId('plan-column').boundingBox())!;
  const action = (await page.getByTestId('plan-action').boundingBox())!;
  const grow = (await page.getByTestId('grow-column').boundingBox())!;
  expect(column.height).toBe(plans.height);
  expect(action.y + action.height).toBeCloseTo(column.y + column.height, 1);
  expect(grow.height).toBeGreaterThan(0);
});

test('flexGrow is responsive: the field grows only from md', async ({ page }) => {
  const grow = page.getByTestId('grow-responsive');
  await page.setViewportSize(phone);
  expect(await css(grow, 'flex-grow')).toBe('0');
  const narrow = (await grow.boundingBox())!.width;
  await page.setViewportSize(desktop);
  expect(await css(grow, 'flex-grow')).toBe('1');
  expect((await grow.boundingBox())!.width).toBeGreaterThan(narrow);
});

test('a Box is a div by default and keeps flexGrow off the DOM', async ({ page }) => {
  const grow = page.getByTestId('grow-row');
  expect(await grow.evaluate((element) => element.tagName)).toBe('DIV');
  expect(await grow.getAttribute('flexgrow')).toBeNull();
});

test('a short page keeps the window height from md, and the sidebar beside it reaches the bottom', async ({
  page,
}) => {
  await page.goto('/?story=box-min-height');
  const content = page.getByTestId('shell-content');
  const nav = page.getByRole('navigation', { name: 'Documents' });
  const settings = page.getByTestId('shell-settings');
  for (const height of [900, 700]) {
    await page.setViewportSize({ width: 1280, height });
    expect(await css(content, 'min-height')).toBe(`${height}px`);
    await expect.poll(async () => Math.round((await content.boundingBox())!.height)).toBe(height);
    const navBox = (await nav.boundingBox())!;
    const contentBox = (await content.boundingBox())!;
    expect(navBox.height).toBeCloseTo(contentBox.height, 0);
    const settingsBox = (await settings.boundingBox())!;
    expect(settingsBox.y + settingsBox.height).toBeGreaterThan(navBox.y + navBox.height - 64);
  }
});

test('below md the minimum height is off and the Box is as tall as its content', async ({
  page,
}) => {
  await page.setViewportSize(phone);
  await page.goto('/?story=box-min-height');
  const content = page.getByTestId('shell-content');
  expect(await css(content, 'min-height')).toBe('auto');
  expect((await content.boundingBox())!.height).toBeLessThan(phone.height / 2);
  expect(await content.getAttribute('minheight')).toBeNull();
});
