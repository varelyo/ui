import { FloatingPortal } from '@floating-ui/react';
import { usePortal } from '../hooks';
import { portalBoundaryClassName } from '../Portal.styles';
import type { OverlayPortalProps } from '../Portal.types';

export function OverlayPortal({
  children,
  container,
  disablePortal,
  preserveTabOrder,
}: OverlayPortalProps) {
  const portal = usePortal({ container });
  return disablePortal ? (
    children
  ) : (
    <FloatingPortal {...portal.rootProps} preserveTabOrder={preserveTabOrder}>
      <div {...portal.boundaryProps} className={portalBoundaryClassName}>
        {children}
      </div>
    </FloatingPortal>
  );
}
