import { useListItem, useMergeRefs } from '@floating-ui/react';
import { use, useLayoutEffect } from 'react';
import { componentTokens } from '../../../generated/maps';
import { TabListContext } from '../../TabList';
import { panelId, TABS_COMPONENT_NAME_KEY, TABS_SIZE, tabId, TabsContext } from '../../Tabs';
import type { UseTabParams, UseTabResult } from '../Tab.types';

export function useTab({ value, disabled, ref, onClick, onFocus }: UseTabParams): UseTabResult {
  const tabs = use(TabsContext);
  const list = use(TabListContext);
  const item = useListItem();
  const merged = useMergeRefs<HTMLButtonElement>([item.ref, ref]);
  const selected = tabs.value === value;
  const id = tabId(tabs.baseId, value);
  const register = list.register;
  useLayoutEffect(
    () => register(id, { index: item.index, selected, disabled }),
    [register, id, item.index, selected, disabled],
  );
  return {
    ref: (node) => merged?.(node),
    orientation: tabs.orientation,
    variant: tabs.variant,
    color: tabs.color,
    iconSize: componentTokens[TABS_COMPONENT_NAME_KEY].childProps[TABS_SIZE].tab.size,
    tabProps: {
      role: 'tab',
      id,
      'aria-selected': selected,
      'aria-controls': panelId(tabs.baseId, value),
      tabIndex: !disabled && item.index !== -1 && item.index === list.activeIndex ? 0 : -1,
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) tabs.select(value, event);
      },
      onFocus: (event) => {
        onFocus?.(event);
        list.navigate(item.index);
        if (tabs.selectionFollowsFocus && !disabled) tabs.select(value, event);
      },
    },
  };
}
