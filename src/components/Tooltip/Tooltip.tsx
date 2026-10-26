import { OverlayRoot } from '../Portal';
import type { TooltipProps } from './Tooltip.types';
import { TooltipOverlay } from './ui';

export function Tooltip({
  title,
  children,
  placement = 'top',
  open,
  defaultOpen = false,
  onOpen,
  onClose,
  enterDelay = 'xs',
  leaveDelay = 'none',
  disableHoverListener = false,
  disableFocusListener = false,
  variant = 'standard',
  ...surfaceProps
}: TooltipProps) {
  return (
    <OverlayRoot>
      <TooltipOverlay
        title={title}
        placement={placement}
        open={open}
        defaultOpen={defaultOpen}
        onOpen={onOpen}
        onClose={onClose}
        enterDelay={enterDelay}
        leaveDelay={leaveDelay}
        disableHoverListener={disableHoverListener}
        disableFocusListener={disableFocusListener}
        variant={variant}
        surfaceProps={surfaceProps}
      >
        {children}
      </TooltipOverlay>
    </OverlayRoot>
  );
}
