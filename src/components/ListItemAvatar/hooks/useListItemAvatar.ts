import { use } from 'react';
import { ListContext } from '../../List';
import type { UseListItemAvatarResult } from '../ListItemAvatar.types';

export function useListItemAvatar(): UseListItemAvatarResult {
  const list = use(ListContext);
  return { variant: list.variant, size: list.size };
}
