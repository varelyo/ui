import { componentTokens } from '../../../../generated/maps';
import { cx, type ClassValue } from '../../../../utils';
import { TOOLTIP_COMPONENT_NAME_KEY } from '../../Tooltip.constants';
import type { TooltipVariant } from '../../Tooltip.types';

const tooltip = componentTokens[TOOLTIP_COMPONENT_NAME_KEY];

export const tooltipSurfaceClassName = (variant: TooltipVariant, className?: ClassValue) =>
  cx(tooltip.slots.root, tooltip.variants[variant].primary, 'block break-words', className);
