const literal = (value) => `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
const element = (item) => {
  if (item.path) return `{ path: ${literal(item.path)} }`;
  const [tag, values] = Object.entries(item)[0];
  return `{ ${tag}: [${values.join(', ')}] }`;
};

export function projectIcons(icons) {
  const names = [...icons.keys()].sort((a, b) => a.localeCompare(b, 'en'));
  const entries = names.map(
    (name) => `  ${literal(name)}: [${icons.get(name).map(element).join(', ')}],`,
  );
  return [
    'export type IconElement =',
    '  | { readonly path: string }',
    '  | { readonly circle: readonly [number, number, number] }',
    '  | { readonly ellipse: readonly [number, number, number, number] };',
    '',
    'export const icons = {',
    ...entries,
    '} as const satisfies Readonly<Record<string, readonly IconElement[]>>;',
    '',
    'export type IconName = keyof typeof icons;',
    '',
  ].join('\n');
}
