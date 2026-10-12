import { createContext } from 'react';
import type { DialogContextValue } from '../Dialog.types';

export const DialogContext = createContext<DialogContextValue>({
  titleId: undefined,
  registerTitle: () => () => undefined,
});
