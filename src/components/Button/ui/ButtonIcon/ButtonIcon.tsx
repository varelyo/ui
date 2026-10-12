import { IconSizeContext } from '../../../../foundation/Icon';
import { buttonIconClassName } from './ButtonIcon.styles';
import type { ButtonIconProps } from './ButtonIcon.types';

export function ButtonIcon({ slot, transparent, size, children }: ButtonIconProps) {
  return (
    <span data-slot={slot} className={buttonIconClassName(transparent)}>
      <IconSizeContext value={size}>{children}</IconSizeContext>
    </span>
  );
}
