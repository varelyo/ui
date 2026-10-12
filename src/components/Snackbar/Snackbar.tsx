import { ThemeScope } from '../../foundation/ThemeScope';
import { Portal } from '../Portal';
import { useSnackbar } from './hooks';
import { SNACKBAR_DEFAULT_ANCHOR } from './Snackbar.constants';
import { snackbarSurfaceClassName, snackbarViewportClassName } from './Snackbar.styles';
import type { SnackbarProps } from './Snackbar.types';
import { SnackbarAction, SnackbarMessage } from './ui';

export function Snackbar({
  open,
  message,
  action,
  onClose,
  autoHideDuration = null,
  anchorOrigin = SNACKBAR_DEFAULT_ANCHOR,
  role = 'status',
  className,
  children,
  ref,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: SnackbarProps) {
  const snackbar = useSnackbar({
    open,
    onClose,
    autoHideDuration,
    ref,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  });
  const custom = children !== undefined;
  return (
    <Portal>
      <div role={role} className={snackbarViewportClassName(anchorOrigin)}>
        {snackbar.rendered ? (
          <ThemeScope
            {...rest}
            {...snackbar.surfaceProps}
            ref={snackbar.ref}
            {...(custom ? {} : { mode: 'inverse' as const })}
            className={snackbarSurfaceClassName(!custom, className)}
          >
            {custom ? (
              children
            ) : (
              <>
                <SnackbarMessage>{message}</SnackbarMessage>
                {action ? <SnackbarAction>{action}</SnackbarAction> : null}
              </>
            )}
          </ThemeScope>
        ) : null}
      </div>
    </Portal>
  );
}
