import { componentTokens, layout } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LINK_COMPONENT_NAME_KEY } from './Link.constants';
import type { LinkStyleProps } from './Link.types';

const link = componentTokens[LINK_COMPONENT_NAME_KEY];

export const linkClassName = (
  { underline, color, variant }: LinkStyleProps,
  className?: ClassValue,
) =>
  cx(
    'vy-focus-ring cursor-pointer underline transition-colors duration-sm ease-standard motion-reduce:transition-none disabled:cursor-default aria-disabled:cursor-default',
    link.slots.root,
    link.variants[underline][color],
    responsiveClasses(variant, layout.typography),
    className,
  );
