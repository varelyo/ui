import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { ColorOf, PolymorphicProps, VariantOf } from '../../types';
import type { LIST_SUBHEADER_COMPONENT_NAME_KEY } from './ListSubheader.constants';

type ListSubheaderTokens = ComponentTokens[typeof LIST_SUBHEADER_COMPONENT_NAME_KEY];
export type ListSubheaderVariant = VariantOf<ListSubheaderTokens>;
export type ListSubheaderColor = ColorOf<ListSubheaderTokens>;

type ListSubheaderOwnProps = {
  variant?: ListSubheaderVariant;
  color?: ListSubheaderColor;
  inset?: boolean;
  sticky?: boolean;
  disableGutters?: boolean;
  children?: ReactNode;
};

export type ListSubheaderProps<C extends ElementType = 'li'> = PolymorphicProps<
  C,
  ListSubheaderOwnProps
>;

export type ListSubheaderInternalProps = ListSubheaderOwnProps & {
  component?: ElementType;
  className?: string;
};

export interface ListSubheaderStyleProps {
  variant: ListSubheaderVariant;
  color: ListSubheaderColor;
  inset: boolean;
  sticky: boolean;
  disableGutters: boolean;
}
