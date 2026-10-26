import { use } from 'react';
import { CardContext } from '../../Card';
import type { UseCardContentResult } from '../CardContent.types';

export function useCardContent(): UseCardContentResult {
  const { appearance } = use(CardContext);
  return { appearance };
}
