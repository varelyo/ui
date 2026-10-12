import { layout } from '../../generated/maps';
import {
  cx,
  paddingClasses,
  responsiveClasses,
  spacingClasses,
  type ClassValue,
} from '../../utils';
import type { StackStyleProps } from './Stack.types';

export const stackClassName = (
  { direction, spacing, p, display, alignItems, justifyContent }: StackStyleProps,
  className?: ClassValue,
) =>
  cx(
    responsiveClasses(display, layout.display, 'flex'),
    responsiveClasses(direction, layout.direction, 'column'),
    spacingClasses(spacing),
    paddingClasses(p),
    responsiveClasses(alignItems, layout.alignItems),
    responsiveClasses(justifyContent, layout.justifyContent),
    className,
  );
