import type { MouseEvent } from 'react';
import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { DROPZONE_COMPONENT_NAME_KEY, DROPZONE_ERROR_INTENT } from '../Dropzone.constants';
import type { DropzoneIntent, UseDropzoneParams, UseDropzoneResult } from '../Dropzone.types';
import { present } from '../Dropzone.utils';
import { useDropzoneDrag } from './useDropzoneDrag';
import { useDropzoneFiles } from './useDropzoneFiles';
import { useDropzoneIds } from './useDropzoneIds';
import { useDropzonePageDrops } from './useDropzonePageDrops';

export function useDropzone({
  id,
  accept,
  multiple,
  capture,
  maxSize,
  maxFiles,
  disabled,
  error,
  size,
  color,
  label,
  helperText,
  icon,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  onFilesSelected,
  onFilesRejected,
  onDragVerdictChange,
  inputRef,
  onClick,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}: UseDropzoneParams): UseDropzoneResult {
  const files = useDropzoneFiles({
    accept,
    multiple,
    capture,
    maxSize,
    maxFiles,
    disabled,
    onFilesSelected,
    onFilesRejected,
    inputRef,
  });
  const drag = useDropzoneDrag({
    files,
    disabled,
    onDragVerdictChange,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
  });
  useDropzonePageDrops();
  const ids = useDropzoneIds({
    id,
    label,
    helperText,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
  });
  const refused = drag.verdict === 'reject' || (error && drag.verdict !== 'accept');
  const intent: DropzoneIntent = refused ? DROPZONE_ERROR_INTENT : color;
  const childProps = componentTokens[DROPZONE_COMPONENT_NAME_KEY].childProps.standard[intent];
  return {
    styleProps: { size, intent },
    hasLabel: ids.hasLabel,
    hasHelperText: ids.hasHelperText,
    labelId: ids.labelId,
    helperId: ids.helperId,
    hasIcon: present(icon),
    iconSize: mapResponsive(size, (step) => childProps[step].icon.size),
    rootProps: {
      ...drag.handlers,
      id: ids.rootId,
      'aria-labelledby': ids.labelledBy,
      'aria-describedby': ids.describedBy,
      'data-drag-accept': drag.verdict === 'accept' ? '' : undefined,
      'data-drag-reject': drag.verdict === 'reject' ? '' : undefined,
      'data-error': error && !disabled && drag.verdict !== 'accept' ? '' : undefined,
      onClick: (event: MouseEvent<HTMLDivElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) files.open();
      },
    },
    inputProps: files.inputProps,
  };
}
