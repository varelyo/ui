import { use } from 'react';
import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { TableContext } from '../../Table';
import { TABLE_SORT_ICONS, TABLE_SORT_LABEL_COMPONENT_NAME_KEY } from '../TableSortLabel.constants';
import type { UseTableSortLabelParams, UseTableSortLabelResult } from '../TableSortLabel.types';

export function useTableSortLabel({
  active,
  direction,
}: UseTableSortLabelParams): UseTableSortLabelResult {
  const { variant, size } = use(TableContext);
  const childProps = componentTokens[TABLE_SORT_LABEL_COMPONENT_NAME_KEY].childProps;
  return {
    variant,
    rootProps: active ? { 'data-active': '' } : {},
    iconName: TABLE_SORT_ICONS[direction],
    iconSize: mapResponsive(size, (step) => childProps[step].sortIcon.size),
  };
}
