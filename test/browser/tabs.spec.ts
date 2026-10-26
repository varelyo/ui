import { expect, test, type Page } from '@playwright/test';
import { css, rem } from './helpers';

const tab = (page: Page, name: string) => page.getByRole('tab', { name, exact: true });

test('the colour of tabs never reaches the DOM', async ({ page }) => {
  await page.goto('/?story=tabs-color');
  for (const color of ['neutral', 'primary', 'secondary']) {
    await expect(page.getByTestId(`tabs-${color}`)).not.toHaveAttribute('color');
    await expect(
      page.getByTestId(`tabs-${color}`).getByRole('tab', { name: 'General', exact: true }),
    ).not.toHaveAttribute('color');
  }
});

test('tabs link to their panels and activate manually with Enter or Space', async ({ page }) => {
  await page.goto('/?story=tabs');
  const list = page.getByRole('tablist', { name: 'Project sections' });
  await expect(list).toHaveAttribute('aria-orientation', 'horizontal');
  const overview = tab(page, 'Overview');
  const panel = page.getByRole('tabpanel', { name: 'Overview' });
  await expect(overview).toHaveAttribute('aria-selected', 'true');
  await expect(overview).toHaveAttribute('aria-controls', (await panel.getAttribute('id'))!);
  await expect(panel).toHaveText('Recent screens and open reviews.');
  await expect(page.getByRole('tabpanel')).toHaveCount(3);
  await page.getByTestId('tabs').locator('xpath=preceding::*[1]').focus();
  await page.keyboard.press('Tab');
  await expect(overview).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(tab(page, 'Activity')).toBeFocused();
  await expect(overview).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('tabs-change')).toHaveText('none');
  await page.keyboard.press('Enter');
  await expect(tab(page, 'Activity')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Activity' })).toHaveText(
    'Everything that changed this week.',
  );
  await expect(page.getByTestId('tabs-change')).toHaveText('click:activity');
  await page.keyboard.press('ArrowRight');
  await expect(tab(page, 'Settings')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(overview).toBeFocused();
  await page.keyboard.press('End');
  await expect(tab(page, 'Settings')).toBeFocused();
  await page.keyboard.press('Home');
  await expect(overview).toBeFocused();
  await page.keyboard.press(' ');
  await expect(overview).toHaveAttribute('aria-selected', 'true');
});

