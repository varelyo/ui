import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LIST_ITEM_ICON_COMPONENT_NAME_KEY } from './ListItemIcon.constants';
import type { ListItemIconStyleProps } from './ListItemIcon.types';

const list = componentTokens[LIST_ITEM_ICON_COMPONENT_NAME_KEY];

export const listItemIconClassName = ({ size }: ListItemIconStyleProps, className?: ClassValue) =>
  cx(
    responsiveClasses(size, list.sizes),
    list.slots.icon,
    'inline-flex shrink-0 items-center transition-colors duration-sm ease-standard motion-reduce:transition-none',
    className,
  );
