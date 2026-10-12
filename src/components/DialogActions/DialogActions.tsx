import { dialogActionsClassName } from './DialogActions.styles';
import type { DialogActionsProps } from './DialogActions.types';

export function DialogActions({ className, ...rest }: DialogActionsProps) {
  return <div {...rest} className={dialogActionsClassName(className)} />;
}
