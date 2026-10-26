import { useMemo } from 'react';
import { useControllableState } from '../../../hooks';
import type { UseSidebarParams, UseSidebarResult } from '../Sidebar.types';

export function useSidebar({
  collapsed,
  open,
  defaultOpen,
  onOpenChange,
  variant,
  appearance,
  color,
}: UseSidebarParams): UseSidebarResult {
  const [drawerOpen, setDrawerOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const dockedContext = useMemo(
    () => ({ appearance, collapsed, color }),
    [appearance, collapsed, color],
  );
  const drawerContext = useMemo(
    () => ({ appearance, collapsed: false, color }),
    [appearance, color],
  );
  return {
    responsive: variant === 'responsive',
    drawerOpen,
    closeDrawer: () => setDrawerOpen(false),
    dockedContext,
    drawerContext,
  };
}
