import type { ElementType } from 'react';
import { usePaper } from './hooks';
import { paperClassName } from './Paper.styles';
import type { PaperProps } from './Paper.types';

export function Paper<C extends ElementType = 'div'>({
  variant = 'elevation',
  elevation = 'xs',
  square = false,
  selected = false,
  component,
  className,
  ...rest
}: PaperProps<C>) {
  const { rootProps } = usePaper({ selected });
  const Component: ElementType = component ?? 'div';
  return (
    <Component
      {...rest}
      {...rootProps}
      className={paperClassName({ variant, elevation, square }, className)}
    />
  );
}
