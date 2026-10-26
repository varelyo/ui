import type { ElementType, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { PolymorphicProps, Responsive, VariantOf } from '../../types';
import type { PaperElevation, PaperVariant } from '../Paper';
import type { CARD_COMPONENT_NAME_KEY } from './Card.constants';

export type CardTokens = ComponentTokens[typeof CARD_COMPONENT_NAME_KEY];
export type CardVariant = PaperVariant;
export type CardAppearance = VariantOf<CardTokens>;

export type CardProps<C extends ElementType = 'div'> = PolymorphicProps<
  C,
  {
    variant?: CardVariant;
    appearance?: CardAppearance;
    elevation?: Responsive<PaperElevation>;
    selected?: boolean;
    children?: ReactNode;
  }
>;

export interface CardContextValue {
  appearance: CardAppearance;
}

export interface UseCardParams {
  appearance: CardAppearance;
}

export interface UseCardResult {
  context: CardContextValue;
}
