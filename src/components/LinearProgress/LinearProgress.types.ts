import type { ComponentPropsWithRef, CSSProperties } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { UseProgressValueResult } from '../../hooks';
import type { ColorOf, Responsive, SizeOf, VariantOf } from '../../types';
import type { LINEAR_PROGRESS_COMPONENT_NAME_KEY } from './LinearProgress.constants';

export type LinearProgressTokens = ComponentTokens[typeof LINEAR_PROGRESS_COMPONENT_NAME_KEY];
export type LinearProgressVariant = VariantOf<LinearProgressTokens>;
export type LinearProgressColor = ColorOf<LinearProgressTokens>;
export type LinearProgressSize = SizeOf<LinearProgressTokens>;

export type LinearProgressProps = Omit<
  ComponentPropsWithRef<'span'>,
  'style' | 'children' | 'color'
> & {
  variant?: LinearProgressVariant;
  color?: LinearProgressColor;
  size?: Responsive<LinearProgressSize>;
  value?: number;
};

export interface LinearProgressStyleProps {
  variant: LinearProgressVariant;
  color: LinearProgressColor;
  size: Responsive<LinearProgressSize>;
}

export interface UseLinearProgressParams {
  variant: LinearProgressVariant;
  value: number;
}

export interface UseLinearProgressResult {
  determinate: boolean;
  valueProps: UseProgressValueResult['valueProps'];
  indicatorStyle: CSSProperties | undefined;
}
