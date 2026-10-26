import type { ComponentPropsWithRef } from 'react';
import type { CardAppearance } from '../Card';

export type CardActionsProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface UseCardActionsResult {
  appearance: CardAppearance;
}
