import { FormControl } from '../FormControl';
import { FormHelperText } from '../FormHelperText';
import { InputBase } from '../InputBase';
import { InputLabel } from '../InputLabel';
import { useTextField } from './hooks';
import type { TextFieldProps } from './TextField.types';

export function TextField({
  ref,
  inputRef,
  label,
  helperText,
  error = false,
  size = 'md',
  variant = 'outlined',
  fullWidth = false,
  multiline = false,
  rows,
  minRows,
  maxRows,
  startAdornment,
  endAdornment,
  id,
  disabled = false,
  required = false,
  className,
  onChange,
  ...rest
}: TextFieldProps) {
  const field = useTextField({
    id,
    label,
    helperText,
    describedBy: rest['aria-describedby'],
  });
  return (
    <FormControl
      ref={ref}
      variant={variant}
      size={size}
      disabled={disabled}
      error={error}
      required={required}
      fullWidth={fullWidth}
      className={className}
    >
      {field.hasLabel ? <InputLabel htmlFor={field.inputId}>{label}</InputLabel> : null}
      <InputBase
        {...rest}
        id={field.inputId}
        aria-describedby={field.describedBy}
        inputRef={inputRef}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        onChange={onChange}
      />
      {field.hasHelperText ? (
        <FormHelperText id={field.helperId}>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  );
}
