import type { ElementType, ReactElement } from 'react';
import { ListItem } from '../ListItem';
import { ListItemButton, type ListItemButtonProps } from '../ListItemButton';
import { ListItemIcon } from '../ListItemIcon';
import { ListItemText } from '../ListItemText';
import { Tooltip } from '../Tooltip';
import { useSidebarItem } from './hooks';
import type {
  SidebarItemInternalProps,
  SidebarItemLinkProps,
  SidebarItemProps,
} from './SidebarItem.types';

export function SidebarItem(props: SidebarItemLinkProps): ReactElement;
export function SidebarItem<C extends ElementType = 'button'>(
  props: SidebarItemProps<C>,
): ReactElement;
export function SidebarItem(props: SidebarItemLinkProps | SidebarItemProps<ElementType>) {
  const {
    icon,
    selected = false,
    disabled = false,
    end,
    children,
    ...rest
  } = props as SidebarItemInternalProps;
  const item = useSidebarItem({ icon, end });
  return (
    <ListItem end={item.end}>
      <Tooltip
        title={children}
        placement="right"
        disableHoverListener={!item.collapsed}
        disableFocusListener={!item.collapsed}
      >
        <ListItemButton
          {...(rest as ListItemButtonProps<ElementType>)}
          color={item.color}
          selected={selected}
          disabled={disabled}
        >
          {item.iconShown ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText noWrap>{children}</ListItemText>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
