import type {
  OpenChangeReason,
  Placement,
  ReferenceType,
  UseFloatingReturn,
} from '@floating-ui/react';
import type { ComponentPropsWithRef, MutableRefObject, ReactElement, ReactNode, Ref } from 'react';
import type { SpaceStep } from '../../generated/maps';

export type PopperPlacement = Placement;
export type PopperLayer = 'dropdown' | 'tooltip';
export type PopperOpenChangeReason = OpenChangeReason;

export type PopperOpenChange = (
  open: boolean,
  event: Event | undefined,
  reason: OpenChangeReason | undefined,
) => void;

export type PopperCloseReason = 'escapeKeyDown' | 'backdropClick' | 'tabKeyDown';

export type PopperClose = (event: Event | undefined, reason: PopperCloseReason) => void;

export interface UsePopperParams {
  open: boolean;
  onOpenChange?: PopperOpenChange | undefined;
  onClose?: PopperClose | undefined;
  anchorEl?: Element | null | undefined;
  placement?: PopperPlacement | undefined;
  offset?: SpaceStep | undefined;
  matchWidth?: boolean | undefined;
}

export type PopperState = UseFloatingReturn<ReferenceType> & {
  open: boolean;
  nodeId: string | undefined;
};

export interface PopperFocusManager {
  initialFocus: number | MutableRefObject<HTMLElement | null>;
}

export type PopperProps = Omit<ComponentPropsWithRef<'div'>, 'style' | 'children'> & {
  popper: PopperState;
  keepMounted?: boolean;
  disablePortal?: boolean;
  layer?: PopperLayer;
  container?: HTMLElement | null | undefined;
  focusManager?: PopperFocusManager | undefined;
  children?: ReactNode;
};

export interface PopperFocusScopeProps {
  popper: PopperState;
  focusManager: PopperFocusManager | undefined;
  children: ReactElement;
}

export interface PopperStyleProps {
  layer: PopperLayer;
}

export interface UsePopperLayerParams {
  popper: PopperState;
  keepMounted: boolean;
  ref: Ref<HTMLDivElement> | undefined;
}

export type PopperSide = 'top' | 'right' | 'bottom' | 'left';

export interface PopperLayerProps {
  'data-side': PopperSide;
  'data-closed'?: '';
  hidden?: true;
}

export interface UsePopperLayerResult {
  rendered: boolean;
  ref: (node: HTMLDivElement | null) => void;
  layerProps: PopperLayerProps;
}
