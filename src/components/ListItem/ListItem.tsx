import type { ElementType, ReactElement } from 'react';
import { ListItemContext } from '../List';
import { useListItem } from './hooks';
import { listItemClassName } from './ListItem.styles';
import type { ListItemInternalProps, ListItemProps } from './ListItem.types';
import { ListItemEnd, ListItemMarker } from './ui';

export function ListItem<C extends ElementType = 'li'>(props: ListItemProps<C>): ReactElement;
export function ListItem(props: ListItemProps<ElementType>) {
  const {
    marker,
    end,
    divider = false,
    disablePadding = false,
    disableGutters = false,
    alignItems = 'center',
    component,
    className,
    children,
    ...rest
  } = props as ListItemInternalProps;
  const item = useListItem({ component, end });
  return (
    <item.Component
      {...rest}
      className={listItemClassName(
        {
          variant: item.variant,
          marker,
          size: item.size,
          color: item.color,
          end: item.context.end,
          divider,
          disablePadding,
          disableGutters,
          alignItems,
        },
        className,
      )}
    >
      {marker ? <ListItemMarker kind={marker} /> : null}
      <ListItemContext value={item.context}>{children}</ListItemContext>
      {item.context.end ? <ListItemEnd iconSize={item.iconSize}>{end}</ListItemEnd> : null}
    </item.Component>
  );
}
