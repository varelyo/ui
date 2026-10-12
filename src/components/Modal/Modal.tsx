import { OverlayRoot } from '../Portal';
import type { ModalProps } from './Modal.types';
import { ModalLayer } from './ui';

export function Modal({
  keepMounted = false,
  disableEscapeKeyDown = false,
  hideBackdrop = false,
  disablePortal = false,
  ...rest
}: ModalProps) {
  return (
    <OverlayRoot>
      <ModalLayer
        {...rest}
        keepMounted={keepMounted}
        disableEscapeKeyDown={disableEscapeKeyDown}
        hideBackdrop={hideBackdrop}
        disablePortal={disablePortal}
      />
    </OverlayRoot>
  );
}
