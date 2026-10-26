import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { LIST_ITEM_COMPONENT_NAME_KEY } from '../../ListItem.constants';
import type { ListItemMarker } from '../../ListItem.types';

const list = componentTokens[LIST_ITEM_COMPONENT_NAME_KEY];

const kinds: Record<ListItemMarker, string> = {
  bullet: 'justify-center',
  number: 'vy-counter justify-end tabular-nums',
};

export const listItemMarkerClassName = (kind: ListItemMarker) =>
  cx(
    list.slots.marker,
    'inline-flex shrink-0 select-none transition-colors duration-sm ease-standard motion-reduce:transition-none',
    kinds[kind],
  );
