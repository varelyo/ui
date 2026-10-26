import type { ElementType, ReactNode } from 'react';
import type { IconSize } from '../../generated/maps';
import type { PolymorphicProps, Responsive } from '../../types';
import type {
  ListAlignItems,
  ListColor,
  ListItemContextValue,
  ListSize,
  ListVariant,
} from '../List';
import type { LIST_ITEM_MARKER_GLYPHS } from './ListItem.constants';

export type ListItemMarker = keyof typeof LIST_ITEM_MARKER_GLYPHS;

type ListItemOwnProps = {
  marker?: ListItemMarker;
  end?: ReactNode;
  divider?: boolean;
  disablePadding?: boolean;
  disableGutters?: boolean;
  alignItems?: Responsive<ListAlignItems>;
  children?: ReactNode;
};

export type ListItemProps<C extends ElementType = 'li'> = PolymorphicProps<C, ListItemOwnProps>;

export type ListItemInternalProps = ListItemOwnProps & {
  component?: ElementType;
  className?: string;
};

export interface ListItemStyleProps {
  variant: ListVariant;
  marker: ListItemMarker | undefined;
  size: Responsive<ListSize>;
  color: ListColor;
  end: boolean;
  divider: boolean;
  disablePadding: boolean;
  disableGutters: boolean;
  alignItems: Responsive<ListAlignItems>;
}

export interface UseListItemParams {
  component: ElementType | undefined;
  end: ReactNode;
}

export interface UseListItemResult {
  Component: ElementType;
  variant: ListVariant;
  size: Responsive<ListSize>;
  color: ListColor;
  iconSize: Responsive<IconSize> | undefined;
  context: ListItemContextValue;
}

export interface ListItemEndProps {
  iconSize: Responsive<IconSize> | undefined;
  children: ReactNode;
}

export interface ListItemMarkerProps {
  kind: ListItemMarker;
}
