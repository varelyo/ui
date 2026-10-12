import { useRef, type ChangeEvent } from 'react';
import { useMergedRefs } from '../../../hooks';
import type { UseDropzoneFilesParams, UseDropzoneFilesResult } from '../Dropzone.types';
import { dragVerdict, partitionFiles } from '../Dropzone.utils';

export function useDropzoneFiles({
  accept,
  multiple,
  capture,
  maxSize,
  maxFiles,
  disabled,
  onFilesSelected,
  onFilesRejected,
  inputRef,
}: UseDropzoneFilesParams): UseDropzoneFilesResult {
  const input = useRef<HTMLInputElement | null>(null);
  const ref = useMergedRefs(input, inputRef);
  const rules = { accept, multiple, maxSize, maxFiles };
  const select = (files: readonly File[]) => {
    if (disabled || files.length === 0) return;
    const { accepted, rejected } = partitionFiles(files, rules);
    if (accepted.length) onFilesSelected?.(accepted);
    if (rejected.length) onFilesRejected?.(rejected);
  };
  return {
    open: () => {
      if (!disabled) input.current?.click();
    },
    select,
    verdict: (transfer) => dragVerdict(transfer, rules),
    inputProps: {
      ref,
      type: 'file',
      accept,
      multiple,
      capture,
      disabled,
      hidden: true,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        select(Array.from(event.currentTarget.files ?? []));
        event.currentTarget.value = '';
      },
    },
  };
}
