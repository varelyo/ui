import { layout } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { TYPOGRAPHY_DEFAULT_VARIANT } from './Typography.constants';
import type { TypographyStyleProps } from './Typography.types';

export const typographyClassName = (
  { variant, color, align, noWrap }: TypographyStyleProps,
  className?: ClassValue,
) =>
  cx(
    responsiveClasses(variant, layout.typography, TYPOGRAPHY_DEFAULT_VARIANT),
    color && layout.textColor[color],
    responsiveClasses(align, layout.textAlign),
    noWrap && 'truncate',
    className,
  );
