import { FORM_HELPER_TEXT_SLOT } from './FormHelperText.constants';
import { formHelperTextClassName } from './FormHelperText.styles';
import type { FormHelperTextProps } from './FormHelperText.types';
import { useFormHelperText } from './hooks';

export function FormHelperText({ className, ...rest }: FormHelperTextProps) {
  const { slots } = useFormHelperText();
  return (
    <p
      {...rest}
      data-slot={FORM_HELPER_TEXT_SLOT}
      className={formHelperTextClassName(slots, className)}
    />
  );
}
