import type { ChangeEvent, ComponentPropsWithRef, MutableRefObject, ReactNode, Ref } from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type { Addon, Responsive, SizeOf, VariantOf } from '../../types';
import type { FormControlSlots } from '../FormControl';
import type { PopperFocusManager, PopperState } from '../Popper';
import type { SELECT_COMPONENT_NAME_KEY } from './Select.constants';

export type SelectTokens = ComponentTokens[typeof SELECT_COMPONENT_NAME_KEY];
export type SelectVariant = VariantOf<SelectTokens>;
export type SelectSize = SizeOf<SelectTokens>;
export type SelectValue = string | number;

export interface SelectChangeEvent<Value> {
  target: { value: Value; name: string | undefined };
  nativeEvent: Event | undefined;
}

type SelectFieldProps = {
  ref?: Ref<HTMLDivElement>;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  size?: Responsive<SelectSize>;
  variant?: SelectVariant;
  fullWidth?: boolean;
  startAddon?: Addon;
  endAddon?: Addon;
  children?: ReactNode;
};

type SelectSingleProps = {
  multiple?: false;
  value?: SelectValue;
  defaultValue?: SelectValue;
  onChange?: (event: SelectChangeEvent<SelectValue>) => void;
};

type SelectMultipleProps = {
  multiple: true;
  value?: readonly SelectValue[];
  defaultValue?: readonly SelectValue[];
  onChange?: (event: SelectChangeEvent<SelectValue[]>) => void;
};

type SelectTriggerAttributes = Omit<
  ComponentPropsWithRef<'div'>,
  | keyof SelectFieldProps
  | keyof SelectSingleProps
  | 'style'
  | 'color'
  | 'role'
  | 'tabIndex'
  | 'dangerouslySetInnerHTML'
>;

export type SelectProps = SelectTriggerAttributes &
  SelectFieldProps &
  (SelectSingleProps | SelectMultipleProps);

export type SelectFieldLayerProps = SelectProps & {
  size: Responsive<SelectSize>;
  variant: SelectVariant;
  error: boolean;
  disabled: boolean;
  required: boolean;
  fullWidth: boolean;
};

export interface SelectOptionEntry {
  value: SelectValue;
  label: ReactNode;
  disabled: boolean;
}

export interface SelectContextValue {
  activeIndex: number | null;
  variant: SelectVariant;
  isSelected(value: SelectValue): boolean;
  choose(value: SelectValue, event: Event | undefined): void;
  getItemProps(props?: Record<string, unknown>): Record<string, unknown>;
}

export interface SelectFieldControlProps {
  ref: Ref<HTMLDivElement> | undefined;
  variant: SelectVariant;
  size: Responsive<SelectSize>;
  disabled: boolean;
  error: boolean;
  required: boolean;
  fullWidth: boolean;
  className: string;
}

export interface UseSelectResult {
  ids: { trigger: string; label: string | undefined; helper: string | undefined; listbox: string };
  label: ReactNode;
  helperText: ReactNode;
  children: ReactNode;
  name: string | undefined;
  disabled: boolean;
  required: boolean;
  fieldProps: SelectFieldControlProps;
  open: boolean;
  popper: PopperState;
  focusManager: PopperFocusManager;
  labels: readonly ReactNode[];
  optionLabels: readonly ReactNode[];
  formValue: string;
  indicatorSize: Responsive<IconSize> | undefined;
  triggerRef: (node: HTMLElement | null) => void;
  triggerProps: Record<string, unknown>;
  listboxProps: Record<string, unknown>;
  popupClassName: string;
  focusTrigger: () => void;
  autofill: (event: ChangeEvent<HTMLInputElement>) => void;
  elementsRef: MutableRefObject<Array<HTMLElement | null>>;
  labelsRef: MutableRefObject<Array<string | null>>;
  context: SelectContextValue;
}

export interface SelectValueProps {
  labels: readonly ReactNode[];
  options: readonly ReactNode[];
  className: string;
}

export interface SelectIndicatorProps {
  open: boolean;
  size: Responsive<IconSize> | undefined;
}

export interface SelectTriggerProps {
  triggerRef: (node: HTMLElement | null) => void;
  triggerProps: Record<string, unknown>;
  open: boolean;
  labels: readonly ReactNode[];
  optionLabels: readonly ReactNode[];
  indicatorSize: Responsive<IconSize> | undefined;
  name: string | undefined;
  formValue: string;
  required: boolean;
  disabled: boolean;
  autofill: (event: ChangeEvent<HTMLInputElement>) => void;
  startAddon: Addon;
  endAddon: Addon;
}

export interface UseSelectTriggerResult {
  slots: FormControlSlots;
}
