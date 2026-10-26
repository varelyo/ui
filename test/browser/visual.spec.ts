import { expect, test, type Page } from '@playwright/test';

const stories = [
  'typography',
  'icons',
  'layout',
  'box',
  'box-min-height',
  'theme-scope',
  'control-sizes',
  'control-addons',
  'button',
  'icon-button',
  'text-field',
  'circular-progress',
  'linear-progress',
  'divider',
  'tooltip',
  'popover',
  'menu',
  'menu-item',
  'select',
  'select-option',
  'tabs',
  'tabs-color',
  'tabs-segmented',
  'snackbar',
  'paper',
  'paper-selected',
  'dialog',
  'drawer',
  'list',
  'list-states',
  'list-compositions',
  'list-markers',
  'sidebar',
  'sidebar-color',
  'breadcrumbs',
  'link',
  'link-states',
  'link-compositions',
  'skeleton',
  'card',
  'card-selected',
  'avatar',
  'avatar-color',
  'chip',
  'checkbox',
  'switch',
  'table',
  'table-sort-label',
  'text-field-file',
  'dropzone',
  'dropzone-color',
];
const drag = async (page: Page, testId: string, name: string, type: string) => {
  const dataTransfer = await page.evaluateHandle(
    ([fileName, fileType]) => {
      const transfer = new DataTransfer();
      transfer.items.add(new File(['x'], fileName, { type: fileType }));
      return transfer;
    },
    [name, type] as const,
  );
  const zone = page.getByTestId(testId);
  await zone.dispatchEvent('dragenter', { dataTransfer });
  await expect(zone).toHaveAttribute(
    type === 'image/png' ? 'data-drag-accept' : 'data-drag-reject',
  );
};
const forcedStates: ReadonlyArray<readonly [string, readonly string[]]> = [
  ['hover', ['hover']],
  ['pressed', ['hover', 'active']],
  ['focus', ['focus', 'focus-visible']],
  ['selected-hover', ['hover']],
  ['selected-pressed', ['hover', 'active']],
  ['selected-focus', ['focus', 'focus-visible']],
];
const holdStates = async (page: Page) => {
  const client = await page.context().newCDPSession(page);
  await client.send('DOM.enable');
  await client.send('CSS.enable');
  const { root } = await client.send('DOM.getDocument', { depth: -1 });
  for (const [state, pseudoClasses] of forcedStates) {
    const { nodeIds } = await client.send('DOM.querySelectorAll', {
      nodeId: root.nodeId,
      selector: `[data-state="${state}"]`,
    });
    for (const nodeId of nodeIds)
      await client.send('CSS.forcePseudoState', {
        nodeId,
        forcedPseudoClasses: [...pseudoClasses],
      });
  }
  await page.mouse.move(0, 0);
};
const prepare: Partial<Record<string, (page: Page) => Promise<void>>> = {
  'list-states': holdStates,
  'link-states': holdStates,
  'tabs-segmented': holdStates,
  'text-field-file': async (page) => {
    await page.getByLabel('Signed contract').setInputFiles({
      name: 'signed-contract.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('x'),
    });
  },
  dropzone: async (page) => {
    await drag(page, 'dropzone-drag-accept', 'photo.png', 'image/png');
    await drag(page, 'dropzone-drag-reject', 'clip.gif', 'image/gif');
  },
  'dropzone-color': async (page) => {
    for (const color of ['neutral', 'primary', 'secondary', 'warning', 'info', 'success'])
      await drag(page, `dropzone-${color}-drag`, 'photo.png', 'image/png');
  },
};
const overlays: Partial<Record<string, (page: Page) => Promise<void>>> = {
  popover: async (page) => {
    await page.getByTestId('popover-open').click();
    await page.getByRole('dialog').waitFor();
  },
  menu: async (page) => {
    await page.getByTestId('menu-open').click();
    await page.getByRole('menu').waitFor();
  },
  'menu-item': async (page) => {
    await page.getByRole('menu').waitFor();
  },
  snackbar: async (page) => {
    await page.getByTestId('snackbar-right-open').click();
    await page.getByTestId('snackbar-alert-open').click();
    await page.getByTestId('snackbar-custom-open').click();
    await page.getByRole('alert').getByText('Connection lost', { exact: false }).waitFor();
  },
  'select-option': async (page) => {
    await page.getByRole('combobox', { name: 'Timezone' }).click();
    await page.getByRole('listbox').waitFor();
  },
  dialog: async (page) => {
    await page.getByTestId('dialog-open').click();
    await page.getByRole('dialog').waitFor();
  },
  drawer: async (page) => {
    await page.getByTestId('drawer-open-left').click();
    await page.getByRole('dialog').waitFor();
  },
};
const themes = [
  ['neutral', 'light'],
  ['neutral', 'dark'],
  ['slate', 'light'],
  ['slate', 'dark'],
] as const;

for (const story of stories)
  for (const [brand, mode] of themes)
    test(`${story} · ${brand} ${mode}`, async ({ page }) => {
      await page.goto(`/?story=${story}&brand=${brand}&mode=${mode}`);
      await page.evaluate(() => document.fonts.ready);
      await prepare[story]?.(page);
      const open = overlays[story];
      await open?.(page);
      await expect(open ? page : page.locator('main')).toHaveScreenshot(
        `${story}-${brand}-${mode}.png`,
      );
    });
