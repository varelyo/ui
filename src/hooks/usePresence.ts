import { useEffect, useState } from 'react';
import { transitionTime } from '../utils';

export interface UsePresenceParams {
  open: boolean;
  keepMounted: boolean;
}

export interface UsePresenceResult {
  rendered: boolean;
  closed: boolean;
  hidden: boolean;
  ref: (node: HTMLElement | null) => void;
}

export function usePresence({ open, keepMounted }: UsePresenceParams): UsePresenceResult {
  const [present, setPresent] = useState(open);
  const [node, setNode] = useState<HTMLElement | null>(null);
  if (open && !present) setPresent(true);
  useEffect(() => {
    if (open || !present) return undefined;
    const time = node ? transitionTime(node) : 0;
    if (!node || time === 0) {
      setPresent(false);
      return undefined;
    }
    const finish = (event?: Event) => {
      if (!event || event.target === node) setPresent(false);
    };
    node.addEventListener('transitionend', finish);
    node.addEventListener('transitioncancel', finish);
    const timer = window.setTimeout(finish, time);
    return () => {
      node.removeEventListener('transitionend', finish);
      node.removeEventListener('transitioncancel', finish);
      window.clearTimeout(timer);
    };
  }, [open, present, node]);
  return {
    rendered: present || keepMounted,
    closed: !open,
    hidden: !open && !present,
    ref: setNode,
  };
}
