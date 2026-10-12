import { createContext } from 'react';
import type { SidebarContextValue } from '../Sidebar.types';

export const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  color: 'neutral',
});
