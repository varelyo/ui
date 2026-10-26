import { expect, test, type Locator, type Page } from '@playwright/test';
import { css } from './helpers';

const probe = 'rgb(250, 1, 2)';

const paint = async (page: Page, role: string) => {
  const name = role
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replaceAll('.', '-')
    .toLowerCase();
  await page.addStyleTag({
    content: `:root, [data-vy-brand], [data-vy-mode] { --vy-color-${name}--light: ${probe} !important; --vy-color-${name}--dark: ${probe} !important; }`,
  });
};

const painted = (locator: Locator, property: string) =>
  expect.poll(() => css(locator, property)).toBe(probe);

const unpainted = async (locator: Locator, property: string) =>
  expect(await css(locator, property)).not.toBe(probe);

const repainted = (locator: Locator, property: string) =>
  expect.poll(() => css(locator, property)).not.toBe(probe);

test('paper takes the container level of its elevation and outlined paper sits on the surface', async ({
  page,
}) => {
  await page.goto('/?story=paper');
  await paint(page, 'surfaceContainerLow.default');
  await painted(page.getByTestId('paper-xs'), 'background-color');
  await unpainted(page.getByTestId('paper-md'), 'background-color');
  await paint(page, 'surfaceContainer.default');
  await painted(page.getByTestId('paper-md'), 'background-color');
  await paint(page, 'surfaceContainerHigh.default');
  await painted(page.getByTestId('paper-3xl'), 'background-color');
  await unpainted(page.getByTestId('paper-outlined'), 'background-color');
  await paint(page, 'outlineVariant.default');
  await painted(page.getByTestId('paper-outlined'), 'border-top-color');
});

test('a menu sits on the surface container, paints its icons lower-emphasis and selects with the secondary container', async ({
  page,
}) => {
  await page.goto('/?story=menu');
  await paint(page, 'surfaceContainer.default');
  await paint(page, 'onSurfaceVariant.default');
  await page.getByTestId('menu-open').click();
  const menu = page.getByTestId('menu');
  await expect(menu).toBeVisible();
  await painted(menu, 'background-color');
  const rename = page.getByRole('menuitem', { name: 'Rename', exact: true });
  await painted(rename.locator('span[aria-hidden="true"]').first(), 'color');
  await unpainted(rename, 'color');
  await page.keyboard.press('Escape');
  await paint(page, 'secondaryContainer.default');
  await page.getByTestId('sort-open').click();
  const updated = page.getByRole('menuitem', { name: 'Updated', exact: true });
  await expect(updated).toHaveAttribute('data-selected', '');
  await painted(updated, 'background-color');
  await paint(page, 'surface.hover');
  const name = page.getByRole('menuitem', { name: 'Name', exact: true });
  await name.hover();
  await painted(name, 'background-color');
});

test('an outlined field draws the outline at rest and onSurface under the pointer, and its label turns primary in focus', async ({
  page,
}) => {
  await page.goto('/?story=text-field');
  const input = page.getByLabel('Search');
  const field = page.locator('[data-slot="input"]').filter({ has: input }).first();
  const label = page.locator('label').filter({ hasText: 'Search' }).first();
  await paint(page, 'outline.default');
  await painted(field, 'border-top-color');
  await paint(page, 'onSurface.default');
  await field.hover();
  await painted(field, 'border-top-color');
  await page.mouse.move(0, 0);
  await paint(page, 'primary.default');
  await unpainted(label, 'color');
  await input.focus();
  await painted(label, 'color');
  await painted(field, 'border-top-color');
});

test('an off switch shows a highest-container track with an outline edge and thumb, and an on switch fills with primary', async ({
  page,
}) => {
  await page.goto('/?story=switch');
  const thumb = page.getByTestId('switch-md').locator('[data-slot="thumb"]');
  const track = thumb.locator('..');
  await paint(page, 'surfaceContainerHighest.default');
  await painted(track, 'background-color');
  await paint(page, 'outline.default');
  await painted(track, 'border-top-color');
  await painted(thumb, 'background-color');
  await paint(page, 'primary.default');
  await paint(page, 'onPrimary.default');
  await page.getByRole('switch', { name: 'Size md' }).focus();
  await page.keyboard.press('Space');
  await painted(track, 'background-color');
  await painted(thumb, 'background-color');
});

