import { useLinearProgress } from './hooks';
import {
  linearProgressIndicatorClassName,
  linearProgressRootClassName,
} from './LinearProgress.styles';
import type { LinearProgressProps } from './LinearProgress.types';

export function LinearProgress({
  variant = 'indeterminate',
  color = 'primary',
  size = 'md',
  value = 0,
  className,
  ...rest
}: LinearProgressProps) {
  const { determinate, valueProps, indicatorStyle } = useLinearProgress({ variant, value });
  return (
    <span
      role="progressbar"
      {...rest}
      {...valueProps}
      className={linearProgressRootClassName({ variant, color, size }, className)}
    >
      <span
        aria-hidden
        data-slot="indicator"
        className={linearProgressIndicatorClassName(determinate)}
        style={indicatorStyle}
      />
    </span>
  );
}
