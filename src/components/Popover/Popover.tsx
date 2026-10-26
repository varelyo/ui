import { OverlayRoot } from '../Portal';
import type { PopoverProps } from './Popover.types';
import { PopoverLayer } from './ui';

export function Popover({
  placement = 'bottom-start',
  keepMounted = false,
  variant = 'standard',
  ...rest
}: PopoverProps) {
  return (
    <OverlayRoot>
      <PopoverLayer {...rest} placement={placement} keepMounted={keepMounted} variant={variant} />
    </OverlayRoot>
  );
}