test('a sidebar without color marks the current item with the highest container and onSurface and keeps the others lower-emphasis', async ({
  page,
}) => {
  await page.goto('/?story=sidebar');
  const current = page.getByTestId('sidebar-item-Overview');
  const other = page.getByTestId('sidebar-item-Projects');
  await expect(current).toHaveAttribute('aria-current', 'page');
  await paint(page, 'secondaryContainer.default');
  await paint(page, 'onSecondaryContainer.default');
  await unpainted(current, 'background-color');
  await unpainted(current, 'color');
  await paint(page, 'surfaceContainerHighest.default');
  await paint(page, 'onSurface.default');
  await painted(current, 'background-color');
  await painted(current, 'color');
  await painted(current.locator('span[aria-hidden="true"]').first(), 'color');
  await unpainted(other, 'background-color');
  await unpainted(other, 'color');
  await paint(page, 'onSurfaceVariant.default');
  await painted(other, 'color');
  await painted(other.locator('span[aria-hidden="true"]').first(), 'color');
});

test('a primary or secondary sidebar marks the current item with its container and on-container roles', async ({
  page,
}) => {
  await page.goto('/?story=sidebar-color');
  const current = (color: string) => page.getByTestId(`sidebar-${color}-Projects`);
  const icon = (color: string) => current(color).locator('span[aria-hidden="true"]').first();
  for (const color of ['neutral', 'primary', 'secondary'])
    await expect(current(color)).toHaveAttribute('aria-current', 'page');
  await paint(page, 'primaryContainer.default');
  await paint(page, 'onPrimaryContainer.default');
  await painted(current('primary'), 'background-color');
  await painted(current('primary'), 'color');
  await painted(icon('primary'), 'color');
  await unpainted(current('neutral'), 'background-color');
  await unpainted(current('secondary'), 'background-color');
  await unpainted(current('secondary'), 'color');
  await paint(page, 'secondaryContainer.default');
  await paint(page, 'onSecondaryContainer.default');
  await painted(current('secondary'), 'background-color');
  await painted(current('secondary'), 'color');
  await painted(icon('secondary'), 'color');
  await unpainted(current('neutral'), 'background-color');
  await paint(page, 'surfaceContainerHighest.default');
  await painted(current('neutral'), 'background-color');
  await paint(page, 'onSurfaceVariant.default');
  for (const color of ['neutral', 'primary', 'secondary'])
    await painted(page.getByTestId(`sidebar-${color}-Overview`), 'color');
});

test('a coloured sidebar marks the current item in its drawer with the same colour', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/?story=sidebar-color');
  await page.getByTestId('sidebar-primary-menu').click();
  const drawer = page.getByRole('dialog', { name: 'Workspace, primary' });
  await expect(drawer).toBeVisible();
  const current = drawer.getByRole('button', { name: 'Projects' });
  await expect(current).toHaveAttribute('aria-current', 'page');
  await paint(page, 'primaryContainer.default');
  await painted(current, 'background-color');
  await unpainted(drawer.getByRole('button', { name: 'Overview' }), 'background-color');
});

test('a text icon button paints its icon with the intent role, fills with its container under hover and press and disables in onSurface', async ({
  page,
}) => {
  await page.goto('/?story=icon-button');
  const settings = page.getByRole('button', { name: 'Settings, text primary', exact: true });
  await paint(page, 'primary.default');
  await painted(settings, 'color');
  await unpainted(page.getByRole('button', { name: 'Settings, text error', exact: true }), 'color');
  await paint(page, 'primaryContainer.default');
  await settings.hover();
  await unpainted(settings, 'background-color');
  await page.mouse.down();
  await painted(settings, 'background-color');
  await page.mouse.up();
  await paint(page, 'primaryContainer.low');
  await settings.hover();
  await painted(settings, 'background-color');
  await paint(page, 'onSurface.disabled');
  await painted(
    page.getByRole('button', { name: 'Settings, text disabled', exact: true }),
    'color',
  );
});

