import { use } from 'react';
import { SidebarContext } from '../../Sidebar';
import type { UseSidebarFooterResult } from '../SidebarFooter.types';

export function useSidebarFooter(): UseSidebarFooterResult {
  return { appearance: use(SidebarContext).appearance };
}
