import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { FORM_CONTROL_COMPONENT_NAME_KEY } from './FormControl.constants';
import type { FormControlStyleProps } from './FormControl.types';

const field = componentTokens[FORM_CONTROL_COMPONENT_NAME_KEY];

export const formControlClassName = (
  { variant, size, fullWidth }: FormControlStyleProps,
  className?: ClassValue,
) =>
  cx(
    'inline-flex min-w-0 flex-col',
    field.slots.root,
    field.variants[variant].primary,
    responsiveClasses(size, field.sizes[variant].primary, 'md'),
    fullWidth && 'w-full',
    className,
  );
