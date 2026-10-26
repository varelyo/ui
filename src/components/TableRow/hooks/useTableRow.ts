import { use } from 'react';
import { TableContext, TableSectionContext } from '../../Table';
import type { UseTableRowResult } from '../TableRow.types';

export function useTableRow(selected: boolean): UseTableRowResult {
  const { section } = use(TableSectionContext);
  const { variant } = use(TableContext);
  return {
    variant,
    section,
    selectedProps: selected && section === 'body' ? { 'aria-selected': true } : {},
  };
}
