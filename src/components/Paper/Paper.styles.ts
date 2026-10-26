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
    paper.slots.selection,
    paper.variants[variant].primary,
    responsiveClasses(elevation, paper.styleSizes[variant], 'xs'),
    square && 'rounded-none',
    className,
  );
