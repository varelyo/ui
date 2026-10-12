import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { SNACKBAR_COMPONENT_NAME_KEY } from '../../Snackbar.constants';

const snackbar = componentTokens[SNACKBAR_COMPONENT_NAME_KEY];

export const snackbarMessageClassName = cx(snackbar.slots.message, 'min-w-0 flex-1');
