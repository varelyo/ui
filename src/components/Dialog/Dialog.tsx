import { Modal } from '../Modal';
import { Paper } from '../Paper';
import { DialogContext } from './context';
import { dialogContainerClassName, dialogPaperClassName } from './Dialog.styles';
import type { DialogProps } from './Dialog.types';
import { useDialog } from './hooks';

export function Dialog({
  open,
  onClose,
  children,
  fullWidth = false,
  maxWidth = 'sm',
  keepMounted = false,
  disableEscapeKeyDown = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  className,
  ...rest
}: DialogProps) {
  const dialog = useDialog({ maxWidth, ariaLabel, ariaLabelledBy, ariaDescribedBy });
  return (
    <Modal
      open={open}
      onClose={onClose}
      keepMounted={keepMounted}
      disableEscapeKeyDown={disableEscapeKeyDown}
      {...dialog.labelProps}
      className={dialogContainerClassName}
    >
      <DialogContext value={dialog.context}>
        <Paper
          elevation="xl"
          {...rest}
          className={dialogPaperClassName({ fullWidth, width: dialog.width }, className)}
        >
          {children}
        </Paper>
      </DialogContext>
    </Modal>
  );
}
