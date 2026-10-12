import { use } from 'react';
import { TableSectionContext } from '../../Table';
import type { UseTableRowResult } from '../TableRow.types';

export function useTableRow(selected: boolean): UseTableRowResult {
  const { section } = use(TableSectionContext);
  return {
    section,
    selectedProps: selected && section === 'body' ? { 'aria-selected': true } : {},
  };
}
