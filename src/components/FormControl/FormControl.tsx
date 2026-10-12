import { FormControlContext } from './context';
import { formControlClassName } from './FormControl.styles';
import type { FormControlProps } from './FormControl.types';
import { useFormControlState } from './hooks';

export function FormControl({
  variant = 'outlined',
  size = 'md',
  disabled = false,
  error = false,
  required = false,
  fullWidth = false,
  className,
  children,
  ...rest
}: FormControlProps) {
  const { context, rootProps } = useFormControlState({ variant, size, disabled, error, required });
  return (
    <div
      {...rest}
      {...rootProps}
      className={formControlClassName({ variant, size, fullWidth }, className)}
    >
      <FormControlContext value={context}>{children}</FormControlContext>
    </div>
  );
}
