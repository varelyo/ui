import { use } from 'react';
import { componentTokens } from '../../../generated/maps';
import { SIDEBAR_SIZE, SidebarContext } from '../../Sidebar';
import { SIDEBAR_ITEM_COMPONENT_NAME_KEY } from '../SidebarItem.constants';
import type { UseSidebarItemParams, UseSidebarItemResult } from '../SidebarItem.types';

export function useSidebarItem({ selected }: UseSidebarItemParams): UseSidebarItemResult {
  const { collapsed, color } = use(SidebarContext);
  const childProps =
    componentTokens[SIDEBAR_ITEM_COMPONENT_NAME_KEY].childProps.standard[color][SIDEBAR_SIZE];
  return {
    collapsed,
    color,
    iconSize: childProps.item.size,
    currentProps: selected ? { 'aria-current': 'page' } : {},
  };
}
