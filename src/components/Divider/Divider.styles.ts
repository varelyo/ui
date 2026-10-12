import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { DIVIDER_COMPONENT_NAME_KEY } from './Divider.constants';
import type { DividerOrientation, DividerStyleProps } from './Divider.types';

const divider = componentTokens[DIVIDER_COMPONENT_NAME_KEY];

const orientationClasses: Record<DividerOrientation, string> = {
  horizontal: 'flex items-center',
  vertical: 'inline-flex h-full flex-col items-center',
};

export const dividerRootClassName = (
  { orientation, variant, flexItem }: DividerStyleProps,
  className?: ClassValue,
) =>
  cx(
    divider.slots.root,
    divider.variants[variant].primary,
    orientationClasses[orientation],
    flexItem && 'h-auto self-stretch',
    className,
  );
