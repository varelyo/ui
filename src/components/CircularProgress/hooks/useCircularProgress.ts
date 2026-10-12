import {
  CIRCULAR_PROGRESS_MAX_VALUE,
  CIRCULAR_PROGRESS_PATH_LENGTH,
} from '../CircularProgress.constants';
import type {
  UseCircularProgressParams,
  UseCircularProgressResult,
} from '../CircularProgress.types';

export function useCircularProgress({
  variant,
  value,
}: UseCircularProgressParams): UseCircularProgressResult {
  const determinate = variant === 'determinate';
  const progress = Math.min(CIRCULAR_PROGRESS_MAX_VALUE, Math.max(0, value));
  return {
    determinate,
    valueProps: {
      'aria-valuenow': determinate ? Math.round(progress) : undefined,
      'aria-valuemin': determinate ? 0 : undefined,
      'aria-valuemax': determinate ? CIRCULAR_PROGRESS_MAX_VALUE : undefined,
    },
    dashArray: determinate ? `${progress} ${CIRCULAR_PROGRESS_PATH_LENGTH}` : undefined,
  };
}
