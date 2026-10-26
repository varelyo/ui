import type { UsePaperParams, UsePaperResult } from '../Paper.types';

export function usePaper({ selected }: UsePaperParams): UsePaperResult {
  return { rootProps: { 'data-selected': selected ? '' : undefined } };
}
