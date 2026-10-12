import type { ElementType, ReactElement } from 'react';
import { ButtonBase, type ButtonBaseProps } from '../ButtonBase';
import { BUTTON_ICON_SLOTS } from './Button.constants';
import { buttonRootClassName } from './Button.styles';
import type { ButtonInternalProps, ButtonLinkProps, ButtonProps } from './Button.types';
import { useButton } from './hooks';
import { ButtonIcon, ButtonLabel, ButtonLoader } from './ui';

export function Button(props: ButtonLinkProps): ReactElement;
export function Button<C extends ElementType = 'button'>(props: ButtonProps<C>): ReactElement;
export function Button(props: ButtonLinkProps | ButtonProps<ElementType>) {
  const {
    variant = 'text',
    color = 'primary',
    size = 'md',
    startIcon,
    endIcon,
    fullWidth = false,
    loading = false,
    loadingPosition = 'center',
    disabled = false,
    className,
    children,
    ...rest
  } = props as ButtonInternalProps;
  const button = useButton({
    variant,
    color,
    size,
    startIcon,
    endIcon,
    loading,
    loadingPosition,
  });
  return (
    <ButtonBase
      {...(rest as ButtonBaseProps<ElementType>)}
      disabled={disabled}
      loading={loading}
      className={buttonRootClassName({ variant, color, size, fullWidth }, className)}
    >
      {button.start.rendered ? (
        <ButtonIcon
          slot={BUTTON_ICON_SLOTS.start}
          transparent={button.start.transparent}
          size={button.iconSize}
        >
          {button.start.loading ? <ButtonLoader size={button.progressSize} /> : startIcon}
        </ButtonIcon>
      ) : null}
      {button.centered ? (
        <ButtonLabel loader={<ButtonLoader size={button.progressSize} />}>{children}</ButtonLabel>
      ) : (
        children
      )}
      {button.end.rendered ? (
        <ButtonIcon
          slot={BUTTON_ICON_SLOTS.end}
          transparent={button.end.transparent}
          size={button.iconSize}
        >
          {button.end.loading ? <ButtonLoader size={button.progressSize} /> : endIcon}
        </ButtonIcon>
      ) : null}
    </ButtonBase>
  );
}
