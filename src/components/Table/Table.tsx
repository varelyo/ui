import type { ElementType } from 'react';
import { TableContext } from './context';
import { useTable } from './hooks';
import { tableClassName } from './Table.styles';
import type { TableProps } from './Table.types';

export function Table<C extends ElementType = 'table'>({
  size = 'md',
  stickyHeader = false,
  component,
  className,
  ...rest
}: TableProps<C>) {
  const Component: ElementType = component ?? 'table';
  const context = useTable({ stickyHeader, size });
  return (
    <TableContext value={context}>
      <Component {...rest} className={tableClassName({ size }, className)} />
    </TableContext>
  );
}
