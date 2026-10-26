import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { PolymorphicProps, Responsive, SizeOf, VariantOf } from '../../types';
import type { TABLE_COMPONENT_NAME_KEY } from './Table.constants';

export type TableTokens = ComponentTokens[typeof TABLE_COMPONENT_NAME_KEY];
export type TableVariant = VariantOf<TableTokens>;
export type TableSize = SizeOf<TableTokens>;
export type TableSection = 'head' | 'body';
export type TableSortDirection = 'asc' | 'desc';

export type TableProps<C extends ElementType = 'table'> = PolymorphicProps<
  C,
  {
    size?: Responsive<TableSize>;
    variant?: TableVariant;
    stickyHeader?: boolean;
    children?: ReactNode;
  }
>;

export interface TableContextValue {
  variant: TableVariant;
  stickyHeader: boolean;
  size: Responsive<TableSize>;
}

export type UseTableParams = TableContextValue;

export interface TableSectionContextValue {
  section: TableSection;
}

export interface TableStyleProps {
  variant: TableVariant;
  size: Responsive<TableSize>;
}
