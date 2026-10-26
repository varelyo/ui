import { expect, test } from '@playwright/test';
import neutralDark from '../../src/generated/raw/neutral.dark';
import neutralLight from '../../src/generated/raw/neutral.light';
import slateDark from '../../src/generated/raw/slate.dark';
import slateLight from '../../src/generated/raw/slate.light';
import { css, renderCount, rgb, type DtcgColor } from './helpers';

const themes = {
  'neutral.light': neutralLight,
  'neutral.dark': neutralDark,
  'slate.light': slateLight,
  'slate.dark': slateDark,
} as const;

const colour = (theme: keyof typeof themes, id: string) =>
  rgb((themes[theme] as Record<string, unknown>)[id] as DtcgColor);

test('brand and mode attributes repaint the scope without a React render', async ({ page }) => {
  await page.goto('/?story=engine');
  const scope = page.getByTestId('switchable');
  const button = page.getByTestId('switch-button');
  const icon = page.getByTestId('switch-icon');
  await expect(button).toBeVisible();
  const renders = await renderCount(page);
  expect(await css(button, 'background-color')).toBe(
    colour('neutral.light', 'semantic.primary.default'),
  );
  expect(await css(icon, 'stroke-width')).toBe('1.75px');
  expect(await css(icon, 'stroke-linecap')).toBe('round');
  for (const theme of ['slate.light', 'slate.dark', 'neutral.dark'] as const) {
    const [brand, mode] = theme.split('.') as [string, string];
    await scope.evaluate(
      (element, [nextBrand, nextMode]) => {
        element.setAttribute('data-vy-brand', nextBrand as string);
        element.setAttribute('data-vy-mode', nextMode as string);
      },
      [brand, mode],
    );
    await expect
      .poll(() => css(button, 'background-color'))
      .toBe(colour(theme, 'semantic.primary.default'));
    expect(await css(scope, 'background-color')).toBe(colour(theme, 'semantic.surface.default'));
    expect(await css(scope, 'color')).toBe(colour(theme, 'semantic.onSurface.default'));
  }
  await scope.evaluate((element) => element.setAttribute('data-vy-brand', 'slate'));
  expect(await css(icon, 'stroke-width')).toBe('2px');
  expect(await css(icon, 'stroke-linecap')).toBe('square');
  expect(await renderCount(page)).toBe(renders);
});

test('responsive props change at breakpoints without a React render', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/?story=engine');
  const target = page.getByTestId('responsive-display');
  await expect(target).toBeHidden();
  const renders = await renderCount(page);
  await page.setViewportSize({ width: 1100, height: 900 });
  await expect(target).toBeVisible();
  await page.setViewportSize({ width: 480, height: 900 });
  await expect(target).toBeHidden();
  expect(await renderCount(page)).toBe(renders);
});

test('page-authored utilities and Tailwind defaults generate no CSS', async ({ page }) => {
  await page.goto('/?story=engine');
  const forbidden = page.getByTestId('forbidden');
  expect(await css(forbidden, 'padding-top')).toBe('0px');
  expect(await css(forbidden, 'background-color')).toBe('rgba(0, 0, 0, 0)');
  expect(await css(forbidden, 'box-shadow')).toBe('none');
  expect(await css(forbidden, 'border-top-left-radius')).toBe('0px');
  const selectors = await page.evaluate(() =>
    [...document.styleSheets].flatMap((sheet) => {
      const collect = (rules: CSSRuleList): string[] =>
        [...rules].flatMap((rule) =>
          rule instanceof CSSStyleRule
            ? [rule.selectorText]
            : 'cssRules' in rule
              ? collect((rule as CSSGroupingRule).cssRules)
              : [],
        );
      return collect(sheet.cssRules);
    }),
  );
  for (const utility of [
    '.p-4',
    '.w-64',
    '.bg-slate-500',
    '.text-red-500',
    '.rounded-full',
    '.shadow-lg',
  ])
    expect(selectors).not.toContain(utility);
  const root = page.locator('html');
  for (const variable of [
    '--color-neutral-500',
    '--color-primary-500',
    '--color-blue-600',
    '--spacing',
    '--color-slate-500',
  ])
    expect(await css(root, variable)).toBe('');
});

test('an outermost scope without props renders the generated default brand and mode', async ({
  page,
}) => {
  const { defaultBrand, defaultMode } = await import('../../src/generated/maps');
  await page.goto('/?story=theme-scope-defaults');
  const outermost = page.getByTestId('outermost-scope');
  await expect(outermost).toHaveAttribute('data-vy-brand', defaultBrand);
  await expect(outermost).toHaveAttribute('data-vy-mode', defaultMode);
  const nested = page.getByTestId('nested-scope');
  expect(await nested.getAttribute('data-vy-brand')).toBeNull();
  expect(await nested.getAttribute('data-vy-mode')).toBeNull();
  await expect(page.getByTestId('outermost-inverse')).toHaveAttribute('data-vy-mode', 'inverse');
});
