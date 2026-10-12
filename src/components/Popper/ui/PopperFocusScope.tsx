import { FloatingFocusManager } from '@floating-ui/react';
import type { PopperFocusScopeProps } from '../Popper.types';

export function PopperFocusScope({ popper, focusManager, children }: PopperFocusScopeProps) {
  return focusManager ? (
    <FloatingFocusManager
      context={popper.context}
      modal={false}
      disabled={!popper.open}
      initialFocus={focusManager.initialFocus}
    >
      {children}
    </FloatingFocusManager>
  ) : (
    children
  );
}
