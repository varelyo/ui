import { use } from 'react';
import { CardContext } from '../../Card';
import type { UseCardActionsResult } from '../CardActions.types';

export function useCardActions(): UseCardActionsResult {
  const { appearance } = use(CardContext);
  return { appearance };
}
