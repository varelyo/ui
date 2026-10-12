import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { DROPZONE_COMPONENT_NAME_KEY } from '../../Dropzone.constants';

const dropzone = componentTokens[DROPZONE_COMPONENT_NAME_KEY];

export const dropzoneLabelClassName = cx(dropzone.slots.label, 'pointer-events-none');
