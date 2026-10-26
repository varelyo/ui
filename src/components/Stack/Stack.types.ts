import type { ElementType, ReactNode } from 'react';
import type { layout } from '../../generated/maps';
import type { Padding, PolymorphicProps, Responsive, Spacing } from '../../types';

export type StackDirection = keyof typeof layout.direction;
export type StackDisplay = 'none' | 'flex';
export type StackAlignItems = keyof typeof layout.alignItems;
export type StackJustifyContent = keyof typeof layout.justifyContent;

export type StackProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    direction?: Responsive<StackDirection>;
    spacing?: Responsive<Spacing>;
    p?: Responsive<Padding>;
    display?: Responsive<StackDisplay>;
    alignItems?: Responsive<StackAlignItems>;
    justifyContent?: Responsive<StackJustifyContent>;
    divider?: ReactNode;
    children?: ReactNode;
  }
>;

export interface StackStyleProps {
  direction: Responsive<StackDirection> | undefined;
  spacing: Responsive<Spacing> | undefined;
  p: Responsive<Padding> | undefined;
  display: Responsive<StackDisplay> | undefined;
  alignItems: Responsive<StackAlignItems> | undefined;
  justifyContent: Responsive<StackJustifyContent> | undefined;
}

export interface StackItem {
  key: string;
  node: ReactNode;
  separated: boolean;
}

export interface UseStackParams {
  children: ReactNode;
  divider: ReactNode;
}

export interface UseStackResult {
  items: readonly StackItem[];
}
