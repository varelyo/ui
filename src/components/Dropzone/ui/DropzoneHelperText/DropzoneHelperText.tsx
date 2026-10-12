import { DROPZONE_SLOTS } from '../../Dropzone.constants';
import type { DropzoneHelperTextProps } from './DropzoneHelperText.types';
import { dropzoneHelperTextClassName } from './DropzoneHelperText.styles';

export function DropzoneHelperText({ id, children }: DropzoneHelperTextProps) {
  return (
    <span
      id={id}
      aria-live="polite"
      data-slot={DROPZONE_SLOTS.helperText}
      className={dropzoneHelperTextClassName}
    >
      {children}
    </span>
  );
}
