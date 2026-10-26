import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LIST_ITEM_TEXT_COMPONENT_NAME_KEY } from './ListItemText.constants';
import type { ListItemTextStyleProps } from './ListItemText.types';

const list = componentTokens[LIST_ITEM_TEXT_COMPONENT_NAME_KEY];

export const listItemTextClassName = (
  { size, inset }: ListItemTextStyleProps,
  className?: ClassValue,
) =>
  cx(
    responsiveClasses(size, list.sizes),
    list.slots.text,
    inset && list.slots.textInset,
    'flex min-w-0 flex-1 flex-col',
    className,
  );
