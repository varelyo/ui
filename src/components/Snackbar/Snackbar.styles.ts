import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SNACKBAR_COMPONENT_NAME_KEY, SNACKBAR_SIZE } from './Snackbar.constants';
import type { SnackbarAnchorOrigin, SnackbarVariant } from './Snackbar.types';

const snackbar = componentTokens[SNACKBAR_COMPONENT_NAME_KEY];

const vertical: Record<SnackbarAnchorOrigin['vertical'], string> = {
  top: 'top-0 vy-motion-from-top',
  bottom: 'bottom-0 vy-motion-from-bottom',
};

const horizontal: Record<SnackbarAnchorOrigin['horizontal'], string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export const snackbarViewportClassName = (variant: SnackbarVariant, anchor: SnackbarAnchorOrigin) =>
  cx(
    responsiveClasses(SNACKBAR_SIZE, snackbar.sizes, SNACKBAR_SIZE),
    snackbar.slots.viewport,
    'pointer-events-none fixed inset-x-0 z-toast flex',
    vertical[anchor.vertical],
    horizontal[anchor.horizontal],
  );

export const snackbarSurfaceClassName = (
  variant: SnackbarVariant,
  styled: boolean,
  className?: ClassValue,
) =>
  cx(
    styled && snackbar.variants[variant].primary,
    styled && snackbar.slots.root,
    styled && 'flex w-full items-center sm:w-auto',
    'vy-toast-motion pointer-events-auto',
    className,
  );
