import { createContext } from 'react';
import type { ListItemContextValue } from '../List.types';

export const LIST_ITEM_CONTEXT: ListItemContextValue = { end: false };

export const ListItemContext = createContext<ListItemContextValue>(LIST_ITEM_CONTEXT);
