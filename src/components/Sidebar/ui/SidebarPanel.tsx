import { SidebarContext } from '../context';
import { sidebarPanelClassName } from '../Sidebar.styles';
import type { SidebarPanelProps } from '../Sidebar.types';

export function SidebarPanel({ label, context, className, ...rest }: SidebarPanelProps) {
  return (
    <SidebarContext value={context}>
      <nav {...rest} aria-label={label} className={sidebarPanelClassName(className)} />
    </SidebarContext>
  );
}
