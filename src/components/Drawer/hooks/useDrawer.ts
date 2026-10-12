import type { DrawerVariant, UseDrawerResult } from '../Drawer.types';

export function useDrawer(variant: DrawerVariant): UseDrawerResult {
  return { temporary: variant === 'temporary', animated: variant === 'persistent' };
}
