import type { DrawerPanelAttributes, UseDrawerTemporaryResult } from '../Drawer.types';

export function useDrawerTemporary({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...panelProps
}: DrawerPanelAttributes): UseDrawerTemporaryResult {
  return {
    labelProps: {
      ...(ariaLabel === undefined ? {} : { 'aria-label': ariaLabel }),
      ...(ariaLabelledBy === undefined ? {} : { 'aria-labelledby': ariaLabelledBy }),
    },
    panelProps,
  };
}
