import { expect, test } from '@playwright/test';
import raw from '../../src/generated/raw/neutral.light';
import { matrixBreakpoints } from '../../playground/stories/matrix';

type Dimension = { value: number; unit: string };
const values = raw as unknown as Record<string, unknown>;
const px = (id: string) => {
  const dimension = values[id] as Dimension | undefined;
  if (!dimension) throw new Error(`Missing ${id}`);
  return `${dimension.unit === 'rem' ? dimension.value * 16 : dimension.value}px`;
};
const typeSize = (variant: string) => {
  const [style, size] = variant.split('-');
  const composite = values[`semantic.typography.${style}.${size}`] as { fontSize: Dimension };
  return `${composite.fontSize.value * 16}px`;
};
const minimum = { sm: 576, md: 832, lg: 1152, xl: 1440 } as const;
const paddingSides: Record<string, readonly string[]> = {
  all: ['top', 'right', 'bottom', 'left'],
  vertical: ['top', 'bottom'],
  horizontal: ['right', 'left'],
  'three-top': ['top'],
  'three-horizontal': ['right', 'left'],
  'three-bottom': ['bottom'],
  'four-top': ['top'],
  'four-right': ['right'],
  'four-bottom': ['bottom'],
  'four-left': ['left'],
};

type Measured = Record<string, string>;

function expected(kind: string, parameter: string, active: boolean): Measured {
  if (kind === 'gap') {
    const gap = active ? px(`semantic.space.${parameter}`) : '0px';
    return { rowGap: gap, columnGap: gap };
  }
  if (kind === 'pair-row')
    return { rowGap: active ? px(`semantic.space.${parameter}`) : '0px', columnGap: '0px' };
  if (kind === 'pair-column')
    return { rowGap: '0px', columnGap: active ? px(`semantic.space.${parameter}`) : '0px' };
  if (kind.startsWith('padding-')) {
    const sides = paddingSides[kind.slice('padding-'.length)] ?? [];
    return Object.fromEntries(
      ['top', 'right', 'bottom', 'left'].map((side) => [
        `padding-${side}`,
        active && sides.includes(side) ? px(`semantic.space.${parameter}`) : '0px',
      ]),
    );
  }
  if (kind === 'columns') return { tracks: active ? parameter : '1' };
  if (kind === 'span') return { gridColumnEnd: `span ${active ? parameter : '12'}` };
  if (kind === 'offset')
    return {
      gridColumnStart: active && parameter !== '0' ? String(Number(parameter) + 1) : 'auto',
    };
  if (kind === 'max-width')
    return { maxWidth: active ? px(`semantic.container.${parameter}`) : 'none' };
  if (kind.startsWith('display-')) return { display: active ? parameter : 'none' };
  if (kind === 'direction') return { flexDirection: active ? parameter : 'column' };
  if (kind === 'align') return { alignItems: active ? parameter : 'stretch' };
  if (kind === 'justify') return { justifyContent: active ? parameter : 'flex-start' };
  if (kind === 'grow') return { flexGrow: active ? parameter : String(1 - Number(parameter)) };
  if (kind === 'min-height') {
    const viewport = (parameter === 'viewport') === active;
    return { minHeight: viewport ? '900px' : 'auto' };
  }
  if (kind === 'variant') return { fontSize: typeSize(active ? parameter : 'body-md') };
  if (kind === 'icon') return { width: px(`semantic.iconSize.${active ? parameter : 'md'}`) };
  if (kind === 'button' || kind === 'field')
    return { minHeight: px(`semantic.controlHeight.${active ? parameter : 'md'}`) };
  throw new Error(`Unknown case ${kind}`);
}

test('every responsive layout value applies from its own breakpoint', async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto('/?story=matrix');
  await page.locator('[data-case]').first().waitFor({ state: 'attached' });
  const failures: string[] = [];
  let checked = 0;
  for (const breakpoint of matrixBreakpoints) {
    const probes: Array<readonly [number, boolean]> =
      breakpoint === 'xs'
        ? [[400, true]]
        : [
            [minimum[breakpoint], true],
            [minimum[breakpoint] - 1, false],
          ];
    for (const [width, active] of probes) {
      await page.setViewportSize({ width, height: 900 });
      const measured = await page.evaluate((current) => {
        const result: Record<string, Record<string, string>> = {};
        for (const element of document.querySelectorAll<HTMLElement>('[data-case]')) {
          const id = element.dataset.case ?? '';
          if (id.split(':')[1] !== current) continue;
          const target =
            element.tagName === 'INPUT'
              ? (element.closest('[data-slot="input"]') as HTMLElement)
              : element;
          const style = getComputedStyle(target);
          result[id] = {
            rowGap: style.rowGap,
            columnGap: style.columnGap,
            'padding-top': style.paddingTop,
            'padding-right': style.paddingRight,
            'padding-bottom': style.paddingBottom,
            'padding-left': style.paddingLeft,
            tracks: String(style.gridTemplateColumns.split(' ').filter(Boolean).length),
            gridColumnEnd: style.gridColumnEnd,
            gridColumnStart: style.gridColumnStart,
            maxWidth: style.maxWidth,
            display: style.display,
            flexDirection: style.flexDirection,
            alignItems: style.alignItems,
            justifyContent: style.justifyContent,
            flexGrow: style.flexGrow,
            fontSize: style.fontSize,
            width: style.width,
            minHeight: style.minHeight,
          };
        }
        return result;
      }, breakpoint);
      for (const [id, actual] of Object.entries(measured)) {
        const [kind = '', , parameter = ''] = id.split(':');
        for (const [property, value] of Object.entries(expected(kind, parameter, active))) {
          checked++;
          if (actual[property] !== value)
            failures.push(`${id} at ${width}px: ${property} ${actual[property]} ≠ ${value}`);
        }
      }
    }
  }
  expect(failures).toEqual([]);
  expect(checked).toBeGreaterThan(2000);
});
