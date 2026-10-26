import { Paper } from '../../Paper';
import { drawerDockedPaperClassName } from '../Drawer.styles';
import type { DrawerDockedProps } from '../Drawer.types';
import { useDrawerDocked } from '../hooks';

export function DrawerDocked({
  appearance,
  open,
  anchor,
  animated,
  keepMounted,
  children,
  panelProps: { className, ref, ...attributes },
}: DrawerDockedProps) {
  const drawer = useDrawerDocked({ open, animated, keepMounted, ref });
  return drawer.rendered ? (
    <Paper
      square
      variant="outlined"
      {...attributes}
      {...drawer.layerProps}
      ref={drawer.ref}
      className={drawerDockedPaperClassName({ appearance, anchor, animated }, className)}
    >
      {children}
    </Paper>
  ) : null;
}
