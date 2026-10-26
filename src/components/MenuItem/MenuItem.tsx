import type { ElementType, ReactElement } from 'react';
import { ButtonBase, type ButtonBaseProps } from '../ButtonBase';
import { useMenuItem } from './hooks';
import { menuItemClassName } from './MenuItem.styles';
import type { MenuItemInternalProps, MenuItemLinkProps, MenuItemProps } from './MenuItem.types';
import { MenuItemIcon, MenuItemLabel } from './ui';

export function MenuItem(props: MenuItemLinkProps): ReactElement;
export function MenuItem<C extends ElementType = 'button'>(props: MenuItemProps<C>): ReactElement;
export function MenuItem(props: MenuItemLinkProps | MenuItemProps<ElementType>) {
  const {
    icon,
    selected = false,
    disabled = false,
    className,
    children,
    ref,
    ...rest
  } = props as MenuItemInternalProps;
  const item = useMenuItem({ ref });
  return (
    <ButtonBase
      {...(item.getItemProps({ role: 'menuitem', ...rest }) as ButtonBaseProps<ElementType>)}
      ref={item.ref}
      tabIndex={item.tabIndex}
      disabled={disabled}
      data-selected={selected ? '' : undefined}
      className={menuItemClassName(item.variant, className)}
    >
      {icon ? <MenuItemIcon size={item.iconSize}>{icon}</MenuItemIcon> : null}
      <MenuItemLabel>{children}</MenuItemLabel>
    </ButtonBase>
  );
}
