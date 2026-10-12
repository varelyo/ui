import type { ComponentPropsWithRef } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { ColorOf, Responsive, SizeOf, VariantOf } from '../../types';
import type { CIRCULAR_PROGRESS_COMPONENT_NAME_KEY } from './CircularProgress.constants';

export type CircularProgressTokens = ComponentTokens[typeof CIRCULAR_PROGRESS_COMPONENT_NAME_KEY];
export type CircularProgressVariant = VariantOf<CircularProgressTokens>;
export type CircularProgressColor = ColorOf<CircularProgressTokens>;
export type CircularProgressSize = SizeOf<CircularProgressTokens>;

export type CircularProgressProps = Omit<
  ComponentPropsWithRef<'span'>,
  'style' | 'children' | 'color'
> & {
  variant?: CircularProgressVariant;
  color?: CircularProgressColor | 'inherit';
  size?: Responsive<CircularProgressSize>;
  value?: number;
};

export interface CircularProgressStyleProps {
  variant: CircularProgressVariant;
  color: CircularProgressColor | 'inherit';
  size: Responsive<CircularProgressSize>;
}

export interface UseCircularProgressParams {
  variant: CircularProgressVariant;
  value: number;
}

export interface UseCircularProgressResult {
  determinate: boolean;
  valueProps: {
    'aria-valuenow': number | undefined;
    'aria-valuemin': number | undefined;
    'aria-valuemax': number | undefined;
  };
  dashArray: string | undefined;
}
