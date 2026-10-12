import type { ElementType } from 'react';
import { useTypography } from './hooks';
import { typographyClassName } from './Typography.styles';
import type { TypographyProps } from './Typography.types';

export function Typography<C extends ElementType = 'p'>({
  variant,
  color,
  align,
  noWrap = false,
  component,
  className,
  ...rest
}: TypographyProps<C>) {
  const { Component } = useTypography({ variant, component });
  return (
    <Component
      {...rest}
      className={typographyClassName({ variant, color, align, noWrap }, className)}
    />
  );
}
