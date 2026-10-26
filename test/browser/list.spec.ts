import { expect, test, type Locator } from '@playwright/test';
import raw from '../../src/generated/raw/neutral.light';
import { css, rem } from './helpers';

type Dimension = { value: number; unit: string };
type Typography = { fontSize: Dimension };
const values = raw as unknown as Record<string, unknown>;
const token = (path: string, size = 'md') => values[`component.list.size.${size}.${path}`];
const px = (path: string, size = 'md') => {
  const dimension = token(path, size) as Dimension | undefined;
  if (!dimension) throw new Error(`Missing ${path} at ${size}`);
  return dimension.unit === 'rem' ? dimension.value * 16 : dimension.value;
};
const fontPx = (path: string, size = 'md') => (token(path, size) as Typography).fontSize.value * 16;
const iconPx = (step: string) => (values[`semantic.iconSize.${step}`] as Dimension).value * 16;
const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const box = async (locator: Locator) => (await locator.boundingBox())!;

test('a list is a ul of li rows with native buttons and links, and a row is as high as its size', async ({
  page,
}) => {
  await page.goto('/?story=list');
  for (const size of sizes) {
    const list = page.getByRole('list', { name: `Size ${size}` });
    expect(await list.evaluate((element) => element.tagName)).toBe('UL');
    await expect(list.getByRole('listitem')).toHaveCount(5);
    const inbox = page.getByTestId(`list-${size}-inbox`);
    expect(await inbox.evaluate((element) => element.tagName)).toBe('BUTTON');
    await expect(inbox).toHaveAttribute('type', 'button');
    expect(Math.round((await box(inbox)).height)).toBe(px('item.height', size));
    expect(await css(inbox, 'padding-inline-start')).toBe(
      `${px('gutterStart.paddingStart', size)}px`,
    );
    expect(await css(inbox, 'border-top-left-radius')).toBe(`${px('item.borderRadius', size)}px`);
    expect(await css(inbox.locator('svg'), 'width')).toBe(
      `${iconPx(token('icon.size', size) as string)}px`,
    );
    expect(await css(inbox.locator('span').filter({ hasText: 'Inbox' }), 'font-size')).toBe(
      `${fontPx('primary.font', size)}px`,
    );
    expect(await css(list, 'row-gap')).toBe(`${px('root.gap', size)}px`);
    expect(await css(list, 'padding-top')).toBe(`${px('padding.paddingVertical', size)}px`);
    const help = page.getByTestId(`list-${size}-help`);
    expect(await help.evaluate((element) => element.tagName)).toBe('A');
    await expect(help).toHaveAttribute('href', '#help');
  }
});

test('selected marks the current page, and the colour of the list paints the current item', async ({
  page,
}) => {
  await page.goto('/?story=list');
  await expect(page.getByTestId('list-md-projects')).toHaveAttribute('aria-current', 'page');
  await expect(page.getByTestId('list-md-projects')).toHaveAttribute('data-selected', '');
  await expect(page.getByTestId('list-md-inbox')).not.toHaveAttribute('aria-current');
  const fills = await Promise.all(
    ['neutral', 'primary', 'secondary'].map((color) =>
      css(page.getByTestId(`list-${color}-members`), 'background-color'),
    ),
  );
  const idle = await css(page.getByTestId('list-neutral-overview'), 'background-color');
  for (const fill of fills) expect(fill).not.toBe(idle);
  for (const color of ['neutral', 'primary', 'secondary'])
    await expect(page.getByTestId(`list-color-${color}`)).not.toHaveAttribute('color');
});

