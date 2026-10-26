import { createContext } from 'react';
import type { DialogContextValue } from '../Dialog.types';

export const DialogContext = createContext<DialogContextValue>({
  variant: 'standard',
  titleId: undefined,
  registerTitle: () => () => undefined,
});
