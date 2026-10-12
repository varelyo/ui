import { backdropClassName } from './Backdrop.styles';
import type { BackdropProps } from './Backdrop.types';
import { useBackdrop } from './hooks';

export function Backdrop({
  open,
  invisible = false,
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
      className={backdropClassName({ invisible }, className)}
    >
      {children}
    </div>
  ) : null;
}
