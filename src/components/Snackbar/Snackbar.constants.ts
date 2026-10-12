import type { SnackbarAnchorOrigin } from './Snackbar.types';

export const SNACKBAR_COMPONENT_NAME_KEY = 'snackbar' as const;

export const SNACKBAR_SIZE = 'md' as const;

export const SNACKBAR_DEFAULT_ANCHOR: SnackbarAnchorOrigin = {
  vertical: 'bottom',
  horizontal: 'left',
};
