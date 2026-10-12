import { useCallback, useLayoutEffect, type RefObject } from 'react';
import type { InputBaseControl } from '../InputBase.types';

export function useAutosize(
  node: RefObject<InputBaseControl | null>,
  enabled: boolean,
  minRows: number,
  maxRows: number | undefined,
) {
  const fitHeight = useCallback(() => {
    const element = node.current;
    if (!enabled || !(element instanceof HTMLTextAreaElement)) return;
    const styles = getComputedStyle(element);
    const fontSize = Number.parseFloat(styles.fontSize) || 16;
    const lineHeight = Number.parseFloat(styles.lineHeight) || fontSize * 1.2;
    const minimum = minRows * lineHeight;
    const maximum = maxRows === undefined ? Number.POSITIVE_INFINITY : maxRows * lineHeight;
    element.style.height = '0px';
    const next = Math.min(maximum, Math.max(minimum, element.scrollHeight));
    element.style.height = `${next}px`;
    element.style.overflowY = element.scrollHeight > next ? 'auto' : 'hidden';
  }, [enabled, maxRows, minRows, node]);
  useLayoutEffect(fitHeight);
  useLayoutEffect(() => {
    const element = node.current;
    if (!enabled || !(element instanceof HTMLTextAreaElement)) return undefined;
    let width = element.getBoundingClientRect().width;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      const nextWidth = element.getBoundingClientRect().width;
      if (nextWidth === width) return;
      width = nextWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitHeight);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [enabled, fitHeight, node]);
  return fitHeight;
}
