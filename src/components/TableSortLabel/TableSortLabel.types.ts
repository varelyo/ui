import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { IconName } from '../Icon';
import type { IconSize } from '../../generated/maps';
import type { Responsive } from '../../types';
import type { TableSortDirection, TableVariant } from '../Table';

export type TableSortLabelProps = Omit<ComponentPropsWithRef<'button'>, 'style'> & {
  active?: boolean;
  direction?: TableSortDirection;
  children?: ReactNode;
};

export interface UseTableSortLabelParams {
  active: boolean;
  direction: TableSortDirection;
}

export interface TableSortLabelRootProps {
  'data-active'?: '';
}

export interface UseTableSortLabelResult {
  variant: TableVariant;
  rootProps: TableSortLabelRootProps;
  iconName: IconName;
  iconSize: Responsive<IconSize> | undefined;
}

export interface TableSortLabelIconProps {
  name: IconName;
  size: Responsive<IconSize> | undefined;
}
