import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LINEAR_PROGRESS_COMPONENT_NAME_KEY } from './LinearProgress.constants';
import type { LinearProgressStyleProps } from './LinearProgress.types';

const progress = componentTokens[LINEAR_PROGRESS_COMPONENT_NAME_KEY];

export const linearProgressRootClassName = (
  { variant, color, size }: LinearProgressStyleProps,
  className?: ClassValue,
) =>
  cx(
    'flex overflow-hidden',
    progress.slots.root,
    progress.variants[variant][color],
    responsiveClasses(size, progress.sizes),
    className,
  );

export const linearProgressIndicatorClassName = (determinate: boolean) =>
  cx(
    'shrink-0',
    progress.slots.indicator,
    determinate
      ? 'transition-all duration-md ease-standard motion-reduce:transition-none'
      : 'vy-slide',
  );
