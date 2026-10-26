export const PROGRESS_MAX_VALUE = 100;

export interface UseProgressValueParams {
  determinate: boolean;
  value: number;
}

export interface UseProgressValueResult {
  progress: number;
  valueProps: {
    'aria-valuenow': number | undefined;
    'aria-valuemin': number | undefined;
    'aria-valuemax': number | undefined;
  };
}

export function useProgressValue({
  determinate,
  value,
}: UseProgressValueParams): UseProgressValueResult {
  const progress = Math.min(PROGRESS_MAX_VALUE, Math.max(0, value));
  return {
    progress,
    valueProps: {
      'aria-valuenow': determinate ? Math.round(progress) : undefined,
      'aria-valuemin': determinate ? 0 : undefined,
      'aria-valuemax': determinate ? PROGRESS_MAX_VALUE : undefined,
    },
  };
}
