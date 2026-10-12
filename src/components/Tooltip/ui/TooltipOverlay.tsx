import { Popper } from '../../Popper';
import { useTooltip } from '../hooks';
import type { TooltipOverlayProps } from '../Tooltip.types';
import { TooltipSurface } from './TooltipSurface';
import { TooltipTrigger } from './TooltipTrigger';

export function TooltipOverlay({
  title,
  children,
  placement,
  open,
  defaultOpen,
  onOpen,
  onClose,
  enterDelay,
  leaveDelay,
  disableHoverListener,
  disableFocusListener,
  surfaceProps,
}: TooltipOverlayProps) {
  const tooltip = useTooltip({
    title,
    trigger: children,
    placement,
    open,
    defaultOpen,
    onOpen,
    onClose,
    enterDelay,
    leaveDelay,
    disableHoverListener,
    disableFocusListener,
  });
  return (
    <>
      <TooltipTrigger element={children} props={tooltip.triggerProps} />
      <Popper popper={tooltip.popper} layer="tooltip" {...tooltip.floatingProps}>
        <TooltipSurface {...surfaceProps}>{title}</TooltipSurface>
      </Popper>
    </>
  );
}
