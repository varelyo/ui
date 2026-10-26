import type { ComponentPropsWithRef } from 'react';
import type { IconElement, IconName } from '../../generated/icons';
import type { IconSize, TextColor } from '../../generated/maps';
import type { Responsive } from '../../types';

export type { IconName };

export type IconProps = Omit<ComponentPropsWithRef<'svg'>, 'style' | 'children' | 'color'> & {
  name: IconName;
  size?: Responsive<IconSize>;
  color?: TextColor;
  titleAccess?: string;
};

export interface IconStyleProps {
  size: Responsive<IconSize> | undefined;
  color: TextColor | undefined;
}

export interface UseIconParams {
  name: IconName;
  size: Responsive<IconSize> | undefined;
  titleAccess: string | undefined;
}

export interface UseIconResult {
  elements: readonly IconElement[];
  size: Responsive<IconSize> | undefined;
  titleId: string;
  labelled: boolean;
  accessibilityProps: {
    role: 'img' | undefined;
    'aria-hidden': true | undefined;
    'aria-labelledby': string | undefined;
  };
}
