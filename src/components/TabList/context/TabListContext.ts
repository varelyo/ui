import { createContext } from 'react';
import type { TabListContextValue } from '../TabList.types';

export const TabListContext = createContext<TabListContextValue>({
  activeIndex: 0,
  navigate: () => undefined,
  register: () => () => undefined,
});
