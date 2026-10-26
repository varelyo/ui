import type { ReactNode } from 'react';
import { componentTokens } from '../../../generated/maps';
import { mapResponsive } from '../../../utils';
import { AVATAR_COMPONENT_NAME_KEY } from '../Avatar.constants';
import type { UseAvatarParams, UseAvatarResult } from '../Avatar.types';
import { useAvatarImage } from './useAvatarImage';

const present = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false && node !== '';

export function useAvatar({ src, srcSet, size, children }: UseAvatarParams): UseAvatarResult {
  const status = useAvatarImage(src, srcSet);
  const childProps = componentTokens[AVATAR_COMPONENT_NAME_KEY].childProps;
  const showImage = status === 'loaded';
  return {
    showImage,
    showChildren: !showImage && present(children),
    iconSize: mapResponsive(size, (step) => childProps[step].icon.size),
  };
}
