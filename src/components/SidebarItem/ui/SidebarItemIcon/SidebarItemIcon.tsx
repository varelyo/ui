import { IconSizeContext } from '../../../../foundation/Icon';
import type { SidebarItemIconProps } from '../../SidebarItem.types';
import { sidebarItemIconClassName } from './SidebarItemIcon.styles';

export function SidebarItemIcon({ size, children }: SidebarItemIconProps) {
  return (
    <span aria-hidden="true" className={sidebarItemIconClassName}>
      <IconSizeContext value={size}>{children}</IconSizeContext>
    </span>
  );
}
