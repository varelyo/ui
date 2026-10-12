import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { Responsive, SizeOf, VariantOf } from '../../types';
import type { SKELETON_COMPONENT_NAME_KEY } from './Skeleton.constants';

export type SkeletonTokens = ComponentTokens[typeof SKELETON_COMPONENT_NAME_KEY];
export type SkeletonVariant = VariantOf<SkeletonTokens>;
export type SkeletonSize = SizeOf<SkeletonTokens>;
export type SkeletonAnimation = 'pulse' | 'wave' | false;
export type SkeletonMotion = 'pulse' | 'wave' | 'none';

type SkeletonOwnProps = {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  size?: Responsive<SkeletonSize>;
  children?: ReactNode;
};

export type SkeletonProps = SkeletonOwnProps &
  Omit<ComponentPropsWithRef<'span'>, keyof SkeletonOwnProps | 'style'>;

export interface SkeletonStyleProps {
  variant: SkeletonVariant;
  size: Responsive<SkeletonSize>;
  motion: SkeletonMotion;
  fit: boolean;
}

export interface UseSkeletonParams {
  animation: SkeletonAnimation;
  children: ReactNode;
}

export interface UseSkeletonResult {
  motion: SkeletonMotion;
  fit: boolean;
}
