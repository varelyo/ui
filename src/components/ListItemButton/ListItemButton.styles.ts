import { componentTokens, layout } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LIST_ITEM_BUTTON_COMPONENT_NAME_KEY } from './ListItemButton.constants';
import type { ListItemButtonStyleProps } from './ListItemButton.types';

const list = componentTokens[LIST_ITEM_BUTTON_COMPONENT_NAME_KEY];

export const listItemButtonClassName = (
  { variant, size, color, end, divider, disableGutters, alignItems }: ListItemButtonStyleProps,
  className?: ClassValue,
) =>
  cx(
    list.variants[variant][color],
    responsiveClasses(size, list.sizes),
    list.slots.item,
    !disableGutters && list.slots.gutterStart,
    end && list.slots.reserve,
    !end && !disableGutters && list.slots.gutterEnd,
    divider && list.slots.divider,
    divider && 'border-x-0 border-t-0',
    responsiveClasses(alignItems, layout.alignItems),
    'flex w-full min-w-0 justify-start text-left transition-colors duration-sm ease-standard motion-reduce:transition-none',
    className,
  );
