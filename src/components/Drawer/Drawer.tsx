import type { DrawerProps } from './Drawer.types';
import { useDrawer } from './hooks';
import { DrawerDocked, DrawerTemporary } from './ui';

export function Drawer({
  open = false,
  onClose,
  anchor = 'left',
  variant = 'temporary',
  children,
  keepMounted = false,
  ...panelProps
}: DrawerProps) {
  const drawer = useDrawer(variant);
  return drawer.temporary ? (
    <DrawerTemporary
      open={open}
      onClose={onClose}
      anchor={anchor}
      keepMounted={keepMounted}
      panelProps={panelProps}
    >
      {children}
    </DrawerTemporary>
  ) : (
    <DrawerDocked
      open={open}
      anchor={anchor}
      animated={drawer.animated}
      keepMounted={keepMounted}
      panelProps={panelProps}
    >
      {children}
    </DrawerDocked>
  );
}
