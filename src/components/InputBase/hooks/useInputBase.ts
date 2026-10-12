import { useRef, type ChangeEvent, type MouseEvent, type ReactNode } from 'react';
import { useMergedRefs } from '../../../hooks';
import { useFormControl } from '../../FormControl';
import { INPUT_BASE_DEFAULT_ROWS, INPUT_BASE_FILE_TYPE } from '../InputBase.constants';
import type { InputBaseControl, UseInputBaseParams, UseInputBaseResult } from '../InputBase.types';
import { useAutosize } from './useAutosize';

const present = (node: ReactNode) => node !== undefined && node !== null;

export function useInputBase({
  inputRef,
  type,
  multiline,
  rows,
  minRows,
  maxRows,
  disabled,
  required,
  invalid,
  startAdornment,
  endAdornment,
  onChange,
}: UseInputBaseParams): UseInputBaseResult {
  const formControl = useFormControl();
  const control = useRef<InputBaseControl | null>(null);
  const fitHeight = useAutosize(
    control,
    multiline && rows === undefined,
    minRows ?? INPUT_BASE_DEFAULT_ROWS,
    maxRows,
  );
  const ref = useMergedRefs(control, inputRef);
  const inactive = disabled ?? formControl.disabled;
  const file = !multiline && type === INPUT_BASE_FILE_TYPE;
  return {
    slots: formControl.slots,
    styleProps: { multiline, file },
    hasStartAdornment: present(startAdornment),
    hasEndAdornment: present(endAdornment),
    textareaRows: rows ?? minRows ?? INPUT_BASE_DEFAULT_ROWS,
    boxProps: {
      onMouseDown: (event: MouseEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget || inactive) return;
        event.preventDefault();
        control.current?.focus();
        if (file) control.current?.click();
      },
    },
    controlProps: {
      ref,
      disabled: inactive,
      required: required ?? formControl.required,
      'aria-invalid': formControl.error ? true : invalid,
      onChange: (event: ChangeEvent<InputBaseControl>) => {
        onChange?.(event);
        fitHeight();
      },
    },
  };
}
