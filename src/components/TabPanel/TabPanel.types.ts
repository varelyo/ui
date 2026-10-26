import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { TabsColor, TabsVariant, TabValue } from '../Tabs';

type TabPanelOwnProps = {
  value: TabValue;
  children?: ReactNode;
};

export type TabPanelProps = TabPanelOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof TabPanelOwnProps | 'style' | 'role' | 'hidden'>;

export interface UseTabPanelParams {
  value: TabValue;
}

export interface TabPanelAccessibilityProps {
  role: 'tabpanel';
  id: string;
  'aria-labelledby': string;
  hidden: boolean;
  tabIndex: 0;
}

export interface UseTabPanelResult {
  selected: boolean;
  variant: TabsVariant;
  color: TabsColor;
  panelProps: TabPanelAccessibilityProps;
}
