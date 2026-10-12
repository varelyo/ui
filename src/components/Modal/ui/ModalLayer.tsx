import { FloatingFocusManager, FloatingNode, FloatingOverlay } from '@floating-ui/react';
import { Backdrop } from '../../Backdrop';
import { OverlayPortal } from '../../Portal';
import { useModal } from '../hooks';
import {
  modalBackdropClassName,
  modalContainerClassName,
  modalRootClassName,
} from '../Modal.styles';
import type { ModalLayerProps } from '../Modal.types';

export function ModalLayer({
  open,
  onClose,
  keepMounted,
  disableEscapeKeyDown,
  hideBackdrop,
  disablePortal,
  container,
  className,
  children,
  ref,
  ...rest
}: ModalLayerProps) {
  const modal = useModal({ open, onClose, keepMounted, disableEscapeKeyDown, ref });
  return modal.rendered ? (
    <FloatingNode id={modal.nodeId}>
      <OverlayPortal disablePortal={disablePortal} container={container} preserveTabOrder={false}>
        <FloatingOverlay
          lockScroll={modal.open}
          ref={modal.rootRef}
          {...modal.rootProps}
          className={modalRootClassName}
        >
          {hideBackdrop ? null : (
            <Backdrop
              open={modal.open}
              onClick={modal.onBackdropClick}
              className={modalBackdropClassName}
            />
          )}
          <FloatingFocusManager context={modal.context} modal disabled={!modal.open}>
            <div
              {...modal.getFloatingProps(rest)}
              ref={modal.floatingRef}
              className={modalContainerClassName(className)}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </OverlayPortal>
    </FloatingNode>
  ) : null;
}
