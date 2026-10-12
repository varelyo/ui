import type {
  ComponentPropsWithRef,
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react';
import type { IconSize } from '../../generated/maps';
import type { TabsColor, TabsOrientation, TabValue } from '../Tabs';

type TabOwnProps = {
  value: TabValue;
  label?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

export type TabProps = TabOwnProps &
  Omit<
    ComponentPropsWithRef<'button'>,
    keyof TabOwnProps | 'style' | 'children' | 'role' | 'tabIndex' | 'type' | 'color'
  >;

export interface UseTabParams {
  value: TabValue;
  disabled: boolean;
  ref: Ref<HTMLButtonElement> | undefined;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onFocus: FocusEventHandler<HTMLButtonElement> | undefined;
}

export interface TabAccessibilityProps {
  role: 'tab';
  id: string;
  'aria-selected': boolean;
  'aria-controls': string;
  tabIndex: 0 | -1;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onFocus: (event: FocusEvent<HTMLButtonElement>) => void;
}

export interface UseTabResult {
  ref: (node: HTMLButtonElement | null) => void;
  orientation: TabsOrientation;
  color: TabsColor;
  iconSize: IconSize;
  tabProps: TabAccessibilityProps;
}

export interface TabIconProps {
  size: IconSize;
  children: ReactNode;
}

export interface TabLabelProps {
  children: ReactNode;
}

export interface TabIndicatorProps {
  orientation: TabsOrientation;
}
