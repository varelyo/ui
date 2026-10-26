import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { COLLAPSE_COMPONENT_NAME_KEY } from './Collapse.constants';
import type { CollapseOrientation, CollapseStyleProps } from './Collapse.types';

const collapse = componentTokens[COLLAPSE_COMPONENT_NAME_KEY];

const tracks: Record<CollapseOrientation, string> = {
  vertical: 'grid-rows-1fr data-closed:grid-rows-0fr',
  horizontal: 'grid-cols-1fr data-closed:grid-cols-0fr',
};

export const collapseRootClassName = (
  { orientation }: Pick<CollapseStyleProps, 'orientation'>,
  className?: ClassValue,
) =>
  cx(
    'grid transition-all duration-md ease-standard motion-reduce:transition-none',
    tracks[orientation],
    className,
  );

export const collapseContentClassName = ({ orientation, collapsedSize }: CollapseStyleProps) =>
  cx(
    collapse.slots.content,
    responsiveClasses(collapsedSize, collapse.styleSizes[orientation], 'none'),
    'overflow-hidden',
  );
