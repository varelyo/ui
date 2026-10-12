import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { BUTTON_COMPONENT_NAME_KEY } from './Button.constants';
import type { ButtonStyleProps } from './Button.types';

const button = componentTokens[BUTTON_COMPONENT_NAME_KEY];

export const buttonRootClassName = (
  { variant, color, size, fullWidth }: ButtonStyleProps,
  className?: ClassValue,
) =>
  cx(
    button.slots.root,
    button.variants[variant][color],
    responsiveClasses(size, button.sizes[variant][color], 'md'),
    fullWidth && 'w-full',
    className,
  );
