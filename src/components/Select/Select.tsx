import { OverlayRoot } from '../Portal';
import type { SelectProps } from './Select.types';
import { SelectField } from './ui';

export function Select({
  size = 'md',
  variant = 'outlined',
  error = false,
  disabled = false,
  required = false,
  fullWidth = false,
  ...rest
}: SelectProps) {
  return (
    <OverlayRoot>
      <SelectField
        {...rest}
        size={size}
        variant={variant}
        error={error}
        disabled={disabled}
        required={required}
        fullWidth={fullWidth}
      />
    </OverlayRoot>
  );
}
