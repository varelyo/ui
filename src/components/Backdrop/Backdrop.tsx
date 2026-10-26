import { backdropClassName } from './Backdrop.styles';
import type { BackdropProps } from './Backdrop.types';
import { useBackdrop } from './hooks';

export function Backdrop({
  open,
  invisible = false,
  variant = 'standard',
  className,
  children,
  ref,
  ...rest
}: BackdropProps) {
  const backdrop = useBackdrop({ open, ref });
  return backdrop.rendered ? (
    <div
      aria-hidden="true"
      {...rest}
      {...backdrop.layerProps}
      ref={backdrop.ref}
      className={backdropClassName({ variant, invisible }, className)}
    >
      {children}
    </div>
  ) : null;
}
