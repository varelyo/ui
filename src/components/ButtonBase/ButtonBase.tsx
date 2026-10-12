import type { ElementType, ReactElement } from 'react';
import { buttonBaseClassName } from './ButtonBase.styles';
import type {
  ButtonBaseInternalProps,
  ButtonBaseLinkProps,
  ButtonBaseProps,
} from './ButtonBase.types';
import { useButtonBase } from './hooks';

export function ButtonBase(props: ButtonBaseLinkProps): ReactElement;
export function ButtonBase<C extends ElementType = 'button'>(
  props: ButtonBaseProps<C>,
): ReactElement;
export function ButtonBase(props: ButtonBaseLinkProps | ButtonBaseProps<ElementType>) {
  const {
    disabled = false,
    loading = false,
    href,
    component,
    className,
    type,
    role,
    tabIndex,
    onClick,
    onKeyDown,
    onKeyUp,
    children,
    ...rest
  } = props as ButtonBaseInternalProps;
  const { Component, rootProps } = useButtonBase({
    component,
    href,
    to: rest.to,
    disabled,
    loading,
    type,
    role,
    tabIndex,
    onClick,
    onKeyDown,
    onKeyUp,
  });
  return (
    <Component {...rest} {...rootProps} className={buttonBaseClassName(className)}>
      {children}
    </Component>
  );
}
