import { cloneElement } from 'react';
import type { TooltipTriggerElementProps } from '../Tooltip.types';

export function TooltipTrigger({ element, props }: TooltipTriggerElementProps) {
  return cloneElement(element, props);
}
