import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { PAPER_COMPONENT_NAME_KEY } from './Paper.constants';
import type { PaperStyleProps } from './Paper.types';

const paper = componentTokens[PAPER_COMPONENT_NAME_KEY];

export const paperClassName = (
  { variant, elevation, square }: PaperStyleProps,
  className?: ClassValue,
) =>
  cx(
    paper.slots.root,
    paper.variants[variant].primary,
    responsiveClasses(elevation, paper.sizes[variant].primary, 'xs'),
    square && 'rounded-none',
    className,
  );
