import { expect, test, type Locator } from '@playwright/test';
import raw from '../../src/generated/raw/neutral.light';
import { chosenFile, css, interceptFileChooser, rem, rgb, type DtcgColor } from './helpers';

const values = raw as unknown as Record<string, DtcgColor>;
const labelWeight = (raw as unknown as Record<string, { fontWeight: number }>)[
  'semantic.typography.label.md'
].fontWeight;
const role = (id: string) => {
  const color = values[`semantic.${id}`];
  if (!color) throw new Error(`Missing semantic.${id}`);
  return rgb(color);
};
const selectorButton = (input: Locator, property: string) =>
  input.evaluate(
    (element, name) =>
      getComputedStyle(element, '::file-selector-button').getPropertyValue(name).trim(),
    property,
  );
const dimension = (id: string) => {
  const token = (raw as unknown as Record<string, { value: number; unit: string }>)[id];
  if (token?.unit !== 'rem') throw new Error(`Missing rem dimension ${id}`);
  return rem(token.value);
};

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=text-field-file');
  await page.getByTestId('documents').waitFor();
  await interceptFileChooser(page);
});

test('a file field is a labelled native file input with its native attributes', async ({
  page,
}) => {
  const documents = page.getByLabel('Documents');
  await expect(documents).toHaveAttribute('type', 'file');
  await expect(documents).toHaveAttribute('multiple', '');
  await expect(documents).toHaveAttribute('accept', '.pdf,.txt');
  const contract = page.getByLabel('Signed contract');
  await expect(contract).toHaveAttribute('required', '');
  await expect(contract).toHaveAttribute('name', 'contract');
  const invoice = page.getByLabel('Invoice');
  await expect(invoice).toHaveAttribute('aria-invalid', 'true');
  await expect(invoice).toHaveAccessibleDescription('Attach the signed invoice');
  await expect(page.getByLabel('Disabled')).toBeDisabled();
});

test('chosen files reach the page through the native change event', async ({ page }) => {
  await page
    .getByLabel('Documents')
    .setInputFiles([
      chosenFile({ name: 'brief.pdf', type: 'application/pdf' }),
      chosenFile({ name: 'notes.txt', type: 'text/plain' }),
    ]);
  await expect(page.getByTestId('documents-echo')).toHaveText('Chosen: brief.pdf, notes.txt');
});

test('clicking the label opens the file dialog', async ({ page }) => {
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByText('Documents', { exact: true }).click(),
  ]);
  expect(chooser.isMultiple()).toBe(true);
  await chooser.setFiles(chosenFile({ name: 'label.txt', type: 'text/plain' }));
  await expect(page.getByTestId('documents-echo')).toHaveText('Chosen: label.txt');
});

test('pressing the field box outside the control focuses it and opens the dialog', async ({
  page,
}) => {
  const documents = page.getByLabel('Documents');
  const box = documents.locator('xpath=ancestor::div[@data-slot="input"]');
  expect(await css(box, 'cursor')).toBe('pointer');
  const bounds = await box.boundingBox();
  if (!bounds) throw new Error('Missing field box');
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.mouse.click(bounds.x + bounds.width - 2, bounds.y + bounds.height / 2),
  ]);
  await expect(documents).toBeFocused();
  await chooser.setFiles(chosenFile({ name: 'box.pdf', type: 'application/pdf' }));
  await expect(page.getByTestId('documents-echo')).toHaveText('Chosen: box.pdf');
});

test('keyboard focus shows the ring and Space opens the dialog', async ({ page }) => {
  const documents = page.getByLabel('Documents');
  const box = documents.locator('xpath=ancestor::div[@data-slot="input"]');
  await documents.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(documents).toBeFocused();
  expect(await css(box, 'outline-style')).toBe('solid');
  const [chooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.keyboard.press('Space'),
  ]);
  await chooser.setFiles(chosenFile({ name: 'typed.txt', type: 'text/plain' }));
  await expect(page.getByTestId('documents-echo')).toHaveText('Chosen: typed.txt');
});

test('the native file button is plain text in the field text colour, from the tokens', async ({
  page,
}) => {
  const contract = page.getByLabel('Signed contract');
  await expect
    .poll(() => selectorButton(contract, 'background-color'))
    .toBe(role('transparent.default'));
  expect(await selectorButton(contract, 'color')).toBe(role('onSurface.default'));
  expect(await selectorButton(contract, 'color')).toBe(await css(contract, 'color'));
  expect(await selectorButton(contract, 'border-top-width')).toBe('0px');
  expect(await selectorButton(contract, 'padding-inline-start')).toBe('0px');
  expect(await selectorButton(contract, 'padding-inline-end')).toBe(rem(0.5));
  expect(await selectorButton(contract, 'padding-block-start')).toBe('0px');
  expect(await selectorButton(contract, 'font-weight')).toBe(String(labelWeight));
  expect(await selectorButton(contract, 'cursor')).toBe('pointer');
  await contract.hover();
  await expect.poll(() => css(contract, 'cursor')).toBe('pointer');
  expect(await selectorButton(contract, 'background-color')).toBe(role('transparent.default'));
  expect(await selectorButton(contract, 'color')).toBe(role('onSurface.default'));
  const small = page.getByLabel('outlined sm');
  expect(await selectorButton(small, 'padding-inline-end')).toBe(rem(0.25));
  const disabled = page.getByLabel('Disabled');
  expect(await selectorButton(disabled, 'background-color')).toBe(role('transparent.default'));
  expect(await selectorButton(disabled, 'color')).toBe(role('onSurface.disabled'));
  expect(await selectorButton(disabled, 'cursor')).toBe('default');
});

test('the space before the file names is the selector end padding alone', async ({ page }) => {
  for (const variant of ['outlined', 'filled'])
    for (const size of ['sm', 'md', 'lg']) {
      const field = page.getByLabel(`${variant} ${size}`);
      expect(await selectorButton(field, 'margin-inline-start')).toBe('0px');
      expect(await selectorButton(field, 'margin-inline-end')).toBe('0px');
      expect(await selectorButton(field, 'padding-inline-end')).toBe(
        dimension(`component.textField.size.${size}.fileSelectorButton.paddingEnd`),
      );
    }
});

test('a file field is as tall as a text field of the same size', async ({ page }) => {
  const heights = async (story: string, label: string) => {
    await page.goto(`/?story=${story}`);
    const box = page.getByLabel(label).locator('xpath=ancestor::div[@data-slot="input"]');
    return (await box.boundingBox())?.height;
  };
  for (const size of ['sm', 'md', 'lg'])
    expect(await heights('text-field-file', `outlined ${size}`)).toBe(
      await heights('text-field', `outlined ${size}`),
    );
});

test('file mode leaves text fields untouched', async ({ page }) => {
  await page.goto('/?story=text-field');
  const search = page.getByLabel('Search');
  const box = search.locator('xpath=ancestor::div[@data-slot="input"]');
  expect(await css(box, 'cursor')).toBe('text');
  expect(await search.getAttribute('class')).not.toContain('file-selector-button');
});
