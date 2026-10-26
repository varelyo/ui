import { IconSizeContext } from '../../../Icon';
import { DROPZONE_SLOTS } from '../../Dropzone.constants';
import type { DropzoneIconProps } from './DropzoneIcon.types';
import { dropzoneIconClassName } from './DropzoneIcon.styles';

export function DropzoneIcon({ size, children }: DropzoneIconProps) {
  return (
    <span aria-hidden="true" data-slot={DROPZONE_SLOTS.icon} className={dropzoneIconClassName}>
      <IconSizeContext value={size}>{children}</IconSizeContext>
    </span>
  );
}
