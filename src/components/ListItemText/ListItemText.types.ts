import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { TypographyVariant } from '../../generated/maps';
import type { Responsive, SlotOf } from '../../types';
import type { ListSize, ListTokens, ListVariant } from '../List';

export type ListItemTextLineSlot = Extract<SlotOf<ListTokens>, 'primary' | 'secondary'>;

type ListItemTextOwnProps = {
  primary?: ReactNode;
  secondary?: ReactNode;
  inset?: boolean;
  noWrap?: boolean;
  primaryVariant?: Responsive<TypographyVariant>;
  secondaryVariant?: Responsive<TypographyVariant>;
  children?: ReactNode;
};

export type ListItemTextProps = ListItemTextOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof ListItemTextOwnProps | 'style'>;

export interface ListItemTextStyleProps {
  size: Responsive<ListSize>;
  inset: boolean;
}

export interface UseListItemTextParams {
  primary: ReactNode;
  secondary: ReactNode;
  children: ReactNode;
}

export interface UseListItemTextResult {
  variant: ListVariant;
  size: Responsive<ListSize>;
  primary: ReactNode;
  secondary: ReactNode;
  secondaryShown: boolean;
}

export interface ListItemTextLineProps {
  slot: ListItemTextLineSlot;
  variant: Responsive<TypographyVariant> | undefined;
  noWrap: boolean;
  children: ReactNode;
}

export interface ListItemTextLineStyleProps {
  slot: ListItemTextLineSlot;
  noWrap: boolean;
}
