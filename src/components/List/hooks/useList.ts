import { use, useMemo } from 'react';
import { ListContext } from '../context';
import { LIST_ELEMENTS } from '../List.constants';
import type { UseListParams, UseListResult } from '../List.types';

export function useList({ variant, size, color, component }: UseListParams): UseListResult {
  const parent = use(ListContext);
  const Component = component ?? 'ul';
  const listElement = typeof Component !== 'string' || LIST_ELEMENTS.includes(Component);
  const resolvedVariant = variant ?? parent.variant;
  const resolvedSize = size ?? parent.size;
  const resolvedColor = color ?? parent.color;
  const context = useMemo(
    () => ({ variant: resolvedVariant, size: resolvedSize, color: resolvedColor, listElement }),
    [resolvedVariant, resolvedSize, resolvedColor, listElement],
  );
  return { Component, subheaderComponent: listElement ? 'li' : 'div', context };
}
