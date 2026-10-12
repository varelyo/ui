import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SNACKBAR_COMPONENT_NAME_KEY, SNACKBAR_SIZE } from './Snackbar.constants';
import type { SnackbarAnchorOrigin } from './Snackbar.types';

const snackbar = componentTokens[SNACKBAR_COMPONENT_NAME_KEY];

const vertical: Record<SnackbarAnchorOrigin['vertical'], string> = {
  top: 'top-0',
  bottom: 'bottom-0',
};

const horizontal: Record<SnackbarAnchorOrigin['horizontal'], string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export const snackbarViewportClassName = (anchor: SnackbarAnchorOrigin) =>
  cx(
    responsiveClasses(SNACKBAR_SIZE, snackbar.sizes.standard.primary, SNACKBAR_SIZE),
    snackbar.slots.viewport,
    'pointer-events-none fixed inset-x-0 z-toast flex',
    vertical[anchor.vertical],
    horizontal[anchor.horizontal],
  );

export const snackbarSurfaceClassName = (styled: boolean, className?: ClassValue) =>
  cx(
    styled && snackbar.variants.standard.primary,
    styled && snackbar.slots.root,
    styled && 'flex w-full items-center sm:w-auto',
    'pointer-events-auto transition duration-md ease-standard starting:scale-95 starting:opacity-none data-closed:scale-95 data-closed:opacity-none motion-reduce:transition-none',
    className,
  );
