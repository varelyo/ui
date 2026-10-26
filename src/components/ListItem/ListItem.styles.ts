import { componentTokens, layout } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LIST_ITEM_COMPONENT_NAME_KEY } from './ListItem.constants';
import type { ListItemMarker, ListItemStyleProps } from './ListItem.types';

const list = componentTokens[LIST_ITEM_COMPONENT_NAME_KEY];

const markerRows: Record<ListItemMarker, string> = {
  bullet: '',
  number: 'vy-counter-item',
};

export const listItemClassName = (
  {
    variant,
    marker,
    size,
    color,
    end,
    divider,
    disablePadding,
    disableGutters,
    alignItems,
  }: ListItemStyleProps,
  className?: ClassValue,
) =>
  cx(
    list.variants[variant][color],
    responsiveClasses(size, list.sizes),
    list.slots.row,
    list.slots.markerRow,
    marker && markerRows[marker],
    !disablePadding && list.slots.rowPadding,
    !disableGutters && list.slots.gutterStart,
    end && list.slots.reserve,
    !end && !disableGutters && list.slots.gutterEnd,
    divider && list.slots.divider,
    divider && 'border-x-0 border-t-0',
    responsiveClasses(alignItems, layout.alignItems),
    'group relative flex min-w-0 has-data-nested:flex-col has-data-nested:items-stretch',
    className,
  );
