import { Icon, IconSizeContext } from '../../../Icon';
import type { TableSortLabelIconProps } from '../../TableSortLabel.types';
import { tableSortLabelIconClassName } from './TableSortLabelIcon.styles';

export function TableSortLabelIcon({ name, size }: TableSortLabelIconProps) {
  return (
    <IconSizeContext value={size}>
      <Icon name={name} data-slot="sort-icon" className={tableSortLabelIconClassName} />
    </IconSizeContext>
  );
}
