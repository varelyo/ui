import { expect, test, type Page } from '@playwright/test';
import { css, rem, settled } from './helpers';

const combobox = (page: Page, name: string) => page.getByRole('combobox', { name, exact: true });
const option = (page: Page, name: string) => page.getByRole('option', { name, exact: true });
const shown = (page: Page, name: string) => combobox(page, name).locator('[data-slot="value"]');

test('the keyboard opens a select on its selected option, skips disabled options and commits', async ({
  page,
}) => {
  await page.goto('/?story=select');
  const role = combobox(page, 'Role');
  await expect(role).toHaveAttribute('aria-expanded', 'false');
  await expect(role).toHaveAttribute('aria-haspopup', 'listbox');
  await expect(shown(page, 'Role')).toHaveText('Editor');
  await role.focus();
  await page.keyboard.press('ArrowDown');
  const listbox = page.getByRole('listbox', { name: 'Role' });
  await expect(listbox).toBeVisible();
  await expect(role).toHaveAttribute('aria-expanded', 'true');
  await expect(role).toHaveAttribute('aria-controls', (await listbox.getAttribute('id'))!);
  await expect(option(page, 'Editor')).toBeFocused();
  await expect(option(page, 'Editor')).toHaveAttribute('aria-selected', 'true');
  await expect(option(page, 'Owner')).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('ArrowUp');
  await expect(option(page, 'Viewer')).toBeFocused();
  await page.keyboard.press('Home');
  await expect(option(page, 'Editor')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(listbox).toHaveCount(0);
  await expect(role).toBeFocused();
  await expect(shown(page, 'Role')).toHaveText('Reviewer');
  await expect(page.getByTestId('select-event')).toHaveText('role=reviewer');
});

test('typeahead moves to a matching option; Escape and Tab close without choosing', async ({
  page,
}) => {
  await page.goto('/?story=select');
  const role = combobox(page, 'Role');
  await role.click();
  await expect(option(page, 'Editor')).toBeFocused();
  await page.keyboard.type('vi');
  await expect(option(page, 'Viewer')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('listbox')).toHaveCount(0);
  await expect(role).toBeFocused();
  await expect(shown(page, 'Role')).toHaveText('Editor');
  await page.keyboard.press('Enter');
  await expect(option(page, 'Editor')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listbox')).toHaveCount(0);
  await page.keyboard.press('Enter');
  await expect(option(page, 'Editor')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('listbox')).toHaveCount(0);
  await expect(page.getByTestId('select-after')).toBeFocused();
  await expect(page.getByTestId('select-event')).toHaveText('none');
});

test('a pointer picks an option from a listbox anchored under the field and as wide', async ({
  page,
}) => {
  await page.goto('/?story=select');
  const role = combobox(page, 'Role');
  await role.click();
  const listbox = page.getByRole('listbox', { name: 'Role' });
  await settled(listbox);
  const [field, popup] = await Promise.all([role.boundingBox(), listbox.boundingBox()]);
  expect(Math.round(popup!.y - (field!.y + field!.height))).toBe(4);
  expect(Math.round(popup!.x)).toBe(Math.round(field!.x));
  expect(popup!.width).toBeGreaterThanOrEqual(field!.width);
  await option(page, 'Owner').click({ force: true });
  await expect(listbox).toBeVisible();
  await option(page, 'Viewer').click();
  await expect(listbox).toHaveCount(0);
  await expect(shown(page, 'Role')).toHaveText('Viewer');
  await expect(page.getByTestId('select-event')).toHaveText('role=viewer');
});

test('multiple selection toggles values, stays open and joins the display', async ({ page }) => {
  await page.goto('/?story=select');
  const channels = combobox(page, 'Channels');
  await channels.click();
  const listbox = page.getByRole('listbox', { name: 'Channels' });
  await expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
  await option(page, 'Text message').click();
  await expect(listbox).toBeVisible();
  await expect(option(page, 'Text message')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('select-channels-value')).toHaveText('email sms');
  await page.keyboard.press('Home');
  await page.keyboard.press(' ');
  await expect(option(page, 'Email')).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByTestId('select-channels-value')).toHaveText('sms');
  await option(page, 'Slack').click();
  await page.keyboard.press('Escape');
  await expect(listbox).toHaveCount(0);
  await expect(shown(page, 'Channels')).toHaveText('Slack, Text message');
});

test('forms: a required select blocks submit, the chosen value is submitted, disabled never opens', async ({
  page,
}) => {
  await page.goto('/?story=select');
  const region = combobox(page, 'Region');
  await expect(region).toHaveAttribute('aria-required', 'true');
  await page.getByTestId('select-submit').click();
  await expect(page.getByTestId('select-submitted')).toHaveText('none');
  expect(
    await page
      .getByTestId('select-form')
      .evaluate((form) => (form as HTMLFormElement).checkValidity()),
  ).toBe(false);
  await region.click();
  await option(page, 'United States').click();
  await page.getByTestId('select-submit').click();
  await expect(page.getByTestId('select-submitted')).toHaveText('us');
  await region.locator('input').evaluate((input) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    setter.call(input, 'eu');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(shown(page, 'Region')).toHaveText('Europe');
  const owner = combobox(page, 'Owner');
  await expect(owner).toHaveAttribute('aria-disabled', 'true');
  await expect(owner).toHaveAttribute('tabindex', '-1');
  await owner.click({ force: true });
  await expect(page.getByRole('listbox')).toHaveCount(0);
});

test('error state and helper text are exposed on the combobox and the label focuses it', async ({
  page,
}) => {
  await page.goto('/?story=select');
  const plan = combobox(page, 'Plan');
  await expect(plan).toHaveAttribute('aria-invalid', 'true');
  await expect(plan).toHaveAccessibleDescription('The team plan has no seats left');
  await page.getByText('Plan', { exact: true }).click();
  await expect(plan).toBeFocused();
  await expect(page.getByRole('listbox')).toHaveCount(0);
});

test('a select is as wide as its widest option and truncates in a narrow viewport', async ({
  page,
}) => {
  await page.goto('/?story=select');
  const region = combobox(page, 'Region');
  const role = combobox(page, 'Role');
  const before = (await role.boundingBox())!.width;
  expect((await region.boundingBox())!.width).toBeGreaterThan(100);
  await role.click();
  await option(page, 'Viewer').click();
  expect((await role.boundingBox())!.width).toBe(before);
  await page.setViewportSize({ width: 360, height: 700 });
  await page.goto('/?story=select-option');
  const timezone = combobox(page, 'Timezone');
  await expect(shown(page, 'Timezone')).toHaveText('Bucharest');
  const box = await timezone.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(360);
  await timezone.click();
  await option(page, 'Honolulu, Hawaii–Aleutian Standard Time without daylight saving').click();
  const label = shown(page, 'Timezone');
  expect(await label.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  expect(await css(label, 'text-overflow')).toBe('ellipsis');
});

test('option size and field size follow the select tokens', async ({ page }) => {
  await page.goto('/?story=select');
  for (const [size, height, icon] of [
    ['xs', 1.5, 12],
    ['sm', 1.75, 16],
    ['md', 2, 16],
    ['lg', 2.25, 16],
  ] as const) {
    const field = combobox(page, `outlined ${size}`);
    expect(await css(field, 'min-height')).toBe(rem(height));
    expect((await field.locator('svg').boundingBox())!.width).toBe(icon);
    await field.click();
    const editor = page.getByRole('listbox').getByRole('option', { name: 'Editor' });
    expect(await css(editor, 'min-height')).toBe(rem(height));
    expect(await css(editor, 'font-size')).toBe(
      await css(shown(page, `outlined ${size}`), 'font-size'),
    );
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox')).toHaveCount(0);
  }
});
