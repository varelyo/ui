import type { ElementType, ReactElement } from 'react';
import { listSubheaderClassName } from './ListSubheader.styles';
import type { ListSubheaderInternalProps, ListSubheaderProps } from './ListSubheader.types';

export function ListSubheader<C extends ElementType = 'li'>(
  props: ListSubheaderProps<C>,
): ReactElement;
export function ListSubheader(props: ListSubheaderProps<ElementType>) {
  const {
    variant = 'standard',
    color = 'neutral',
    inset = false,
    sticky = false,
    disableGutters = false,
    component: Component = 'li',
    className,
    ...rest
  } = props as ListSubheaderInternalProps;
  return (
    <Component
      {...rest}
      className={listSubheaderClassName(
        { variant, color, inset, sticky, disableGutters },
        className,
      )}
    />
  );
}
