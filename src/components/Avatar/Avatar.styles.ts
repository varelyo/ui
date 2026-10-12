import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { AVATAR_COMPONENT_NAME_KEY } from './Avatar.constants';
import type { AvatarStyleProps } from './Avatar.types';

const avatar = componentTokens[AVATAR_COMPONENT_NAME_KEY];

export const avatarClassName = (
  { variant, color, size }: AvatarStyleProps,
  className?: ClassValue,
) =>
  cx(
    avatar.slots.root,
    avatar.variants[variant][color],
    responsiveClasses(size, avatar.sizes[variant][color], 'md'),
    'inline-flex shrink-0 select-none items-center justify-center overflow-hidden',
    className,
  );

export const avatarImageClassName = (className?: ClassValue) =>
  cx('h-full w-full object-cover', className);
