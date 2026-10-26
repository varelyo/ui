import type { ComponentPropsWithRef } from 'react';
import { InputAdornment } from '../InputAdornment';
import { useInputBase } from './hooks';
import { INPUT_BASE_SLOT } from './InputBase.constants';
import { inputBaseBoxClassName, inputBaseControlClassName } from './InputBase.styles';
import type { InputBaseProps } from './InputBase.types';

export function InputBase({
  ref,
  inputRef,
  multiline = false,
  rows,
  minRows,
  maxRows,
  startAddon,
  endAddon,
  disabled,
  required,
  className,
  onChange,
  ...rest
}: InputBaseProps) {
  const input = useInputBase({
    inputRef,
    type: rest.type,
    multiline,
    rows,
    minRows,
    maxRows,
    disabled,
    required,
    invalid: rest['aria-invalid'],
    startAddon,
    endAddon,
    onChange,
  });
  return (
    <div
      ref={ref}
      data-slot={INPUT_BASE_SLOT}
      {...input.boxProps}
      className={inputBaseBoxClassName(input.styleProps, input.slots, className)}
    >
      {input.hasStartAddon ? <InputAdornment position="start" addon={startAddon} /> : null}
      {multiline ? (
        <textarea
          {...(rest as ComponentPropsWithRef<'textarea'>)}
          {...input.controlProps}
          rows={input.textareaRows}
          className={inputBaseControlClassName(input.styleProps, input.slots)}
        />
      ) : (
        <input
          {...rest}
          {...input.controlProps}
          className={inputBaseControlClassName(input.styleProps, input.slots)}
        />
      )}
      {input.hasEndAddon ? <InputAdornment position="end" addon={endAddon} /> : null}
    </div>
  );
}
