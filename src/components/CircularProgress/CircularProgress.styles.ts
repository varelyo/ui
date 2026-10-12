import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { CIRCULAR_PROGRESS_COMPONENT_NAME_KEY } from './CircularProgress.constants';
import type { CircularProgressStyleProps } from './CircularProgress.types';

const progress = componentTokens[CIRCULAR_PROGRESS_COMPONENT_NAME_KEY];

export const circularProgressRootClassName = (
  { variant, color, size }: CircularProgressStyleProps,
  className?: ClassValue,
) => {
  const intent = color === 'inherit' ? 'primary' : color;
  return cx(
    'inline-flex shrink-0',
    progress.slots.root,
    color === 'inherit' ? null : progress.variants[variant][intent],
    responsiveClasses(size, progress.sizes[variant][intent]),
    className,
  );
};

export const circularProgressSvgClassName = (determinate: boolean) =>
  cx('size-full', !determinate && 'vy-spin');

export const circularProgressIndicatorClassName = (determinate: boolean) =>
  cx('vy-stroke-shape', progress.slots.indicator, !determinate && 'vy-dash');
