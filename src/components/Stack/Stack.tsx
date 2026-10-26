import { Fragment, type ElementType } from 'react';
import { useStack } from './hooks';
import { stackClassName } from './Stack.styles';
import type { StackProps } from './Stack.types';

export function Stack<C extends ElementType = 'div'>({
  direction,
  spacing,
  p,
  display,
  alignItems,
  justifyContent,
  divider,
  component,
  className,
  children,
  ...rest
}: StackProps<C>) {
  const Component: ElementType = component ?? 'div';
  const { items } = useStack({ children, divider });
  return (
    <Component
      {...rest}
      className={stackClassName(
        { direction, spacing, p, display, alignItems, justifyContent },
        className,
      )}
    >
      {items.map((item) => (
        <Fragment key={item.key}>
          {item.separated ? divider : null}
          {item.node}
        </Fragment>
      ))}
    </Component>
  );
}
