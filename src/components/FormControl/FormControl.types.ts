import type { ComponentPropsWithRef } from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type { AddonProps, Responsive, SizeOf, VariantOf } from '../../types';
import type { FORM_CONTROL_COMPONENT_NAME_KEY } from './FormControl.constants';

export type FormControlTokens = ComponentTokens[typeof FORM_CONTROL_COMPONENT_NAME_KEY];
export type FormControlVariant = VariantOf<FormControlTokens>;
export type FormControlSize = SizeOf<FormControlTokens>;
export type FormControlSlots = FormControlTokens['slots'];

export type FormControlProps = Omit<ComponentPropsWithRef<'div'>, 'color' | 'style'> & {
  variant?: FormControlVariant;
  size?: Responsive<FormControlSize>;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
};

export interface FormControlContextValue {
  disabled: boolean;
  error: boolean;
  required: boolean;
  slots: FormControlSlots;
  adornmentSize: Responsive<IconSize> | undefined;
  addon: AddonProps;
}

export interface FormControlStyleProps {
  variant: FormControlVariant;
  size: Responsive<FormControlSize>;
  fullWidth: boolean;
}

export interface UseFormControlStateParams {
  size: Responsive<FormControlSize>;
  disabled: boolean;
  error: boolean;
  required: boolean;
}

export interface UseFormControlStateResult {
  context: FormControlContextValue;
  rootProps: {
    'data-disabled': '' | undefined;
    'data-error': '' | undefined;
  };
}
