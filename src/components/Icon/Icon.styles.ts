import { layout } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { ICON_DEFAULT_SIZE } from './Icon.constants';
import type { IconStyleProps } from './Icon.types';

export const iconClassName = ({ size, color }: IconStyleProps, className?: ClassValue) =>
  cx(
    'vy-icon-stroke inline-block shrink-0',
    responsiveClasses(size, layout.iconSize, ICON_DEFAULT_SIZE),
    color && layout.textColor[color],
    className,
  );
