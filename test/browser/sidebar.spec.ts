import { expect, test } from '@playwright/test';
import { css, rem } from './helpers';

test('a docked sidebar is a labelled navigation that marks the current page', async ({ page }) => {
  await page.goto('/?story=sidebar');
  const nav = page.getByRole('navigation', { name: 'Workspace' });
  await expect(nav).toBeVisible();
  expect(Math.round((await nav.boundingBox())!.width)).toBe(Number.parseFloat(rem(20)));
  const overview = page.getByTestId('sidebar-item-Overview');
  const projects = page.getByTestId('sidebar-item-Projects');
  await expect(overview).toHaveAttribute('aria-current', 'page');
  await expect(projects).not.toHaveAttribute('aria-current');
  const idle = await css(projects, 'background-color');
  await projects.click();
  await expect(projects).toHaveAttribute('aria-current', 'page');
  await expect(overview).not.toHaveAttribute('aria-current');
  await expect(page.getByTestId('sidebar-current')).toHaveText('Projects');
  await page.mouse.move(0, 0);
  await expect.poll(() => css(overview, 'background-color')).toBe(idle);
  expect(await css(projects, 'background-color')).not.toBe(idle);
});

test('the colour of a sidebar never reaches the DOM, and an item carries none of its own', async ({
  page,
}) => {
  await page.goto('/?story=sidebar-color');
  for (const color of ['neutral', 'primary', 'secondary']) {
    await expect(page.getByRole('navigation', { name: `Workspace, ${color}` })).not.toHaveAttribute(
      'color',
    );
    await expect(page.getByTestId(`sidebar-${color}-Projects`)).not.toHaveAttribute('color');
  }
});

test('disabled items do nothing and link items stay links', async ({ page }) => {
  await page.goto('/?story=sidebar');
  const disabled = page.getByTestId('sidebar-item-disabled');
  await expect(disabled).toBeDisabled();
  await disabled.click({ force: true });
  await expect(page.getByTestId('sidebar-current')).toHaveText('Overview');
  const link = page.getByTestId('sidebar-item-link');
  expect(await link.evaluate((element) => element.tagName)).toBe('A');
  await expect(link).toHaveAttribute('href', '#help');
});

test('collapsing leaves an icon rail whose items keep their names and show tooltips', async ({
  page,
}) => {
  await page.goto('/?story=sidebar');
  await page.getByTestId('sidebar-collapse').click();
  const dock = page.getByRole('navigation', { name: 'Workspace' }).locator('xpath=../..');
  await expect
    .poll(async () => Math.round((await dock.boundingBox())!.width))
    .toBe(Number.parseFloat(rem(3)) + 1);
  const projects = page.getByRole('button', { name: 'Projects' });
  await expect(projects).toBeVisible();
  await projects.hover();
  await expect(page.getByRole('tooltip', { name: 'Projects' })).toBeVisible();
  await page.getByTestId('sidebar-collapse').click();
  await expect
    .poll(async () => Math.round((await dock.boundingBox())!.width))
    .toBe(Number.parseFloat(rem(20)) + 1);
  await page.getByRole('button', { name: 'Members' }).hover();
  await page.waitForTimeout(300);
  await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test('below md the sidebar opens as a drawer with the full navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/?story=sidebar');
  await expect(page.getByRole('navigation', { name: 'Workspace' })).toHaveCount(0);
  await page.getByTestId('sidebar-menu').click();
  const drawer = page.getByRole('dialog', { name: 'Workspace' });
  await expect(drawer).toBeVisible();
  const nav = drawer.getByRole('navigation', { name: 'Workspace' });
  await expect(nav).toBeVisible();
  await nav.getByRole('button', { name: 'Members' }).click();
  await expect(page.getByTestId('sidebar-current')).toHaveText('Members');
  await page.keyboard.press('Escape');
  await expect(drawer).toHaveCount(0);
});

test('sidebar items are list rows 2rem high, 0.5rem from the panel edge, with a count, a group label and a nested level', async ({
  page,
}) => {
  await page.goto('/?story=sidebar');
  const nav = page.getByRole('navigation', { name: 'Workspace' });
  const list = nav.getByRole('list').first();
  expect(await list.evaluate((element) => element.tagName)).toBe('UL');
  const overview = page.getByTestId('sidebar-item-Overview');
  expect(await overview.evaluate((element) => element.parentElement?.tagName)).toBe('LI');
  const navBox = (await nav.boundingBox())!;
  const item = (await overview.boundingBox())!;
  expect(Math.round(item.x - navBox.x)).toBe(Number.parseFloat(rem(0.5)));
  expect(Math.round(item.height)).toBe(Number.parseFloat(rem(2)));
  expect(await css(overview, 'padding-inline-start')).toBe(rem(0.5));
  expect(await css(overview, 'column-gap')).toBe(rem(0.5));
  const icon = (await overview.locator('svg').boundingBox())!;
  expect(Math.round(icon.x - navBox.x)).toBe(Number.parseFloat(rem(1)));
  const members = page.getByTestId('sidebar-item-Members');
  const count = members.locator('xpath=..').locator(':scope > [data-list-item-end]');
  await expect(count).toHaveText('8');
  const label = page.getByTestId('sidebar-group-label');
  expect(Math.round((await label.boundingBox())!.height)).toBe(Number.parseFloat(rem(2)));
  expect(await css(label, 'padding-inline-start')).toBe(rem(0.5));
  const toggle = page.getByTestId('sidebar-team-toggle');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const issues = page.getByTestId('sidebar-item-Issues');
  expect(Math.round((await issues.boundingBox())!.x - (await toggle.boundingBox())!.x)).toBe(
    Number.parseFloat(rem(1.5)),
  );
  await issues.click();
  await expect(issues).toHaveAttribute('aria-current', 'page');
  await expect(page.getByTestId('sidebar-current')).toHaveText('Issues');
  await page.getByTestId('sidebar-collapse').click();
  await expect(count).toHaveCount(0);
  await expect(page.getByTestId('sidebar-group-label')).toHaveCount(0);
});
