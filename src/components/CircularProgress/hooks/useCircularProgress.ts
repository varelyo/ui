import { useProgressValue } from '../../../hooks';
import { CIRCULAR_PROGRESS_PATH_LENGTH } from '../CircularProgress.constants';
import type {
  UseCircularProgressParams,
  UseCircularProgressResult,
} from '../CircularProgress.types';

export function useCircularProgress({
  variant,
  value,
}: UseCircularProgressParams): UseCircularProgressResult {
  const determinate = variant === 'determinate';
  const { progress, valueProps } = useProgressValue({ determinate, value });
  return {
    determinate,
    valueProps,
    dashArray: determinate ? `${progress} ${CIRCULAR_PROGRESS_PATH_LENGTH}` : undefined,
  };
}
