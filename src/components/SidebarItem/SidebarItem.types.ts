import type { ElementType, ReactNode } from 'react';
import type { PolymorphicProps } from '../../types';
import type { SidebarColor } from '../Sidebar';

type SidebarItemOwnProps = {
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  end?: ReactNode;
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
  icon: ReactNode;
  end: ReactNode;
}

export interface UseSidebarItemResult {
  collapsed: boolean;
  color: SidebarColor;
  iconShown: boolean;
  end: ReactNode;
}
