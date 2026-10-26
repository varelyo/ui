import { sidebarHeaderClassName } from './SidebarHeader.styles';
import type { SidebarHeaderProps } from './SidebarHeader.types';
import { useSidebarHeader } from './hooks';

export function SidebarHeader({ className, ...rest }: SidebarHeaderProps) {
  const { appearance } = useSidebarHeader();
  return <div {...rest} className={sidebarHeaderClassName(appearance, className)} />;
}
