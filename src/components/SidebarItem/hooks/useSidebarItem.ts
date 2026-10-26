import { use, type ReactNode } from 'react';
import { SidebarContext } from '../../Sidebar';
import type { UseSidebarItemParams, UseSidebarItemResult } from '../SidebarItem.types';

const present = (node: ReactNode) => node !== undefined && node !== null && node !== false;

export function useSidebarItem({ icon, end }: UseSidebarItemParams): UseSidebarItemResult {
  const { collapsed, color } = use(SidebarContext);
  return {
    collapsed,
    color,
    iconShown: present(icon),
    end: collapsed ? undefined : end,
  };
}
