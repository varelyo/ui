import { useFallbackId } from '../../../hooks';
import { DROPZONE_HELPER_ID_SUFFIX, DROPZONE_LABEL_ID_SUFFIX } from '../Dropzone.constants';
import type { UseDropzoneIdsParams, UseDropzoneIdsResult } from '../Dropzone.types';
import { present } from '../Dropzone.utils';

export function useDropzoneIds({
  id,
  label,
  helperText,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: UseDropzoneIdsParams): UseDropzoneIdsResult {
  const rootId = useFallbackId(id);
  const hasLabel = present(label);
  const hasHelperText = present(helperText);
  const labelId = hasLabel ? `${rootId}${DROPZONE_LABEL_ID_SUFFIX}` : undefined;
  const helperId = hasHelperText ? `${rootId}${DROPZONE_HELPER_ID_SUFFIX}` : undefined;
  return {
    rootId,
    hasLabel,
    hasHelperText,
    labelId,
    helperId,
    labelledBy: ariaLabelledBy ?? (ariaLabel === undefined ? labelId : undefined),
    describedBy: [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined,
  };
}
