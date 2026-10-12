import type { ElementType, ReactNode } from 'react';
import type { layout } from '../../generated/maps';
import type { PolymorphicProps, Responsive } from '../../types';

export type BoxFlexGrow = 0 | 1;
export type BoxMinHeight = keyof typeof layout.minHeight;

export type BoxProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    flexGrow?: Responsive<BoxFlexGrow>;
    minHeight?: Responsive<BoxMinHeight>;
    children?: ReactNode;
  }
>;

export interface BoxStyleProps {
  flexGrow: Responsive<BoxFlexGrow> | undefined;
  minHeight: Responsive<BoxMinHeight> | undefined;
}
