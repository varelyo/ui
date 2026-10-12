import type { ElementType, ReactElement } from 'react';
import { ButtonBase, type ButtonBaseProps } from '../ButtonBase';
import { useIconButton } from './hooks';
import { iconButtonRootClassName } from './IconButton.styles';
import type {
  IconButtonInternalProps,
  IconButtonLinkProps,
  IconButtonProps,
} from './IconButton.types';
import { IconButtonIcon, IconButtonLoader } from './ui';

export function IconButton(props: IconButtonLinkProps): ReactElement;
export function IconButton<C extends ElementType = 'button'>(
  props: IconButtonProps<C>,
): ReactElement;
export function IconButton(props: IconButtonLinkProps | IconButtonProps<ElementType>) {
  const {
    variant = 'text',
    color = 'neutral',
    size = 'md',
    loading = false,
    disabled = false,
    className,
    children,
    ...rest
  } = props as IconButtonInternalProps;
  const iconButton = useIconButton({ variant, color, size, loading });
  return (
    <ButtonBase
      {...(rest as ButtonBaseProps<ElementType>)}
      disabled={disabled}
      loading={loading}
      className={iconButtonRootClassName({ variant, color, size }, className)}
    >
      <IconButtonIcon size={iconButton.iconSize}>
        {iconButton.showLoader ? <IconButtonLoader size={iconButton.progressSize} /> : children}
      </IconButtonIcon>
    </ButtonBase>
  );
}
