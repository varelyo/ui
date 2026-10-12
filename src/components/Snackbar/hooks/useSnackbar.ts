import { useMergeRefs } from '@floating-ui/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePresence } from '../../../hooks';
import { cssTime, DWELL_VARIABLES } from '../../../utils';
import type { UseSnackbarParams, UseSnackbarResult } from '../Snackbar.types';
import { escapeStack } from '../utils';

export function useSnackbar({
  open,
  onClose,
  autoHideDuration,
  ref,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: UseSnackbarParams): UseSnackbarResult {
  const presence = usePresence({ open, keepMounted: false });
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const close = useRef(onClose);
  const timer = useRef<number | undefined>(undefined);
  const merged = useMergeRefs<HTMLDivElement>([setNode, presence.ref, ref]);
  const hold = () => window.clearTimeout(timer.current);
  useLayoutEffect(() => {
    close.current = onClose;
  });
  useEffect(() => {
    if (open) return;
    setHovered(false);
    setFocused(false);
  }, [open]);
  useEffect(() => {
    if (!open) return undefined;
    const update = () => {
      const next = document.visibilityState === 'hidden';
      if (next) window.clearTimeout(timer.current);
      setHidden(next);
    };
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, [open]);
  const paused = hovered || focused || hidden;
  useEffect(() => {
    if (!open || autoHideDuration === null || paused || !node) return undefined;
    const id = window.setTimeout(
      () => close.current?.(undefined, 'timeout'),
      cssTime(node, DWELL_VARIABLES[autoHideDuration]),
    );
    timer.current = id;
    return () => window.clearTimeout(id);
  }, [open, autoHideDuration, paused, node]);
  useEffect(() => {
    if (!open) return undefined;
    const entry = escapeStack.push();
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented || !escapeStack.isTop(entry)) return;
      close.current?.(event, 'escapeKeyDown');
    };
    document.addEventListener('keydown', dismiss);
    return () => {
      document.removeEventListener('keydown', dismiss);
      escapeStack.remove(entry);
    };
  }, [open]);
  return {
    rendered: presence.rendered,
    ref: (element) => merged?.(element),
    surfaceProps: {
      ...(presence.closed ? { 'data-closed': '' } : {}),
      onMouseEnter: (event) => {
        onMouseEnter?.(event);
        hold();
        setHovered(true);
      },
      onMouseLeave: (event) => {
        onMouseLeave?.(event);
        setHovered(false);
      },
      onFocus: (event) => {
        onFocus?.(event);
        hold();
        setFocused(true);
      },
      onBlur: (event) => {
        onBlur?.(event);
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      },
    },
  };
}
