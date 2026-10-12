import { writeFile } from 'node:fs/promises';
import type { Locator, Page, TestInfo } from '@playwright/test';

export type DtcgColor = { colorSpace: string; components: readonly number[]; alpha?: number };

export const rgb = (color: DtcgColor) => {
  const alpha = color.alpha ?? 1;
  const exact = color.components.every(
    (value) => Math.abs(value * 255 - Math.round(value * 255)) < 1e-4,
  );
  if (!exact) return `color(srgb ${color.components.join(' ')}${alpha === 1 ? '' : ` / ${alpha}`})`;
  const [red, green, blue] = color.components.map((value) => Math.round(value * 255));
  return alpha === 1
    ? `rgb(${red}, ${green}, ${blue})`
    : `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const css = (locator: Locator, property: string) =>
  locator.evaluate(
    (element, name) => getComputedStyle(element).getPropertyValue(name).trim(),
    property,
  );

export const renderCount = (page: Page) => page.evaluate(() => window.vyRenderCount ?? 0);

export const rem = (value: number) => `${value * 16}px`;

export type FileEntry = { name: string; type: string; bytes?: number };

export const fileTransfer = (page: Page, files: readonly FileEntry[]) =>
  page.evaluateHandle((entries) => {
    const transfer = new DataTransfer();
    for (const { name, type, bytes } of entries)
      transfer.items.add(new File(['x'.repeat(bytes ?? 1)], name, { type }));
    return transfer;
  }, files);

export const chosenFile = ({ name, type, bytes }: FileEntry) => ({
  name,
  mimeType: type,
  buffer: Buffer.from('x'.repeat(bytes ?? 1)),
});

export const interceptFileChooser = async (page: Page) => {
  page.on('filechooser', () => undefined);
  await page.evaluate(() => document.readyState);
};

export const countPickerOpenings = (page: Page) =>
  page.evaluate(() => {
    window.vyPickerOpenings = 0;
    for (const input of document.querySelectorAll('input[type="file"][hidden]'))
      input.addEventListener('click', () => {
        window.vyPickerOpenings = (window.vyPickerOpenings ?? 0) + 1;
      });
  });

export const pickerOpenings = (page: Page) => page.evaluate(() => window.vyPickerOpenings ?? 0);

export const systemFile = async (testInfo: TestInfo, name: string) => {
  const file = testInfo.outputPath(name);
  await writeFile(file, 'x');
  return file;
};

export const dropSystemFiles = async (page: Page, target: Locator, files: readonly string[]) => {
  const box = await target.boundingBox();
  if (!box) throw new Error('The drop target has no box');
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  const data = { items: [], files: [...files], dragOperationsMask: 1 };
  const session = await page.context().newCDPSession(page);
  for (const type of ['dragEnter', 'dragOver', 'drop'] as const)
    await session.send('Input.dispatchDragEvent', { type, ...point, data });
  await session.detach();
};

export type DropRecord = { target: string; cancelled: boolean };

export const recordDrops = (page: Page) =>
  page.evaluate(() => {
    window.vyDrops = [];
    window.addEventListener('drop', (event) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      window.vyDrops?.push({
        target: target?.dataset.testid ?? target?.localName ?? '',
        cancelled: event.defaultPrevented,
      });
    });
  });

export const recordedDrops = (page: Page) => page.evaluate(() => window.vyDrops ?? []);

declare global {
  interface Window {
    vyPickerOpenings?: number;
    vyDrops?: DropRecord[];
  }
}
