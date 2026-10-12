import type { ComponentPropsWithRef, HTMLProps, ReactNode } from 'react';
import type { PopperClose, PopperCloseReason, PopperPlacement, PopperState } from '../Popper';

export type PopoverCloseReason = PopperCloseReason;
export type PopoverClose = PopperClose;

type PopoverOwnProps = {
  open: boolean;
  onClose?: PopoverClose | undefined;
  anchorEl?: Element | null | undefined;
  placement?: PopperPlacement;
  keepMounted?: boolean;
  children?: ReactNode;
};

export type PopoverProps = PopoverOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof PopoverOwnProps | 'style'>;

export type PopoverLayerProps = Omit<PopoverProps, 'placement' | 'keepMounted'> & {
  placement: PopperPlacement;
  keepMounted: boolean;
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
