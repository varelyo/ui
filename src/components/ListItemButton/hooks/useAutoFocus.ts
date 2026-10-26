import { useEffect, useRef, type RefObject } from 'react';
import type { UseAutoFocusParams } from '../ListItemButton.types';

export function useAutoFocus({ autoFocus }: UseAutoFocusParams): RefObject<HTMLElement | null> {
  const node = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (autoFocus) node.current?.focus();
  }, [autoFocus]);
  return node;
}
