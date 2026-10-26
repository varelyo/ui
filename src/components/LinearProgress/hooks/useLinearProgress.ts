import { useProgressValue } from '../../../hooks';
import type { UseLinearProgressParams, UseLinearProgressResult } from '../LinearProgress.types';

export function useLinearProgress({
  variant,
  value,
}: UseLinearProgressParams): UseLinearProgressResult {
  const determinate = variant === 'determinate';
  const { progress, valueProps } = useProgressValue({ determinate, value });
  return {
    determinate,
    valueProps,
    indicatorStyle: determinate ? { inlineSize: `${progress}%` } : undefined,
  };
}
