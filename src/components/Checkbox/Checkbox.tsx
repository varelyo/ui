import {
  checkboxClassName,
  checkboxControlClassName,
  checkboxInputClassName,
} from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';
import { useCheckbox } from './hooks';
import { CheckboxIndicator, CheckboxLabel } from './ui';

export function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  indeterminate = false,
  disabled = false,
  required = false,
  name,
  value,
  size = 'md',
  color = 'primary',
  variant = 'standard',
  label,
  inputRef,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  className,
  ...rest
}: CheckboxProps) {
  const checkbox = useCheckbox({
    checked,
    defaultChecked,
    indeterminate,
    onChange,
    inputRef,
    label,
  });
  return (
    <label {...rest} className={checkboxClassName({ variant, color, size }, className)}>
      <span className={checkboxControlClassName}>
        <input
          ref={checkbox.inputRef}
          type="checkbox"
          checked={checkbox.checked}
          onChange={checkbox.onChange}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          className={checkboxInputClassName}
        />
        <CheckboxIndicator marked={checkbox.marked} indeterminate={indeterminate} />
      </span>
      {checkbox.labelled ? <CheckboxLabel>{label}</CheckboxLabel> : null}
    </label>
  );
}
