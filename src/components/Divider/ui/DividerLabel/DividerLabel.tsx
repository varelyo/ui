import { dividerLabelClassName } from './DividerLabel.styles';
import type { DividerLabelProps } from './DividerLabel.types';

export function DividerLabel({ children }: DividerLabelProps) {
  return (
    <span data-slot="label" className={dividerLabelClassName}>
      {children}
    </span>
  );
}