test('a button activates by click, Enter and Space; disabled blocks it; a custom element acts as a button', async ({
  page,
}) => {
  await page.goto('/?story=list-item-button');
  const presses = page.getByTestId('list-item-button-presses');
  const rest = page.getByTestId('list-item-button-rest');
  await rest.click();
  await expect(presses).toHaveText('Presses: 1');
  await rest.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(presses).toHaveText('Presses: 3');
  const disabled = page.getByTestId('list-item-button-disabled');
  await expect(disabled).toBeDisabled();
  await disabled.click({ force: true });
  await expect(presses).toHaveText('Presses: 3');
  const custom = page.getByTestId('list-item-button-custom');
  await expect(custom).toHaveAttribute('role', 'button');
  await expect(custom).toHaveAttribute('tabindex', '0');
  await custom.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(presses).toHaveText('Presses: 5');
  const customDisabled = page.getByTestId('list-item-button-custom-disabled');
  await expect(customDisabled).toHaveAttribute('aria-disabled', 'true');
  await expect(customDisabled).toHaveAttribute('tabindex', '-1');
  await customDisabled.click({ force: true });
  await expect(presses).toHaveText('Presses: 5');
  await expect(page.getByTestId('list-item-button-link')).toHaveAttribute('href', '#docs');
});

test('Tab moves through the rows, skips disabled ones and draws the one focus ring', async ({
  page,
}) => {
  await page.goto('/?story=list-item-button');
  await page.getByTestId('list-item-button-presses').click();
  await page.keyboard.press('Tab');
  const rest = page.getByTestId('list-item-button-rest');
  await expect(rest).toBeFocused();
  expect(await css(rest, 'outline-style')).toBe('solid');
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('list-item-button-selected')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('list-item-button-link')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('list-item-button-custom')).toBeFocused();
});

test('autoFocus focuses the button when it mounts', async ({ page }) => {
  await page.goto('/?story=list');
  await expect(page.getByTestId('list-autofocus')).toBeFocused();
});

test('a nested level sits in its parent row, takes the indent token and turns inert when collapsed', async ({
  page,
}) => {
  await page.goto('/?story=list-compositions');
  const toggle = page.getByTestId('list-team-engineering-toggle');
  const nested = page.getByTestId('list-team-engineering');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAttribute('aria-controls', 'list-team-engineering');
  await expect(nested).toHaveAttribute('data-nested', '');
  expect(
    await nested.evaluate((element) =>
      element
        .closest('li')
        ?.contains(document.querySelector('[data-testid="list-team-engineering-toggle"]')),
    ),
  ).toBe(true);
  expect(await css(nested, 'padding-inline-start')).toBe(`${px('indent.paddingStart')}px`);
  expect(
    await nested.evaluate(
      (element) => getComputedStyle(element, '::before').borderInlineStartWidth,
    ),
  ).toBe(`${px('guide.borderWidth')}px`);
  const row = nested.locator('xpath=ancestor::li[1]');
  expect(await css(row, 'flex-direction')).toBe('column');
  const end = row.locator(':scope > [data-list-item-end]');
  const toggleBox = await box(toggle);
  const endBox = await box(end);
  expect(Math.round(endBox.y)).toBe(Math.round(toggleBox.y));
  expect(Math.round(endBox.height)).toBe(Math.round(toggleBox.height));
  const issues = page.getByTestId('list-nested-Issues');
  expect(Math.round((await box(issues)).x - toggleBox.x)).toBe(px('indent.paddingStart'));
  await issues.click();
  await expect(issues).toHaveAttribute('aria-current', 'page');
  await expect(page.getByTestId('list-nested-Projects')).not.toHaveAttribute('aria-current');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nested.locator('xpath=..')).toHaveAttribute('inert', '');
  await expect(page.getByTestId('list-team-design')).toHaveAttribute('data-nested', '');
});

test('the end slot reserves its room, follows the row under the pointer and keeps an action interactive', async ({
  page,
}) => {
  await page.goto('/?story=list-compositions');
  const inbox = page.getByTestId('list-inbox');
  const issues = page.getByTestId('list-my-issues');
  expect(await css(inbox, 'padding-inline-end')).toBe(`${px('reserve.paddingEnd')}px`);
  expect(await css(issues, 'padding-inline-end')).toBe(`${px('gutterEnd.paddingEnd')}px`);
  const end = inbox.locator('xpath=..').locator(':scope > [data-list-item-end]');
  await expect(end).toHaveText('12');
  expect(await css(end, 'padding-inline-end')).toBe(`${px('end.paddingEnd')}px`);
  expect(Math.round((await box(end)).x + (await box(end)).width)).toBe(
    Math.round((await box(inbox)).x + (await box(inbox)).width),
  );
  await page.mouse.move(0, 0);
  const idle = await css(inbox, 'background-color');
  await end.hover();
  await expect.poll(() => css(inbox, 'background-color')).not.toBe(idle);
  const toggle = page.getByTestId('list-switch').getByRole('switch');
  await expect(toggle).toBeChecked();
  await page.getByTestId('list-switch').click();
  await expect(toggle).not.toBeChecked();
  await page.getByTestId('list-action').click();
  await expect(page.getByTestId('list-action')).toBeFocused();
});

