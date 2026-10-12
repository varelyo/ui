import { expect, test } from '@playwright/test';
import raw from '../../src/generated/raw/neutral.light';
import {
  chosenFile,
  countPickerOpenings,
  css,
  dropSystemFiles,
  fileTransfer,
  interceptFileChooser,
  pickerOpenings,
  recordDrops,
  recordedDrops,
  rgb,
  systemFile,
  type DtcgColor,
} from './helpers';

const values = raw as unknown as Record<string, DtcgColor>;
const role = (id: string) => {
  const color = values[`semantic.${id}`];
  if (!color) throw new Error(`Missing semantic.${id}`);
  return rgb(color);
};
const txt = (name: string, bytes = 1) => ({ name, type: 'text/plain', bytes });

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=dropzone');
  await page.getByTestId('dropzone-notes').waitFor();
  await interceptFileChooser(page);
});

test('the area is a named button that announces what it accepts', async ({ page }) => {
  const notes = page.getByRole('button', { name: 'Drop up to two notes or browse' });
  await expect(notes).toHaveAttribute('tabindex', '0');
  await expect(notes).toHaveAccessibleDescription('TXT files, up to 1 KB each');
  await expect(notes.locator('[data-slot="helper-text"]')).toHaveAttribute('aria-live', 'polite');
  await expect(notes.locator('[data-slot="icon"]')).toHaveAttribute('aria-hidden', 'true');
  const leaked = await notes.evaluate((element) =>
    element
      .getAttributeNames()
      .filter((name) =>
        [
          'label',
          'helpertext',
          'icon',
          'size',
          'error',
          'maxsize',
          'maxfiles',
          'accept',
          'capture',
          'color',
        ].includes(name),
      ),
  );
  expect(leaked).toEqual([]);
});

test('the colour of a dropzone never reaches the DOM', async ({ page }) => {
  await page.goto('/?story=dropzone-color');
  for (const color of ['neutral', 'primary', 'secondary', 'warning', 'info', 'success'])
    await expect(page.getByTestId(`dropzone-${color}`)).not.toHaveAttribute('color');
});

test('a click opens the dialog and chosen files are validated', async ({ page }) => {
  const notes = page.getByTestId('dropzone-notes');
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), notes.click()]);
  expect(chooser.isMultiple()).toBe(true);
  expect(await chooser.element().getAttribute('accept')).toBe('.txt,text/plain');
  expect(await chooser.element().getAttribute('hidden')).toBe('');
  expect(await chooser.element().getAttribute('capture')).toBeNull();
  expect(await chooser.element().isVisible()).toBe(false);
  await chooser.setFiles([
    chosenFile(txt('a.txt')),
    chosenFile({ name: 'photo.png', type: 'image/png' }),
  ]);
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Selected: a.txt');
  await expect(page.getByTestId('dropzone-rejected')).toHaveText('Rejected: photo.png (type)');
  expect(await chooser.element().inputValue()).toBe('');
});

for (const key of ['Enter', 'Space'])
  test(`${key} opens the dialog`, async ({ page }) => {
    const notes = page.getByTestId('dropzone-notes');
    await notes.focus();
    const [chooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.keyboard.press(key),
    ]);
    await chooser.setFiles(chosenFile(txt(`${key}.txt`)));
    await expect(page.getByTestId('dropzone-selected')).toHaveText(`Selected: ${key}.txt`);
    await expect(notes).toBeFocused();
  });

test('keyboard focus shows the ring and Tab moves on without trapping focus', async ({ page }) => {
  const notes = page.getByTestId('dropzone-notes');
  await notes.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(notes).toBeFocused();
  expect(await css(notes, 'outline-style')).toBe('solid');
  await expect.poll(() => css(notes, 'border-top-color')).toBe(role('primary.default'));
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('dropzone-next')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(notes).toBeFocused();
  await page.getByTestId('dropzone-error').focus();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('dropzone-drag-accept')).toBeFocused();
});

test('dropped files go through the same type, size and count checks', async ({ page }) => {
  const notes = page.getByTestId('dropzone-notes');
  const drop = async (files: Parameters<typeof fileTransfer>[1]) =>
    notes.dispatchEvent('drop', { dataTransfer: await fileTransfer(page, files) });
  await drop([txt('one.txt'), txt('two.txt')]);
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Selected: one.txt, two.txt');
  await drop([txt('a.txt'), txt('b.txt'), txt('c.txt')]);
  await expect(page.getByTestId('dropzone-rejected')).toHaveText(
    'Rejected: a.txt (count), b.txt (count), c.txt (count)',
  );
  await drop([txt('ok.txt'), { name: 'photo.png', type: 'image/png' }, txt('long.txt', 2048)]);
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Selected: ok.txt');
  await expect(page.getByTestId('dropzone-rejected')).toHaveText(
    'Rejected: photo.png (type), long.txt (size)',
  );
  await drop([{ name: 'README.TXT', type: '' }]);
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Selected: README.TXT');
});

