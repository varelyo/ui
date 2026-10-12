import type { ChangeEvent, ComponentPropsWithRef, ReactNode, Ref } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { Responsive, SizeOf, VariantOf } from '../../types';
import type { TEXT_FIELD_COMPONENT_NAME_KEY } from './TextField.constants';

export type TextFieldTokens = ComponentTokens[typeof TEXT_FIELD_COMPONENT_NAME_KEY];
export type TextFieldVariant = VariantOf<TextFieldTokens>;
export type TextFieldSize = SizeOf<TextFieldTokens>;

type NativeInputProps = Omit<
  ComponentPropsWithRef<'input'>,
  'size' | 'style' | 'ref' | 'value' | 'defaultValue' | 'onChange' | 'children' | 'color'
>;

export type TextFieldProps = NativeInputProps & {
  ref?: Ref<HTMLDivElement>;
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  size?: Responsive<TextFieldSize>;
  variant?: TextFieldVariant;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export interface UseTextFieldParams {
  id: string | undefined;
  label: ReactNode;
  helperText: ReactNode;
  describedBy: string | undefined;
}

export interface UseTextFieldResult {
  inputId: string;
  helperId: string | undefined;
  describedBy: string | undefined;
  hasLabel: boolean;
  hasHelperText: boolean;
}
