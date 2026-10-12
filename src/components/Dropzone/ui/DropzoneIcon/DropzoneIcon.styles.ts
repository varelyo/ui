import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { DROPZONE_COMPONENT_NAME_KEY } from '../../Dropzone.constants';

const dropzone = componentTokens[DROPZONE_COMPONENT_NAME_KEY];

export const dropzoneIconClassName = cx(
  dropzone.slots.icon,
  'pointer-events-none inline-flex shrink-0',
);
