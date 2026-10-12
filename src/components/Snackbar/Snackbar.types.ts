import type {
  ComponentPropsWithRef,
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react';
import type { DwellStep } from '../../generated/maps';

export type SnackbarCloseReason = 'timeout' | 'escapeKeyDown';

export type SnackbarClose = (event: Event | undefined, reason: SnackbarCloseReason) => void;

export interface SnackbarAnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export type SnackbarRole = 'status' | 'alert';

type SnackbarOwnProps = {
  open: boolean;
  message?: ReactNode;
  action?: ReactNode;
  onClose?: SnackbarClose | undefined;
  autoHideDuration?: DwellStep | null;
  anchorOrigin?: SnackbarAnchorOrigin;
  role?: SnackbarRole;
  children?: ReactNode;
};

export type SnackbarProps = SnackbarOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof SnackbarOwnProps | 'style'>;

export interface UseSnackbarParams {
  open: boolean;
  onClose: SnackbarClose | undefined;
  autoHideDuration: DwellStep | null;
  ref: Ref<HTMLDivElement> | undefined;
  onMouseEnter: MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave: MouseEventHandler<HTMLDivElement> | undefined;
  onFocus: FocusEventHandler<HTMLDivElement> | undefined;
  onBlur: FocusEventHandler<HTMLDivElement> | undefined;
}

export interface SnackbarSurfaceProps {
  'data-closed'?: '';
  onMouseEnter: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (event: MouseEvent<HTMLDivElement>) => void;
  onFocus: (event: FocusEvent<HTMLDivElement>) => void;
  onBlur: (event: FocusEvent<HTMLDivElement>) => void;
}

export interface UseSnackbarResult {
  rendered: boolean;
  ref: (node: HTMLDivElement | null) => void;
  surfaceProps: SnackbarSurfaceProps;
}

export interface SnackbarMessageProps {
  children: ReactNode;
}

export interface SnackbarActionProps {
  children: ReactNode;
}
