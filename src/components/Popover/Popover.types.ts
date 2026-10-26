import type { ComponentPropsWithRef, HTMLProps, ReactNode } from 'react';
import type { ComponentTokens } from '../../generated/maps';
import type { VariantOf } from '../../types';
import type { PopperClose, PopperCloseReason, PopperPlacement, PopperState } from '../Popper';
import type { POPOVER_COMPONENT_NAME_KEY } from './Popover.constants';

export type PopoverTokens = ComponentTokens[typeof POPOVER_COMPONENT_NAME_KEY];
export type PopoverVariant = VariantOf<PopoverTokens>;

export type PopoverCloseReason = PopperCloseReason;
export type PopoverClose = PopperClose;

type PopoverOwnProps = {
  open: boolean;
  onClose?: PopoverClose | undefined;
  anchorEl?: Element | null | undefined;
  placement?: PopperPlacement;
  keepMounted?: boolean;
  variant?: PopoverVariant;
  children?: ReactNode;
};

export type PopoverProps = PopoverOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof PopoverOwnProps | 'style'>;

export type PopoverLayerProps = Omit<PopoverProps, 'placement' | 'keepMounted' | 'variant'> & {
  placement: PopperPlacement;
  keepMounted: boolean;
  variant: PopoverVariant;
};

export interface UsePopoverParams {
  open: boolean;
  onClose: PopoverClose | undefined;
  anchorEl: Element | null | undefined;
  placement: PopperPlacement;
}

export interface UsePopoverResult {
  popper: PopperState;
  getFloatingProps: (props?: HTMLProps<HTMLElement>) => Record<string, unknown>;
}