test('an icon button defaults to the neutral text style: a lower-emphasis icon on a transparent root that fills with surface.hover', async ({
  page,
}) => {
  await page.goto('/?story=icon-button');
  const fallback = page.getByTestId('icon-button-md');
  const neutral = page.getByRole('button', { name: 'Settings, text neutral', exact: true });
  await paint(page, 'onSurfaceVariant.default');
  await painted(fallback, 'color');
  await painted(neutral, 'color');
  await unpainted(
    page.getByRole('button', { name: 'Settings, text primary', exact: true }),
    'color',
  );
  await unpainted(neutral, 'background-color');
  await paint(page, 'surface.hover');
  await neutral.hover();
  await painted(neutral, 'background-color');
  await page.mouse.down();
  await painted(neutral, 'background-color');
  await page.mouse.up();
});

test('a contained icon button fills with its intent under the on-role icon, and a neutral one fills with the highest container', async ({
  page,
}) => {
  await page.goto('/?story=icon-button');
  const primary = page.getByRole('button', { name: 'Settings, contained primary', exact: true });
  const neutral = page.getByRole('button', { name: 'Settings, contained neutral', exact: true });
  await paint(page, 'onPrimary.default');
  await painted(primary, 'color');
  await unpainted(primary, 'background-color');
  await paint(page, 'primary.default');
  await painted(primary, 'background-color');
  await primary.hover();
  await repainted(primary, 'background-color');
  await paint(page, 'primary.hover');
  await painted(primary, 'background-color');
  await page.mouse.move(0, 0);
  await paint(page, 'onSurface.default');
  await painted(neutral, 'color');
  await unpainted(neutral, 'background-color');
  await paint(page, 'surfaceContainerHighest.default');
  await painted(neutral, 'background-color');
  await neutral.hover();
  await repainted(neutral, 'background-color');
  await paint(page, 'surface.hover');
  await painted(neutral, 'background-color');
  await page.mouse.move(0, 0);
  const disabled = page.getByRole('button', { name: 'Settings, contained disabled', exact: true });
  await unpainted(disabled, 'background-color');
  await paint(page, 'surface.disabled');
  await painted(disabled, 'background-color');
});

test('an outlined icon button draws the outline and turns it to its intent in keyboard focus', async ({
  page,
}) => {
  await page.goto('/?story=icon-button');
  const primary = page.getByRole('button', { name: 'Settings, outlined primary', exact: true });
  await paint(page, 'outline.default');
  await painted(primary, 'border-top-color');
  await painted(
    page.getByRole('button', { name: 'Settings, outlined neutral', exact: true }),
    'border-top-color',
  );
  await unpainted(
    page.getByRole('button', { name: 'Settings, text primary', exact: true }),
    'border-top-color',
  );
  await unpainted(
    page.getByRole('button', { name: 'Settings, contained primary', exact: true }),
    'border-top-color',
  );
  await primary.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(primary).toBeFocused();
  await repainted(primary, 'border-top-color');
  await paint(page, 'primary.default');
  await painted(primary, 'border-top-color');
  await paint(page, 'outline.disabled');
  await painted(
    page.getByRole('button', { name: 'Settings, outlined disabled', exact: true }),
    'border-top-color',
  );
});

test('an outlined neutral icon button keeps the lower-emphasis icon and takes it for its edge in keyboard focus', async ({
  page,
}) => {
  await page.goto('/?story=icon-button');
  const neutral = page.getByRole('button', { name: 'Settings, outlined neutral', exact: true });
  await paint(page, 'onSurfaceVariant.default');
  await painted(neutral, 'color');
  await unpainted(neutral, 'border-top-color');
  await unpainted(
    page.getByRole('button', { name: 'Settings, outlined primary', exact: true }),
    'color',
  );
  await neutral.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(neutral).toBeFocused();
  await painted(neutral, 'border-top-color');
});

