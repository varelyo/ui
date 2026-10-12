import type { ElementType } from 'react';
import { dividerRootClassName } from './Divider.styles';
import type { DividerProps } from './Divider.types';
import { useDivider } from './hooks';
import { DividerLabel, DividerLine } from './ui';

export function Divider<C extends ElementType = 'div'>({
  orientation = 'horizontal',
  variant = 'fullWidth',
  flexItem = false,
  component,
  className,
  children,
  ...rest
}: DividerProps<C>) {
  const Component: ElementType = component ?? 'div';
  const divider = useDivider({ orientation, children });
  return (
    <Component
      {...divider.separatorProps}
      {...rest}
      className={dividerRootClassName({ orientation, variant, flexItem }, className)}
    >
      <DividerLine orientation={orientation} />
      {divider.labelled ? <DividerLabel>{children}</DividerLabel> : null}
      {divider.labelled ? <DividerLine orientation={orientation} /> : null}
    </Component>
  );
}
