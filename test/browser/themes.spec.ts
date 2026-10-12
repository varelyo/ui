import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import { themes, type KitTheme } from '../../src/generated/themes';
import { vars } from '../../src/generated/vars';

type Tree = { readonly [key: string]: string | Tree };

const leaves = (node: string | Tree, prefix: readonly string[] = []): Array<[string, string]> =>
  typeof node === 'string'
    ? [[prefix.join('.'), node]]
    : Object.entries(node).flatMap(([key, value]) => leaves(value, [...prefix, key]));

const runtime = leaves(vars.semantic as Tree).filter(([, reference]) =>
  reference.startsWith('var('),
);

const valueAt = (theme: KitTheme, path: string) =>
  path
    .split('.')
    .reduce<string | Tree>(
      (node, key) => (node as Tree)[key] as string | Tree,
      theme.semantic as Tree,
    );

test('every theme object equals the computed runtime variables of its scope', async ({ page }) => {
  const stylesheet = await readFile(
    new URL('../../src/generated/tokens.css', import.meta.url),
    'utf8',
  );
  await page.setContent(
    [
      '<!doctype html>',
      '<div data-testid="neutral.light"></div>',
      '<div data-vy-mode="dark" data-testid="neutral.dark">',
      '<div data-vy-brand="slate" data-testid="slate.dark">',
      '<div data-vy-mode="light" data-testid="slate.light"></div>',
      '</div></div>',
    ].join(''),
  );
  await page.addStyleTag({ content: stylesheet });
  expect(runtime.length).toBeGreaterThan(100);
  for (const [name, theme] of Object.entries(themes)) {
    const computed = await page.getByTestId(name).evaluate(
      (element, names) =>
        names.map((variable) => getComputedStyle(element).getPropertyValue(variable).trim()),
      runtime.map(([, reference]) => reference.slice('var('.length, -1)),
    );
    runtime.forEach(([path], index) =>
      expect(computed[index], `${name} ${path}`).toBe(valueAt(theme, path)),
    );
  }
});
