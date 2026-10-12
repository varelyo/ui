import type { ComponentPropsWithRef, HTMLProps, MutableRefObject, ReactNode } from 'react';
import type { IconSize } from '../../generated/maps';
import type {
  PopperClose,
  PopperCloseReason,
  PopperFocusManager,
  PopperPlacement,
  PopperState,
} from '../Popper';

export type MenuCloseReason = PopperCloseReason;
export type MenuClose = PopperClose;

type MenuOwnProps = {
  open: boolean;
  onClose?: MenuClose | undefined;
  anchorEl?: Element | null | undefined;
  autoFocus?: boolean;
  placement?: PopperPlacement;
  keepMounted?: boolean;
  children?: ReactNode;
};

export type MenuProps = MenuOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof MenuOwnProps | 'style'>;

export type MenuLayerProps = Omit<MenuProps, 'autoFocus' | 'placement' | 'keepMounted'> & {
  autoFocus: boolean;
  placement: PopperPlacement;
  keepMounted: boolean;
};

export interface MenuContextValue {
  activeIndex: number | null;
  iconSize: IconSize;
  getItemProps(props?: Record<string, unknown>): Record<string, unknown>;
}

export interface UseMenuParams {
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
