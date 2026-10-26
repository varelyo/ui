import { useTableSortLabel } from './hooks';
import { tableSortLabelClassName } from './TableSortLabel.styles';
import type { TableSortLabelProps } from './TableSortLabel.types';
import { TableSortLabelIcon } from './ui';

export function TableSortLabel({
  active = false,
  direction = 'asc',
  type = 'button',
  className,
  children,
  ...rest
}: TableSortLabelProps) {
  const label = useTableSortLabel({ active, direction });
  return (
    <button
      {...rest}
      {...label.rootProps}
      type={type}
      className={tableSortLabelClassName(label.variant, className)}
    >
      {children}
      <TableSortLabelIcon name={label.iconName} size={label.iconSize} />
    </button>
  );
}
