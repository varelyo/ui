import type { ElementType } from 'react';
import { dialogTitleClassName } from './DialogTitle.styles';
import type { DialogTitleProps } from './DialogTitle.types';
import { useDialogTitle } from './hooks';

export function DialogTitle<C extends ElementType = 'h2'>({
  id,
  component,
  className,
  ...rest
}: DialogTitleProps<C>) {
  const Component: ElementType = component ?? 'h2';
  const title = useDialogTitle({ id });
  return <Component {...rest} id={title.id} className={dialogTitleClassName(className)} />;
}
