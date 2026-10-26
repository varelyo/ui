import type { ElementType } from 'react';
import { boxClassName } from './Box.styles';
import type { BoxProps } from './Box.types';

export function Box<C extends ElementType = 'div'>({
  flexGrow,
  minHeight,
  component,
  className,
  ...rest
}: BoxProps<C>) {
  const Component: ElementType = component ?? 'div';
  return <Component {...rest} className={boxClassName({ flexGrow, minHeight }, className)} />;
}
