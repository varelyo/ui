import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { LIST_ITEM_TEXT_COMPONENT_NAME_KEY } from '../../ListItemText.constants';
import type { ListItemTextLineStyleProps } from '../../ListItemText.types';

const list = componentTokens[LIST_ITEM_TEXT_COMPONENT_NAME_KEY];

export const listItemTextLineClassName = ({ slot, noWrap }: ListItemTextLineStyleProps) =>
  cx(
    list.slots[slot],
    'block min-w-0 transition-colors duration-sm ease-standard motion-reduce:transition-none',
    noWrap && 'truncate',
  );
