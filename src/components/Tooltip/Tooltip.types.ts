import type { ComponentPropsWithRef, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import type { ComponentTokens, MotionStep } from '../../generated/maps';
import type { VariantOf } from '../../types';
import type { PopperPlacement, PopperState } from '../Popper';
import type { TOOLTIP_COMPONENT_NAME_KEY } from './Tooltip.constants';

export type TooltipTokens = ComponentTokens[typeof TOOLTIP_COMPONENT_NAME_KEY];
export type TooltipVariant = VariantOf<TooltipTokens>;

export type TooltipTriggerProps = HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> };

type TooltipOwnProps = {
  title: ReactNode;
  children: ReactElement<TooltipTriggerProps>;
  placement?: PopperPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?: (event: Event | undefined) => void;
  onClose?: (event: Event | undefined) => void;
  enterDelay?: MotionStep;
  leaveDelay?: MotionStep;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  variant?: TooltipVariant;
};

export type TooltipProps = TooltipOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof TooltipOwnProps | 'style'>;

export type TooltipSurfaceAttributes = Omit<
  ComponentPropsWithRef<'div'>,
  keyof TooltipOwnProps | 'style'
>;

export interface TooltipOverlayProps {
  title: ReactNode;
  children: ReactElement<TooltipTriggerProps>;
  placement: PopperPlacement;
  open: boolean | undefined;
  defaultOpen: boolean;
  onOpen: ((event: Event | undefined) => void) | undefined;
  onClose: ((event: Event | undefined) => void) | undefined;
  enterDelay: MotionStep;
  leaveDelay: MotionStep;
  disableHoverListener: boolean;
  disableFocusListener: boolean;
  variant: TooltipVariant;
  surfaceProps: TooltipSurfaceAttributes;
}

export interface UseTooltipParams {
  title: ReactNode;
  trigger: ReactElement<TooltipTriggerProps>;
  placement: PopperPlacement;
  open: boolean | undefined;
  defaultOpen: boolean;
  onOpen: ((event: Event | undefined) => void) | undefined;
  onClose: ((event: Event | undefined) => void) | undefined;
  enterDelay: MotionStep;
  leaveDelay: MotionStep;
  disableHoverListener: boolean;
  disableFocusListener: boolean;
}

export interface TooltipTriggerElementProps {
  element: ReactElement<TooltipTriggerProps>;
  props: TooltipTriggerProps;
}

export interface TooltipDelays {
  open: number;
  close: number;
}

export interface UseTooltipResult {
  popper: PopperState;
  triggerProps: TooltipTriggerProps;
  floatingProps: Record<string, unknown>;
}
