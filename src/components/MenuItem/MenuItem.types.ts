import type { ElementType, ReactNode, Ref } from 'react';
import type { IconSize } from '../../generated/maps';
import type { PolymorphicProps } from '../../types';
import type { MenuContextValue } from '../Menu';

type MenuItemOwnProps = {
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};

export type MenuItemProps<C extends ElementType = 'button'> = PolymorphicProps<C, MenuItemOwnProps>;

export type MenuItemLinkProps = PolymorphicProps<'a', MenuItemOwnProps & { href: string }> & {
  component?: undefined;
};

export type MenuItemInternalProps = MenuItemOwnProps & {
  className?: string;
  ref?: Ref<HTMLElement>;
};

export interface UseMenuItemParams {
  ref: Ref<HTMLElement> | undefined;
}

export interface UseMenuItemResult {
  ref: (node: HTMLElement | null) => void;
  tabIndex: 0 | -1;
  iconSize: IconSize;
  getItemProps: MenuContextValue['getItemProps'];
}

export interface MenuItemIconProps {
  size: IconSize;
  children: ReactNode;
}

export interface MenuItemLabelProps {
  children: ReactNode;
}
