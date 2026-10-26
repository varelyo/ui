import { expect, test, type Page } from '@playwright/test';
import raw from '../../src/generated/raw/neutral.light';
import { css } from './helpers';

type Dimension = { value: number; unit: string };
const values = raw as unknown as Record<string, unknown>;
const px = (id: string) => {
  const dimension = values[id] as Dimension | undefined;
  if (!dimension) throw new Error(`Missing ${id}`);
  return `${dimension.unit === 'rem' ? dimension.value * 16 : dimension.value}px`;
};
const names = (page: Page) =>
  page
    .getByTestId('members')
    .locator('tbody tr')
    .evaluateAll((rows) => rows.map((row) => row.querySelector('td')?.textContent ?? ''));

test.beforeEach(async ({ page }) => {
  await page.goto('/?story=table-sort-label');
});

test('the sorted column header carries aria-sort and the other headers carry none', async ({
  page,
}) => {
  const name = page.getByRole('columnheader', { name: 'Name', exact: true });
  await expect(name).toHaveAttribute('aria-sort', 'ascending');
  await expect(name).toHaveAttribute('scope', 'col');
  for (const header of ['Role', 'Joined', 'Status', 'Actions'])
    await expect(page.getByRole('columnheader', { name: header, exact: true })).not.toHaveAttribute(
      'aria-sort',
    );
  expect(await names(page)).toEqual([
    'Ada Lovelace',
    'Alan Turing',
    'Grace Hopper',
    'Katherine Johnson',
  ]);
});

test('the sort label is a native button named by its label, with the arrow hidden from assistive technology', async ({
  page,
}) => {
  const label = page.getByRole('button', { name: 'Name', exact: true });
  await expect(label).toHaveAttribute('type', 'button');
  await expect(label).toHaveAccessibleName('Name');
  await expect(label).toHaveAttribute('data-active', '');
  await expect(page.getByRole('button', { name: 'Role', exact: true })).not.toHaveAttribute(
    'data-active',
  );
  const icon = label.locator('[data-slot="sort-icon"]');
  await expect(icon).toHaveAttribute('aria-hidden', 'true');
  await expect(icon).toHaveAttribute('data-icon', 'arrow-up');
  expect(await label.evaluate((element) => element.parentElement?.tagName)).toBe('TH');
  for (const attribute of ['active', 'direction', 'sortdirection'])
    expect(
      await page
        .getByTestId('members')
        .evaluate((table, name) => table.querySelectorAll(`[${name}]`).length, attribute),
    ).toBe(0);
});

test('a click hands the sort to the page: the same column turns descending, another column sorts ascending', async ({
  page,
}) => {
  const name = page.getByRole('columnheader', { name: 'Name', exact: true });
  const joined = page.getByRole('columnheader', { name: 'Joined', exact: true });
  await page.getByRole('button', { name: 'Name', exact: true }).click();
  await expect(name).toHaveAttribute('aria-sort', 'descending');
  await expect(name.locator('[data-slot="sort-icon"]')).toHaveAttribute('data-icon', 'arrow-down');
  expect(await names(page)).toEqual([
    'Katherine Johnson',
    'Grace Hopper',
    'Alan Turing',
    'Ada Lovelace',
  ]);
  await page.getByRole('button', { name: 'Joined', exact: true }).click();
  await expect(joined).toHaveAttribute('aria-sort', 'ascending');
  await expect(name).not.toHaveAttribute('aria-sort');
  await expect(page.getByRole('button', { name: 'Name', exact: true })).not.toHaveAttribute(
    'data-active',
  );
  expect(await names(page)).toEqual([
    'Ada Lovelace',
    'Grace Hopper',
    'Katherine Johnson',
    'Alan Turing',
  ]);
});

test('the sort label works from the keyboard and shows the shared focus ring', async ({ page }) => {
  const role = page.getByRole('button', { name: 'Role', exact: true });
  const header = page.getByRole('columnheader', { name: 'Role', exact: true });
  await page.getByRole('button', { name: 'Name', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(role).toBeFocused();
  expect(await css(role, 'outline-style')).toBe('solid');
  expect(await css(role, 'outline-width')).toBe(px('semantic.borderWidth.md'));
  await page.keyboard.press('Enter');
  await expect(header).toHaveAttribute('aria-sort', 'ascending');
  await page.keyboard.press('Space');
  await expect(header).toHaveAttribute('aria-sort', 'descending');
  await expect(role).toBeFocused();
});

test('the arrow takes the icon size and the gap the table size gives it', async ({ page }) => {
  const steps = {
    sm: { icon: 'sm', gap: '2xs' },
    md: { icon: 'sm', gap: 'xs' },
    lg: { icon: 'md', gap: 'xs' },
  } as const;
  for (const size of ['sm', 'md', 'lg'] as const) {
    const table = page.getByTestId(`sorted-${size}`);
    const label = table.getByRole('button', { name: `Name ${size}`, exact: true });
    const icon = label.locator('[data-slot="sort-icon"]');
    expect(await css(icon, 'width')).toBe(px(`semantic.iconSize.${steps[size].icon}`));
    expect(await css(label, 'column-gap')).toBe(px(`semantic.space.${steps[size].gap}`));
    const inactive = table.getByRole('button', { name: 'Amount', exact: true });
    await expect(inactive.locator('[data-slot="sort-icon"]')).toHaveAttribute(
      'data-icon',
      'arrow-up',
    );
  }
  await expect(
    page.getByTestId('sorted-md').getByRole('columnheader', { name: 'Name md' }),
  ).toHaveAttribute('aria-sort', 'descending');
  await expect(
    page.getByTestId('sorted-md').locator('[data-slot="sort-icon"]').first(),
  ).toHaveAttribute('data-icon', 'arrow-down');
});

test('in md and lg tables the arrow stays within the line of the header label', async ({
  page,
}) => {
  for (const size of ['md', 'lg'] as const) {
    const header = page
      .getByTestId(`sorted-${size}`)
      .getByRole('columnheader', { name: `Name ${size}`, exact: true });
    const line = Number.parseFloat(await css(header, 'line-height'));
    expect((await header.getByRole('button').boundingBox())!.height).toBeLessThanOrEqual(line);
  }
});
