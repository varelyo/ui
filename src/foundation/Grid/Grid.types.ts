import type { ElementType, ReactNode } from 'react';
import type { Padding, PolymorphicProps, Responsive, Spacing } from '../../types';

export type GridCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type GridDisplay = 'none' | 'grid';

export type GridProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    container?: boolean;
    columns?: Responsive<GridCount>;
    spacing?: Responsive<Spacing>;
    p?: Responsive<Padding>;
    size?: Responsive<GridCount>;
    offset?: Responsive<GridOffset>;
    display?: Responsive<GridDisplay>;
    children?: ReactNode;
  }
>;

export interface GridStyleProps {
  container: boolean;
  columns: Responsive<GridCount> | undefined;
  spacing: Responsive<Spacing> | undefined;
  p: Responsive<Padding> | undefined;
  size: Responsive<GridCount> | undefined;
  offset: Responsive<GridOffset> | undefined;
  display: Responsive<GridDisplay> | undefined;
}
