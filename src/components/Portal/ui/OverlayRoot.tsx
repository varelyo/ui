import { FloatingTree, useFloatingTree } from '@floating-ui/react';
import type { OverlayRootProps } from '../Portal.types';

export function OverlayRoot({ children }: OverlayRootProps) {
  const tree = useFloatingTree();
  return tree ? children : <FloatingTree>{children}</FloatingTree>;
}