test('a chip is neutral by default: a filled chip on the highest container with onSurface text, an outlined one on the decorative outline', async ({
  page,
}) => {
  await page.goto('/?story=chip');
  const clickable = page.getByTestId('chip-clickable');
  const filled = page.getByTestId('chip-filled-neutral');
  const outlined = page.getByTestId('chip-outlined-neutral');
  await paint(page, 'onSurface.default');
  await painted(clickable, 'color');
  await painted(filled, 'color');
  await painted(outlined, 'color');
  await painted(page.getByTestId('chip-avatar-md'), 'color');
  await unpainted(page.getByTestId('chip-outlined-primary'), 'color');
  await unpainted(clickable, 'background-color');
  await paint(page, 'surfaceContainerHighest.default');
  await painted(clickable, 'background-color');
  await painted(filled, 'background-color');
  await unpainted(page.getByTestId('chip-filled-primary'), 'background-color');
  await clickable.getByRole('button', { name: 'Clickable' }).hover();
  await repainted(clickable, 'background-color');
  await paint(page, 'surface.hover');
  await painted(clickable, 'background-color');
  await page.mouse.move(0, 0);
  await paint(page, 'outlineVariant.default');
  await painted(outlined, 'border-top-color');
  await painted(page.getByTestId('chip-avatar-md'), 'border-top-color');
});

test('a sort label paints its arrow only while active, and hints at it in the lower-emphasis role under the pointer', async ({
  page,
}) => {
  await page.goto('/?story=table-sort-label');
  const active = page.getByTestId('sort-name');
  const inactive = page.getByTestId('sort-role');
  const activeIcon = active.locator('[data-slot="sort-icon"]');
  const inactiveIcon = inactive.locator('[data-slot="sort-icon"]');
  expect(await css(inactiveIcon, 'color')).toBe('rgba(0, 0, 0, 0)');
  await paint(page, 'onSurface.default');
  await painted(activeIcon, 'color');
  await unpainted(inactiveIcon, 'color');
  await active.hover();
  await painted(activeIcon, 'color');
  await inactive.hover();
  await expect.poll(() => css(inactiveIcon, 'color')).not.toBe('rgba(0, 0, 0, 0)');
  await unpainted(inactiveIcon, 'color');
  await paint(page, 'onSurfaceVariant.default');
  await painted(inactiveIcon, 'color');
  await page.mouse.move(0, 0);
  await expect.poll(() => css(inactiveIcon, 'color')).toBe('rgba(0, 0, 0, 0)');
});

test('tabs without color paint the selected label and indicator with onSurface and keep the other tabs lower-emphasis', async ({
  page,
}) => {
  await page.goto('/?story=tabs');
  const tabs = page.getByTestId('tabs');
  const selected = tabs.getByRole('tab', { name: 'Overview', exact: true });
  const other = tabs.getByRole('tab', { name: 'Activity', exact: true });
  const indicator = selected.locator('[data-slot="indicator"]');
  await expect(selected).toHaveAttribute('aria-selected', 'true');
  await paint(page, 'primary.default');
  await unpainted(selected, 'color');
  await unpainted(indicator, 'border-bottom-color');
  await paint(page, 'onSurface.default');
  await painted(selected, 'color');
  await painted(indicator, 'border-bottom-color');
  await unpainted(other, 'color');
  await paint(page, 'onSurfaceVariant.default');
  await painted(other, 'color');
  await other.click();
  await expect(other).toHaveAttribute('aria-selected', 'true');
  await painted(other.locator('[data-slot="indicator"]'), 'border-bottom-color');
  await repainted(indicator, 'border-bottom-color');
});

