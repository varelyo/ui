import { use } from 'react';
import { DialogContext } from '../../Dialog';
import type { UseDialogActionsResult } from '../DialogActions.types';

export function useDialogActions(): UseDialogActionsResult {
  const { variant } = use(DialogContext);
  return { variant };
}
