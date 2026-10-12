import type { ReactNode } from 'react';
import { useFallbackId } from '../../../hooks';
import { TEXT_FIELD_HELPER_ID_SUFFIX } from '../TextField.constants';
import type { UseTextFieldParams, UseTextFieldResult } from '../TextField.types';

const present = (node: ReactNode) => node !== undefined && node !== null;

export function useTextField({
  id,
  label,
  helperText,
  describedBy,
}: UseTextFieldParams): UseTextFieldResult {
  const inputId = useFallbackId(id);
  const hasHelperText = present(helperText);
  const helperId = hasHelperText ? `${inputId}${TEXT_FIELD_HELPER_ID_SUFFIX}` : undefined;
  return {
    inputId,
    helperId,
    describedBy: [describedBy, helperId].filter(Boolean).join(' ') || undefined,
    hasLabel: present(label),
    hasHelperText,
  };
}