test('primary and secondary tabs paint the selected label and indicator with their role', async ({
  page,
}) => {
  await page.goto('/?story=tabs-color');
  const selected = (color: string) =>
    page.getByTestId(`tabs-${color}`).getByRole('tab', { name: 'General', exact: true });
  const indicator = (color: string) => selected(color).locator('[data-slot="indicator"]');
  await paint(page, 'primary.default');
  await painted(selected('primary'), 'color');
  await painted(indicator('primary'), 'border-bottom-color');
  await unpainted(selected('secondary'), 'color');
  await paint(page, 'secondary.default');
  await painted(selected('secondary'), 'color');
  await painted(indicator('secondary'), 'border-bottom-color');
  const vertical = page
    .getByTestId('tabs-vertical-secondary')
    .getByRole('tab', { name: 'Security', exact: true });
  await painted(vertical.locator('[data-slot="indicator"]'), 'border-right-color');
  await paint(page, 'onSurfaceVariant.default');
  for (const color of ['neutral', 'primary', 'secondary'])
    await painted(
      page.getByTestId(`tabs-${color}`).getByRole('tab', { name: 'Members', exact: true }),
      'color',
    );
});

test('an avatar without color fills with the highest container under onSurface initials and icon', async ({
  page,
}) => {
  await page.goto('/?story=avatar');
  const initials = page.getByTestId('avatar-circular-md');
  const icon = page.getByTestId('avatar-empty');
  await paint(page, 'primaryContainer.default');
  await paint(page, 'onPrimaryContainer.default');
  await unpainted(initials, 'background-color');
  await unpainted(initials, 'color');
  await paint(page, 'surfaceContainerHighest.default');
  await paint(page, 'onSurface.default');
  await painted(initials, 'background-color');
  await painted(initials, 'color');
  await painted(icon, 'background-color');
  await painted(icon.locator('svg'), 'color');
});

test('an avatar of an intent fills with its container under its on-container role', async ({
  page,
}) => {
  await page.goto('/?story=avatar-color');
  const intents = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
  for (const [index, intent] of intents.entries()) {
    const on = `on${intent.charAt(0).toUpperCase()}${intent.slice(1)}Container.default`;
    await paint(page, `${intent}Container.default`);
    await paint(page, on);
    await painted(page.getByTestId(`avatar-${intent}`), 'background-color');
    await painted(page.getByTestId(`avatar-${intent}`), 'color');
    await painted(page.getByTestId(`avatar-${intent}-icon`).locator('svg'), 'color');
    for (const later of intents.slice(index + 1))
      await unpainted(page.getByTestId(`avatar-${later}`), 'background-color');
    await unpainted(page.getByTestId('avatar-neutral'), 'background-color');
  }
});

const pngTransfer = (page: Page) =>
  page.evaluateHandle(() => {
    const transfer = new DataTransfer();
    transfer.items.add(new File(['x'], 'photo.png', { type: 'image/png' }));
    return transfer;
  });

test('a dropzone without color keeps the outline edge and the lower-emphasis icon at rest', async ({
  page,
}) => {
  await page.goto('/?story=dropzone-color');
  const neutral = page.getByTestId('dropzone-neutral');
  const icon = neutral.locator('[data-slot="icon"]');
  await paint(page, 'primary.default');
  await unpainted(neutral, 'border-top-color');
  await unpainted(icon, 'color');
  await paint(page, 'outline.default');
  await painted(neutral, 'border-top-color');
  await paint(page, 'onSurfaceVariant.default');
  await painted(icon, 'color');
  await painted(neutral.locator('[data-slot="helper-text"]'), 'color');
});

test('a dropzone of an intent paints its edge and icon with the intent and fills with its container for an accepted drag', async ({
  page,
}) => {
  await page.goto('/?story=dropzone-color');
  const intents = ['primary', 'secondary', 'warning', 'info', 'success'];
  for (const [index, intent] of intents.entries()) {
    const zone = page.getByTestId(`dropzone-${intent}`);
    await paint(page, `${intent}.default`);
    await painted(zone, 'border-top-color');
    await painted(zone.locator('[data-slot="icon"]'), 'color');
    await unpainted(zone.locator('[data-slot="label"]'), 'color');
    for (const later of intents.slice(index + 1))
      await unpainted(page.getByTestId(`dropzone-${later}`), 'border-top-color');
    const dragged = page.getByTestId(`dropzone-${intent}-drag`);
    await dragged.dispatchEvent('dragenter', { dataTransfer: await pngTransfer(page) });
    await expect(dragged).toHaveAttribute('data-drag-accept', '');
    await unpainted(dragged, 'background-color');
    await paint(page, `${intent}Container.default`);
    await painted(dragged, 'background-color');
    await painted(dragged, 'border-top-color');
    await paint(page, `on${intent.charAt(0).toUpperCase()}${intent.slice(1)}Container.default`);
    await painted(dragged.locator('[data-slot="label"]'), 'color');
  }
  await unpainted(page.getByTestId('dropzone-neutral'), 'border-top-color');
});

