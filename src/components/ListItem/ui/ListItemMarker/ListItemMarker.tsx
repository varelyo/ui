import { LIST_ITEM_MARKER_GLYPHS } from '../../ListItem.constants';
import type { ListItemMarkerProps } from '../../ListItem.types';
import { listItemMarkerClassName } from './ListItemMarker.styles';

export function ListItemMarker({ kind }: ListItemMarkerProps) {
  return (
    <span aria-hidden="true" data-list-item-marker={kind} className={listItemMarkerClassName(kind)}>
      {LIST_ITEM_MARKER_GLYPHS[kind]}
    </span>
  );
}
