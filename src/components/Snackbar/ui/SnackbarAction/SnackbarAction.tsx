import type { SnackbarActionProps } from '../../Snackbar.types';
import { snackbarActionClassName } from './SnackbarAction.styles';

export function SnackbarAction({ children }: SnackbarActionProps) {
  return <div className={snackbarActionClassName}>{children}</div>;
}
