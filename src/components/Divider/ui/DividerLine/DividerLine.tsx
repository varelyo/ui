import { dividerLineClassName } from './DividerLine.styles';
import type { DividerLineProps } from './DividerLine.types';

export function DividerLine({ orientation }: DividerLineProps) {
  return <span aria-hidden="true" data-slot="line" className={dividerLineClassName(orientation)} />;
}
