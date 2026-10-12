import type { Key, ReactNode } from 'react';
import type { BreadcrumbsEntry } from './Breadcrumbs.types';

export function breadcrumbEntries(
  items: ReadonlyArray<{ key: Key; node: ReactNode }>,
  collapsed: boolean,
  before: number,
  after: number,
  revealedIndex: number | null,
): BreadcrumbsEntry[] {
  const last = items.length - 1;
  const entry = (index: number): BreadcrumbsEntry => ({
    kind: 'item',
    key: items[index]!.key,
    node: items[index]!.node,
    current: index === last,
    revealed: index === revealedIndex,
  });
  if (!collapsed) return items.map((_, index) => entry(index));
  return [
    ...items.slice(0, before).map((_, index) => entry(index)),
    { kind: 'collapse', key: 'collapse' },
    ...items.slice(items.length - after).map((_, index) => entry(items.length - after + index)),
  ];
}
