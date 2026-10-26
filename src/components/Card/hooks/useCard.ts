import { useMemo } from 'react';
import type { UseCardParams, UseCardResult } from '../Card.types';

export function useCard({ appearance }: UseCardParams): UseCardResult {
  const context = useMemo(() => ({ appearance }), [appearance]);
  return { context };
}
