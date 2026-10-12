import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

export function useFormReset<T extends HTMLElement>(node: RefObject<T | null>, reset: () => void) {
  const callback = useRef(reset);
  useLayoutEffect(() => {
    callback.current = reset;
  });
  useEffect(() => {
    const form = node.current?.closest('form');
    if (!form) return undefined;
    let mounted = true;
    const handleReset = (event: Event) => {
      window.setTimeout(() => {
        if (mounted && !event.defaultPrevented) callback.current();
      }, 0);
    };
    form.addEventListener('reset', handleReset);
    return () => {
      mounted = false;
      form.removeEventListener('reset', handleReset);
    };
  }, [node]);
}
