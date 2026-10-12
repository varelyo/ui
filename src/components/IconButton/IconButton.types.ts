import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type { ColorOf, PolymorphicProps, Responsive, SizeOf, VariantOf } from '../../types';
import type { CircularProgressSize } from '../CircularProgress';
import type { ICON_BUTTON_COMPONENT_NAME_KEY } from './IconButton.constants';

export type IconButtonTokens = ComponentTokens[typeof ICON_BUTTON_COMPONENT_NAME_KEY];
export type IconButtonVariant = VariantOf<IconButtonTokens>;
export type IconButtonColor = ColorOf<IconButtonTokens>;
export type IconButtonSize = SizeOf<IconButtonTokens>;

interface IconButtonAriaLabel {
  'aria-label': string;
  'aria-labelledby'?: string;
}

interface IconButtonAriaLabelledBy {
  'aria-label'?: string;
  'aria-labelledby': string;
}

export type IconButtonAccessibleName = IconButtonAriaLabel | IconButtonAriaLabelledBy;

type IconButtonOwnProps = {
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: Responsive<IconButtonSize>;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

export type IconButtonProps<C extends ElementType = 'button'> = PolymorphicProps<
  C,
  IconButtonOwnProps & IconButtonAccessibleName
>;

export type IconButtonLinkProps = PolymorphicProps<
  'a',
  IconButtonOwnProps & IconButtonAccessibleName & { href: string }
> & {
  component?: undefined;
};

export type IconButtonInternalProps = IconButtonOwnProps & {
  className?: string;
};

export interface IconButtonStyleProps {
  variant: IconButtonVariant;
  color: IconButtonColor;
  size: Responsive<IconButtonSize>;
}

export interface UseIconButtonParams {
  variant: IconButtonVariant;
  color: IconButtonColor;
  size: Responsive<IconButtonSize>;
  loading: boolean;
}

export interface UseIconButtonResult {
  showLoader: boolean;
  iconSize: Responsive<IconSize> | undefined;
  progressSize: Responsive<CircularProgressSize>;
}

export interface IconButtonIconProps {
  size: Responsive<IconSize> | undefined;
  children: ReactNode;
}

export interface IconButtonLoaderProps {
  size: Responsive<CircularProgressSize>;
}
