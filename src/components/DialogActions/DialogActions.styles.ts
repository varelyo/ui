import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { DIALOG_ACTIONS_COMPONENT_NAME_KEY } from './DialogActions.constants';

const dialog = componentTokens[DIALOG_ACTIONS_COMPONENT_NAME_KEY];

export const dialogActionsClassName = (className?: ClassValue) =>
  cx(
    dialog.variants.standard.primary,
    dialog.slots.actions,
    'flex shrink-0 items-center justify-end',
    className,
  );