test('a coloured dropzone takes the error roles for a refused drag', async ({ page }) => {
  await page.goto('/?story=dropzone-color');
  const zone = page.getByTestId('dropzone-secondary');
  const gif = await page.evaluateHandle(() => {
    const transfer = new DataTransfer();
    transfer.items.add(new File(['x'], 'clip.gif', { type: 'image/gif' }));
    return transfer;
  });
  await zone.dispatchEvent('dragenter', { dataTransfer: gif });
  await expect(zone).toHaveAttribute('data-drag-reject', '');
  await paint(page, 'error.default');
  await painted(zone, 'border-top-color');
  await painted(zone.locator('[data-slot="icon"]'), 'color');
  await painted(zone.locator('[data-slot="helper-text"]'), 'color');
  await paint(page, 'secondaryContainer.default');
  await unpainted(zone, 'background-color');
});

test('a neutral list item rests in onSurfaceVariant, hovers onto surface.hover and marks the current item with the highest container', async ({
  page,
}) => {
  await page.goto('/?story=list');
  const rest = page.getByTestId('list-neutral-overview');
  const current = page.getByTestId('list-neutral-members');
  const icon = (row: Locator) => row.locator('span[aria-hidden="true"]').first();
  await paint(page, 'onSurfaceVariant.default');
  await painted(rest, 'color');
  await painted(icon(rest), 'color');
  await painted(current.getByText('Eight people'), 'color');
  await painted(current.locator('xpath=..').locator(':scope > [data-list-item-end]'), 'color');
  await paint(page, 'surfaceContainerHighest.default');
  await paint(page, 'onSurface.default');
  await painted(current, 'background-color');
  await painted(current, 'color');
  await painted(icon(current), 'color');
  await unpainted(rest, 'background-color');
  await paint(page, 'surface.hover');
  await rest.hover();
  await painted(rest, 'background-color');
  await painted(icon(rest), 'color');
  await paint(page, 'onSurface.disabled');
  await painted(page.getByTestId('list-neutral-archive'), 'color');
});

test('a primary or secondary list marks its current item, second line, icon and end with its container roles', async ({
  page,
}) => {
  await page.goto('/?story=list');
  const current = (color: string) => page.getByTestId(`list-${color}-members`);
  const end = (color: string) =>
    current(color).locator('xpath=..').locator(':scope > [data-list-item-end]');
  for (const [color, container] of [
    ['primary', 'primaryContainer'],
    ['secondary', 'secondaryContainer'],
  ] as const) {
    const on = `on${container[0]!.toUpperCase()}${container.slice(1)}`;
    await unpainted(current(color), 'background-color');
    await paint(page, `${container}.default`);
    await paint(page, `${on}.default`);
    await painted(current(color), 'background-color');
    await painted(current(color), 'color');
    await painted(current(color).locator('span[aria-hidden="true"]').first(), 'color');
    await painted(current(color).getByText('Eight people'), 'color');
    await painted(end(color), 'color');
  }
  await unpainted(current('neutral'), 'background-color');
});

