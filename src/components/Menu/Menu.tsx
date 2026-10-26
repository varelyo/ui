import { OverlayRoot } from '../Portal';
import type { MenuProps } from './Menu.types';
import { MenuLayer } from './ui';

export function Menu({
  autoFocus = true,
  placement = 'bottom-start',
  keepMounted = false,
  variant = 'standard',
  ...rest
}: MenuProps) {
  return (
    <OverlayRoot>
      <MenuLayer
        {...rest}
        variant={variant}
        autoFocus={autoFocus}
        placement={placement}
        keepMounted={keepMounted}
      />
    </OverlayRoot>
  );
}
