import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import neutralDark from '../../src/generated/raw/neutral.dark';
import neutralLight from '../../src/generated/raw/neutral.light';
import slateDark from '../../src/generated/raw/slate.dark';
import slateLight from '../../src/generated/raw/slate.light';
import { vars } from '../../src/generated/vars';
import { rgb, type DtcgColor } from './helpers';

const themes = {
  'neutral.light': neutralLight,
  'neutral.dark': neutralDark,
  'slate.light': slateLight,
  'slate.dark': slateDark,
} as const;
type Theme = keyof typeof themes;
type Dimension = { value: number; unit: 'rem' | 'px' };

const raw = (theme: Theme, id: string) => (themes[theme] as Record<string, unknown>)[id];
const colour = (theme: Theme, id: string) => rgb(raw(theme, id) as DtcgColor);
const length = ({ value, unit }: Dimension) => `${unit === 'rem' ? value * 16 : value}px`;

const references = [
  {
    property: 'background-color',
    reference: vars.semantic.primary.default,
    expected: (theme: Theme) => colour(theme, 'semantic.primary.default'),
  },
  {
    property: 'color',
    reference: vars.component.button.contained.primary.hover.root.backgroundColor,
    expected: (theme: Theme) =>
      colour(theme, 'component.button.contained.primary.hover.root.backgroundColor'),
  },
  {
    property: 'border-top-left-radius',
    reference: vars.semantic.radius.md,
    expected: (theme: Theme) => length(raw(theme, 'semantic.radius.md') as Dimension),
  },
  {
    property: 'stroke-width',
    reference: vars.semantic.icon.strokeWidth,
    expected: (theme: Theme) => `${String(raw(theme, 'semantic.icon.strokeWidth'))}px`,
  },
  {
    property: 'font-size',
    reference: vars.semantic.typography.body.md.fontSize,
    expected: (theme: Theme) =>
      length((raw(theme, 'semantic.typography.body.md') as { fontSize: Dimension }).fontSize),
  },
];

const scopes: ReadonlyArray<readonly [string, Theme]> = [
  ['page', 'neutral.light'],
  ['dark', 'neutral.dark'],
  ['slate-dark', 'slate.dark'],
  ['slate-light', 'slate.light'],
  ['slate-inverse', 'slate.dark'],
];

test('tokens.css without Tailwind resolves vars.ts references in every nested scope', async ({
  page,
}) => {
  const stylesheet = await readFile(
    new URL('../../src/generated/tokens.css', import.meta.url),
    'utf8',
  );
  await page.setContent(
    [
      '<!doctype html>',
      '<div data-testid="page"><span data-probe></span></div>',
      '<div data-vy-mode="dark" data-testid="dark"><span data-probe></span>',
      '<div data-vy-brand="slate" data-testid="slate-dark"><span data-probe></span>',
      '<div data-vy-mode="light" data-testid="slate-light"><span data-probe></span>',
      '<div data-vy-mode="inverse" data-testid="slate-inverse"><span data-probe></span>',
      '</div></div></div></div>',
    ].join(''),
  );
  await page.addStyleTag({ content: stylesheet });
  for (const [scope, theme] of scopes) {
    const element = page.getByTestId(scope);
    const computed = await element.evaluate(
      (target, entries) => {
        const probe = target.querySelector(':scope > [data-probe]');
        if (!(probe instanceof HTMLElement)) throw new Error('The scope has no probe');
        return entries.map(({ property, reference }) => {
          probe.style.setProperty(property, reference);
          return getComputedStyle(probe).getPropertyValue(property);
        });
      },
      references.map(({ property, reference }) => ({ property, reference })),
    );
    references.forEach(({ property, expected }, index) =>
      expect(computed[index], `${scope} ${property}`).toBe(expected(theme)),
    );
    expect(
      await (scope === 'page' ? page.locator('html') : element).evaluate(
        (target) => getComputedStyle(target).backgroundColor,
      ),
      `${scope} surface`,
    ).toBe(colour(theme, 'semantic.surface.default'));
  }
});
