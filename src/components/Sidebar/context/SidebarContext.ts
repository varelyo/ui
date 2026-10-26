import { createContext } from 'react';
import type { SidebarContextValue } from '../Sidebar.types';

export const SidebarContext = createContext<SidebarContextValue>({
  appearance: 'standard',
  collapsed: false,
  color: 'neutral',
});
