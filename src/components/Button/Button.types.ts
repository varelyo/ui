import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type {
  Addon,
  AddonProps,
  ColorOf,
  PolymorphicProps,
  Responsive,
  SizeOf,
  VariantOf,
} from '../../types';
import type { CircularProgressSize } from '../CircularProgress';
import type { BUTTON_COMPONENT_NAME_KEY } from './Button.constants';

export type ButtonTokens = ComponentTokens[typeof BUTTON_COMPONENT_NAME_KEY];
export type ButtonVariant = VariantOf<ButtonTokens>;
export type ButtonColor = ColorOf<ButtonTokens>;
export type ButtonSize = SizeOf<ButtonTokens>;
export type ButtonLoadingPosition = 'start' | 'center' | 'end';

type ButtonOwnProps = {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: Responsive<ButtonSize>;
  startAddon?: Addon;
  endAddon?: Addon;
  fullWidth?: boolean;
  loading?: boolean;
  loadingPosition?: ButtonLoadingPosition;
  disabled?: boolean;
  children?: ReactNode;
};

export type ButtonProps<C extends ElementType = 'button'> = PolymorphicProps<C, ButtonOwnProps>;

export type ButtonLinkProps = PolymorphicProps<'a', ButtonOwnProps & { href: string }> & {
  component?: undefined;
};

export type ButtonInternalProps = ButtonOwnProps & {
  className?: string;
};

export interface ButtonStyleProps {
  variant: ButtonVariant;
  color: ButtonColor;
  size: Responsive<ButtonSize>;
  fullWidth: boolean;
}

export interface UseButtonParams {
  size: Responsive<ButtonSize>;
  startAddon: Addon;
  endAddon: Addon;
  loading: boolean;
  loadingPosition: ButtonLoadingPosition;
}

export interface ButtonIconSlotState {
  rendered: boolean;
  loading: boolean;
  transparent: boolean;
}

export interface UseButtonResult {
  centered: boolean;
  start: ButtonIconSlotState;
  end: ButtonIconSlotState;
  iconSize: Responsive<IconSize> | undefined;
  progressSize: Responsive<CircularProgressSize>;
  addon: AddonProps;
}