test('a refused file carries every reason and only files that pass count toward the limit', async ({
  page,
}) => {
  const notes = page.getByTestId('dropzone-notes');
  const drop = async (files: Parameters<typeof fileTransfer>[1]) =>
    notes.dispatchEvent('drop', { dataTransfer: await fileTransfer(page, files) });
  await drop([{ name: 'poster.png', type: 'image/png', bytes: 2048 }]);
  await expect(page.getByTestId('dropzone-rejected')).toHaveText(
    'Rejected: poster.png (type and size)',
  );
  await drop([txt('first.txt'), { name: 'photo.png', type: 'image/png' }, txt('second.txt')]);
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Selected: first.txt, second.txt');
  await expect(page.getByTestId('dropzone-rejected')).toHaveText('Rejected: photo.png (type)');
  await drop([
    txt('a.txt'),
    { name: 'photo.png', type: 'image/png' },
    txt('b.txt'),
    txt('long.txt', 2048),
    txt('c.txt'),
  ]);
  await expect(page.getByTestId('dropzone-rejected')).toHaveText(
    'Rejected: a.txt (count), photo.png (type), b.txt (count), long.txt (size), c.txt (count)',
  );
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Selected: first.txt, second.txt');
});

test('files dropped next to the areas stay on the page and a drop on an area still reaches it', async ({
  page,
}, testInfo) => {
  const notes = await systemFile(testInfo, 'notes.txt');
  await recordDrops(page);
  await dropSystemFiles(page, page.getByTestId('dropzone-rejected'), [notes]);
  await dropSystemFiles(page, page.getByTestId('dropzone-notes'), [notes]);
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Selected: notes.txt');
  await expect(page.getByTestId('dropzone-rejected')).toHaveText('Nothing rejected');
  expect(await recordedDrops(page)).toEqual([
    { target: 'dropzone-rejected', cancelled: true },
    { target: 'dropzone-notes', cancelled: true },
  ]);
  expect(page.context().pages()).toEqual([page]);
  expect(new URL(page.url()).search).toBe('?story=dropzone');
});

test('the drop area has a dashed edge from the dropzone tokens', async ({ page }) => {
  for (const testId of ['dropzone-notes', 'dropzone-error', 'dropzone-disabled'])
    expect(await css(page.getByTestId(testId), 'border-top-style')).toBe('dashed');
});

test('accepted files dragged over it put the area in the dragged state', async ({ page }) => {
  const accepting = page.getByTestId('dropzone-drag-accept');
  const png = await fileTransfer(page, [{ name: 'photo.png', type: 'image/png' }]);
  await accepting.dispatchEvent('dragenter', { dataTransfer: png });
  await expect(accepting).toHaveAttribute('data-drag-accept', '');
  await expect(accepting).not.toHaveAttribute('data-drag-reject');
  await expect(accepting).toHaveAccessibleName('Release to add the image');
  await expect
    .poll(() => css(accepting, 'background-color'))
    .toBe(role('primaryContainer.default'));
  await expect.poll(() => css(accepting, 'border-top-color')).toBe(role('primary.default'));
  expect(await css(accepting, 'border-top-style')).toBe('dashed');
  expect(await css(accepting.locator('[data-slot="label"]'), 'color')).toBe(
    role('onPrimaryContainer.default'),
  );
  await accepting.dispatchEvent('dragleave', { dataTransfer: png });
  await expect(accepting).not.toHaveAttribute('data-drag-accept');
  await expect(accepting).toHaveAccessibleName('Drop a cover image or browse');
  await expect.poll(() => css(accepting, 'background-color')).toBe(role('transparent.default'));
});

