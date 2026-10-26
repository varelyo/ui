import type { ComponentPropsWithRef } from 'react';
import type { CardAppearance } from '../Card';

export type CardContentProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface UseCardContentResult {
  appearance: CardAppearance;
}
