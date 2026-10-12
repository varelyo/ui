import { ThemeScope } from '../../../../foundation/ThemeScope';
import { tooltipSurfaceClassName } from './TooltipSurface.styles';
import type { TooltipSurfaceProps } from './TooltipSurface.types';

export function TooltipSurface({ className, ...rest }: TooltipSurfaceProps) {
  return <ThemeScope {...rest} mode="inverse" className={tooltipSurfaceClassName(className)} />;
}
