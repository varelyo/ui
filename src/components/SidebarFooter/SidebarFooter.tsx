import { sidebarFooterClassName } from './SidebarFooter.styles';
import type { SidebarFooterProps } from './SidebarFooter.types';
import { useSidebarFooter } from './hooks';

export function SidebarFooter({ className, ...rest }: SidebarFooterProps) {
  const { appearance } = useSidebarFooter();
  return <div {...rest} className={sidebarFooterClassName(appearance, className)} />;
}
