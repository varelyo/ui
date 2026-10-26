import { createContext } from 'react';
import type { TableContextValue } from '../Table.types';

export const TableContext = createContext<TableContextValue>({
  variant: 'standard',
  stickyHeader: false,
  size: 'md',
});
