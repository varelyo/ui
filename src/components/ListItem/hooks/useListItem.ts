import { use, useMemo, type ReactNode } from 'react';
import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { ListContext } from '../../List';
import { LIST_ITEM_COMPONENT_NAME_KEY } from '../ListItem.constants';
import type { UseListItemParams, UseListItemResult } from '../ListItem.types';

const present = (node: ReactNode) => node !== undefined && node !== null && node !== false;

export function useListItem({ component, end }: UseListItemParams): UseListItemResult {
  const list = use(ListContext);
  const hasEnd = present(end);
  const context = useMemo(() => ({ end: hasEnd }), [hasEnd]);
  const childProps = componentTokens[LIST_ITEM_COMPONENT_NAME_KEY].childProps;
  return {
    Component: component ?? (list.listElement ? 'li' : 'div'),
    variant: list.variant,
    size: list.size,
    color: list.color,
    iconSize: mapResponsive(list.size, (step) => childProps[step].icon.size),
    context,
  };
}
