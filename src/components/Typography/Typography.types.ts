import type { ElementType, ReactNode } from 'react';
import type { layout, TextColor, TypographyVariant } from '../../generated/maps';
import type { PolymorphicProps, Responsive } from '../../types';

export type TypographyAlign = keyof typeof layout.textAlign;

export type TypographyProps<C extends ElementType = 'p'> = PolymorphicProps<
  C,
  {
    variant?: Responsive<TypographyVariant>;
    color?: TextColor;
    align?: Responsive<TypographyAlign>;
    noWrap?: boolean;
    children?: ReactNode;
  }
>;

export interface TypographyStyleProps {
  variant: Responsive<TypographyVariant> | undefined;
  color: TextColor | undefined;
  align: Responsive<TypographyAlign> | undefined;
  noWrap: boolean;
}

export interface UseTypographyParams {
  variant: Responsive<TypographyVariant> | undefined;
  component: ElementType | undefined;
}

export interface UseTypographyResult {
  Component: ElementType;
}
