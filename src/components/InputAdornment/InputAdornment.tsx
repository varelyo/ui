import { renderAddon } from '../../utils';
import { IconSizeContext } from '../Icon';
import { useInputAdornment } from './hooks';
import { INPUT_ADORNMENT_SLOTS } from './InputAdornment.constants';
import { inputAdornmentClassName } from './InputAdornment.styles';
import type { InputAdornmentProps } from './InputAdornment.types';

export function InputAdornment({
  position,
  addon,
  className,
  children,
  ...rest
}: InputAdornmentProps) {
  const { slots, iconSize, addon: props } = useInputAdornment();
  return (
    <span
      {...rest}
      data-slot={INPUT_ADORNMENT_SLOTS[position]}
      className={inputAdornmentClassName(slots, className)}
    >
      <IconSizeContext value={iconSize}>{children ?? renderAddon(addon, props)}</IconSizeContext>
    </span>
  );
}
