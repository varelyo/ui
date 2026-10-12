import { useDismiss, useInteractions, useRole } from '@floating-ui/react';
import { usePopper } from '../../Popper';
import type { UsePopoverParams, UsePopoverResult } from '../Popover.types';

export function usePopover({
  open,
  onClose,
  anchorEl,
  placement,
}: UsePopoverParams): UsePopoverResult {
  const popper = usePopper({ open, onClose, anchorEl, placement, offset: 'xs' });
  const dismiss = useDismiss(popper.context);
  const role = useRole(popper.context, { role: 'dialog' });
  const interactions = useInteractions([dismiss, role]);
  return { popper, getFloatingProps: interactions.getFloatingProps };
}
