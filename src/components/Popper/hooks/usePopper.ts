import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useFloating,
  useFloatingNodeId,
} from '@floating-ui/react';
import { cssLength, GAP_VARIABLES } from '../../../utils';
import { POPPER_CLOSE_REASONS, POPPER_COLLISION_PADDING } from '../Popper.constants';
import type { PopperOpenChange, PopperState, UsePopperParams } from '../Popper.types';

export function usePopper({
  open,
  onOpenChange,
  onClose,
  anchorEl,
  placement = 'bottom',
  offset: step = 'xs',
  matchWidth = false,
}: UsePopperParams): PopperState {
  const nodeId = useFloatingNodeId();
  const close: PopperOpenChange = (next, event, reason) => {
    const mapped = reason && POPPER_CLOSE_REASONS[reason];
    if (!next && mapped) onClose?.(event, mapped);
  };
  const floating = useFloating({
    nodeId,
    open,
    placement,
    whileElementsMounted: autoUpdate,
    onOpenChange: onOpenChange ?? close,
    ...(anchorEl === undefined ? {} : { elements: { reference: anchorEl } }),
    middleware: [
      offset(({ elements }) => cssLength(elements.floating, GAP_VARIABLES[step]), [step]),
      flip(({ elements }) => ({ padding: cssLength(elements.floating, POPPER_COLLISION_PADDING) })),
      shift(({ elements }) => ({
        padding: cssLength(elements.floating, POPPER_COLLISION_PADDING),
      })),
      size(
        ({ elements }) => ({
          padding: cssLength(elements.floating, POPPER_COLLISION_PADDING),
          apply({ rects, availableWidth, availableHeight }) {
            elements.floating.style.maxWidth = `${Math.max(0, availableWidth)}px`;
            elements.floating.style.maxHeight = `${Math.max(0, availableHeight)}px`;
            if (matchWidth) elements.floating.style.minWidth = `${rects.reference.width}px`;
          },
        }),
        [matchWidth],
      ),
    ],
  });
  return { ...floating, open, nodeId };
}
