import { DROPZONE_SLOTS } from '../../Dropzone.constants';
import type { DropzoneLabelProps } from './DropzoneLabel.types';
import { dropzoneLabelClassName } from './DropzoneLabel.styles';

export function DropzoneLabel({ id, children }: DropzoneLabelProps) {
  return (
    <span id={id} data-slot={DROPZONE_SLOTS.label} className={dropzoneLabelClassName}>
      {children}
    </span>
  );
}
