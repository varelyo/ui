import type { ElementType } from 'react';
import { Paper, type PaperProps } from '../Paper';
import { CardContext } from './context';
import { useCard } from './hooks';
import { cardClassName } from './Card.styles';
import type { CardProps } from './Card.types';

export function Card<C extends ElementType = 'div'>({
  variant = 'elevation',
  appearance = 'standard',
  elevation = 'xs',
  selected = false,
  className,
  ...rest
}: CardProps<C>) {
  const card = useCard({ appearance });
  return (
    <CardContext value={card.context}>
      <Paper
        {...(rest as PaperProps<ElementType>)}
        variant={variant}
        elevation={elevation}
        selected={selected}
        className={cardClassName(appearance, className)}
      />
    </CardContext>
  );
}
