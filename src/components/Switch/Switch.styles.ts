import { componentTokens } from '../../generated/maps';
import { cx, responsiveClasses, type ClassValue } from '../../utils';
import { SWITCH_COMPONENT_NAME_KEY } from './Switch.constants';
import type { SwitchStyleProps } from './Switch.types';

const switchTokens = componentTokens[SWITCH_COMPONENT_NAME_KEY];

export const switchClassName = (
  { variant, color, size }: SwitchStyleProps,
  className?: ClassValue,
) =>
  cx(
    switchTokens.slots.root,
    switchTokens.variants[variant][color],
    responsiveClasses(size, switchTokens.sizes, 'md'),
    'inline-flex cursor-pointer items-center has-disabled:cursor-not-allowed',
    className,
  );

export const switchTrackClassName = cx(
  switchTokens.slots.track,
  'vy-focus-ring-within relative inline-flex shrink-0 items-center transition-colors duration-sm ease-standard motion-reduce:transition-none',
);

export const switchInputClassName = cx(
  'peer absolute inset-0 z-content cursor-pointer opacity-none disabled:cursor-not-allowed',
);

export const switchThumbClassName = cx(
  switchTokens.slots.thumb,
  'pointer-events-none transition-transform duration-md ease-standard peer-checked:translate-x-full rtl:peer-checked:-translate-x-full motion-reduce:transition-none',
);

export const switchSpacerClassName = cx(switchTokens.slots.thumb, 'opacity-none');

export const switchLabelClassName = cx(switchTokens.slots.label);
