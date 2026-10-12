import { use, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useMergedRefs } from '../../../hooks';
import { TabsContext } from '../../Tabs';
import { TAB_LIST_TAB_SELECTOR } from '../TabList.constants';
import type { TabListItemState, UseTabListParams, UseTabListResult } from '../TabList.types';

export function useTabList({ ref, onKeyDown, onBlur }: UseTabListParams): UseTabListResult {
  const { orientation } = use(TabsContext);
  const [focused, setFocused] = useState<number | null>(null);
  const [items, setItems] = useState<ReadonlyMap<string, TabListItemState>>(new Map());
  const [rtl, setRtl] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const merged = useMergedRefs(root, ref);
  const register = useCallback((id: string, tab: TabListItemState) => {
    setItems((current) => new Map(current).set(id, tab));
    return () => {
      setItems((current) => {
        const next = new Map(current);
        next.delete(id);
        return next;
      });
    };
  }, []);
  const enabled = [...items.values()]
    .filter((tab) => !tab.disabled && tab.index !== -1)
    .sort((a, b) => a.index - b.index);
  const focusedIndex = enabled.find((tab) => tab.index === focused)?.index;
  const activeIndex =
    focusedIndex ?? enabled.find((tab) => tab.selected)?.index ?? enabled[0]?.index ?? -1;
  useLayoutEffect(() => {
    if (focused !== null && focusedIndex === undefined) setFocused(null);
  }, [focused, focusedIndex]);
  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    setRtl(getComputedStyle(node).direction === 'rtl');
  });
  return {
    ref: merged,
    rtl,
    orientation,
    activeIndex,
    navigate: setFocused,
    context: { activeIndex, navigate: setFocused, register },
    onKeyDown: (event) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || (event.key !== 'Home' && event.key !== 'End')) return;
      const tabs = [...event.currentTarget.querySelectorAll<HTMLElement>(TAB_LIST_TAB_SELECTOR)];
      const target = event.key === 'Home' ? tabs[0] : tabs.at(-1);
      if (!target) return;
      event.preventDefault();
      target.focus();
    },
    onBlur: (event) => {
      onBlur?.(event);
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(null);
    },
  };
}
