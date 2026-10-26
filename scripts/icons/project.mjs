const literal = (value) => `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
const element = ({ fill, ...shape }) => {
  const paint = fill ? `, fill: ${literal(fill)}` : '';
  if (shape.path) return `{ path: ${literal(shape.path)}${paint} }`;
  const [tag, values] = Object.entries(shape)[0];
  return `{ ${tag}: [${values.join(', ')}]${paint} }`;
};

export function projectIcons(icons) {
  const names = [...icons.keys()].sort((a, b) => a.localeCompare(b, 'en'));
  const entries = names.map(
    (name) => `  ${literal(name)}: [${icons.get(name).map(element).join(', ')}],`,
  );
  return [
    'export type IconElement =',
    "  | { readonly path: string; readonly fill?: 'currentColor' }",
    "  | { readonly circle: readonly [number, number, number]; readonly fill?: 'currentColor' }",
    "  | { readonly ellipse: readonly [number, number, number, number]; readonly fill?: 'currentColor' };",
    '',
    'export const icons = {',
    ...entries,
    '} as const satisfies Readonly<Record<string, readonly IconElement[]>>;',
    '',
    'export type IconName = keyof typeof icons;',
    '',
  ].join('\n');
}