test('group labels take their size, colour, inset and sticky tokens', async ({ page }) => {
  await page.goto('/?story=list-compositions');
  const label = page.getByTestId('list-teams-label');
  expect(await label.evaluate((element) => element.tagName)).toBe('LI');
  expect(Math.round((await box(label)).height)).toBe(px('subheader.height'));
  expect(await css(label, 'padding-inline-start')).toBe(`${px('gutterStart.paddingStart')}px`);
  expect(await css(label, 'font-size')).toBe(`${fontPx('subheader.font')}px`);
  const workspace = page.getByRole('list', { name: 'Workspace' });
  await expect(workspace.locator(':scope > li').first()).toHaveText('Workspace');
  const inset = page.getByRole('list', { name: 'Settings' }).locator(':scope > li').first();
  expect(await css(inset, 'padding-inline-start')).toBe(`${px('subheaderInset.paddingStart')}px`);
  const sticky = page.getByTestId('list-sticky');
  expect(await css(sticky, 'position')).toBe('sticky');
  expect(await css(sticky, 'top')).toBe('0px');
  expect(await css(sticky, 'background-color')).not.toBe('rgba(0, 0, 0, 0)');
});

test('static rows, dividers, avatars, two lines and text styles of the kit', async ({ page }) => {
  await page.goto('/?story=list-compositions');
  const settings = page.getByRole('list', { name: 'Settings' });
  const digest = settings.locator(':scope > li').nth(1);
  expect(await css(digest, 'padding-inline-start')).toBe(`${px('gutterStart.paddingStart')}px`);
  expect(await css(digest, 'padding-inline-end')).toBe(`${px('reserve.paddingEnd')}px`);
  expect(await css(digest, 'border-bottom-width')).toBe(`${px('divider.borderWidth')}px`);
  expect(await css(digest, 'border-top-width')).toBe('0px');
  const secondary = digest.getByText('A summary of the week');
  expect(await css(secondary, 'font-size')).toBe(`${fontPx('secondary.font')}px`);
  const mentions = settings.getByText('Mentions', { exact: true }).locator('xpath=..');
  expect(await css(mentions, 'padding-inline-start')).toBe(`${px('textInset.paddingStart')}px`);
  const member = settings.locator(':scope > li').filter({ hasText: 'Mira Holt' });
  expect(await css(member, 'align-items')).toBe('flex-start');
  const avatarSlot = member.locator(':scope > div').first();
  expect(Math.round((await box(avatarSlot)).width)).toBe(px('avatar.minWidth'));
  const flush = settings.locator(':scope > li').filter({ hasText: 'Without gutters' });
  expect(await css(flush, 'padding-inline-start')).toBe('0px');
  expect(await css(flush.getByText('Without gutters'), 'font-size')).toBe(
    `${(values['semantic.typography.body.md'] as Typography).fontSize.value * 16}px`,
  );
  await expect(page.getByTestId('list-flush')).toHaveCSS('padding-top', '0px');
});

test('a row outside a list renders a div, and a size on one button overrides the list size', async ({
  page,
}) => {
  await page.goto('/?story=sidebar-item');
  const selected = page.getByTestId('item-selected');
  expect(await selected.evaluate((element) => element.parentElement?.tagName)).toBe('DIV');
  await page.goto('/?story=list-compositions');
  const larger = page.getByRole('button', { name: /A larger row in a medium list/ });
  expect(Math.round((await box(larger)).height)).toBeGreaterThanOrEqual(px('item.height', 'lg'));
  expect(await css(larger.locator('svg'), 'width')).toBe(
    `${iconPx(token('icon.size', 'lg') as string)}px`,
  );
});

