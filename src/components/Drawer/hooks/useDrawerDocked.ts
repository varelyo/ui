import { useMergeRefs } from '@floating-ui/react';
import { usePresence } from '../../../hooks';
import type { UseDrawerDockedParams, UseDrawerDockedResult } from '../Drawer.types';

export function useDrawerDocked({
  open,
  animated,
  keepMounted,
  ref,
}: UseDrawerDockedParams): UseDrawerDockedResult {
  const shown = open || !animated;
  const presence = usePresence({ open: shown, keepMounted });
  const merged = useMergeRefs<HTMLDivElement>([presence.ref, ref]);
  return {
    rendered: presence.rendered,
    ref: (node) => merged?.(node),
    layerProps: {
      ...(presence.closed ? { 'data-closed': '' } : {}),
      ...(presence.hidden ? { hidden: true } : {}),
    },
  };
}
