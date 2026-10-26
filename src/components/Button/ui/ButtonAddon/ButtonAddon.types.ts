import type { ReactNode } from 'react';
import type { IconSize } from '../../../../generated/maps';
import type { Addon, AddonProps, Responsive } from '../../../../types';
import type { BUTTON_ADDON_SLOTS } from '../../Button.constants';

export interface ButtonAddonProps {
  slot: (typeof BUTTON_ADDON_SLOTS)[keyof typeof BUTTON_ADDON_SLOTS];
  transparent: boolean;
  size: Responsive<IconSize> | undefined;
  addon: Addon;
  props: AddonProps;
  loader: ReactNode;
}
