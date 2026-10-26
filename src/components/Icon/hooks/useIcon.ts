import { useContext, useId } from 'react';
import { icons } from '../../../generated/icons';
import { IconSizeContext } from '../context';
import type { UseIconParams, UseIconResult } from '../Icon.types';

export function useIcon({ name, size, titleAccess }: UseIconParams): UseIconResult {
  const inherited = useContext(IconSizeContext);
  const titleId = useId();
  const labelled = Boolean(titleAccess);
  return {
    elements: icons[name],
    size: size ?? inherited,
    titleId,
    labelled,
    accessibilityProps: {
      role: labelled ? 'img' : undefined,
      'aria-hidden': labelled ? undefined : true,
      'aria-labelledby': labelled ? titleId : undefined,
    },
  };
}
