import { componentTokens } from '../../generated/maps';
import { cx, type ClassValue } from '../../utils';
import { BACKDROP_COMPONENT_NAME_KEY } from './Backdrop.constants';
import type { BackdropStyleProps } from './Backdrop.types';

const backdrop = componentTokens[BACKDROP_COMPONENT_NAME_KEY];

export const backdropClassName = (
  { variant, invisible }: BackdropStyleProps,
  className?: ClassValue,
) =>
  cx(
    backdrop.slots.root,
    backdrop.variants[variant].primary,
    'fixed inset-0 z-overlay flex items-center justify-center transition-opacity duration-md ease-standard starting:opacity-none data-closed:pointer-events-none data-closed:opacity-none motion-reduce:transition-none',
    invisible && 'bg-transparent-default',
    className,
  );
