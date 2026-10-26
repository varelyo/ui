import { IconSizeContext } from '../Icon';
import { useListItemIcon } from './hooks';
import { listItemIconClassName } from './ListItemIcon.styles';
import type { ListItemIconProps } from './ListItemIcon.types';

export function ListItemIcon({ size, className, children, ...rest }: ListItemIconProps) {
  const icon = useListItemIcon({ size });
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={listItemIconClassName({ size: icon.listSize }, className)}
    >
      <IconSizeContext value={icon.iconSize}>{children}</IconSizeContext>
    </span>
  );
}
