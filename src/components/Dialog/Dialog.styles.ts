import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { DIALOG_COMPONENT_NAME_KEY } from './Dialog.constants';
import type { DialogStyleProps, DialogVariant, DialogWidth } from './Dialog.types';

const dialog = componentTokens[DIALOG_COMPONENT_NAME_KEY];

const widths: Record<DialogWidth, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  none: 'max-w-full',
};

export const dialogContainerClassName = (variant: DialogVariant) =>
  cx(dialog.slots.root, dialog.variants[variant].primary, 'flex items-center justify-center');

export const dialogPaperClassName = (
  { fullWidth, width }: DialogStyleProps,
  className?: ClassValue,
) =>
  cx(
    'vy-dialog-motion flex max-h-full flex-col overflow-hidden',
    widths[width],
    fullWidth && 'w-full',
    className,
  );
