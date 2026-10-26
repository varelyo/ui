import { layout } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import type { BoxStyleProps } from './Box.types';

export const boxClassName = ({ flexGrow, minHeight }: BoxStyleProps, className?: ClassValue) =>
  cx(
    'min-w-0',
    responsiveClasses(flexGrow, layout.flexGrow),
    responsiveClasses(minHeight, layout.minHeight),
    className,
  );
