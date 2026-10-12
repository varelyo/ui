import type { ElementType, ReactElement } from 'react';
import { ButtonBase, type ButtonBaseProps } from '../ButtonBase';
import { Tooltip } from '../Tooltip';
import { useSidebarItem } from './hooks';
import { sidebarItemClassName } from './SidebarItem.styles';
import type {
  SidebarItemInternalProps,
  SidebarItemLinkProps,
  SidebarItemProps,
} from './SidebarItem.types';
import { SidebarItemIcon, SidebarItemLabel } from './ui';

export function SidebarItem(props: SidebarItemLinkProps): ReactElement;
export function SidebarItem<C extends ElementType = 'button'>(
  props: SidebarItemProps<C>,
): ReactElement;
export function SidebarItem(props: SidebarItemLinkProps | SidebarItemProps<ElementType>) {
  const {
    icon,
    selected = false,
    disabled = false,
    className,
    children,
    ...rest
  } = props as SidebarItemInternalProps;
  const item = useSidebarItem({ selected });
  return (
    <Tooltip
      title={children}
      placement="right"
      disableHoverListener={!item.collapsed}
      disableFocusListener={!item.collapsed}
    >
      <ButtonBase
        {...(rest as ButtonBaseProps<ElementType>)}
        {...item.currentProps}
        disabled={disabled}
        className={sidebarItemClassName(item.color, className)}
      >
        {icon ? <SidebarItemIcon size={item.iconSize}>{icon}</SidebarItemIcon> : null}
        <SidebarItemLabel>{children}</SidebarItemLabel>
      </ButtonBase>
    </Tooltip>
  );
}
