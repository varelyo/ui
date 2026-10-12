import { cardContentClassName } from './CardContent.styles';
import type { CardContentProps } from './CardContent.types';

export function CardContent({ className, ...rest }: CardContentProps) {
  return <div {...rest} className={cardContentClassName(className)} />;
}
