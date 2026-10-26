import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { LIST_ITEM_COMPONENT_NAME_KEY } from '../../ListItem.constants';

const list = componentTokens[LIST_ITEM_COMPONENT_NAME_KEY];

export const listItemEndClassName = cx(
  list.slots.end,
  'absolute top-0 right-0 bottom-0 flex items-center transition-colors duration-sm ease-standard group-has-data-nested:bottom-auto motion-reduce:transition-none',
);
