import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { PolymorphicProps, Responsive, SizeOf, VariantOf } from '../../types';
import type { PAPER_COMPONENT_NAME_KEY } from './Paper.constants';

export type PaperTokens = ComponentTokens[typeof PAPER_COMPONENT_NAME_KEY];
export type PaperVariant = VariantOf<PaperTokens>;
export type PaperElevation = SizeOf<PaperTokens>;

type PaperOwnProps = {
  variant?: PaperVariant;
  elevation?: Responsive<PaperElevation>;
  square?: boolean;
  selected?: boolean;
  children?: ReactNode;
};

export type PaperProps<C extends ElementType = 'div'> = PolymorphicProps<C, PaperOwnProps>;

export interface PaperStyleProps {
  variant: PaperVariant;
  elevation: Responsive<PaperElevation>;
  square: boolean;
}

export interface UsePaperParams {
  selected: boolean;
}

export interface UsePaperResult {
  rootProps: {
    'data-selected': '' | undefined;
  };
}
