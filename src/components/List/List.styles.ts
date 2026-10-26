import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { LIST_COMPONENT_NAME_KEY } from './List.constants';
import type { ListStyleProps } from './List.types';

const list = componentTokens[LIST_COMPONENT_NAME_KEY];

export const listRootClassName = (
  { variant, size, color, nested, disablePadding }: ListStyleProps,
  className?: ClassValue,
) =>
  cx(
    list.variants[variant][color],
    responsiveClasses(size, list.sizes),
    list.slots.root,
    'vy-counter-reset',
    !disablePadding && !nested && list.slots.padding,
    !disablePadding && nested && list.slots.nestedPadding,
    nested && list.slots.indent,
    nested && list.slots.guide,
    nested &&
      'relative before:pointer-events-none before:absolute before:inset-y-0 before:border-y-0 before:border-e-0',
    'flex min-w-0 flex-col',
    className,
  );
