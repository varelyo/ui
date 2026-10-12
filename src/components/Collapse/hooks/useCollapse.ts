import { useMergeRefs } from '@floating-ui/react';
import { usePresence } from '../../../hooks';
import type { UseCollapseParams, UseCollapseResult } from '../Collapse.types';

export function useCollapse({
  open,
  collapsedSize,
  unmountOnExit,
  ref,
}: UseCollapseParams): UseCollapseResult {
  const presence = usePresence({ open, keepMounted: !unmountOnExit });
  const merged = useMergeRefs<HTMLDivElement>([presence.ref, ref]);
  return {
    ref: (node) => merged?.(node),
    rendered: presence.rendered,
    rootProps: presence.closed ? { 'data-closed': '' } : {},
    contentProps: presence.closed && collapsedSize === 'none' ? { inert: true } : {},
  };
}
