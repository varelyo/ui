import { dialogActionsClassName } from './DialogActions.styles';
import type { DialogActionsProps } from './DialogActions.types';
import { useDialogActions } from './hooks';

export function DialogActions({ className, ...rest }: DialogActionsProps) {
  const { variant } = useDialogActions();
  return <div {...rest} className={dialogActionsClassName(variant, className)} />;
}
