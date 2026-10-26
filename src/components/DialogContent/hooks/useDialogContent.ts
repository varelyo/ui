import { use } from 'react';
import { DialogContext } from '../../Dialog';
import type { UseDialogContentResult } from '../DialogContent.types';

export function useDialogContent(): UseDialogContentResult {
  const { variant } = use(DialogContext);
  return { variant };
}