test('refused files dragged over it look and read differently from accepted ones', async ({
  page,
}) => {
  const refusing = page.getByTestId('dropzone-drag-reject');
  await expect(refusing).toHaveAccessibleDescription('PNG only');
  await refusing.dispatchEvent('dragenter', {
    dataTransfer: await fileTransfer(page, [{ name: 'clip.gif', type: 'image/gif' }]),
  });
  await expect(refusing).toHaveAttribute('data-drag-reject', '');
  await expect(refusing).not.toHaveAttribute('data-drag-accept');
  await expect(refusing).toHaveAccessibleDescription('Only PNG images can be added');
  await expect.poll(() => css(refusing, 'border-top-color')).toBe(role('error.default'));
  expect(await css(refusing, 'background-color')).toBe(role('transparent.default'));
  expect(await css(refusing, 'background-color')).not.toBe(role('primaryContainer.default'));
  expect(await css(refusing.locator('[data-slot="helper-text"]'), 'color')).toBe(
    role('error.default'),
  );
  await refusing.dispatchEvent('dragleave');
  await expect(refusing).not.toHaveAttribute('data-drag-reject');
  await expect(refusing).toHaveAccessibleDescription('PNG only');
  const accepting = page.getByTestId('dropzone-drag-accept');
  await accepting.dispatchEvent('dragenter', {
    dataTransfer: await fileTransfer(page, [
      { name: 'one.png', type: 'image/png' },
      { name: 'two.png', type: 'image/png' },
    ]),
  });
  await expect(accepting).toHaveAttribute('data-drag-reject', '');
  await expect(accepting).toHaveAccessibleDescription('Only PNG images can be added');
  await accepting.dispatchEvent('dragleave');
  const text = await page.evaluateHandle(() => {
    const transfer = new DataTransfer();
    transfer.setData('text/plain', 'not a file');
    return transfer;
  });
  await accepting.dispatchEvent('dragenter', { dataTransfer: text });
  await expect(accepting).not.toHaveAttribute('data-drag-accept');
  await expect(accepting).not.toHaveAttribute('data-drag-reject');
  await expect(accepting).toHaveAccessibleDescription('PNG only');
});

test('a drop ends the drag state and restores the page text', async ({ page }) => {
  const refusing = page.getByTestId('dropzone-drag-reject');
  const gif = await fileTransfer(page, [{ name: 'clip.gif', type: 'image/gif' }]);
  await refusing.dispatchEvent('dragenter', { dataTransfer: gif });
  await expect(refusing).toHaveAttribute('data-drag-reject', '');
  await refusing.dispatchEvent('drop', { dataTransfer: gif });
  await expect(refusing).not.toHaveAttribute('data-drag-reject');
  await expect(refusing).toHaveAccessibleDescription('PNG only');
});

test('an error dropzone paints its hint in the error role', async ({ page }) => {
  const error = page.getByTestId('dropzone-error');
  await expect(error).toHaveAttribute('data-error', '');
  await expect.poll(() => css(error, 'border-top-color')).toBe(role('error.default'));
  await expect
    .poll(() => css(error.locator('[data-slot="helper-text"]'), 'color'))
    .toBe(role('error.default'));
  await error.hover();
  await expect.poll(() => css(error, 'background-color')).toBe(role('surface.hover'));
  expect(await css(error, 'border-top-color')).toBe(role('error.default'));
  expect(await css(error.locator('[data-slot="icon"]'), 'color')).toBe(role('error.default'));
});

test('accepted files dragged over an area in error show the accepted state', async ({ page }) => {
  const error = page.getByTestId('dropzone-error');
  await error.dispatchEvent('dragenter', {
    dataTransfer: await fileTransfer(page, [{ name: 'cover.png', type: 'image/png' }]),
  });
  await expect(error).toHaveAttribute('data-drag-accept', '');
  await expect(error).not.toHaveAttribute('data-error');
  await expect.poll(() => css(error, 'background-color')).toBe(role('primaryContainer.default'));
  await expect.poll(() => css(error, 'border-top-color')).toBe(role('primary.default'));
});

test('a disabled dropzone is skipped, never opens the dialog and ignores drops', async ({
  page,
}) => {
  await countPickerOpenings(page);
  const disabled = page.getByTestId('dropzone-disabled');
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  await expect(disabled).toHaveAttribute('tabindex', '-1');
  await disabled.click({ force: true });
  await disabled.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await disabled.dispatchEvent('dragenter', {
    dataTransfer: await fileTransfer(page, [txt('late.txt')]),
  });
  await expect(disabled).not.toHaveAttribute('data-drag-accept');
  await disabled.dispatchEvent('drop', {
    dataTransfer: await fileTransfer(page, [txt('late.txt')]),
  });
  expect(await pickerOpenings(page)).toBe(0);
  await expect(page.getByTestId('dropzone-selected')).toHaveText('Nothing selected');
  await expect.poll(() => css(disabled, 'background-color')).toBe(role('surface.disabled'));
});
