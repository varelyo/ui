import { useTableCell } from './hooks';
import { tableCellClassName } from './TableCell.styles';
import type { TableCellProps } from './TableCell.types';

export function TableCell({ align = 'left', sortDirection, className, ...rest }: TableCellProps) {
  const cell = useTableCell({ sortDirection });
  return (
    <cell.Component
      {...cell.headerProps}
      {...rest}
      className={tableCellClassName(
        { section: cell.section, sticky: cell.sticky, align },
        className,
      )}
    />
  );
}
