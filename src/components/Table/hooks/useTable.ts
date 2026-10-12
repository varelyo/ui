import { useMemo } from 'react';
import type { TableContextValue, UseTableParams } from '../Table.types';

export function useTable({ stickyHeader, size }: UseTableParams): TableContextValue {
  return useMemo(() => ({ stickyHeader, size }), [stickyHeader, size]);
}
