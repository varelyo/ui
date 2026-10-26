import { useListItem, useMergeRefs } from '@floating-ui/react';
import { use } from 'react';
import { MenuContext } from '../../Menu';
import type { UseMenuItemParams, UseMenuItemResult } from '../MenuItem.types';

export function useMenuItem({ ref }: UseMenuItemParams): UseMenuItemResult {
  const menu = use(MenuContext);
  const listItem = useListItem();
  const merged = useMergeRefs<HTMLElement>([listItem.ref, ref]);
  return {
    variant: menu.variant,
    ref: (node) => merged?.(node),
    tabIndex: listItem.index !== -1 && menu.activeIndex === listItem.index ? 0 : -1,
    iconSize: menu.iconSize,
    getItemProps: menu.getItemProps,
  };
}
