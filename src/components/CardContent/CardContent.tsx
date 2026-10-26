import { cardContentClassName } from './CardContent.styles';
import type { CardContentProps } from './CardContent.types';
import { useCardContent } from './hooks';

export function CardContent({ className, ...rest }: CardContentProps) {
  const { appearance } = useCardContent();
  return <div {...rest} className={cardContentClassName(appearance, className)} />;
}
