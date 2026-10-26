import { cx, type ClassValue } from '../../utils';
import type { PopperLayer, PopperStyleProps } from './Popper.types';

const layers: Record<PopperLayer, string> = {
  dropdown: 'z-dropdown',
  tooltip: 'z-tooltip',
};

export const popperClassName = ({ layer }: PopperStyleProps, className?: ClassValue) =>
  cx(layers[layer], 'vy-popper-motion', className);
