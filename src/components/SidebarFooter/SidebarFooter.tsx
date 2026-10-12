import { sidebarFooterClassName } from './SidebarFooter.styles';
import type { SidebarFooterProps } from './SidebarFooter.types';

export function SidebarFooter({ className, ...rest }: SidebarFooterProps) {
  return <div {...rest} className={sidebarFooterClassName(className)} />;
}
