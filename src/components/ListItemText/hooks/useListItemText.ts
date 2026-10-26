import { use, type ReactNode } from 'react';
import { ListContext } from '../../List';
import type { UseListItemTextParams, UseListItemTextResult } from '../ListItemText.types';

const present = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

export function useListItemText({
  primary,
  secondary,
  children,
}: UseListItemTextParams): UseListItemTextResult {
  const list = use(ListContext);
  return {
    variant: list.variant,
    size: list.size,
    primary: present(primary) ? primary : children,
    secondary,
    secondaryShown: present(secondary),
  };
}
