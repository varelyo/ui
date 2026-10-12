import { layout } from '../../generated/maps';
import {
  cx,
  paddingClasses,
  responsiveClasses,
  spacingClasses,
  type ClassValue,
} from '../../utils';
import { GRID_DEFAULT_COLUMNS } from './Grid.constants';
import type { GridStyleProps } from './Grid.types';

const gridContainerClassName = ({ columns, spacing, display }: GridStyleProps) =>
  cx(
    responsiveClasses(display, layout.display, 'grid'),
    responsiveClasses(columns, layout.columns, GRID_DEFAULT_COLUMNS),
    spacingClasses(spacing),
  );

export const gridClassName = (styleProps: GridStyleProps, className?: ClassValue) =>
  cx(
    styleProps.container
      ? gridContainerClassName(styleProps)
      : responsiveClasses(styleProps.display, layout.display),
    paddingClasses(styleProps.p),
    'min-w-0',
    responsiveClasses(styleProps.size, layout.span),
    responsiveClasses(styleProps.offset, layout.offset),
    className,
  );