test('group labels take their colour roles, a sticky label sits on the surface and dividers and static rows take theirs', async ({
  page,
}) => {
  await page.goto('/?story=list-subheader');
  const label = page.getByRole('list', { name: 'Group labels' }).locator(':scope > li');
  await paint(page, 'onSurfaceVariant.default');
  await painted(label.nth(0), 'color');
  await paint(page, 'primary.default');
  await painted(label.nth(1), 'color');
  await paint(page, 'secondary.default');
  await painted(label.nth(2), 'color');
  await paint(page, 'surface.default');
  await painted(label.nth(4), 'background-color');
  await unpainted(label.nth(0), 'background-color');
  await page.goto('/?story=list-item');
  await paint(page, 'outlineVariant.default');
  await painted(page.getByTestId('list-item-end'), 'border-bottom-color');
  await paint(page, 'onSurface.default');
  await painted(page.getByTestId('list-item-static'), 'color');
  await page.goto('/?story=list-compositions');
  await paint(page, 'outlineVariant.default');
  await expect
    .poll(() =>
      page
        .getByTestId('list-team-engineering')
        .evaluate((element) => getComputedStyle(element, '::before').borderInlineStartColor),
    )
    .toBe(probe);
});

test('a list row has its own solid colour under hover, while pressed, in keyboard focus, as the current item under hover and press, and when disabled', async ({
  page,
}) => {
  const row = (color: string, state: string) => page.getByTestId(`list-state-md-${color}-${state}`);
  const open = async () => {
    await page.goto('/?story=list-states');
    await page.mouse.move(0, 0);
  };
  await open();
  await paint(page, 'surface.hover');
  await unpainted(row('neutral', 'rest'), 'background-color');
  await row('neutral', 'rest').hover();
  await painted(row('neutral', 'rest'), 'background-color');
  await open();
  await paint(page, 'surface.active');
  await row('neutral', 'rest').hover();
  await unpainted(row('neutral', 'rest'), 'background-color');
  await page.mouse.down();
  await painted(row('neutral', 'rest'), 'background-color');
  await page.mouse.up();
  await open();
  await paint(page, 'surface.hover');
  await row('neutral', 'hover').focus();
  await page.keyboard.press('Tab');
  await expect(row('neutral', 'pressed')).toBeFocused();
  await painted(row('neutral', 'pressed'), 'background-color');
  expect(await css(row('neutral', 'pressed'), 'outline-style')).toBe('solid');
  await open();
  await paint(page, 'surfaceContainerHighest.hover');
  await unpainted(row('neutral', 'selected'), 'background-color');
  await row('neutral', 'selected').hover();
  await painted(row('neutral', 'selected'), 'background-color');
  await paint(page, 'onSurface.default');
  await painted(
    row('neutral', 'selected').locator('xpath=..').locator(':scope > [data-list-item-end]'),
    'color',
  );
  await open();
  await paint(page, 'surfaceContainerHighest.active');
  await row('neutral', 'selected').hover();
  await page.mouse.down();
  await painted(row('neutral', 'selected'), 'background-color');
  await page.mouse.up();
  for (const [color, container] of [
    ['primary', 'primaryContainer'],
    ['secondary', 'secondaryContainer'],
  ] as const) {
    await open();
    await paint(page, `${container}.hover`);
    await row(color, 'selected').hover();
    await painted(row(color, 'selected'), 'background-color');
    await open();
    await paint(page, `${container}.active`);
    await row(color, 'selected').hover();
    await page.mouse.down();
    await painted(row(color, 'selected'), 'background-color');
    await page.mouse.up();
  }
  await open();
  await paint(page, 'surface.hover');
  await paint(page, 'onSurface.disabled');
  const disabled = row('neutral', 'disabled');
  await disabled.hover({ force: true });
  await unpainted(disabled, 'background-color');
  await painted(disabled, 'color');
  await expect(disabled).toBeDisabled();
  expect(await css(disabled, 'cursor')).toBe('default');
  expect(await css(row('neutral', 'rest'), 'cursor')).toBe('pointer');
});

