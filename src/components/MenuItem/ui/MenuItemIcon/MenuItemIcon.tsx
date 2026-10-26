import { IconSizeContext } from '../../../Icon';
import type { MenuItemIconProps } from '../../MenuItem.types';
import { menuItemIconClassName } from './MenuItemIcon.styles';

export function MenuItemIcon({ size, children }: MenuItemIconProps) {
  return (
    <span aria-hidden="true" className={menuItemIconClassName}>
      <IconSizeContext value={size}>{children}</IconSizeContext>
    </span>
  );
}
