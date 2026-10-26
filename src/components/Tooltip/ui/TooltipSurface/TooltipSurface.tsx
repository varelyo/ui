import { ThemeScope } from '../../../ThemeScope';
import { tooltipSurfaceClassName } from './TooltipSurface.styles';
import type { TooltipSurfaceProps } from './TooltipSurface.types';

export function TooltipSurface({ variant, className, ...rest }: TooltipSurfaceProps) {
  return (
    <ThemeScope {...rest} mode="inverse" className={tooltipSurfaceClassName(variant, className)} />
  );
}
