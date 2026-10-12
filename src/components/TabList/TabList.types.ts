import type { ComponentPropsWithRef, FocusEventHandler, KeyboardEventHandler, Ref } from 'react';
import type { TabsOrientation } from '../Tabs';

export type TabListProps = Omit<ComponentPropsWithRef<'div'>, 'style' | 'role'>;

export interface TabListContextValue {
  activeIndex: number;
  navigate(index: number): void;
  register(id: string, tab: TabListItemState): () => void;
}

export interface TabListItemState {
  index: number;
  selected: boolean;
  disabled: boolean;
}

export interface UseTabListParams {
  ref: Ref<HTMLDivElement> | undefined;
  onKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined;
  onBlur: FocusEventHandler<HTMLDivElement> | undefined;
}

export interface UseTabListResult {
  ref: Ref<HTMLDivElement>;
  rtl: boolean;
  orientation: TabsOrientation;
  activeIndex: number;
  navigate: (index: number) => void;
  context: TabListContextValue;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onBlur: FocusEventHandler<HTMLDivElement>;
}
