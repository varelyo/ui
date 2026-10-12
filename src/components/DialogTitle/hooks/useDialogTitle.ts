import { use, useLayoutEffect } from 'react';
import { useFallbackId } from '../../../hooks';
import { DialogContext } from '../../Dialog';
import type { UseDialogTitleParams, UseDialogTitleResult } from '../DialogTitle.types';

export function useDialogTitle({ id }: UseDialogTitleParams): UseDialogTitleResult {
  const titleId = useFallbackId(id);
  const { registerTitle } = use(DialogContext);
  useLayoutEffect(() => registerTitle(titleId), [registerTitle, titleId]);
  return { id: titleId };
}
