import type { ComponentPropsWithRef, ElementType } from 'react';
import type { TableSection, TableSortDirection } from '../Table';
import type { TABLE_CELL_ARIA_SORT } from './TableCell.constants';

export type TableCellAlign = 'left' | 'center' | 'right';

export type TableCellProps = Omit<ComponentPropsWithRef<'td'>, 'style' | 'align'> & {
  align?: TableCellAlign;
  sortDirection?: TableSortDirection | false;
};

export interface TableCellStyleProps {
  section: TableSection;
  sticky: boolean;
  align: TableCellAlign;
}

export interface TableCellHeaderProps {
  scope?: 'col';
  'aria-sort'?: (typeof TABLE_CELL_ARIA_SORT)[TableSortDirection];
}

export interface UseTableCellParams {
  sortDirection: TableSortDirection | false | undefined;
}

export interface UseTableCellResult {
  Component: ElementType;
  section: TableSection;
  sticky: boolean;
  headerProps: TableCellHeaderProps;
}
