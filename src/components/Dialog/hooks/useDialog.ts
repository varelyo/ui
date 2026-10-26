import { useCallback, useMemo, useState } from 'react';
import type { UseDialogParams, UseDialogResult } from '../Dialog.types';

export function useDialog({
  variant,
  maxWidth,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: UseDialogParams): UseDialogResult {
  const [titleId, setTitleId] = useState<string | undefined>(undefined);
  const registerTitle = useCallback((id: string) => {
    setTitleId(id);
    return () => setTitleId((current) => (current === id ? undefined : current));
  }, []);
  const context = useMemo(
    () => ({ variant, titleId, registerTitle }),
    [variant, titleId, registerTitle],
  );
  const labelledBy = ariaLabelledBy ?? (ariaLabel === undefined ? titleId : undefined);
  return {
    context,
    labelProps: {
      ...(ariaLabel === undefined ? {} : { 'aria-label': ariaLabel }),
      ...(labelledBy === undefined ? {} : { 'aria-labelledby': labelledBy }),
      ...(ariaDescribedBy === undefined ? {} : { 'aria-describedby': ariaDescribedBy }),
    },
    width: maxWidth === false ? 'none' : maxWidth,
  };
}
