import { useListItemAvatar } from './hooks';
import { listItemAvatarClassName } from './ListItemAvatar.styles';
import type { ListItemAvatarProps } from './ListItemAvatar.types';

export function ListItemAvatar({ className, ...rest }: ListItemAvatarProps) {
  const avatar = useListItemAvatar();
  return <div {...rest} className={listItemAvatarClassName({ size: avatar.size }, className)} />;
}
