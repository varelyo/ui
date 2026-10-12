import { useMergeRefs } from '@floating-ui/react';
import { usePresence } from '../../../hooks';
import type { UseBackdropParams, UseBackdropResult } from '../Backdrop.types';

export function useBackdrop({ open, ref }: UseBackdropParams): UseBackdropResult {
  const presence = usePresence({ open, keepMounted: false });
  const merged = useMergeRefs<HTMLDivElement>([presence.ref, ref]);
  return {
    rendered: presence.rendered,
    ref: (node) => merged?.(node),
    layerProps: presence.closed ? { 'data-closed': '' } : {},
  };
}
