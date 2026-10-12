import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { SNACKBAR_COMPONENT_NAME_KEY } from '../../Snackbar.constants';

const snackbar = componentTokens[SNACKBAR_COMPONENT_NAME_KEY];

export const snackbarActionClassName = cx(snackbar.slots.action, 'flex shrink-0 items-center');
