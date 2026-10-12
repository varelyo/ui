import type { ComponentPropsWithRef, ReactNode, SyntheticEvent } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { ColorOf } from '../../types';
import type { TABS_COMPONENT_NAME_KEY } from './Tabs.constants';

export type TabsTokens = ComponentTokens[typeof TABS_COMPONENT_NAME_KEY];
export type TabsColor = ColorOf<TabsTokens>;
export type TabValue = string | number;
export type TabsOrientation = 'horizontal' | 'vertical';

type TabsOwnProps = {
  value?: TabValue;
  defaultValue?: TabValue;
  onChange?: (event: SyntheticEvent, value: TabValue) => void;
  orientation?: TabsOrientation;
  selectionFollowsFocus?: boolean;
  color?: TabsColor;
  children?: ReactNode;
};

export type TabsProps = TabsOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof TabsOwnProps | 'style'>;

export interface TabsContextValue {
  baseId: string;
  value: TabValue | undefined;
  orientation: TabsOrientation;
  selectionFollowsFocus: boolean;
  color: TabsColor;
  select(value: TabValue, event: SyntheticEvent): void;
}

export interface UseTabsParams {
  value: TabValue | undefined;
  defaultValue: TabValue | undefined;
  onChange: ((event: SyntheticEvent, value: TabValue) => void) | undefined;
  orientation: TabsOrientation;
  selectionFollowsFocus: boolean;
  color: TabsColor;
}

export interface UseTabsResult {
  context: TabsContextValue;
}
