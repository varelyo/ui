import type { SnackbarMessageProps } from '../../Snackbar.types';
import { snackbarMessageClassName } from './SnackbarMessage.styles';

export function SnackbarMessage({ children }: SnackbarMessageProps) {
  return <div className={snackbarMessageClassName}>{children}</div>;
}
