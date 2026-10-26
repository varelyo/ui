import type { ChangeEvent, ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { ColorOf, Responsive, SizeOf, VariantOf } from '../../types';
import type { CHECKBOX_COMPONENT_NAME_KEY } from './Checkbox.constants';

export type CheckboxTokens = ComponentTokens[typeof CHECKBOX_COMPONENT_NAME_KEY];
export type CheckboxVariant = VariantOf<CheckboxTokens>;
export type CheckboxColor = ColorOf<CheckboxTokens>;
export type CheckboxSize = SizeOf<CheckboxTokens>;

type CheckboxOwnProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  size?: Responsive<CheckboxSize>;
  color?: CheckboxColor;
  variant?: CheckboxVariant;
  label?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
};

export type CheckboxProps = CheckboxOwnProps &
  Omit<ComponentPropsWithRef<'label'>, keyof CheckboxOwnProps | 'style' | 'children'>;

export interface CheckboxStyleProps {
  variant: CheckboxVariant;
  color: CheckboxColor;
  size: Responsive<CheckboxSize>;
}

export interface UseCheckboxParams {
  checked: boolean | undefined;
  defaultChecked: boolean;
  indeterminate: boolean;
  onChange: ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
  inputRef: Ref<HTMLInputElement> | undefined;
  label: ReactNode;
}

export interface UseCheckboxResult {
  checked: boolean;
  marked: boolean;
  labelled: boolean;
  inputRef: (node: HTMLInputElement | null) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
