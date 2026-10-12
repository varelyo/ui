import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ComponentTokens, IconSize } from '../../generated/maps';
import type { ColorOf, Responsive, SizeOf, VariantOf } from '../../types';
import type { AVATAR_COMPONENT_NAME_KEY } from './Avatar.constants';

export type AvatarTokens = ComponentTokens[typeof AVATAR_COMPONENT_NAME_KEY];
export type AvatarVariant = VariantOf<AvatarTokens>;
export type AvatarColor = ColorOf<AvatarTokens>;
export type AvatarSize = SizeOf<AvatarTokens>;
export type AvatarImageProps = Omit<
  ComponentPropsWithRef<'img'>,
  'src' | 'srcSet' | 'alt' | 'style'
>;

type AvatarOwnProps = {
  src?: string;
  srcSet?: string;
  alt?: string;
  children?: ReactNode;
  variant?: AvatarVariant;
  color?: AvatarColor;
  size?: Responsive<AvatarSize>;
  imgProps?: AvatarImageProps;
};

export type AvatarProps = AvatarOwnProps &
  Omit<ComponentPropsWithRef<'div'>, keyof AvatarOwnProps | 'style'>;

export type AvatarImageStatus = 'none' | 'loading' | 'loaded' | 'error';

export interface AvatarStyleProps {
  variant: AvatarVariant;
  color: AvatarColor;
  size: Responsive<AvatarSize>;
}

export interface UseAvatarParams {
  src: string | undefined;
  srcSet: string | undefined;
  variant: AvatarVariant;
  color: AvatarColor;
  size: Responsive<AvatarSize>;
  children: ReactNode;
}

export interface UseAvatarResult {
  showImage: boolean;
  showChildren: boolean;
  iconSize: Responsive<IconSize> | undefined;
}

export interface AvatarFallbackIconProps {
  size: Responsive<IconSize> | undefined;
}
