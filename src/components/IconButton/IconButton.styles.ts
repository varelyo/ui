import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { ICON_BUTTON_COMPONENT_NAME_KEY } from './IconButton.constants';
import type { IconButtonStyleProps } from './IconButton.types';

const iconButton = componentTokens[ICON_BUTTON_COMPONENT_NAME_KEY];

export const iconButtonRootClassName = (
  { variant, color, size }: IconButtonStyleProps,
  className?: ClassValue,
) =>
  cx(
    iconButton.slots.root,
    iconButton.variants[variant][color],
    responsiveClasses(size, iconButton.sizes[variant][color], 'md'),
    'shrink-0',
    className,
  );
