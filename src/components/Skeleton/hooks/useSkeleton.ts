import type { UseSkeletonParams, UseSkeletonResult } from '../Skeleton.types';

export function useSkeleton({ animation, children }: UseSkeletonParams): UseSkeletonResult {
  return {
    motion: animation === false ? 'none' : animation,
    fit: children !== undefined && children !== null && children !== false,
  };
}
