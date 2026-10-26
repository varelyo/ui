import { useMemo } from 'react';
import type { TableContextValue, UseTableParams } from '../Table.types';

export function useTable({ variant, stickyHeader, size }: UseTableParams): TableContextValue {
  return useMemo(() => ({ variant, stickyHeader, size }), [variant, stickyHeader, size]);
}
