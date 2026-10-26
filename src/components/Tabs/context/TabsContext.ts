import { createContext } from 'react';
import type { TabsContextValue } from '../Tabs.types';

export const TabsContext = createContext<TabsContextValue>({
  baseId: '',
  value: undefined,
  orientation: 'horizontal',
  selectionFollowsFocus: false,
  variant: 'standard',
  color: 'neutral',
  select: () => undefined,
});
