import { use } from 'react';
import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { ListContext } from '../../List';
import { LIST_ITEM_ICON_COMPONENT_NAME_KEY } from '../ListItemIcon.constants';
import type { UseListItemIconParams, UseListItemIconResult } from '../ListItemIcon.types';

export function useListItemIcon({ size }: UseListItemIconParams): UseListItemIconResult {
  const list = use(ListContext);
  const childProps = componentTokens[LIST_ITEM_ICON_COMPONENT_NAME_KEY].childProps;
  return {
    variant: list.variant,
    listSize: list.size,
    iconSize: size ?? mapResponsive(list.size, (step) => childProps[step].icon.size),
  };
}
