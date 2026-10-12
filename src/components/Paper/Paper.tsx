import type { ElementType } from 'react';
import { paperClassName } from './Paper.styles';
import type { PaperProps } from './Paper.types';

export function Paper<C extends ElementType = 'div'>({
  variant = 'elevation',
  elevation = 'xs',
  square = false,
  component,
  className,
  ...rest
}: PaperProps<C>) {
  const Component: ElementType = component ?? 'div';
  return (
    <Component {...rest} className={paperClassName({ variant, elevation, square }, className)} />
  );
}
