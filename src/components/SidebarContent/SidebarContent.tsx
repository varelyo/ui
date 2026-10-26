import { List } from '../List';
import { useSidebarContent } from './hooks';
import { sidebarContentClassName } from './SidebarContent.styles';
import type { SidebarContentProps } from './SidebarContent.types';

export function SidebarContent({ className, children, ...rest }: SidebarContentProps) {
  const content = useSidebarContent();
  return (
    <div {...rest} className={sidebarContentClassName(content.appearance, className)}>
      <List disablePadding color={content.color}>
        {children}
      </List>
    </div>
  );
}
