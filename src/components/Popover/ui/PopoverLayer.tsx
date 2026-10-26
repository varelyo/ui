import { Paper } from '../../Paper';
import { Popper } from '../../Popper';
import { usePopover } from '../hooks';
import { POPOVER_FOCUS_MANAGER } from '../Popover.constants';
import { popoverLayerClassName, popoverPaperClassName } from '../Popover.styles';
import type { PopoverLayerProps } from '../Popover.types';

export function PopoverLayer({
  open,
  onClose,
  anchorEl,
  placement,
  keepMounted,
  variant,
  className,
  children,
  ref,
  ...rest
}: PopoverLayerProps) {
  const popover = usePopover({ open, onClose, anchorEl, placement });
  return (
    <Popper
      popper={popover.popper}
      keepMounted={keepMounted}
      focusManager={POPOVER_FOCUS_MANAGER}
      className={popoverLayerClassName}
    >
      <Paper
        elevation="md"
        ref={ref}
        {...popover.getFloatingProps(rest)}
        className={popoverPaperClassName(variant, className)}
      >
        {children}
      </Paper>
    </Popper>
  );
}
