import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { DIALOG_TITLE_COMPONENT_NAME_KEY } from './DialogTitle.constants';

const dialog = componentTokens[DIALOG_TITLE_COMPONENT_NAME_KEY];

export const dialogTitleClassName = (className?: ClassValue) =>
  cx(dialog.variants.standard.primary, dialog.slots.title, 'shrink-0', className);
