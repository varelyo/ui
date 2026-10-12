import type { ElementType, ReactNode } from 'react';
import type { IconSize } from '../../generated/maps';
import type { PolymorphicProps } from '../../types';
import type { SidebarColor } from '../Sidebar';

type SidebarItemOwnProps = {
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};

export type SidebarItemProps<C extends ElementType = 'button'> = PolymorphicProps<
  C,
  SidebarItemOwnProps
>;

export type SidebarItemLinkProps = PolymorphicProps<'a', SidebarItemOwnProps & { href: string }> & {
  component?: undefined;
};

export type SidebarItemInternalProps = SidebarItemOwnProps & {
  className?: string;
};

export interface UseSidebarItemParams {
  selected: boolean;
}

export interface SidebarItemCurrentProps {
  'aria-current'?: 'page';
}

export interface UseSidebarItemResult {
  collapsed: boolean;
  color: SidebarColor;
  iconSize: IconSize;
  currentProps: SidebarItemCurrentProps;
}

export interface SidebarItemIconProps {
  size: IconSize;
  children: ReactNode;
}

export interface SidebarItemLabelProps {
  children: ReactNode;
}
