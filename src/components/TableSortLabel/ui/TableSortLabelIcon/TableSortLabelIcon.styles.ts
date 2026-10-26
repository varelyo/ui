import { componentTokens } from '../../../../generated/maps';
import { cx } from '../../../../utils';
import { TABLE_SORT_LABEL_COMPONENT_NAME_KEY } from '../../TableSortLabel.constants';

const table = componentTokens[TABLE_SORT_LABEL_COMPONENT_NAME_KEY];

export const tableSortLabelIconClassName = cx(
  table.slots.sortIcon,
  'transition-colors duration-sm ease-standard motion-reduce:transition-none',
);
