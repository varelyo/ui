import { cardActionsClassName } from './CardActions.styles';
import type { CardActionsProps } from './CardActions.types';

export function CardActions({ className, ...rest }: CardActionsProps) {
  return <div {...rest} className={cardActionsClassName(className)} />;
}
