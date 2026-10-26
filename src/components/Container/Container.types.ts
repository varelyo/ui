import type { ElementType, ReactNode } from 'react';
import type { ContainerWidth } from '../../generated/maps';
import type { PolymorphicProps, Responsive } from '../../types';

export type ContainerDisplay = 'none' | 'block';

export type ContainerProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    maxWidth?: Responsive<ContainerWidth | false>;
    fixed?: boolean;
    disableGutters?: boolean;
    display?: Responsive<ContainerDisplay>;
    children?: ReactNode;
  }
>;

export interface ContainerStyleProps {
  maxWidth: Responsive<ContainerWidth | false>;
  fixed: boolean;
  disableGutters: boolean;
  display: Responsive<ContainerDisplay> | undefined;
}
