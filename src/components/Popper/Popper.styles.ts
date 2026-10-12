import { cx, type ClassValue } from '../../utils';
import type { PopperLayer, PopperStyleProps } from './Popper.types';

const layers: Record<PopperLayer, string> = {
  dropdown: 'z-dropdown',
  tooltip: 'z-tooltip',
};

export const popperClassName = ({ layer }: PopperStyleProps, className?: ClassValue) =>
  cx(
    layers[layer],
    'transition-opacity duration-xs ease-standard starting:opacity-none data-closed:opacity-none motion-reduce:transition-none',
    className,
  );
