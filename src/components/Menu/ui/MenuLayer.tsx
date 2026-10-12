import { FloatingList } from '@floating-ui/react';
import { Paper } from '../../Paper';
import { Popper } from '../../Popper';
import { MenuContext } from '../context';
import { useMenu } from '../hooks';
import { menuLayerClassName, menuListClassName } from '../Menu.styles';
import type { MenuLayerProps } from '../Menu.types';

export function MenuLayer({
  open,
  onClose,
  anchorEl,
  autoFocus,
  placement,
  keepMounted,
  className,
  children,
  ref,
  ...rest
}: MenuLayerProps) {
  const menu = useMenu({ open, onClose, anchorEl, placement, autoFocus });
  return (
    <Popper
      popper={menu.popper}
      keepMounted={keepMounted}
      focusManager={menu.focusManager}
      className={menuLayerClassName}
    >
      <Paper
        elevation="md"
        ref={ref}
        {...menu.getFloatingProps(rest)}
        className={menuListClassName(className)}
      >
        <FloatingList elementsRef={menu.elementsRef} labelsRef={menu.labelsRef}>
          <MenuContext value={menu.context}>{children}</MenuContext>
        </FloatingList>
      </Paper>
    </Popper>
  );
}
