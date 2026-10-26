import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SKELETON_COMPONENT_NAME_KEY } from './Skeleton.constants';
import type { SkeletonMotion, SkeletonStyleProps, SkeletonVariant } from './Skeleton.types';

const skeleton = componentTokens[SKELETON_COMPONENT_NAME_KEY];

const shapes: Record<SkeletonVariant, string> = {
  text: 'block w-full',
  rectangular: 'block w-full',
  rounded: 'block w-full',
  circular: 'inline-block shrink-0',
};

const motions: Record<SkeletonMotion, string> = {
  pulse: 'vy-pulse',
  wave: 'vy-wave',
  none: '',
};

export const skeletonClassName = (
  { variant, size, motion, fit }: SkeletonStyleProps,
  className?: ClassValue,
) =>
  cx(
    skeleton.slots.root,
    skeleton.variants[variant].primary,
    responsiveClasses(size, skeleton.sizes, 'md'),
    responsiveClasses(size, skeleton.styleSizes[variant], 'md'),
    shapes[variant],
    motions[motion],
    fit && 'w-fit',
    className,
  );

export const skeletonContentClassName = cx('opacity-none');
