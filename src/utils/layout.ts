import { layout, type PaddingStep } from '../generated/maps';
import type { Padding, Responsive, Spacing } from '../types';
import { atBreakpoints } from './responsive';

export function spacingClasses(value: Responsive<Spacing> | undefined): string {
  return atBreakpoints(value)
    .map(([breakpoint, spacing]) =>
      typeof spacing === 'string'
        ? layout.gap.gap[spacing][breakpoint]
        : `${layout.gap['gap-y'][spacing[0]][breakpoint]} ${layout.gap['gap-x'][spacing[1]][breakpoint]}`,
    )
    .join(' ');
}

const paddingFamilies = [
  ['p'],
  ['py', 'px'],
  ['pt', 'px', 'pb'],
  ['pt', 'pr', 'pb', 'pl'],
] as const;

export function paddingClasses(value: Responsive<Padding> | undefined): string {
  return atBreakpoints(value)
    .map(([breakpoint, padding]) => {
      const sides: readonly PaddingStep[] = typeof padding === 'string' ? [padding] : padding;
      const families = paddingFamilies[sides.length - 1] ?? [];
      return families
        .map((family, index) => {
          const step = sides[index];
          return step === undefined ? '' : layout.padding[family][step][breakpoint];
        })
        .join(' ');
    })
    .join(' ');
}
