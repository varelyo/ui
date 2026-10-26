import { avatarClassName, avatarImageClassName } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';
import { useAvatar } from './hooks';
import { AvatarFallbackIcon } from './ui';

export function Avatar({
  src,
  srcSet,
  alt,
  children,
  variant = 'circular',
  color = 'neutral',
  size = 'md',
  imgProps,
  className,
  ...rest
}: AvatarProps) {
  const avatar = useAvatar({ src, srcSet, size, children });
  return (
    <div {...rest} className={avatarClassName({ variant, color, size }, className)}>
      {avatar.showImage ? (
        <img
          {...imgProps}
          src={src}
          srcSet={srcSet}
          alt={alt}
          className={avatarImageClassName(imgProps?.className)}
        />
      ) : avatar.showChildren ? (
        children
      ) : (
        <AvatarFallbackIcon size={avatar.iconSize} />
      )}
    </div>
  );
}
