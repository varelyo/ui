import { dialogContentClassName } from './DialogContent.styles';
import type { DialogContentProps } from './DialogContent.types';

export function DialogContent({ className, ...rest }: DialogContentProps) {
  return <div {...rest} className={dialogContentClassName(className)} />;
}
