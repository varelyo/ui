import type { ReactNode } from 'react';
import type { IconSize } from '../../../../generated/maps';
import type { Responsive } from '../../../../types';

export interface DropzoneIconProps {
  size: Responsive<IconSize> | undefined;
  children: ReactNode;
}
