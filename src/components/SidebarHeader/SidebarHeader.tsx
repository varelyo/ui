import { sidebarHeaderClassName } from './SidebarHeader.styles';
import type { SidebarHeaderProps } from './SidebarHeader.types';

export function SidebarHeader({ className, ...rest }: SidebarHeaderProps) {
  return <div {...rest} className={sidebarHeaderClassName(className)} />;
}
