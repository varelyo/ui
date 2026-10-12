import { useTableRow } from './hooks';
import { tableRowClassName } from './TableRow.styles';
import type { TableRowProps } from './TableRow.types';

export function TableRow({ selected = false, className, ...rest }: TableRowProps) {
  const row = useTableRow(selected);
  return (
    <tr {...rest} {...row.selectedProps} className={tableRowClassName(row.section, className)} />
  );
}
