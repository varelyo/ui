import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { CHECKBOX_COMPONENT_NAME_KEY } from './Checkbox.constants';
import type { CheckboxStyleProps } from './Checkbox.types';

const checkbox = componentTokens[CHECKBOX_COMPONENT_NAME_KEY];

export const checkboxClassName = ({ color, size }: CheckboxStyleProps, className?: ClassValue) =>
  cx(
    checkbox.slots.root,
    checkbox.variants.standard[color],
    responsiveClasses(size, checkbox.sizes.standard[color], 'md'),
    'inline-flex cursor-pointer items-center has-disabled:cursor-not-allowed',
    className,
  );

export const checkboxControlClassName = cx('relative inline-flex shrink-0');

export const checkboxInputClassName = cx(
  'peer absolute inset-0 cursor-pointer opacity-none disabled:cursor-not-allowed',
);

export const checkboxIndicatorClassName = cx(
  checkbox.slots.indicator,
  'vy-focus-ring-peer pointer-events-none inline-flex items-center justify-center transition-colors duration-xs ease-standard motion-reduce:transition-none',
);

export const checkboxMarkClassName = cx('size-full');

export const checkboxLabelClassName = cx(checkbox.slots.label);
