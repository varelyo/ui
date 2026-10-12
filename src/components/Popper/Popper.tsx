import { FloatingNode } from '@floating-ui/react';
import { OverlayPortal } from '../Portal';
import { usePopperLayer } from './hooks';
import { popperClassName } from './Popper.styles';
import type { PopperProps } from './Popper.types';
import { PopperFocusScope } from './ui';

export function Popper({
  popper,
  keepMounted = false,
  disablePortal = false,
  layer = 'dropdown',
  container,
  focusManager,
  className,
  children,
  ref,
  ...rest
}: PopperProps) {
  const popperLayer = usePopperLayer({ popper, keepMounted, ref });
  return popperLayer.rendered ? (
    <FloatingNode id={popper.nodeId}>
      <OverlayPortal
        disablePortal={disablePortal}
        container={container}
        preserveTabOrder={popper.open}
      >
        <PopperFocusScope popper={popper} focusManager={focusManager}>
          <div
            {...rest}
            {...popperLayer.layerProps}
            ref={popperLayer.ref}
            style={popper.floatingStyles}
            className={popperClassName({ layer }, className)}
          >
            {children}
          </div>
        </PopperFocusScope>
      </OverlayPortal>
    </FloatingNode>
  ) : null;
}
