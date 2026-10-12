import { useSkeleton } from './hooks';
import { skeletonClassName, skeletonContentClassName } from './Skeleton.styles';
import type { SkeletonProps } from './Skeleton.types';

export function Skeleton({
  variant = 'text',
  animation = 'pulse',
  size = 'md',
  className,
  children,
  ...rest
}: SkeletonProps) {
  const skeleton = useSkeleton({ animation, children });
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={skeletonClassName(
        { variant, size, motion: skeleton.motion, fit: skeleton.fit },
        className,
      )}
    >
      {skeleton.fit ? <span className={skeletonContentClassName}>{children}</span> : null}
    </span>
  );
}
