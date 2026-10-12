import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { PolymorphicProps, Responsive, SizeOf } from '../../types';
import type { TABLE_COMPONENT_NAME_KEY } from './Table.constants';

export type TableTokens = ComponentTokens[typeof TABLE_COMPONENT_NAME_KEY];
export type TableSize = SizeOf<TableTokens>;
export type TableSection = 'head' | 'body';
export type TableSortDirection = 'asc' | 'desc';

export type TableProps<C extends ElementType = 'table'> = PolymorphicProps<
  C,
  {
    size?: Responsive<TableSize>;
    stickyHeader?: boolean;
    children?: ReactNode;
  }
>;

export interface TableContextValue {
  stickyHeader: boolean;
  size: Responsive<TableSize>;
}

export type UseTableParams = TableContextValue;

export interface TableSectionContextValue {
  section: TableSection;
}

export interface TableStyleProps {
  size: Responsive<TableSize>;
}
