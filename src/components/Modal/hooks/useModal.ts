import {
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { usePresence } from '../../../hooks';
import type { UseModalParams, UseModalResult } from '../Modal.types';

export function useModal({
  open,
  onClose,
  keepMounted,
  disableEscapeKeyDown,
  ref,
}: UseModalParams): UseModalResult {
  const nodeId = useFloatingNodeId();
  const floating = useFloating({
    nodeId,
    open,
    onOpenChange: (next, event) => {
      if (!next) onClose?.(event, 'escapeKeyDown');
    },
  });
  const dismiss = useDismiss(floating.context, {
    escapeKey: !disableEscapeKeyDown,
    outsidePress: false,
  });
  const role = useRole(floating.context, { role: 'dialog' });
  const interactions = useInteractions([dismiss, role]);
  const presence = usePresence({ open, keepMounted });
  const merged = useMergeRefs<HTMLDivElement>([floating.refs.setFloating, ref]);
  return {
    nodeId,
    context: floating.context,
    rendered: presence.rendered,
    open,
    rootRef: presence.ref,
    rootProps: {
      ...(presence.closed ? { 'data-closed': '' } : {}),
      ...(presence.hidden ? { hidden: true } : {}),
    },
    floatingRef: (node) => merged?.(node),
    getFloatingProps: (props) => interactions.getFloatingProps({ ...props, 'aria-modal': true }),
    onBackdropClick: (event) => onClose?.(event.nativeEvent, 'backdropClick'),
  };
}
