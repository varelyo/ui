import type { ComponentPropsWithRef } from 'react';
import type { TableSection } from '../Table';

export type TableRowProps = Omit<ComponentPropsWithRef<'tr'>, 'style'> & {
  selected?: boolean;
};

export interface TableRowSelectedProps {
  'aria-selected'?: true;
}

export interface UseTableRowResult {
  section: TableSection;
  selectedProps: TableRowSelectedProps;
}
