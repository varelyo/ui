import type { ReactNode } from 'react';
import type { IconSize } from '../generated/maps';
import type { Addon, AddonControlSize, AddonProps, Responsive } from '../types';
import { mapResponsive } from './responsive';

export const renderAddon = (addon: Addon, props: AddonProps): ReactNode =>
  typeof addon === 'function' ? addon(props) : addon;

export const hasAddon = (addon: Addon) => addon !== undefined && addon !== null && addon !== false;

export function addonProps<S>(
  size: Responsive<S>,
  icon: (step: S) => IconSize,
  control: (step: S) => AddonControlSize,
): AddonProps {
  const inset = { size: mapResponsive(size, control), 'data-addon-inset': '' } as const;
  return {
    icon: { size: mapResponsive(size, icon) },
    iconButton: inset,
    avatar: inset,
  };
}
