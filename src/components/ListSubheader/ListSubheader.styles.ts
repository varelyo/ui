import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { LIST_SUBHEADER_COMPONENT_NAME_KEY } from './ListSubheader.constants';
import type { ListSubheaderStyleProps } from './ListSubheader.types';

const list = componentTokens[LIST_SUBHEADER_COMPONENT_NAME_KEY];

export const listSubheaderClassName = (
  { variant, color, inset, sticky, disableGutters }: ListSubheaderStyleProps,
  className?: ClassValue,
) =>
  cx(
    list.variants[variant][color],
    list.slots.subheader,
    inset && list.slots.subheaderInset,
    !inset && !disableGutters && list.slots.gutterStart,
    !disableGutters && list.slots.gutterEnd,
    sticky && list.slots.sticky,
    sticky && 'sticky top-0 z-dropdown',
    'flex min-w-0 items-center',
    className,
  );
