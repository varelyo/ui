import { use } from 'react';
import { TableContext, TableSectionContext } from '../../Table';
import { TABLE_CELL_ARIA_SORT } from '../TableCell.constants';
import type { UseTableCellParams, UseTableCellResult } from '../TableCell.types';

export function useTableCell({ sortDirection }: UseTableCellParams): UseTableCellResult {
  const { section } = use(TableSectionContext);
  const { stickyHeader } = use(TableContext);
  const head = section === 'head';
  return {
    Component: head ? 'th' : 'td',
    section,
    sticky: head && stickyHeader,
    headerProps: !head
      ? {}
      : sortDirection
        ? { scope: 'col', 'aria-sort': TABLE_CELL_ARIA_SORT[sortDirection] }
        : { scope: 'col' },
  };
}
