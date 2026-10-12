import {
  CIRCULAR_PROGRESS_PATH,
  CIRCULAR_PROGRESS_PATH_LENGTH,
  CIRCULAR_PROGRESS_VIEW_BOX,
} from './CircularProgress.constants';
import {
  circularProgressIndicatorClassName,
  circularProgressRootClassName,
  circularProgressSvgClassName,
} from './CircularProgress.styles';
import type { CircularProgressProps } from './CircularProgress.types';
import { useCircularProgress } from './hooks';

export function CircularProgress({
  variant = 'indeterminate',
  color = 'primary',
  size = 'md',
  value = 0,
  className,
  ...rest
}: CircularProgressProps) {
  const { determinate, valueProps, dashArray } = useCircularProgress({ variant, value });
  return (
    <span
      role="progressbar"
      {...rest}
      {...valueProps}
      className={circularProgressRootClassName({ variant, color, size }, className)}
    >
      <svg
        viewBox={CIRCULAR_PROGRESS_VIEW_BOX}
        focusable="false"
        aria-hidden
        className={circularProgressSvgClassName(determinate)}
      >
        <path
          d={CIRCULAR_PROGRESS_PATH}
          pathLength={CIRCULAR_PROGRESS_PATH_LENGTH}
          fill="none"
          stroke="currentColor"
          strokeDasharray={dashArray}
          className={circularProgressIndicatorClassName(determinate)}
        />
      </svg>
    </span>
  );
}
