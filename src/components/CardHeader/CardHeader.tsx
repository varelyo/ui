import {
  cardHeaderClassName,
  cardHeaderSlotClassName,
  cardHeaderSubheaderClassName,
  cardHeaderTextClassName,
  cardHeaderTitleClassName,
} from './CardHeader.styles';
import type { CardHeaderProps } from './CardHeader.types';
import { useCardHeader } from './hooks';

export function CardHeader({
  title,
  subheader,
  avatar,
  action,
  className,
  ...rest
}: CardHeaderProps) {
  const header = useCardHeader({ title, subheader, avatar, action });
  return (
    <div {...rest} className={cardHeaderClassName(header.appearance, className)}>
      {header.hasAvatar ? <span className={cardHeaderSlotClassName}>{avatar}</span> : null}
      <span className={cardHeaderTextClassName}>
        {header.hasTitle ? <span className={cardHeaderTitleClassName}>{title}</span> : null}
        {header.hasSubheader ? (
          <span className={cardHeaderSubheaderClassName}>{subheader}</span>
        ) : null}
      </span>
      {header.hasAction ? <span className={cardHeaderSlotClassName}>{action}</span> : null}
    </div>
  );
}
