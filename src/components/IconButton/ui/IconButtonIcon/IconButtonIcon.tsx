import { IconSizeContext } from '../../../Icon';
import type { IconButtonIconProps } from '../../IconButton.types';
import { iconButtonIconClassName } from './IconButtonIcon.styles';

export function IconButtonIcon({ size, children }: IconButtonIconProps) {
  return (
    <span data-slot="icon" aria-hidden="true" className={iconButtonIconClassName}>
      <IconSizeContext value={size}>{children}</IconSizeContext>
    </span>
  );
}
