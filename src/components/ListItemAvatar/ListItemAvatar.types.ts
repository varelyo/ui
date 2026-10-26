import type { ComponentPropsWithRef } from 'react';
import type { Responsive } from '../../types';
import type { ListSize, ListVariant } from '../List';

export type ListItemAvatarProps = Omit<ComponentPropsWithRef<'div'>, 'style'>;

export interface ListItemAvatarStyleProps {
  size: Responsive<ListSize>;
}

export interface UseListItemAvatarResult {
  variant: ListVariant;
  size: Responsive<ListSize>;
}
