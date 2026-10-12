import type { ComponentPropsWithRef, MouseEventHandler, ReactNode, Ref } from 'react';
import type { SelectValue, SelectVariant } from '../Select';

type SelectOptionOwnProps = {
  value: SelectValue;
  disabled?: boolean;
  children?: ReactNode;
};

export type SelectOptionProps = SelectOptionOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof SelectOptionOwnProps | 'style' | 'role' | 'tabIndex'>;

export interface UseSelectOptionParams {
  value: SelectValue;
  ref: Ref<HTMLDivElement> | undefined;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export interface UseSelectOptionResult {
  ref: (node: HTMLDivElement | null) => void;
  tabIndex: 0 | -1;
  variant: SelectVariant;
  getItemProps(props: Record<string, unknown>): Record<string, unknown>;
}
