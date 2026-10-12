import type { UseDividerParams, UseDividerResult } from '../Divider.types';

export function useDivider({ orientation, children }: UseDividerParams): UseDividerResult {
  return {
    labelled: children !== undefined && children !== null && children !== false && children !== '',
    separatorProps:
      orientation === 'vertical'
        ? { role: 'separator', 'aria-orientation': 'vertical' }
        : { role: 'separator' },
  };
}
