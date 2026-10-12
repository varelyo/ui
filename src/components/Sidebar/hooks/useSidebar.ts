import { useMemo } from 'react';
import { useControllableState } from '../../../hooks';
import type { UseSidebarParams, UseSidebarResult } from '../Sidebar.types';

export function useSidebar({
  collapsed,
  open,
  defaultOpen,
  onOpenChange,
  variant,
  color,
}: UseSidebarParams): UseSidebarResult {
  const [drawerOpen, setDrawerOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const dockedContext = useMemo(() => ({ collapsed, color }), [collapsed, color]);
  const drawerContext = useMemo(() => ({ collapsed: false, color }), [color]);
  return {
    responsive: variant === 'responsive',
    drawerOpen,
    closeDrawer: () => setDrawerOpen(false),
    dockedContext,
    drawerContext,
  };
}
