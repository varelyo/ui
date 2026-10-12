import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { PolymorphicProps, VariantOf } from '../../types';
import type { DIVIDER_COMPONENT_NAME_KEY } from './Divider.constants';

export type DividerTokens = ComponentTokens[typeof DIVIDER_COMPONENT_NAME_KEY];
export type DividerVariant = VariantOf<DividerTokens>;
export type DividerOrientation = 'horizontal' | 'vertical';

type DividerOwnProps = {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  flexItem?: boolean;
  children?: ReactNode;
};

export type DividerProps<C extends ElementType = 'div'> = PolymorphicProps<C, DividerOwnProps>;

export interface DividerStyleProps {
  orientation: DividerOrientation;
  variant: DividerVariant;
  flexItem: boolean;
}

export interface UseDividerParams {
  orientation: DividerOrientation;
  children: ReactNode;
}

export interface DividerSeparatorProps {
  role: 'separator';
  'aria-orientation'?: 'vertical';
}

export interface UseDividerResult {
  labelled: boolean;
  separatorProps: DividerSeparatorProps;
}
