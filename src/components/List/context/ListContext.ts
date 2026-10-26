import { createContext } from 'react';
import { LIST_COLOR, LIST_SIZE, LIST_VARIANT } from '../List.constants';
import type { ListContextValue } from '../List.types';

export const ListContext = createContext<ListContextValue>({
  variant: LIST_VARIANT,
  size: LIST_SIZE,
  color: LIST_COLOR,
  listElement: false,
});
