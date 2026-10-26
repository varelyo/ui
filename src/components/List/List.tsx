import type { ElementType, ReactElement } from 'react';
import { ListSubheader } from '../ListSubheader';
import { LIST_ITEM_CONTEXT, ListContext, ListItemContext } from './context';
import { useList } from './hooks';
import { listRootClassName } from './List.styles';
import type { ListInternalProps, ListProps } from './List.types';

export function List<C extends ElementType = 'ul'>(props: ListProps<C>): ReactElement;
export function List(props: ListProps<ElementType>) {
  const {
    variant,
    size,
    color,
    nested = false,
    disablePadding = false,
    subheader,
    component,
    className,
    children,
    ...rest
  } = props as ListInternalProps;
  const list = useList({ variant, size, color, component });
  return (
    <list.Component
      {...rest}
      data-nested={nested ? '' : undefined}
      className={listRootClassName(
        {
          variant: list.context.variant,
          size: list.context.size,
          color: list.context.color,
          nested,
          disablePadding,
        },
        className,
      )}
    >
      <ListContext value={list.context}>
        <ListItemContext value={LIST_ITEM_CONTEXT}>
          {subheader ? (
            <ListSubheader component={list.subheaderComponent} variant={list.context.variant}>
              {subheader}
            </ListSubheader>
          ) : null}
          {children}
        </ListItemContext>
      </ListContext>
    </list.Component>
  );
}
