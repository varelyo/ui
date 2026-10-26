import { dialogContentClassName } from './DialogContent.styles';
import type { DialogContentProps } from './DialogContent.types';
import { useDialogContent } from './hooks';

export function DialogContent({ className, ...rest }: DialogContentProps) {
  const { variant } = useDialogContent();
  return <div {...rest} className={dialogContentClassName(variant, className)} />;
}
