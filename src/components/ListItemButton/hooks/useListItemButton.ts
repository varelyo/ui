import { use, useMemo } from 'react';
import { useMergedRefs } from '../../../hooks';
import { ListContext, ListItemContext } from '../../List';
import type { UseListItemButtonParams, UseListItemButtonResult } from '../ListItemButton.types';
import { useAutoFocus } from './useAutoFocus';

export function useListItemButton({
  color,
  size,
  selected,
  autoFocus,
  ref,
  ariaCurrent,
}: UseListItemButtonParams): UseListItemButtonResult {
  const list = use(ListContext);
  const item = use(ListItemContext);
  const focus = useAutoFocus({ autoFocus });
  const merged = useMergedRefs<HTMLElement>(focus, ref);
  const resolvedSize = size ?? list.size;
  const resolvedColor = color ?? list.color;
  const context = useMemo(
    () => ({
      variant: list.variant,
      size: resolvedSize,
      color: resolvedColor,
      listElement: false,
    }),
    [list.variant, resolvedSize, resolvedColor],
  );
  return {
    ref: merged,
    end: item.end,
    context,
    rootProps: {
      'aria-current': ariaCurrent ?? (selected ? 'page' : undefined),
      'data-selected': selected ? '' : undefined,
    },
  };
}
