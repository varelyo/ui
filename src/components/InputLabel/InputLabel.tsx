import { useInputLabel } from './hooks';
import { INPUT_LABEL_REQUIRED_MARK, INPUT_LABEL_SLOT } from './InputLabel.constants';
import { inputLabelClassName } from './InputLabel.styles';
import type { InputLabelProps } from './InputLabel.types';

export function InputLabel({ className, children, ...rest }: InputLabelProps) {
  const { required, slots } = useInputLabel();
  return (
    <label {...rest} data-slot={INPUT_LABEL_SLOT} className={inputLabelClassName(slots, className)}>
      {children}
      {required ? <span aria-hidden>{INPUT_LABEL_REQUIRED_MARK}</span> : null}
    </label>
  );
}
