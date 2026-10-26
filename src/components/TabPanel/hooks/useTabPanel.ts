import { use } from 'react';
import { panelId, tabId, TabsContext } from '../../Tabs';
import type { UseTabPanelParams, UseTabPanelResult } from '../TabPanel.types';

export function useTabPanel({ value }: UseTabPanelParams): UseTabPanelResult {
  const tabs = use(TabsContext);
  const selected = tabs.value === value;
  return {
    selected,
    variant: tabs.variant,
    color: tabs.color,
    panelProps: {
      role: 'tabpanel',
      id: panelId(tabs.baseId, value),
      'aria-labelledby': tabId(tabs.baseId, value),
      hidden: !selected,
      tabIndex: 0,
    },
  };
}