test('the selected tab is the one tab stop, and Tab moves on to the panel', async ({ page }) => {
  await page.goto('/?story=tabs');
  await tab(page, 'Settings').click();
  await expect(tab(page, 'Settings')).toHaveAttribute('tabindex', '0');
  await expect(tab(page, 'Overview')).toHaveAttribute('tabindex', '-1');
  await page.keyboard.press('ArrowLeft');
  await expect(tab(page, 'Activity')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('tabpanel', { name: 'Settings' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(tab(page, 'Settings')).toBeFocused();
});

test('a disabled tab is skipped and cannot be selected', async ({ page }) => {
  await page.goto('/?story=tabs');
  const members = tab(page, 'Members');
  await expect(members).toBeDisabled();
  await members.click({ force: true });
  await expect(members).toHaveAttribute('aria-selected', 'false');
  await tab(page, 'Activity').click();
  await page.keyboard.press('ArrowRight');
  await expect(tab(page, 'Settings')).toBeFocused();
});

test('with selectionFollowsFocus the arrows select as they move', async ({ page }) => {
  await page.goto('/?story=tabs');
  await tab(page, 'Day').click();
  await page.keyboard.press('ArrowRight');
  await expect(tab(page, 'Week')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Week' })).toHaveText('The last seven days.');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(tab(page, 'Month')).toHaveAttribute('aria-selected', 'true');
});

test('vertical tabs move with the up and down arrows and draw the indicator at the side', async ({
  page,
}) => {
  await page.goto('/?story=tabs');
  const list = page.getByRole('tablist', { name: 'Account' });
  await expect(list).toHaveAttribute('aria-orientation', 'vertical');
  await tab(page, 'Profile').click();
  await page.keyboard.press('ArrowRight');
  await expect(tab(page, 'Profile')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(tab(page, 'Security')).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await expect(tab(page, 'Billing')).toBeFocused();
  const indicator = tab(page, 'Profile').locator('[data-slot="indicator"]');
  const [tabBox, indicatorBox] = await Promise.all([
    tab(page, 'Profile').boundingBox(),
    indicator.boundingBox(),
  ]);
  expect(indicatorBox!.width).toBe(2);
  expect(Math.round(indicatorBox!.x + indicatorBox!.width)).toBe(
    Math.round(tabBox!.x + tabBox!.width),
  );
  expect(indicatorBox!.height).toBe(tabBox!.height);
});

test('tab, indicator, list and panel dimensions come from the tabs tokens', async ({ page }) => {
  await page.goto('/?story=tabs');
  const overview = tab(page, 'Overview');
  expect(await css(overview, 'min-height')).toBe(rem(2.25));
  expect(await css(overview, 'padding-left')).toBe(rem(0.75));
  expect(await css(overview, 'column-gap')).toBe(rem(0.25));
  expect(await css(page.getByRole('tablist', { name: 'Project sections' }), 'column-gap')).toBe(
    rem(0.25),
  );
  const indicator = overview.locator('[data-slot="indicator"]');
  await expect
    .poll(async () => (await indicator.boundingBox())!.width)
    .toBe((await overview.boundingBox())!.width);
  expect(await css(indicator, 'border-bottom-width')).toBe('2px');
  expect(await css(indicator, 'border-bottom-color')).toBe(await css(overview, 'color'));
  const idle = tab(page, 'Activity').locator('[data-slot="indicator"]');
  expect((await idle.boundingBox())?.width ?? 0).toBe(0);
  const panel = page.getByRole('tabpanel', { name: 'Overview' });
  expect(await css(panel, 'padding-top')).toBe(rem(1));
  expect(await css(panel, 'padding-left')).toBe(rem(1));
  expect((await tab(page, 'Overview').locator('svg').boundingBox())!.width).toBe(16);
});

test('segmented tabs draw a filled track with a raised selected option, no indicator and no panel inset', async ({
  page,
}) => {
  await page.goto('/?story=tabs-segmented');
  const tabs = page.getByTestId('tabs-segmented');
  const list = tabs.getByRole('tablist', { name: 'View' });
  const board = tabs.getByRole('tab', { name: 'Board', exact: true });
  const calendar = tabs.getByRole('tab', { name: 'Calendar', exact: true });
  expect(await css(list, 'padding-top')).toBe(rem(0.125));
  expect(await css(list, 'padding-left')).toBe(rem(0.125));
  expect(await css(list, 'column-gap')).toBe(rem(0.125));
  expect(await css(list, 'border-top-left-radius')).not.toBe('0px');
  expect(await css(list, 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
  expect(await css(board, 'min-height')).toBe(rem(2));
  expect(await css(board, 'box-shadow')).not.toBe('none');
  expect(await css(calendar, 'box-shadow')).not.toBe(await css(board, 'box-shadow'));
  expect(await css(board, 'background-color')).not.toBe(await css(calendar, 'background-color'));
  const indicator = board.locator('[data-slot="indicator"]');
  expect(await css(indicator, 'border-bottom-color')).toBe('rgba(0, 0, 0, 0)');
  const panel = page.getByTestId('tabs-segmented-panel');
  expect(await css(panel, 'padding-top')).toBe('0px');
  expect(await css(panel, 'padding-left')).toBe('0px');
  expect((await board.locator('svg').boundingBox())!.width).toBe(16);
  const compact = page.getByTestId('tabs-segmented-compact').getByRole('tablist');
  const options = await compact
    .getByRole('tab')
    .evaluateAll((nodes) =>
      nodes.reduce((width, node) => width + node.getBoundingClientRect().width, 0),
    );
  expect((await compact.boundingBox())!.width).toBeLessThan(options + 16);
});

test('segmented tabs keep the tab pattern: arrows move focus, Enter selects, disabled is skipped', async ({
  page,
}) => {
  await page.goto('/?story=tabs-segmented');
  const tabs = page.getByTestId('tabs-segmented');
  const board = tabs.getByRole('tab', { name: 'Board', exact: true });
  await expect(board).toHaveAttribute('aria-selected', 'true');
  await board.focus();
  await page.keyboard.press('ArrowRight');
  const list = tabs.getByRole('tab', { name: 'List', exact: true });
  await expect(list).toBeFocused();
  await expect(list).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(list).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.getByRole('tabpanel')).toHaveText('Every card in one list.');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(board).toBeFocused();
  await tabs.getByRole('tab', { name: 'Archive', exact: true }).click({ force: true });
  await expect(list).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('tabs-segmented')).not.toHaveAttribute('variant');
});

test('standard tabs keep a transparent track, a zero shadow and the panel inset', async ({
  page,
}) => {
  await page.goto('/?story=tabs');
  const list = page.getByRole('tablist', { name: 'Project sections' });
  expect(await css(list, 'background-color')).toBe('rgba(0, 0, 0, 0)');
  expect(await css(list, 'padding-top')).toBe('0px');
  expect(await css(tab(page, 'Overview'), 'box-shadow')).toBe('rgba(0, 0, 0, 0) 0px 0px 0px 0px');
  expect(await css(page.getByRole('tabpanel', { name: 'Overview' }), 'padding-top')).toBe(rem(1));
});
