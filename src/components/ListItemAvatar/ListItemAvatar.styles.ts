import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LIST_ITEM_AVATAR_COMPONENT_NAME_KEY } from './ListItemAvatar.constants';
import type { ListItemAvatarStyleProps } from './ListItemAvatar.types';

const list = componentTokens[LIST_ITEM_AVATAR_COMPONENT_NAME_KEY];

export const listItemAvatarClassName = (
  { size }: ListItemAvatarStyleProps,
  className?: ClassValue,
) =>
  cx(
    responsiveClasses(size, list.sizes),
    list.slots.avatar,
    'inline-flex shrink-0 items-center',
    className,
  );
