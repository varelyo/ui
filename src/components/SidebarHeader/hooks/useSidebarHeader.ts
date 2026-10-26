import { use } from 'react';
import { SidebarContext } from '../../Sidebar';
import type { UseSidebarHeaderResult } from '../SidebarHeader.types';

export function useSidebarHeader(): UseSidebarHeaderResult {
  return { appearance: use(SidebarContext).appearance };
}
