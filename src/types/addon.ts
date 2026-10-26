import type { ReactNode } from 'react';
import type { ControlInnerSize, IconSize } from '../generated/maps';
import type { Responsive } from './responsive';

export type AddonControlSize = ControlInnerSize;

export interface AddonInsetProps {
  size: Responsive<AddonControlSize>;
  'data-addon-inset': '';
}

export interface AddonProps {
  icon: { size: Responsive<IconSize> };
  iconButton: AddonInsetProps;
  avatar: AddonInsetProps;
}

export type Addon = ReactNode | ((props: AddonProps) => ReactNode);
