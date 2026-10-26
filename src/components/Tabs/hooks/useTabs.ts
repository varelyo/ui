import { useId } from 'react';
import { useControllableState } from '../../../hooks';
import type { TabValue, UseTabsParams, UseTabsResult } from '../Tabs.types';

export function useTabs({
  value,
  defaultValue,
  onChange,
  orientation,
  selectionFollowsFocus,
  variant,
  color,
}: UseTabsParams): UseTabsResult {
  const baseId = useId();
  const [current, setCurrent] = useControllableState<TabValue | undefined>({
    value,
    defaultValue,
  });
  return {
    context: {
      baseId,
      value: current,
      orientation,
      selectionFollowsFocus,
      variant,
      color,
      select: (next, event) => {
        if (next === current) return;
        setCurrent(next);
        onChange?.(event, next);
      },
    },
  };
}
