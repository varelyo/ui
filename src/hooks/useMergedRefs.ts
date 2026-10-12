import { useMemo, type Ref, type RefCallback } from 'react';
import { mergeRefs } from '../utils';

export function useMergedRefs<T>(...refs: ReadonlyArray<Ref<T> | undefined>): RefCallback<T> {
  return useMemo(() => mergeRefs(...refs), refs);
}
