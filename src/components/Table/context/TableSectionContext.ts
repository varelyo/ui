import { createContext } from 'react';
import type { TableSectionContextValue } from '../Table.types';

export const TableSectionContext = createContext<TableSectionContextValue>({ section: 'body' });
