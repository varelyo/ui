import type { ElementType, ReactNode } from 'react';
import type { PolymorphicProps, Responsive } from '../../types';
import type { PaperElevation, PaperVariant } from '../Paper';

export type CardVariant = PaperVariant;

export type CardProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    variant?: CardVariant;
    elevation?: Responsive<PaperElevation>;
    children?: ReactNode;
  }
>;
