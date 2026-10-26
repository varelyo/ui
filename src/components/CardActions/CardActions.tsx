import { cardActionsClassName } from './CardActions.styles';
import type { CardActionsProps } from './CardActions.types';
import { useCardActions } from './hooks';

export function CardActions({ className, ...rest }: CardActionsProps) {
  const { appearance } = useCardActions();
  return <div {...rest} className={cardActionsClassName(appearance, className)} />;
}
