import { Collapse } from '../Collapse';
import { Drawer } from '../Drawer';
import { useSidebar } from './hooks';
import { sidebarDockClassName } from './Sidebar.styles';
import type { SidebarProps } from './Sidebar.types';
import { SidebarPanel } from './ui';

export function Sidebar({
  label,
  collapsed = false,
  open,
  defaultOpen = false,
  onOpenChange,
  variant = 'responsive',
  color = 'neutral',
  children,
  ...rest
}: SidebarProps) {
  const sidebar = useSidebar({ collapsed, open, defaultOpen, onOpenChange, variant, color });
  return (
    <>
      <Collapse
        in={!collapsed}
        orientation="horizontal"
        collapsedSize="3xl"
        className={sidebarDockClassName({ variant, color })}
      >
        <SidebarPanel {...rest} label={label} context={sidebar.dockedContext}>
          {children}
        </SidebarPanel>
      </Collapse>
      {sidebar.responsive ? (
        <Drawer open={sidebar.drawerOpen} onClose={sidebar.closeDrawer} aria-label={label}>
          <SidebarPanel label={label} context={sidebar.drawerContext}>
            {children}
          </SidebarPanel>
        </Drawer>
      ) : null}
    </>
  );
}