test('a link paints its text and underline with its colour roles in every state', async ({
  page,
}) => {
  await page.goto('/?story=link');
  const neutral = page.getByTestId('link-always-neutral');
  const primary = page.getByTestId('link-always-primary');
  const disabled = page.getByTestId('link-always-disabled');
  await paint(page, 'onSurface.default');
  await painted(neutral, 'color');
  await painted(neutral, 'text-decoration-color');
  await paint(page, 'primary.default');
  await painted(primary, 'color');
  await painted(primary, 'text-decoration-color');
  await paint(page, 'primary.hover');
  await primary.hover();
  await painted(primary, 'color');
  await painted(primary, 'text-decoration-color');
  await paint(page, 'onSurfaceVariant.default');
  await neutral.hover();
  await painted(neutral, 'color');
  await painted(neutral, 'text-decoration-color');
  await page.mouse.move(0, 0);
  await paint(page, 'onSurface.disabled');
  await painted(disabled, 'color');
  await painted(disabled, 'text-decoration-color');
  await painted(page.getByTestId('link-hover-disabled'), 'color');
  await unpainted(page.getByTestId('link-hover-disabled'), 'text-decoration-color');
});

test('a linear progress draws its track in the highest container and its bar in its colour', async ({
  page,
}) => {
  await page.goto('/?story=linear-progress');
  const primary = page.getByTestId('linear-progress-value-50');
  const secondary = page.getByTestId('linear-progress-secondary');
  const indicator = (track: Locator) => track.locator('[data-slot="indicator"]');
  await paint(page, 'surfaceContainerHighest.default');
  await painted(primary, 'background-color');
  await painted(secondary, 'background-color');
  await paint(page, 'primary.default');
  await painted(indicator(primary), 'background-color');
  await unpainted(indicator(secondary), 'background-color');
  await paint(page, 'secondary.default');
  await painted(indicator(secondary), 'background-color');
});

test('a selected paper or card takes the primary edge and the quiet primary tint', async ({
  page,
}) => {
  await page.goto('/?story=paper-selected');
  await paint(page, 'primary.default');
  await paint(page, 'primaryContainer.low');
  for (const variant of ['outlined', 'elevation']) {
    await painted(page.getByTestId(`paper-${variant}-selected`), 'border-top-color');
    await painted(page.getByTestId(`paper-${variant}-selected`), 'background-color');
    await unpainted(page.getByTestId(`paper-${variant}`), 'border-top-color');
    await unpainted(page.getByTestId(`paper-${variant}`), 'background-color');
  }
  await page.goto('/?story=card-selected');
  await paint(page, 'primary.default');
  await paint(page, 'primaryContainer.low');
  await painted(page.getByTestId('card-plan-team'), 'border-left-color');
  await painted(page.getByTestId('card-plan-team'), 'background-color');
  await unpainted(page.getByTestId('card-plan-starter'), 'background-color');
});

test('segmented tabs fill the track with surfaceContainerHigh and raise the selected option on the surface', async ({
  page,
}) => {
  await page.goto('/?story=tabs-segmented');
  const tabs = page.getByTestId('tabs-segmented');
  const option = (name: string) => tabs.getByRole('tab', { name, exact: true });
  await paint(page, 'surfaceContainerHigh.default');
  await painted(tabs.getByRole('tablist'), 'background-color');
  await paint(page, 'surface.default');
  await painted(option('Board'), 'background-color');
  await unpainted(option('List'), 'background-color');
  await paint(page, 'onSurfaceVariant.default');
  await painted(option('List'), 'color');
  await paint(page, 'surface.hover');
  await option('Calendar').hover();
  await painted(option('Calendar'), 'background-color');
  await page.mouse.move(0, 0);
  await paint(page, 'primary.default');
  await painted(
    page.getByTestId('tabs-segmented-primary').getByRole('tab', { name: 'Day', exact: true }),
    'color',
  );
});

test('list markers take the lower-emphasis text role, or the list colour', async ({ page }) => {
  await page.goto('/?story=list-markers');
  const marker = (testId: string) =>
    page.getByTestId(testId).locator('[data-list-item-marker]').first();
  await paint(page, 'onSurfaceVariant.default');
  await painted(marker('list-bullets-neutral'), 'color');
  await painted(marker('list-numbers-neutral'), 'color');
  await unpainted(marker('list-bullets-primary'), 'color');
  await paint(page, 'primary.default');
  await painted(marker('list-bullets-primary'), 'color');
  await paint(page, 'secondary.default');
  await painted(marker('list-numbers-secondary'), 'color');
});
