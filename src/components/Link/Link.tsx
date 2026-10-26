import type { ElementType } from 'react';
import { useLink } from './hooks';
import { linkClassName } from './Link.styles';
import type { LinkInternalProps, LinkProps } from './Link.types';

export function Link<C extends ElementType = 'a'>(props: LinkProps<C>) {
  const {
    underline = 'always',
    color = 'neutral',
    variant,
    disabled = false,
    component,
    href,
    type,
    role,
    tabIndex,
    onClick,
    className,
    ...rest
  } = props as LinkInternalProps;
  const { Component, rootProps } = useLink({
    component,
    href,
    disabled,
    type,
    role,
    tabIndex,
    onClick,
  });
  return (
    <Component
      {...rest}
      {...rootProps}
      className={linkClassName({ underline, color, variant }, className)}
    />
  );
}
