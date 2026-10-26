import { useMergeRefs } from '@floating-ui/react';
import { usePresence } from '../../../hooks';
import type { PopperSide, UsePopperLayerParams, UsePopperLayerResult } from '../Popper.types';

export function usePopperLayer({
  popper,
  keepMounted,
  ref,
}: UsePopperLayerParams): UsePopperLayerResult {
  const presence = usePresence({ open: popper.open, keepMounted });
  const merged = useMergeRefs<HTMLDivElement>([popper.refs.setFloating, presence.ref, ref]);
  return {
    rendered: presence.rendered,
    ref: (node) => merged?.(node),
    layerProps: {
      'data-side': popper.placement.split('-')[0] as PopperSide,
      ...(presence.closed ? { 'data-closed': '' } : {}),
      ...(presence.hidden ? { hidden: true } : {}),
    },
  };
}
