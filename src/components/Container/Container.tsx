import type { ElementType } from 'react';
import { containerClassName } from './Container.styles';
import type { ContainerProps } from './Container.types';

export function Container<C extends ElementType = 'div'>({
  maxWidth = 'lg',
  fixed = false,
  disableGutters = false,
  display,
  component,
  className,
  ...rest
}: ContainerProps<C>) {
  const Component: ElementType = component ?? 'div';
  return (
    <Component
      {...rest}
      className={containerClassName({ maxWidth, fixed, disableGutters, display }, className)}
    />
  );
}
