import { componentTokens } from '../../../../generated/maps';
import { cx, type ClassValue } from '../../../../utils';
import { TOOLTIP_COMPONENT_NAME_KEY } from '../../Tooltip.constants';

const tooltip = componentTokens[TOOLTIP_COMPONENT_NAME_KEY];

export const tooltipSurfaceClassName = (className?: ClassValue) =>
  cx(tooltip.slots.root, tooltip.variants.standard.primary, 'block break-words', className);
