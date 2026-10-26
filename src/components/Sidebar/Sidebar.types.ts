import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { ColorOf, VariantOf } from '../../types';
import type { SIDEBAR_COMPONENT_NAME_KEY } from './Sidebar.constants';

export type SidebarTokens = ComponentTokens[typeof SIDEBAR_COMPONENT_NAME_KEY];
export type SidebarColor = ColorOf<SidebarTokens>;
export type SidebarVariant = 'docked' | 'responsive';
export type SidebarAppearance = VariantOf<SidebarTokens>;

type SidebarOwnProps = {
  label: string;
  collapsed?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: SidebarVariant;
  appearance?: SidebarAppearance;
  color?: SidebarColor;
  children?: ReactNode;
};

export type SidebarProps = SidebarOwnProps &
  Omit<ComponentPropsWithRef<'nav'>, keyof SidebarOwnProps | 'style' | 'aria-label'>;

export interface SidebarContextValue {
  appearance: SidebarAppearance;
  collapsed: boolean;
  color: SidebarColor;
}

export interface SidebarDockStyleProps {
  appearance: SidebarAppearance;
  variant: SidebarVariant;
  color: SidebarColor;
}

export interface UseSidebarParams {
  collapsed: boolean;
  open: boolean | undefined;
  defaultOpen: boolean;
  onOpenChange: ((open: boolean) => void) | undefined;
  variant: SidebarVariant;
  appearance: SidebarAppearance;
  color: SidebarColor;
}

export interface UseSidebarResult {
  responsive: boolean;
  drawerOpen: boolean;
  closeDrawer: () => void;
  dockedContext: SidebarContextValue;
  drawerContext: SidebarContextValue;
}

export type SidebarPanelProps = Omit<ComponentPropsWithRef<'nav'>, 'style'> & {
  label: string;
  context: SidebarContextValue;
};
