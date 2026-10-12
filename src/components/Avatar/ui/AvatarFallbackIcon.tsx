import { Icon } from '../../../foundation/Icon';
import { AVATAR_FALLBACK_ICON } from '../Avatar.constants';
import type { AvatarFallbackIconProps } from '../Avatar.types';

export function AvatarFallbackIcon({ size }: AvatarFallbackIconProps) {
  return <Icon name={AVATAR_FALLBACK_ICON} {...(size ? { size } : {})} />;
}
