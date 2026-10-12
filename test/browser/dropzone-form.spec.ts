import { expect, test } from '@playwright/test';
import {
  chosenFile,
  dropSystemFiles,
  interceptFileChooser,
  recordDrops,
  recordedDrops,
  systemFile,
} from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=dropzone-form');
  await page.getByTestId('dropzone-photo').waitFor();
  await interceptFileChooser(page);
});

test('capture reaches the hidden input, so a phone can take the photo with its camera', async ({
  page,
}) => {
  const photo = page.getByTestId('dropzone-photo');
  await expect(photo).not.toHaveAttribute('capture');
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), photo.click()]);
  expect(await chooser.element().getAttribute('capture')).toBe('user');
  expect(await chooser.element().getAttribute('accept')).toBe('image/*');
  await chooser.setFiles(chosenFile({ name: 'portrait.png', type: 'image/png' }));
  await expect(page.getByTestId('dropzone-photo-chosen')).toHaveText('Photo: portrait.png');
});

test('while the zone is mounted a file dropped next to it stays on the page, and the zone and a file field still take theirs', async ({
  page,
}, testInfo) => {
  const notes = await systemFile(testInfo, 'notes.txt');
  const contract = await systemFile(testInfo, 'contract.pdf');
  const portrait = await systemFile(testInfo, 'portrait.png');
  const heading = page.getByRole('heading', { name: 'A file field on the same page' });
  const field = page.getByTestId('dropzone-contract');
  await recordDrops(page);
  await dropSystemFiles(page, heading, [notes]);
  await dropSystemFiles(page, field, [contract]);
  await dropSystemFiles(page, page.getByTestId('dropzone-photo'), [portrait]);
  await expect(page.getByTestId('dropzone-photo-chosen')).toHaveText('Photo: portrait.png');
  expect(await field.evaluate((input: HTMLInputElement) => input.files?.[0]?.name)).toBe(
    'contract.pdf',
  );
  const text = await page.evaluateHandle(() => {
    const transfer = new DataTransfer();
    transfer.setData('text/plain', 'not a file');
    return transfer;
  });
  await heading.dispatchEvent('drop', { dataTransfer: text });
  expect(await recordedDrops(page)).toEqual([
    { target: 'h2', cancelled: true },
    { target: 'dropzone-contract', cancelled: false },
    { target: 'dropzone-photo', cancelled: true },
    { target: 'h2', cancelled: false },
  ]);
  expect(page.context().pages()).toEqual([page]);
  expect(new URL(page.url()).search).toBe('?story=dropzone-form');
});

test('without a mounted zone the page keeps the browser default, and it ends again on remount', async ({
  page,
}, testInfo) => {
  const notes = await systemFile(testInfo, 'notes.txt');
  const heading = page.getByRole('heading', { name: 'A file field on the same page' });
  const uploads = page.getByTestId('dropzone-uploads');
  await uploads.click();
  await expect(page.getByTestId('dropzone-photo')).toHaveCount(0);
  await recordDrops(page);
  const [opened] = await Promise.all([
    page.context().waitForEvent('page'),
    dropSystemFiles(page, heading, [notes]),
  ]);
  await opened.close();
  expect(await recordedDrops(page)).toEqual([]);
  await uploads.click();
  await page.getByTestId('dropzone-photo').waitFor();
  await dropSystemFiles(page, heading, [notes]);
  expect(await recordedDrops(page)).toEqual([{ target: 'h2', cancelled: true }]);
  expect(page.context().pages()).toEqual([page]);
});
