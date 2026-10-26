import type { ComponentPropsWithRef } from 'react';
import type { TooltipVariant } from '../../Tooltip.types';

export type TooltipSurfaceProps = Omit<ComponentPropsWithRef<'div'>, 'style'> & {
  variant: TooltipVariant;
};
