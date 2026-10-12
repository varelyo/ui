import { expect, test } from '@playwright/test';

test('progress indicators expose progressbar semantics', async ({ page }) => {
  await page.goto('/?story=circular-progress');
  await expect(page.getByRole('progressbar', { name: 'primary progress' })).not.toHaveAttribute(
    'aria-valuenow',
    /.*/,
  );
  for (const value of [0, 25, 50, 75, 100])
    await expect(
      page.getByRole('progressbar', { name: `${value} percent`, exact: true }),
    ).toHaveAttribute('aria-valuenow', String(value));
  const sizes = await Promise.all(
    ['sm', 'md', 'lg', 'xl'].map(
      async (size) =>
        (await page.getByRole('progressbar', { name: `${size} progress` }).boundingBox())?.width,
    ),
  );
  expect(sizes).toEqual([16, 20, 24, 40]);
});
