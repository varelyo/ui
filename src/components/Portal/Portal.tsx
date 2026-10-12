import type { PortalProps } from './Portal.types';
import { OverlayPortal } from './ui';

export function Portal({ children, container, disablePortal = false }: PortalProps) {
  return (
    <OverlayPortal container={container} disablePortal={disablePortal} preserveTabOrder>
      {children}
    </OverlayPortal>
  );
}
