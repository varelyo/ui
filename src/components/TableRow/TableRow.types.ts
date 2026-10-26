import type { ComponentPropsWithRef } from 'react';
import type { TableSection, TableVariant } from '../Table';

export type TableRowProps = Omit<ComponentPropsWithRef<'tr'>, 'style'> & {
  selected?: boolean;
};

export interface TableRowSelectedProps {
  'aria-selected'?: true;
}

export interface UseTableRowResult {
  variant: TableVariant;
  section: TableSection;
  selectedProps: TableRowSelectedProps;
}