test('a row changes colour over the motion tokens, and a current row keeps its fill and draws the ring under keyboard focus', async ({
  page,
}) => {
  await page.goto('/?story=list-states');
  const row = (state: string) => page.getByTestId(`list-state-md-neutral-${state}`);
  const duration = values['semantic.motionDuration.sm'] as Dimension;
  const seconds = duration.unit === 'ms' ? duration.value / 1000 : duration.value;
  expect(await css(row('rest'), 'transition-duration')).toBe(`${seconds}s`);
  expect(await css(row('rest'), 'transition-property')).toContain('background-color');
  await row('selected-pressed').focus();
  await page.keyboard.press('Tab');
  await expect(row('selected-focus')).toBeFocused();
  expect(await css(row('selected-focus'), 'outline-style')).toBe('solid');
  expect(await css(row('selected-focus'), 'background-color')).toBe(
    await css(row('selected'), 'background-color'),
  );
  await expect(row('selected-focus')).toHaveAttribute('aria-current', 'page');
  await expect(row('disabled')).toBeDisabled();
});

test('a list item draws a bullet or a number before its text and keeps it from assistive technology', async ({
  page,
}) => {
  await page.goto('/?story=list-markers');
  const bullets = page.getByTestId('list-bullets-neutral');
  const first = bullets.getByRole('listitem').first();
  const bullet = first.locator('[data-list-item-marker]');
  await expect(bullet).toHaveAttribute('aria-hidden', 'true');
  await expect(bullet).toHaveAttribute('data-list-item-marker', 'bullet');
  await expect(bullet).toHaveText('•');
  await expect(first).toHaveAccessibleName('');
  await expect(bullets.getByRole('listitem')).toHaveText([
    '•Unlimited projects',
    '•Ten guests per project',
    '•Version history for 90 days',
  ]);
  expect(await css(first, 'column-gap')).toBe(rem(0.25));
  expect(await css(bullet, 'min-width')).toBe(rem(1));
  expect(await css(bullet, 'font-size')).toBe(await css(first, 'font-size'));
  const steps = page.getByTestId('list-numbers-neutral');
  expect(await steps.evaluate((node) => node.tagName)).toBe('OL');
  expect(await css(steps, 'counter-reset')).toBe('vy-list-item 0');
  const step = steps.getByRole('listitem').nth(1);
  expect(await css(step, 'counter-increment')).toBe('vy-list-item 1');
  const number = step.locator('[data-list-item-marker="number"]');
  expect(await number.evaluate((node) => getComputedStyle(node, '::before').content)).toBe(
    'counter(vy-list-item) "."',
  );
  await expect(number).toHaveText('');
  const nested = page.getByTestId('list-markers-nested');
  expect(await css(nested, 'counter-reset')).toBe('vy-list-item 0');
  const plain = page.getByTestId('list-markers-long').locator(':scope > li').last();
  expect(await css(plain, 'counter-increment')).toBe('none');
  expect(await plain.locator(':scope > [data-list-item-marker]').count()).toBe(0);
});

test('markers grow with the list size and the gap comes from the marker tokens', async ({
  page,
}) => {
  await page.goto('/?story=list-markers');
  const widths = await Promise.all(
    ['xs', 'sm', 'md', 'lg'].map((size) =>
      css(
        page.getByTestId(`list-markers-${size}`).locator('[data-list-item-marker]').first(),
        'min-width',
      ),
    ),
  );
  expect(widths).toEqual([rem(1), rem(1), rem(1), rem(1.25)]);
  const gaps = await Promise.all(
    ['xs', 'sm', 'md', 'lg'].map((size) =>
      css(page.getByTestId(`list-markers-${size}`).getByRole('listitem').first(), 'column-gap'),
    ),
  );
  expect(gaps).toEqual([rem(0.25), rem(0.25), rem(0.25), rem(0.5)]);
});
