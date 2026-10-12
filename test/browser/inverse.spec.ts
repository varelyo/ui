import { expect, test } from '@playwright/test';
import neutralDark from '../../src/generated/raw/neutral.dark';
import neutralLight from '../../src/generated/raw/neutral.light';
import { css, rgb, type DtcgColor } from './helpers';

const themes = { light: neutralLight, dark: neutralDark } as const;
const opposite = { light: 'dark', dark: 'light' } as const;
const colour = (mode: keyof typeof themes, id: string) =>
  rgb((themes[mode] as Record<string, unknown>)[`semantic.${id}`] as DtcgColor);

for (const mode of ['light', 'dark'] as const) {
  test(`an inverse scope on a ${mode} page takes the ${opposite[mode]} mode, an explicit mode inside it wins and its portals invert it again`, async ({
    page,
  }) => {
    await page.goto(`/?story=theme-scope&mode=${mode}`);
    const scope = page.getByTestId('inverse-scope');
    expect(await css(scope, 'background-color')).toBe(colour(opposite[mode], 'surface.default'));
    expect(await css(scope, 'color-scheme')).toBe(opposite[mode]);
    expect(await css(page.getByTestId('inverse-button'), 'background-color')).toBe(
      colour(opposite[mode], 'primary.default'),
    );
    expect(await css(page.getByTestId('inverse-dark-scope'), 'background-color')).toBe(
      colour('dark', 'surface.default'),
    );
    const tooltip = page.getByTestId('inverse-tooltip');
    await expect(tooltip).toBeVisible();
    expect(
      await tooltip.evaluate((element) =>
        element.parentElement?.closest('[data-vy-mode]')?.getAttribute('data-vy-mode'),
      ),
    ).toBe(opposite[mode]);
    expect(await tooltip.getAttribute('data-vy-mode')).toBe('inverse');
    expect(await css(tooltip, 'background-color')).toBe(
      colour(mode, 'surfaceContainerHighest.default'),
    );
  });

  test(`a snackbar on a ${mode} page renders in the ${opposite[mode]} mode and its action takes that mode's primary`, async ({
    page,
  }) => {
    await page.goto(`/?story=snackbar&mode=${mode}`);
    await page.getByTestId('snackbar-open').click();
    const surface = page.getByTestId('snackbar');
    await expect(surface).toBeVisible();
    await expect
      .poll(() => css(surface, 'background-color'))
      .toBe(colour(opposite[mode], 'surfaceContainerHighest.default'));
    expect(await css(surface, 'color')).toBe(colour(opposite[mode], 'onSurface.default'));
    expect(await css(page.getByTestId('snackbar-undo'), 'color')).toBe(
      colour(opposite[mode], 'primary.default'),
    );
    expect(await css(page.locator('main'), 'background-color')).toBe(
      colour(mode, 'surface.default'),
    );
  });
}
