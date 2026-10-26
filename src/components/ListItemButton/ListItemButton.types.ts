import type { AriaAttributes, ElementType, ReactNode, Ref } from 'react';
import type { PolymorphicProps, Responsive } from '../../types';
import type { ListAlignItems, ListColor, ListContextValue, ListSize, ListVariant } from '../List';

export type ListItemButtonColor = ListColor;
export type ListItemButtonSize = ListSize;

type ListItemButtonOwnProps = {
  color?: ListItemButtonColor;
  size?: Responsive<ListItemButtonSize>;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
  disableGutters?: boolean;
  alignItems?: Responsive<ListAlignItems>;
  autoFocus?: boolean;
  children?: ReactNode;
};

export type ListItemButtonProps<C extends ElementType = 'button'> = PolymorphicProps<
  C,
  ListItemButtonOwnProps
>;

export type ListItemButtonLinkProps = PolymorphicProps<
  'a',
  ListItemButtonOwnProps & { href: string }
> & {
  component?: undefined;
};

export type ListItemButtonInternalProps = ListItemButtonOwnProps & {
  className?: string;
  ref?: Ref<HTMLElement>;
  'aria-current'?: AriaAttributes['aria-current'];
};

export interface ListItemButtonStyleProps {
  variant: ListVariant;
  size: Responsive<ListItemButtonSize>;
  color: ListItemButtonColor;
  end: boolean;
  divider: boolean;
  disableGutters: boolean;
  alignItems: Responsive<ListAlignItems>;
}

export interface UseListItemButtonParams {
  color: ListItemButtonColor | undefined;
  size: Responsive<ListItemButtonSize> | undefined;
  selected: boolean;
  autoFocus: boolean;
  ref: Ref<HTMLElement> | undefined;
  ariaCurrent: AriaAttributes['aria-current'];
}

export interface ListItemButtonRootProps {
  'aria-current': AriaAttributes['aria-current'];
  'data-selected': '' | undefined;
}

export interface UseListItemButtonResult {
  ref: (node: HTMLElement | null) => void;
  end: boolean;
  context: ListContextValue;
  rootProps: ListItemButtonRootProps;
}

export interface UseAutoFocusParams {
  autoFocus: boolean;
}
