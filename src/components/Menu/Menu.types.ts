import type { ComponentPropsWithRef, HTMLProps, MutableRefObject, ReactNode } from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type { VariantOf } from '../../types';
import type {
  PopperClose,
  PopperCloseReason,
  PopperFocusManager,
  PopperPlacement,
  PopperState,
} from '../Popper';
import type { MENU_COMPONENT_NAME_KEY } from './Menu.constants';

export type MenuTokens = ComponentTokens[typeof MENU_COMPONENT_NAME_KEY];
export type MenuVariant = VariantOf<MenuTokens>;

export type MenuCloseReason = PopperCloseReason;
export type MenuClose = PopperClose;

type MenuOwnProps = {
  open: boolean;
  onClose?: MenuClose | undefined;
  anchorEl?: Element | null | undefined;
  autoFocus?: boolean;
  placement?: PopperPlacement;
  keepMounted?: boolean;
  variant?: MenuVariant;
  children?: ReactNode;
};

export type MenuProps = MenuOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof MenuOwnProps | 'style'>;

export type MenuLayerProps = Omit<
  MenuProps,
  'autoFocus' | 'placement' | 'keepMounted' | 'variant'
> & {
  variant: MenuVariant;
  autoFocus: boolean;
  placement: PopperPlacement;
  keepMounted: boolean;
};

export interface MenuContextValue {
  variant: MenuVariant;
  activeIndex: number | null;
  iconSize: IconSize;
  getItemProps(props?: Record<string, unknown>): Record<string, unknown>;
}

export interface UseMenuParams {
  variant: MenuVariant;
  open: boolean;
  onClose: MenuClose | undefined;
  anchorEl: Element | null | undefined;
  placement: PopperPlacement;
  autoFocus: boolean;
}

export interface UseMenuResult {
  popper: PopperState;
  focusManager: PopperFocusManager;
  getFloatingProps: (props?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  elementsRef: MutableRefObject<Array<HTMLElement | null>>;
  labelsRef: MutableRefObject<Array<string | null>>;
  context: MenuContextValue;
}
