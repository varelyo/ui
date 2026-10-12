import type { ReactNode } from 'react';
import type { IconSize } from '../../../../generated/maps';
import type { Responsive } from '../../../../types';
import type { BUTTON_ICON_SLOTS } from '../../Button.constants';

export interface ButtonIconProps {
  slot: (typeof BUTTON_ICON_SLOTS)[keyof typeof BUTTON_ICON_SLOTS];
  transparent: boolean;
  size: Responsive<IconSize> | undefined;
  children: ReactNode;
}
