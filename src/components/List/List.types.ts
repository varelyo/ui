import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens, layout } from '../../generated/maps';
import type { ColorOf, PolymorphicProps, Responsive, SizeOf, VariantOf } from '../../types';
import type { LIST_COMPONENT_NAME_KEY } from './List.constants';

export type ListTokens = ComponentTokens[typeof LIST_COMPONENT_NAME_KEY];
export type ListVariant = VariantOf<ListTokens>;
export type ListColor = ColorOf<ListTokens>;
export type ListSize = SizeOf<ListTokens>;
export type ListAlignItems = keyof typeof layout.alignItems;

type ListOwnProps = {
  variant?: ListVariant;
  size?: Responsive<ListSize>;
  color?: ListColor;
  nested?: boolean;
  disablePadding?: boolean;
  subheader?: ReactNode;
  children?: ReactNode;
};

export type ListProps<C extends ElementType = 'ul'> = PolymorphicProps<C, ListOwnProps>;

export type ListInternalProps = ListOwnProps & {
  component?: ElementType;
  className?: string;
};

export interface ListContextValue {
  variant: ListVariant;
  size: Responsive<ListSize>;
  color: ListColor;
  listElement: boolean;
}

export interface ListItemContextValue {
  end: boolean;
}

export interface ListStyleProps {
  variant: ListVariant;
  size: Responsive<ListSize>;
  color: ListColor;
  nested: boolean;
  disablePadding: boolean;
}

export interface UseListParams {
  variant: ListVariant | undefined;
  size: Responsive<ListSize> | undefined;
  color: ListColor | undefined;
  component: ElementType | undefined;
}

export interface UseListResult {
  Component: ElementType;
  subheaderComponent: ElementType;
  context: ListContextValue;
}
