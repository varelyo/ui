import {
  safePolygon,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useControllableState } from '../../../hooks';
import { usePopper } from '../../Popper';
import type { UseTooltipParams, UseTooltipResult } from '../Tooltip.types';
import { useTooltipDelays } from './useTooltipDelays';

const titled = (title: ReactNode) =>
  title !== undefined && title !== null && title !== false && title !== '';

export function useTooltip({
  title,
  trigger,
  placement,
  open,
  defaultOpen,
  onOpen,
  onClose,
  enterDelay,
  leaveDelay,
  disableHoverListener,
  disableFocusListener,
}: UseTooltipParams): UseTooltipResult {
  const [current, setCurrent] = useControllableState({ value: open, defaultValue: defaultOpen });
  const requested = useRef(current);
  useLayoutEffect(() => {
    requested.current = current;
  }, [current]);
  const enabled = titled(title);
  const popper = usePopper({
    open: enabled && current,
    placement,
    offset: 'xs',
    onOpenChange: (next, event) => {
      if (next === (open === undefined ? requested.current : current)) return;
      requested.current = next;
      setCurrent(next);
      if (next) onOpen?.(event);
      else onClose?.(event);
    },
  });
  const delay = useTooltipDelays(popper.elements.domReference, enterDelay, leaveDelay);
  const hover = useHover(popper.context, {
    enabled: enabled && !disableHoverListener,
    delay,
    move: false,
    handleClose: safePolygon({ blockPointerEvents: false }),
  });
  const focus = useFocus(popper.context, { enabled: enabled && !disableFocusListener });
  const dismiss = useDismiss(popper.context);
  const role = useRole(popper.context, { role: 'tooltip' });
  const interactions = useInteractions([hover, focus, dismiss, role]);
  const ref = useMergeRefs([popper.refs.setReference, trigger.props.ref]);
  return {
    popper,
    triggerProps: interactions.getReferenceProps({ ...trigger.props, ref }),
    floatingProps: interactions.getFloatingProps(),
  };
}
