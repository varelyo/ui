import type {
  AriaAttributes,
  ChangeEvent,
  ComponentPropsWithRef,
  HTMLInputTypeAttribute,
  MouseEvent,
  ReactNode,
  Ref,
  RefCallback,
} from 'react';
import type { FormControlSlots } from '../FormControl';

type NativeInputProps = Omit<
  ComponentPropsWithRef<'input'>,
  'size' | 'style' | 'ref' | 'value' | 'defaultValue' | 'onChange' | 'children' | 'color'
>;

export type InputBaseControl = HTMLInputElement | HTMLTextAreaElement;

export type InputBaseProps = NativeInputProps & {
  ref?: Ref<HTMLDivElement> | undefined;
  inputRef?: Ref<InputBaseControl> | undefined;
  multiline?: boolean | undefined;
  rows?: number | undefined;
  minRows?: number | undefined;
  maxRows?: number | undefined;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  value?: string | number | undefined;
  defaultValue?: string | number | undefined;
  onChange?: ((event: ChangeEvent<InputBaseControl>) => void) | undefined;
};

export interface InputBaseStyleProps {
  multiline: boolean;
  file: boolean;
}

export interface UseInputBaseParams {
  inputRef: Ref<InputBaseControl> | undefined;
  type: HTMLInputTypeAttribute | undefined;
  multiline: boolean;
  rows: number | undefined;
  minRows: number | undefined;
  maxRows: number | undefined;
  disabled: boolean | undefined;
  required: boolean | undefined;
  invalid: AriaAttributes['aria-invalid'];
  startAdornment: ReactNode;
  endAdornment: ReactNode;
  onChange: ((event: ChangeEvent<InputBaseControl>) => void) | undefined;
}

export interface UseInputBaseResult {
  slots: FormControlSlots;
  styleProps: InputBaseStyleProps;
  hasStartAdornment: boolean;
  hasEndAdornment: boolean;
  textareaRows: number;
  boxProps: {
    onMouseDown: (event: MouseEvent<HTMLDivElement>) => void;
  };
  controlProps: {
    ref: RefCallback<InputBaseControl>;
    disabled: boolean;
    required: boolean;
    'aria-invalid': AriaAttributes['aria-invalid'];
    onChange: (event: ChangeEvent<InputBaseControl>) => void;
  };
}
