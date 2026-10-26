import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { TableVariant } from '../Table';
import { TABLE_SORT_LABEL_COMPONENT_NAME_KEY } from './TableSortLabel.constants';

const table = componentTokens[TABLE_SORT_LABEL_COMPONENT_NAME_KEY];

export const tableSortLabelClassName = (variant: TableVariant, className?: ClassValue) =>
  cx(
    table.variants[variant].primary,
    table.slots.sortLabel,
    'vy-focus-ring inline-flex cursor-pointer items-center select-none',
    className,
  );
