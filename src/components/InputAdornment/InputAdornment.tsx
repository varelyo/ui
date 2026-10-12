import { IconSizeContext } from '../../foundation/Icon';
import { useInputAdornment } from './hooks';
import { INPUT_ADORNMENT_SLOTS } from './InputAdornment.constants';
import { inputAdornmentClassName } from './InputAdornment.styles';
import type { InputAdornmentProps } from './InputAdornment.types';

export function InputAdornment({ position, className, children, ...rest }: InputAdornmentProps) {
  const { slots, iconSize } = useInputAdornment();
  return (
    <span
      {...rest}
      data-slot={INPUT_ADORNMENT_SLOTS[position]}
      className={inputAdornmentClassName(slots, className)}
    >
      <IconSizeContext value={iconSize}>{children}</IconSizeContext>
    </span>
  );
}
