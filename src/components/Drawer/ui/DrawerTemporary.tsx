import { Modal } from '../../Modal';
import { Paper } from '../../Paper';
import { drawerContainerClassName, drawerTemporaryPaperClassName } from '../Drawer.styles';
import type { DrawerTemporaryProps } from '../Drawer.types';
import { useDrawerTemporary } from '../hooks';

export function DrawerTemporary({
  open,
  onClose,
  anchor,
  keepMounted,
  children,
  panelProps: { className, ...attributes },
}: DrawerTemporaryProps) {
  const drawer = useDrawerTemporary(attributes);
  return (
    <Modal
      open={open}
      onClose={onClose}
      keepMounted={keepMounted}
      {...drawer.labelProps}
      className={drawerContainerClassName}
    >
      <Paper
        square
        elevation="xl"
        {...drawer.panelProps}
        className={drawerTemporaryPaperClassName({ anchor }, className)}
      >
        {children}
      </Paper>
    </Modal>
  );
}
