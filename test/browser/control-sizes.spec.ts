import { expect, test } from '@playwright/test';
import neutral from '../../src/generated/raw/neutral.light';
import slate from '../../src/generated/raw/slate.light';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const controls = ['button', 'icon-button', 'text-field', 'select', 'chip', 'avatar'] as const;
const themes = { neutral, slate } as const;

const height = (theme: keyof typeof themes, size: (typeof sizes)[number]) => {
  const token = (themes[theme] as unknown as Record<string, { value: number; unit: string }>)[
    `semantic.controlHeight.${size}`
  ];
  if (token?.unit !== 'rem') throw new Error(`Missing semantic.controlHeight.${size}`);
  return token.value * 16;
};

for (const theme of Object.keys(themes) as (keyof typeof themes)[])
  test(`every control of one size is as high as the control height of that size in ${theme}`, async ({
    page,
  }) => {
    await page.goto(`/?story=control-sizes&brand=${theme}&mode=light`);
    for (const size of sizes) {
      const row = page.getByTestId(`control-row-${size}`);
      await row.waitFor();
      for (const control of controls) {
        const element = row.locator(`[data-control="${control}"]`);
        const box = await element.evaluate(
          (node) =>
            (
              node.closest('.vy-text-field-input') ??
              node.querySelector('.vy-text-field-input') ??
              node
            ).getBoundingClientRect().height,
        );
        expect(box, `${size} ${control}`).toBe(height(theme, size));
      }
    }
  });

const tokenPx = (id: string) => {
  const token = (neutral as unknown as Record<string, { value: number; unit: string }>)[id];
  if (token?.unit !== 'rem') throw new Error(`Missing ${id}`);
  return `${token.value * 16}px`;
};

test('an icon addon takes the addon padding on its side, a nested control the inset padding, and controls keep the control height', async ({
  page,
}) => {
  await page.goto('/?story=control-addons&brand=neutral&mode=light');
  for (const size of sizes) {
    const row = page.getByTestId(`addon-row-${size}`);
    await row.waitFor();
    const padding = tokenPx(`semantic.controlPaddingHorizontal.${size}`);
    const addon = tokenPx(`semantic.controlPaddingAddon.${size}`);
    const sides = async (control: string) =>
      row.locator(`[data-control="${control}"]`).evaluate((node) => {
        const box =
          node.closest('.vy-text-field-input') ??
          node.querySelector('.vy-text-field-input') ??
          node;
        const style = getComputedStyle(box);
        return {
          start: style.paddingInlineStart,
          end: style.paddingInlineEnd,
          height: box.getBoundingClientRect().height,
        };
      });
    expect(await sides('button-text')).toEqual({
      start: padding,
      end: padding,
      height: height('neutral', size),
    });
    expect(await sides('button-start')).toEqual({
      start: addon,
      end: padding,
      height: height('neutral', size),
    });
    expect(await sides('button-end')).toEqual({
      start: padding,
      end: addon,
      height: height('neutral', size),
    });
    const inset = tokenPx(`semantic.controlPaddingInset.${size}`);
    for (const [control, start, end] of [
      ['text-field', addon, inset],
      ['select', addon, addon],
      ['chip', inset, addon],
    ] as const)
      expect(await sides(control), `${size} ${control}`).toEqual({
        start,
        end,
        height: height('neutral', size),
      });
  }
});
