import { ButtonBase, type ButtonBaseProps } from '../ButtonBase';
import { useSelectOption } from './hooks';
import { selectOptionClassName } from './SelectOption.styles';
import type { SelectOptionProps } from './SelectOption.types';

export function SelectOption({
  value,
  disabled = false,
  className,
  children,
  ref,
  onClick,
  ...rest
}: SelectOptionProps) {
  const option = useSelectOption({ value, ref, onClick });
  return (
    <ButtonBase
      {...(option.getItemProps(rest) as ButtonBaseProps<'div'>)}
      component="div"
      ref={option.ref}
      role="option"
      tabIndex={option.tabIndex}
      disabled={disabled}
      className={selectOptionClassName(option.variant, className)}
    >
      {children}
    </ButtonBase>
  );
}
