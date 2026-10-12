import type { SidebarItemLabelProps } from '../../SidebarItem.types';
import { sidebarItemLabelClassName } from './SidebarItemLabel.styles';

export function SidebarItemLabel({ children }: SidebarItemLabelProps) {
  return <span className={sidebarItemLabelClassName}>{children}</span>;
}
