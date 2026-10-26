import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import type { DialogVariant } from '../Dialog';
import { DIALOG_ACTIONS_COMPONENT_NAME_KEY } from './DialogActions.constants';

const dialog = componentTokens[DIALOG_ACTIONS_COMPONENT_NAME_KEY];

export const dialogActionsClassName = (variant: DialogVariant, className?: ClassValue) =>
  cx(
    dialog.variants[variant].primary,
    dialog.slots.actions,
    'flex shrink-0 items-center justify-end',
    className,
  );
