import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { DIALOG_CONTENT_COMPONENT_NAME_KEY } from './DialogContent.constants';

const dialog = componentTokens[DIALOG_CONTENT_COMPONENT_NAME_KEY];

export const dialogContentClassName = (className?: ClassValue) =>
  cx(
    dialog.variants.standard.primary,
    dialog.slots.content,
    'min-h-0 flex-1 overflow-y-auto',
    className,
  );
