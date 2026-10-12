import { sidebarContentClassName } from './SidebarContent.styles';
import type { SidebarContentProps } from './SidebarContent.types';

export function SidebarContent({ className, ...rest }: SidebarContentProps) {
  return <div {...rest} className={sidebarContentClassName(className)} />;
}
