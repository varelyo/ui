import { expect, test } from '@playwright/test';
import { stories } from '../../playground/stories';
import { css } from './helpers';

const ownProps = [
  'variant',
  'color',
  'size',
  'fullwidth',
  'loading',
  'loadingposition',
  'starticon',
  'endicon',
  'spacing',
  'direction',
  'p',
  'display',
  'columns',
  'offset',
  'container',
  'maxwidth',
  'disablegutters',
  'fixed',
  'nowrap',
  'component',
  'titleaccess',
  'brand',
  'mode',
  'helpertext',
  'label',
  'multiline',
  'minrows',
  'maxrows',
  'inputref',
  'startadornment',
  'endadornment',
  'error',
  'divider',
  'alignitems',
  'justifycontent',
  'orientation',
  'flexitem',
  'elevation',
  'square',
  'flexgrow',
  'minheight',
  'sortdirection',
  'active',
];

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=contracts');
  await page.locator('#contract-scope').waitFor();
});

test('refs reach the documented elements', async ({ page }) => {
  await expect
    .poll(() => page.evaluate(() => window.vyRefs))
    .toEqual({
      button: 'BUTTON',
      link: 'A',
      iconButton: 'BUTTON',
      fieldRoot: 'DIV',
      fieldInput: 'INPUT',
      areaInput: 'TEXTAREA',
      stack: 'SECTION',
      grid: 'DIV',
      container: 'DIV',
      heading: 'H3',
      icon: 'svg',
      progress: 'SPAN',
      scope: 'DIV',
      divider: 'DIV',
      paper: 'ARTICLE',
      box: 'SECTION',
      avatar: 'DIV',
      sortLabel: 'BUTTON',
    });
});

test('native attributes reach the rendered element and component props never leak', async ({
  page,
}) => {
  const button = page.locator('[data-extra="button"]');
  await expect(button).toHaveAttribute('id', 'contract-button');
  await expect(button).toHaveAttribute('title', 'Create');
  await expect(button).toHaveAttribute('name', 'action');
  await expect(button).toHaveAttribute('value', 'create');
  await expect(button).toHaveAttribute('aria-describedby', 'contract-heading');
  await expect(page.locator('[data-extra="link"]')).toHaveAttribute('target', '_self');
  const iconButton = page.locator('[data-extra="icon-button"]');
  await expect(iconButton).toHaveAttribute('id', 'contract-icon-button');
  await expect(iconButton).toHaveAttribute('type', 'button');
  await expect(iconButton).toHaveAttribute('title', 'Remove');
  await expect(iconButton).toHaveAttribute('name', 'remove');
  await expect(iconButton).toHaveAttribute('value', 'row');
  await expect(iconButton).toHaveAttribute('aria-describedby', 'contract-heading');
  await expect(iconButton).toHaveAccessibleName('Remove');
  const field = page.locator('[data-extra="field"]');
  expect(await field.evaluate((element) => element.tagName)).toBe('INPUT');
  await expect(field).toHaveAttribute('name', 'code');
  await expect(field).toHaveAttribute('autocomplete', 'off');
  await expect(field).toHaveAttribute('maxlength', '5');
  const describedBy = (await field.getAttribute('aria-describedby'))?.split(' ') ?? [];
  expect(describedBy).toContain('contract-heading');
  expect(describedBy.some((id) => id.endsWith('-helper'))).toBe(true);
  await expect(page.locator('[data-extra="stack"]')).toHaveAttribute('aria-label', 'Actions');
  await expect(page.locator('[data-extra="box"]')).toHaveAttribute('aria-label', 'Details');
  await expect(page.locator('[data-extra="avatar"]')).toHaveAttribute('title', 'Mira Holt');
  await expect(page.locator('[data-extra="sorted-cell"]')).toHaveAttribute(
    'aria-sort',
    'ascending',
  );
  const sortLabel = page.locator('[data-extra="sort-label"]');
  await expect(sortLabel).toHaveAttribute('title', 'Sort by name');
  await expect(sortLabel).toHaveAttribute('type', 'button');
  await expect(sortLabel).toHaveAttribute('data-active', '');
  await expect(page.locator('[data-extra="body-cell"]')).not.toHaveAttribute('aria-sort');
  const leaked = await page.evaluate(
    (names) =>
      [...document.querySelectorAll('#contract-scope, #contract-scope *')].flatMap((element) =>
        element
          .getAttributeNames()
          .filter((name) => names.includes(name))
          .map((name) => `${element.tagName.toLowerCase()}[${name}]`),
      ),
    ownProps,
  );
  expect(leaked).toEqual([]);
});

test('maxLength limits typing and disableGutters removes only the gutters', async ({ page }) => {
  const field = page.getByLabel('Code');
  await field.pressSequentially('abcdefgh');
  await expect(field).toHaveValue('abcde');
  const container = page.getByTestId('no-gutters');
  expect(await css(container, 'padding-left')).toBe('0px');
  expect(await css(container, 'padding-right')).toBe('0px');
  expect(await css(container, 'max-width')).toBe('576px');
});

for (const story of stories)
  test(`the ${story.id} story renders without console errors or React warnings`, async ({
    page,
  }) => {
    const messages: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error' || message.type() === 'warning') messages.push(message.text());
    });
    page.on('pageerror', (error) => messages.push(error.message));
    await page.goto(`/?story=${story.id}`);
    await page.locator('main').waitFor();
    expect(messages).toEqual([]);
  });

test('loading at the end replaces the end icon with one indicator', async ({ page }) => {
  await page.goto('/?story=button');
  const sending = page.getByRole('button', { name: 'Sending' });
  const end = sending.locator('[data-slot="end-icon"]');
  await expect(end.locator('[role="progressbar"]')).toHaveCount(1);
  await expect(end.locator('svg[data-icon="arrow-right"]')).toHaveCount(0);
  await expect(sending).toHaveAttribute('aria-busy', 'true');
});
