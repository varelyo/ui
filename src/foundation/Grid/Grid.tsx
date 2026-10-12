import type { ElementType } from 'react';
import { gridClassName } from './Grid.styles';
import type { GridProps } from './Grid.types';

export function Grid<C extends ElementType = 'div'>({
  container = false,
  columns,
  spacing,
  p,
  size,
  offset,
  display,
  component,
  className,
  ...rest
}: GridProps<C>) {
  const Component: ElementType = component ?? 'div';
  return (
    <Component
      {...rest}
      className={gridClassName(
        { container, columns, spacing, p, size, offset, display },
        className,
      )}
    />
  );
}
