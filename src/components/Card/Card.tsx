import type { ElementType } from 'react';
import { Paper, type PaperProps } from '../Paper';
import { cardClassName } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card<C extends ElementType = 'div'>({
  variant = 'elevation',
  elevation = 'xs',
  className,
  ...rest
}: CardProps<C>) {
  return (
    <Paper
      {...(rest as PaperProps<ElementType>)}
      variant={variant}
      elevation={elevation}
      className={cardClassName(className)}
    />
  );
}
