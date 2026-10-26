import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { IconSize } from '../../generated/maps';
import type { Responsive } from '../../types';
import type { ListSize, ListVariant } from '../List';

type ListItemIconOwnProps = {
  size?: Responsive<IconSize>;
  children?: ReactNode;
};

export type ListItemIconProps = ListItemIconOwnProps &
  Omit<ComponentPropsWithRef<'span'>, keyof ListItemIconOwnProps | 'style'>;

export interface ListItemIconStyleProps {
  size: Responsive<ListSize>;
}

export interface UseListItemIconParams {
  size: Responsive<IconSize> | undefined;
}

export interface UseListItemIconResult {
  variant: ListVariant;
  listSize: Responsive<ListSize>;
  iconSize: Responsive<IconSize> | undefined;
}
