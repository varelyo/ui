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

test('a linear progress is a progressbar that exposes its clamped value only when determinate', async ({
  page,
}) => {
  await page.goto('/?story=linear-progress');
  const indeterminate = page.getByRole('progressbar', { name: 'primary progress' });
  for (const attribute of ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'])
    await expect(indeterminate).not.toHaveAttribute(attribute, /.*/);
  for (const value of [0, 25, 50, 75, 100]) {
    const bar = page.getByRole('progressbar', { name: `${value} percent`, exact: true });
    await expect(bar).toHaveAttribute('aria-valuenow', String(value));
    await expect(bar).toHaveAttribute('aria-valuemin', '0');
    await expect(bar).toHaveAttribute('aria-valuemax', '100');
    const [track, indicator] = await Promise.all([
      bar.boundingBox(),
      bar.locator('[data-slot="indicator"]').boundingBox(),
    ]);
    expect(Math.round(indicator!.width)).toBe(Math.round((track!.width * value) / 100));
  }
  const upload = page.getByRole('progressbar', { name: 'Uploading 1 of 4 files' });
  await expect(upload).toHaveAttribute('aria-valuenow', '25');
  await page.getByTestId('linear-progress-advance').click();
  await expect(page.getByRole('progressbar', { name: 'Uploading 2 of 4 files' })).toHaveAttribute(
    'aria-valuenow',
    '50',
  );
  await page.goto('/?story=contracts');
  await expect(page.locator('[data-extra="linear-progress"]')).toHaveAttribute(
    'aria-valuenow',
    '100',
  );
});

test('a linear progress takes its thickness from the size step and rounds both ends', async ({
  page,
}) => {
  await page.goto('/?story=linear-progress');
  const heights = await Promise.all(
    ['sm', 'md', 'lg', 'xl'].map(
      async (size) => (await page.getByTestId(`linear-progress-${size}`).boundingBox())?.height,
    ),
  );
  expect(heights).toEqual([2, 4, 8, 12]);
  for (const size of ['sm', 'xl']) {
    const track = page.getByTestId(`linear-progress-${size}`);
    const indicator = track.locator('[data-slot="indicator"]');
    for (const element of [track, indicator])
      expect(
        await element.evaluate((node) => {
          const style = getComputedStyle(node);
          return [style.overflow, Number.parseFloat(style.borderTopLeftRadius) >= 6];
        }),
      ).toEqual([element === track ? 'hidden' : 'visible', true]);
  }
  const responsive = page.getByTestId('linear-progress-responsive');
  expect((await responsive.boundingBox())?.height).toBe(12);
  await page.setViewportSize({ width: 600, height: 900 });
  await expect.poll(async () => (await responsive.boundingBox())?.height).toBe(2);
});

test('an indeterminate bar slides, and under reduced motion fills the track and only fades', async ({
  page,
}) => {
  await page.goto('/?story=linear-progress');
  const indicator = page.getByTestId('linear-progress-primary').locator('[data-slot="indicator"]');
  const determinate = page
    .getByTestId('linear-progress-value-50')
    .locator('[data-slot="indicator"]');
  expect(await indicator.evaluate((node) => getComputedStyle(node).animationName)).toBe('vy-slide');
  expect(await determinate.evaluate((node) => getComputedStyle(node).animationName)).toBe('none');
  expect(await determinate.evaluate((node) => getComputedStyle(node).transitionDuration)).not.toBe(
    '0s',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => indicator.evaluate((node) => getComputedStyle(node).animationName))
    .toBe('vy-pulse');
  const [track, bar] = await Promise.all([
    page.getByTestId('linear-progress-primary').boundingBox(),
    indicator.boundingBox(),
  ]);
  expect(bar!.width).toBe(track!.width);
  expect(bar!.x).toBe(track!.x);
  expect(await determinate.evaluate((node) => getComputedStyle(node).transitionProperty)).toBe(
    'none',
  );
});
