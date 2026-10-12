import type { FloatingRootContext } from '@floating-ui/react';
import type { ComponentPropsWithRef, HTMLProps, MouseEvent, ReactNode, Ref } from 'react';

export type ModalCloseReason = 'escapeKeyDown' | 'backdropClick';

export type ModalClose = (event: Event | undefined, reason: ModalCloseReason) => void;

export type ModalProps = Omit<ComponentPropsWithRef<'div'>, 'style' | 'children'> & {
  open: boolean;
  onClose?: ModalClose | undefined;
  keepMounted?: boolean;
  disableEscapeKeyDown?: boolean;
  hideBackdrop?: boolean;
  disablePortal?: boolean;
  container?: HTMLElement | null | undefined;
  children?: ReactNode;
};

export type ModalLayerProps = Omit<
  ModalProps,
  'keepMounted' | 'disableEscapeKeyDown' | 'hideBackdrop' | 'disablePortal'
> & {
  keepMounted: boolean;
  disableEscapeKeyDown: boolean;
  hideBackdrop: boolean;
  disablePortal: boolean;
};

export interface UseModalParams {
  open: boolean;
  onClose: ModalClose | undefined;
  keepMounted: boolean;
  disableEscapeKeyDown: boolean;
  ref: Ref<HTMLDivElement> | undefined;
}

export interface ModalRootProps {
  'data-closed'?: '';
  hidden?: true;
}

export interface UseModalResult {
  nodeId: string | undefined;
  context: FloatingRootContext;
  rendered: boolean;
  open: boolean;
  rootRef: (node: HTMLElement | null) => void;
  rootProps: ModalRootProps;
  floatingRef: (node: HTMLDivElement | null) => void;
  getFloatingProps: (props?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  onBackdropClick: (event: MouseEvent<HTMLDivElement>) => void;
}
