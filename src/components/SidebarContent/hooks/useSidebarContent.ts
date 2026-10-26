import { use } from 'react';
import { SidebarContext } from '../../Sidebar';
import type { UseSidebarContentResult } from '../SidebarContent.types';

export function useSidebarContent(): UseSidebarContentResult {
  const { appearance, color } = use(SidebarContext);
  return { appearance, color };
}
