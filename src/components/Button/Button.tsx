import type { ElementType, ReactElement } from 'react';
import { ButtonBase, type ButtonBaseProps } from '../ButtonBase';
import { BUTTON_ADDON_SLOTS } from './Button.constants';
import { buttonRootClassName } from './Button.styles';
import type { ButtonInternalProps, ButtonLinkProps, ButtonProps } from './Button.types';
import { useButton } from './hooks';
import { ButtonAddon, ButtonLabel, ButtonLoader } from './ui';

export function Button(props: ButtonLinkProps): ReactElement;
export function Button<C extends ElementType = 'button'>(props: ButtonProps<C>): ReactElement;
export function Button(props: ButtonLinkProps | ButtonProps<ElementType>) {
  const {
    variant = 'text',
    color = 'primary',
    size = 'md',
    startAddon,
    endAddon,
    fullWidth = false,
    loading = false,
    loadingPosition = 'center',
    disabled = false,
    className,
    children,
    ...rest
  } = props as ButtonInternalProps;
  const button = useButton({
    size,
    startAddon,
    endAddon,
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
        <ButtonAddon
          slot={BUTTON_ADDON_SLOTS.start}
          transparent={button.start.transparent}
          size={button.iconSize}
          addon={startAddon}
          props={button.addon}
          loader={button.start.loading ? <ButtonLoader size={button.progressSize} /> : null}
        />
      ) : null}
      {button.centered ? (
        <ButtonLabel loader={<ButtonLoader size={button.progressSize} />}>{children}</ButtonLabel>
      ) : (
        children
      )}
      {button.end.rendered ? (
        <ButtonAddon
          slot={BUTTON_ADDON_SLOTS.end}
          transparent={button.end.transparent}
          size={button.iconSize}
          addon={endAddon}
          props={button.addon}
          loader={button.end.loading ? <ButtonLoader size={button.progressSize} /> : null}
        />
      ) : null}
    </ButtonBase>
  );
}
